/*
 * @Descriptin: 
 * @Version: 0.1
 * @Autor: Your Name
 * @Date: 2022-11-24 11:06:39
 * @LastEditors: Your Name
 * @LastEditTime: 2023-01-05 14:03:14
 */
import './style/index.scss'
import DomEdit from "./components/DomEdit"
import StyleEdit from './components/StyleEdit'
import { useState, useRef, useEffect } from 'react'
import { DefaultDom } from "./components/domItems/Domcomponents"
import { EyeOutlined, CheckOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
export default function EditPage() {
  const history = useHistory()
  let mouseSate = 'move'
  let editDom = false
  let dom1: any = document.getElementsByClassName('edit_main')[0]
  const buttonList = [{ label: '查看', icon: <EyeOutlined /> }, { label: '保存', icon: <CheckOutlined /> }]
  const [domList, setDomList] = useState<any>([])
  const dataList = useRef<any>([]) //解决鼠标事件嵌套导致hook的闭包问题，确保数据唯一性
  const [open, setOpen] = useState(false)
  const [domIndex, setDomindex] = useState<number>()
  dataList.current = domList
  const getDom = (dom: any, data: { style: object }, width: number) => {
    let domClient = dom.getBoundingClientRect()
    //拷贝dom数据信息，更新数据列表
    let arr: any = [...dataList.current]
    let copyData = JSON.parse(JSON.stringify(data))
    copyData.style = {
      ...copyData.style,
      left: domClient.left + 'px',
      top: domClient.top + 'px',
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
    let dom: any = document.getElementById('main_dom' + String(index))
    let D1left = dom1.offsetLeft
    let { offsetLeft: Dleft, offsetWidth: Dwidth, offsetHeight: Dheight, offsetTop: Dtop } = dom
    if (t.buttons === 2) {
      //鼠标左键打开编辑栏
      setOpen(true)
    } else if (domIndex === index) {
      document.onmousemove = (e) => {
        //鼠标拖动时更新dom数据实现拖动效果，放下时更新domlsit数据
        if (mouseSate === 'move') {
          dom.style.cssText += `left:${e.pageX - dom1.offsetLeft - (t.pageX - D1left - Dleft)}px;top:${e.pageY - (t.pageY - Dtop)}px;z-index:101`
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
    arr[domIndex as 0].style = e
    setDomList(JSON.parse(JSON.stringify(arr)))
  }
  const handleMouseMove = (e: any, index: number) => {
    //鼠标在元素上移动时动态判断鼠标状态
    let dom: any = document.getElementById('main_dom' + String(index))
    //  T0 元素与顶部距离 L0 元素与左边距离 Dw  元素宽度 Dh 元素高度
    let { offsetTop: T0, offsetLeft: L0, offsetWidth: Dw, offsetHeight: Dh } = dom
    let parentDomLeft = dom1.offsetLeft
    if (!document.onmousemove) {
      if (e.pageY > T0 - 2 && e.pageY < T0 + 10) {
        dom.style.cursor = 's-resize'
        mouseSate = 'T' //鼠标拖动时状态 对应四个方向
      } else if (e.pageY > T0 + Dh - 10 && e.pageY < T0 + Dh + 2) {
        dom.style.cursor = 's-resize'
        mouseSate = 'B'
      } else if (e.pageX - parentDomLeft > L0 - 2 && e.pageX - parentDomLeft < L0 + 10) {
        mouseSate = 'L'
        dom.style.cursor = 'w-resize'
      } else if (e.pageX - parentDomLeft > L0 + Dw - 10 && e.pageX - parentDomLeft < L0 + Dw + 2) {
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
  const handleSaveBtn = () => {
    localStorage.setItem('DomList', JSON.stringify(dataList.current))
    // history.push({ pathname: '/visual' })
    window.open(`${window.location.origin}/#/visual`)

  }
  return (
    <div className="edit_container">
      <div className='button_list'>
        {buttonList.map((e, index) => {
          return <div onClick={handleSaveBtn} key={index} className="button_save">{e.icon}</div>
        })}
      </div>
      <DomEdit getDom={(dom: any, data: { style: object }, width: number) => { getDom(dom, data, width) }} />
      <div className='edit_main' >
        {
          dataList.current.map((e: { title: String | '', style: any }, index: number) => {
            return (
              <DefaultDom active={index === domIndex ? true : false} onMouseMove={(e: any) => { handleMouseMove(e, index) }} id={'main_dom' + String(index)} key={index} data={e} onMouseDown={(event: any) => { handleMouseDown(event, e, index) }} />
            )
          })
        }
      </div>
      {open ? <StyleEdit handleChange={(e: object) => { handleChange(e) }} handleClose={handleClose} domData={dataList.current[domIndex as 0]} /> : null}
    </div>
  )
}