import { Key, useState } from "react"
import { modalDom } from './setting'
import editStyleModal from './EditStyleModal'
import ClickMenu from './ClickMenu'
import { DefaultDom } from "./domItems/Domcomponents"
import './DomEdit.scss'
interface Text { }
export default function DomEdit(props: any) {
  const [domList, changeList] = useState<any>([])
  const [open, setOpen] = useState(false)
  const [clickEvent, setClickEvent] = useState({ open: false })
  const Model = editStyleModal
  const { getDom } = props
  const myCom = <div className="card_group">
    {
      modalDom.map((e: any, index: Key | null | undefined) => {
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
    let arr = [...domList]
    arr.push(JSON.parse(JSON.stringify(item)))
    changeList(arr)
  }
  const getDoms = (event: any, index: number) => {
    document.oncontextmenu = function (e) {/*屏蔽浏览器默认右键事件*/
      e = e || window.event;
      return false;
    };
    let isDown = false
    let copyDom: any = document.getElementsByClassName('dom_item')[index as 0] ? document.getElementsByClassName('dom_item')[index as 0].cloneNode(true) : ''
    let parentDom: any = document.getElementsByClassName('domedit_component')[0]
    copyDom.style.opacity = '0.3'
    copyDom.style.cursor = 'not-allowed'
    copyDom.style.position = 'absolute'
    copyDom.style.zIndex = 10
    let mainDom = document.getElementsByClassName('edit_main')[0]
    if (event.buttons === 1) {
      if (copyDom) {
        let fn = (event: any) => {
          copyDom.style.top = `${event.pageY - 50}px`
          copyDom.style.left = `${event.pageX - 50}px`
          copyDom.setAttribute('class', 'copy_item')
          let arr = ['top', 'left', 'bottom', 'right']
          arr.forEach((e) => {
            if (e !== 'bottom' && e !== 'right') {
              if (Math.abs(mainDom.getBoundingClientRect()[e as keyof Text] - copyDom.getBoundingClientRect()[e as keyof Text]) <= 20) {
                copyDom.style[e as keyof Text] = mainDom.getBoundingClientRect()[e as keyof Text] + 'px'
              }
            } else {
              let str = e === 'bottom' ? 'height' : 'width'
              let str2 = e === 'bottom' ? 'top' : 'left'
              if (Math.abs(mainDom.getBoundingClientRect()[str as keyof Text]
                - (copyDom.getBoundingClientRect()[str as keyof Text] + copyDom.getBoundingClientRect()[str2 as keyof Text] - (str2 === 'left' ? parentDom.offsetWidth : 0))) <= 20)
                copyDom.style[str2 as keyof Text] = mainDom.getBoundingClientRect()[str as keyof Text] - copyDom.getBoundingClientRect()[str as keyof Text] + (str2 === 'left' ? parentDom.offsetWidth : 0) + 'px'
            }
          })
          if (mainDom.childNodes.length >= 1) {
            mainDom.childNodes.forEach((e: any) => {
              if (Math.abs(copyDom.getBoundingClientRect().left - e.getBoundingClientRect().left) <= 20) {
                //元素左对齐吸附
                copyDom.style.left = e.getBoundingClientRect().left + 'px'
              }
              if (Math.abs(copyDom.getBoundingClientRect().top - e.getBoundingClientRect().top) <= 20) {
                //元素上对齐吸附
                copyDom.style.top = e.getBoundingClientRect().top + 'px'
              }

            })
          }
        }
        fn(event)
        parentDom.appendChild(copyDom || null)
        document.onmousemove = (e) => {
          setClickEvent({ ...event, open: false })
          fn(e)
          if (copyDom.offsetLeft >= parentDom.offsetWidth) {
            copyDom.style.opacity = '1'
            copyDom.style.cursor = 'pointer'
            isDown = true
          } else {
            copyDom.style.opacity = '0.3'
            copyDom.style.cursor = 'not-allowed'
            isDown = false
          }
        }
        document.onmouseup = () => {
          //鼠标送开始释放元素，解除对元素的控制并初始化
          document.onmouseup = null
          document.onmousemove = null
          if (isDown && copyDom) {
            getDom(copyDom, domList[index], parentDom.offsetWidth)
          }
          if (event.pageX < parentDom.offsetWidth && document.getElementsByClassName('copy_item')[0]?.nodeType === 1) {
            copyDom = null
            let dom = document.getElementsByClassName('copy_item')
            parentDom.removeChild(dom[dom.length - 1])
          }
        }
      }
    } else {
      //鼠标右键打开菜单
      handlerRight(event, index)
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
    <div className="domedit_component" >
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
              <DefaultDom key={index} data={e} onMouseDown={(e: any) => { getDoms(e, index) }} />
            )
          })
        }
      </div>
    </div>
  )
}