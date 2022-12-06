/*
 * @Descriptin: 
 * @Version: 0.1
 * @Autor: Your Name
 * @Date: 2022-11-24 11:06:39
 * @LastEditors: Your Name
 * @LastEditTime: 2022-12-06 14:41:06
 */
import './style/index.scss'
import DomEdit from "./components/DomEdit"
import StyleEdit from './components/StyleEdit'
import { useState, useRef } from 'react'
import { DefaultDom } from "./components/domItems/Domcomponents"
export default function EditPage() {
  let mouseSate = 'move'
  let editDom = false
  let moveDom = false
  const [domList, setDomList] = useState<any>([])
  const dataList = useRef([]) //解决鼠标事件嵌套导致hook的闭包问题，确保数据唯一性
  const [open, setOpen] = useState(false)
  const [domInedx, setDomindex] = useState<number>()
  dataList.current = domList
  const getDom = (dom: any, data: { style: object }, width: number) => {
    //拷贝dom数据信息，更新数据列表
    let arr: any = [...dataList.current]
    let copyData = JSON.parse(JSON.stringify(data))
    copyData.style = {
      ...copyData.style,
      left: dom.getBoundingClientRect().left - width + 'px',
      top: dom.getBoundingClientRect().top + 'px',
      position: 'absolute'
    }
    arr.push(copyData)
    setDomList(JSON.parse(JSON.stringify(arr)))
  }
  const handleMouseDown = async (t: any, data: object, index: number) => {
    //更新对象和下标
    setDomindex(index)
    // 拖动改变元素大小
    editDom = true //锁定元素编辑状态
    //拖动与更改元素大小时需固定元素部分初始状态
    let dom1: any = document.getElementsByClassName('edit_main')[0]
    let dom: any = document.getElementById('main_dom' + String(index))
    let Dleft = JSON.parse(JSON.stringify(dom.offsetLeft))
    let Dwidth = JSON.parse(JSON.stringify(dom.offsetWidth))
    let Dheight = JSON.parse(JSON.stringify(dom.offsetHeight))
    let Dtop = JSON.parse(JSON.stringify(dom.offsetTop))
    let D1left = JSON.parse(JSON.stringify(dom1.offsetLeft))
    dom.style.zIndex = 99999
    if (t.buttons === 2) {
      //鼠标左键打开编辑栏
      moveDom = true //锁定拖动状态，防止鼠标状态切换
      setOpen(true)
    } else {
      document.onmousemove = (e) => {
        //鼠标拖动时更新dom数据实现拖动效果，放下时更新domlsit数据
        if (mouseSate === 'move') {
          dom.style.left = e.pageX - dom1.offsetLeft - (t.pageX - D1left - Dleft) + 'px'
          dom.style.top = e.pageY - (t.pageY - Dtop) + 'px'
          dom1.childNodes.forEach((child: any) => {
            if (Math.abs(dom.offsetLeft - child.offsetLeft) <= 20) {
              //元素左对齐吸附
              dom.style.left = child.offsetLeft + 'px'
            }
            if (Math.abs(dom.offsetTop - child.offsetTop) <= 20) {
              //元素上对齐吸附
              dom.style.top = child.offsetTop + 'px'
            }
          })
        } else if (mouseSate === 'R') {
          dom.style.width = e.pageX - dom1.offsetLeft - dom.offsetLeft + 'px'
        } else if (mouseSate === 'B') {
          dom.style.height = e.pageY - dom.offsetTop + 'px'
        } else if (mouseSate === 'L') {
          dom.style.left = e.pageX - dom1.offsetLeft + 'px'
          dom.style.width = Dwidth + (Dleft - (e.pageX - dom1.offsetLeft)) + 'px'
        } else if (mouseSate === 'T') {
          dom.style.top = e.pageY + 'px'
          dom.style.height = Dheight + (Dtop - e.pageY) + 'px'
        }
      }
    }
    document.onmouseup = () => {
      //鼠标松开时释放所有对元素控制并更新dom数据
      document.onmouseup = null
      document.onmousemove = null
      editDom = false
      moveDom = false
      dom.style.zIndex = 0
      let arr = [...domList]
      let { left, top, width, height } = dom.style
      arr[index].style = {
        ...arr[index].style,
        left: left,
        top: top,
        width: width,
        height: height
      }
      setDomList(JSON.parse(JSON.stringify(arr)))
    }
  }
  const handleClose = () => {
    setOpen(false)
  }
  const handleChange = (e: object) => {
    //同步编辑栏抛出的对象信息
    let arr = [...domList]
    arr[domInedx as 0].style = e
    setDomList(JSON.parse(JSON.stringify(arr)))
  }
  const handleMouseMove = (e: any, index: number) => {
    //鼠标在元素上移动时动态判断鼠标状态
    let dom1: any = document.getElementsByClassName('edit_main')[0]
    let dom: any = document.getElementById('main_dom' + String(index))
    let T0 = dom?.offsetTop
    let L0 = dom?.offsetLeft
    let Dw = dom?.offsetWidth
    let Dh = dom?.offsetHeight
    if (!moveDom) {
      if (e.pageY > T0 - 2 && e.pageY < T0 + 10) {
        dom.style.cursor = 's-resize'
        mouseSate = 'T' //鼠标拖动时状态 对应四个方向
      } else if (e.pageY > T0 + Dh - 10 && e.pageY < T0 + Dh + 2) {
        dom.style.cursor = 's-resize'
        mouseSate = 'B'
      } else if (e.pageX - dom1.offsetLeft > L0 - 2 && e.pageX - dom1.offsetLeft < L0 + 10) {
        mouseSate = 'L'
        dom.style.cursor = 'w-resize'
      } else if (e.pageX - dom1.offsetLeft > L0 + Dw - 10 && e.pageX - dom1.offsetLeft < L0 + Dw + 2) {
        dom.style.cursor = 'w-resize'
        mouseSate = 'R'
      } else {
        if (!editDom) {
          dom.style.cursor = 'pointer'
          mouseSate = 'move'
        }
      }
    }
  }
  return (
    <div className="edit_container" >
      <DomEdit getDom={(dom: any, data: { style: object }, width: number) => { getDom(dom, data, width) }} />
      <div className='edit_main' >
        {
          dataList.current.map((e: { title: String | '', style: any }, index: number) => {
            return (
              <DefaultDom onMouseMove={(e: any) => { handleMouseMove(e, index) }} id={'main_dom' + String(index)} key={index} data={e} onMouseDown={(event: any) => { handleMouseDown(event, e, index) }} />
            )
          })
        }
      </div>
      {open ? <StyleEdit handleChange={(e: object) => { handleChange(e) }} handleClose={handleClose} domData={dataList.current[domInedx as 0]} /> : null}
    </div>
  )
}