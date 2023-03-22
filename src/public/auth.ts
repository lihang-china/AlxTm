/*
 * @Descriptin:
 * @Version: 0.1
 * @Autor: Your Name
 * @Date: 2023-01-06 14:05:48
 * @LastEditors: 李航 864217697@qq.com
 * @LastEditTime: 2023-02-23 11:57:32
 */
interface Events {
    nativeEvent: any
    y: string
    x: string
    target: any
    pageY: number,
    pageX: number,
    movementX: number,
    movementY: number
}

interface styleKey {
}

const lineStyle = 'stroke:rgb(255, 255, 255);stroke-width:1;'
const changeString = (data: Object) => {
    //将style转成string
    let str = ''
    for (let key in data) {
        str += `${key}:${data[key as keyof styleKey]};`
    }
    return str
}
const createLines = () => {
    //创建line元素
    let line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    let line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.style.cssText = lineStyle
    line2.style.cssText = lineStyle
    line.setAttribute('y1', '0')
    line.setAttribute('y2', '100%')
    line2.setAttribute('x1', '0')
    line2.setAttribute('x2', '100%')

    return {line, line2}
}
//创建选中框
const checkBorder = (style: { width: string, height: string }) => {
    let height = Number(style.height)
    let width = Number(style.width)
    //circle 标签定位
    const circleList = [{y: (height + 10) / 2}, {y: height + 10}, {x: width + 13},
        {x: (width + 13), y: (height + 10) / 2}, {x: width + 13, y: height + 10},
        {x: ((width / 2) + 6.5), y: height + 13}, {x: (width / 2) + 6.5}]
    //创建 svg 组
    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g')
    //添加基础元素
    group.innerHTML = `<rect x="-5" y="-5" width="${width + 10}" fill='none' strokeDasharray='5,5' stroke='skyblue'height="${height + 10}"/> 
                       <circle  className='svg-circle' cx="-6" cy="-6" r="4" stroke="#fff" stroke-width="1"fill="skyblue" id='circle'/>`
    //循环引用circle标签,并修改位置
    circleList.forEach(e => {
        group.innerHTML += `<use  className='svg-circle' href='#circle' style="y:${e.y};x:${e.x}"/>`
    })
    return group
}
const dragTargetDom = (event: MouseEvent, data: any, callback: Function, isCopy: Boolean) => {
    document.onselectstart = function () {
        return false;
    };
    let target = event.currentTarget as Element
    //被拖动的元素
    if (!target) {
        return
    }
    let cloneNode = isCopy ? target.cloneNode(true) as HTMLElement : target as HTMLElement
    cloneNode.setAttribute('class', 'copy_item')
    let cloneNodeClient = target.getElementsByClassName('item_container')[0].getBoundingClientRect()
    let parentDom = document.getElementsByClassName('edit_main')[0]
    //加入坐标线
    let {line, line2} = createLines()
    parentDom.appendChild(line)
    parentDom.appendChild(line2)
    //将元素style转化为字符串
    let str = changeString(data.style)
    let step = 10 //每次移动距离
    let offset = {
        x: event.pageX - cloneNodeClient.x,
        y: event.pageY - cloneNodeClient.y,
        width: cloneNodeClient.width,
        height: cloneNodeClient.height
    }
    //判断是否拷贝target元素
    if (isCopy) {
        cloneNode.style.cssText = `x:0;y:0;position:absolute;${str}`;
        parentDom.appendChild(cloneNode)
    }
    //插入选中边框
    let chencBorder = checkBorder(data.style)
    cloneNode.appendChild(chencBorder)
    document.body.style.cursor = "pointer"
    document.onmousemove = (e: any) => {
        let x = Math.round((e.x - offset.x) / step) * step
        let y = Math.round((e.y - offset.y) / step) * step
        computedLinePath(parentDom, offset, x, y, line, line2)
        // 四舍五入每次小于5或者大于5时,移动10px
        cloneNode.style.transform = `translate(${x}px,${y}px)`;
    }
    document.onmouseup = () => {
        //清空鼠标移动和放下事件
        document.onmousemove = null
        document.onmouseup = null
        //执行回调函数
        callback(cloneNode, data)
        //清空样式
        cloneNode.setAttribute('class', 'dom_item')
        document.body.style.cursor = "default"
        //移除外观元素
        cloneNode.removeChild(chencBorder)
        parentDom.removeChild(line);
        parentDom.removeChild(line2)
        if (isCopy) parentDom.removeChild(cloneNode);
    }
}
//计算line位置
const computedLinePath = (parentDom: Element, offset: any, x: number, y: number, line: Element, line2: Element) => {
    //最近元素的坐标
    let otherDomOffset = computedDistance(parentDom, [x, y])
    
    let offsetX = Number((x + (offset.width / 2)).toFixed(0))
    let offsetY = Number((y + (offset.height / 2)).toFixed(0))
    if (offsetX === otherDomOffset[0]) {
        line.setAttribute('x1', String(offsetX))
        line.setAttribute('x2', String(offsetX))
    } else if (offsetX > otherDomOffset[0]) {
        line.setAttribute('x1', String(x + offset.width))
        line.setAttribute('x2', String(x + offset.width))
    } else {
        line.setAttribute('x1', String(x))
        line.setAttribute('x2', String(x))
    }
    if (offsetY > otherDomOffset[1]) {
        line2.setAttribute('y1', String(y + offset.height))
        line2.setAttribute('y2', String(y + offset.height))
    } else if (offsetY === otherDomOffset[1]) {
        line2.setAttribute('y1', String(offsetY))
        line2.setAttribute('y2', String(offsetY))
    } else {
        line2.setAttribute('y1', String(y))
        line2.setAttribute('y2', String(y))
    }
}
//计算计算离目标为位置最近元素的坐标
const computedDistance = (parentDom: Element, targetOffset: Array<number>) => {
    let min = -1
    let orgPath: Array<number> = []
    let a, b, c
    if (parentDom.childNodes.length > 3)
        parentDom.childNodes.forEach((e: any) => {
            if (e.getAttribute('class') === 'dom_item') {
                let {x, y, width, height} = e.getElementsByClassName('item_container')[0].getBoundingClientRect()
                //a，b为直角三角形的两个直角边
                a = Math.abs(x - targetOffset[0])
                b = Math.abs(y - targetOffset[1])
                //c为直角三角形的斜边
                c = Math.sqrt(a * a + b * b) as 0
                c = Number(c.toFixed(0)) as 0
                if (min === -1 || (c !== 0 && c < min)) {
                    //min为元素中离目标元素最近元素的距离
                    min = c
                    //最近的元素的坐标
                    orgPath = [Number((x + (width / 2)).toFixed(0)), Number((y + (height / 2)).toFixed(0))]
                }
            }
        })
    //距离最近元素的坐标
    return orgPath
}
export {dragTargetDom}
