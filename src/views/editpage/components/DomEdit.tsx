import { useState } from "react"
import { modalDom } from './setting'
import editStyleModal from './EditStyleModal'
import ClickMenu from './ClickMenu'
import { DefaultDom } from "./domItems/Domcomponents"
import { dragTargetDom, alignDom } from '../../../public/auth'
import './DomEdit.scss'
export default function DomEdit(props: any) {
  const [domList, changeList] = useState<any>([])
  const [open, setOpen] = useState(false)
  const [clickEvent, setClickEvent] = useState({ open: false })
  const [menuHide, setMenuHide] = useState(false)
  const Model = editStyleModal
  const { getDom } = props
  const myCom = <div className="card_group">
    {
      modalDom.map((e: any, index: number) => {
        return (
          <div className="card" onClick={() => {
            handleClickCard(e)
          }} style={e.style} key={index}>
            {e.tShow ? <div className="title" style={e.style.title}>{e.title ? e.title : 'Titile'}</div> : null}
          </div>
        )
      })
    }
  </div>
  document.addEventListener('selectstart', function (e) {
    e.preventDefault();
  })
  const handleClickCard = (item: Object) => {
    let copyList = [...domList]
    copyList.push(JSON.parse(JSON.stringify(item)))
    changeList(copyList)
  }
  const handleMouseDown = (event: any, index: number) => {
    document.oncontextmenu = function (e) {/*屏蔽浏览器默认右键事件*/
      e = e || window.event;
      return false;
    };
    let mainDom = document.getElementById('edit_main') //获取画布元素
    let isDown = false
    //复制选中的元素
    let copyDom: any = document.createDocumentFragment().appendChild(document.getElementsByClassName('dom_item')[index].cloneNode(true)) //创建文档碎片
    //获取父元素
    let parentDom: any = document.getElementsByClassName('domedit_component')[0]
    copyDom.style.cssText += "opacity:0.3;cursor:not-allowed;position:fixed;z-index:100"
    copyDom.setAttribute('class', 'copy_item') //copy元素并赋给新的类名，以便操作
    if (event.buttons === 1) {
      if (copyDom) {
        parentDom.appendChild(copyDom)
        document.onmousemove = (e) => {
          setClickEvent({ ...event, open: false })
          dragTargetDom(e, mainDom as HTMLElement, copyDom, [50, 50]) //
          alignDom(mainDom as HTMLElement, copyDom)
          if (copyDom.offsetLeft >= parentDom.offsetWidth) {
            copyDom.style.cssText += 'opacity:1;cursor:pointer'
            isDown = true
          } else {
            copyDom.style.cssText += 'opacity:0.3;cursor:not-allowed'
            isDown = false
          }
        }
        document.onmouseup = () => {//鼠标送开始释放元素，解除对元素的控制并初始化
          document.onmouseup = null; document.onmousemove = null
          if (isDown && copyDom)
            getDom(copyDom, domList[index], parentDom.offsetWidth)
          if (event.pageX < parentDom.offsetWidth && document.getElementsByClassName('copy_item')[0]?.nodeType === 1)
            copyDom = null
          let dom = document.getElementsByClassName('copy_item')
          parentDom.removeChild(dom[dom.length - 1])
        }
      }
    } else {
      handlerRight(event, index)//鼠标右键打开菜单
    }
  }
  const handlerRight = (event: any, index: number) => {
    setClickEvent({ ...event, open: true, index: index })
    document.onclick = (() => {
      setClickEvent({ ...event, open: false })
    })
  }
  const handleMenuClick = (e: any) => {
    //右键菜单操作
    let arr = [...domList]
    arr.splice(e.index, 1)
    changeList(arr)
  }
  return (
    <div className={menuHide ? 'domedit_component domedit_component_hide' : 'domedit_component'} >
      <div className="hide_btn" onClick={() => { menuHide ? setMenuHide(false) : setMenuHide(true) }}>+</div>
      <ClickMenu clickEvent={clickEvent} handleClick={(e: any) => { handleMenuClick(e) }} />
      <Model component={myCom} open={open} handleClose={() => {
        setOpen(false)
      }} />
      <div className="component_header">
        <span >Components</span><span onClick={() => { setOpen(true) }}>+</span>
      </div>
      <div className="component_group" >
        {
          domList.map((e: { title: String | '', style: any }, index: number) => {
            return (
              <DefaultDom key={index} data={e} onMouseDown={(e: any) => { handleMouseDown(e, index) }} />
            )
          })
        }
      </div>
    </div>
  )
}