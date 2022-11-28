import { v4 as uuidv4 } from 'uuid'
import { Key, useState } from "react"
import { modalDom } from './setting'
import editStyleModal from './editStyleModal'
import ClickMenu from './ClickMenu'
import './DomEdit.scss'
export default function DomEdit(props: any) {
  // console.log(uuidv4(), 'asdasd');

  const [domList, changeList] = useState<any>([])
  const [open, setOpen] = useState(false)
  const [clickEvent, setClickEvent] = useState({ open: false })
  const Model = editStyleModal
  const myCom = <div className="card_group">
    {
      modalDom.map((e: { title: String | '', style: any }, index: Key | null | undefined) => {
        return (
          <div className="card" onClick={() => {
            handleClickCard(e)
          }} style={e.style} key={index}>
            <div className="title" style={e.style.title}>{e.title ? e.title : 'Titile'}</div>
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
    arr.push(item)
    changeList(arr)
  }
  const getDoms = (event: any, index: number) => {
    document.oncontextmenu = function (e) {/*屏蔽浏览器默认右键事件*/
      e = e || window.event;
      return false;
    };
    let isDown = false
    let copyDom: any = document.getElementsByClassName('dom_item')[index as 0] ? document.getElementsByClassName('dom_item')[index as 0].cloneNode(true) : ''
    let parent = document.getElementsByClassName('domedit_component')[0]
    let parentDom: any = document.getElementsByClassName('domedit_component')[0]
    copyDom.style.opacity = '0.3'
    copyDom.style.cursor = 'not-allowed'
    if (event.buttons === 1) {
      if (copyDom) {
        let fn = (event: any) => {
          copyDom.style.position = 'absolute'
          copyDom.style.top = `${event.pageY - 50}px`
          copyDom.style.left = `${event.pageX - 50}px`
          copyDom.setAttribute('class', 'copy_item')
          if (document.querySelectorAll('.copy_item').length >= 1) {
            document.querySelectorAll('.copy_item').forEach((e: any) => {
              if (Math.abs(Number(copyDom.style.left.split('px')[0]) - Number(e.style.left.split('px')[0])) <= 20) {
                copyDom.style.left = e.style.left
              }
              if (Math.abs(Number(copyDom.style.top.split('px')[0]) - Number(e.style.top.split('px')[0])) <= 20) {
                copyDom.style.top = e.style.top
              }
            })
          }
        }
        fn(event)
        parent.appendChild(copyDom || null)
        document.onmousemove = (e) => {
          setClickEvent({ ...event, open: false })
          fn(e)
          if (copyDom.offsetLeft > parentDom.offsetWidth) {
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
          document.onmousemove = null
          if (isDown) {
            console.log('----------------- 移入 -----------------');
          } else {
            if (event.pageX < parentDom.offsetWidth && document.getElementsByClassName('copy_item')[0]?.nodeType === 1) {
              let dom = document.getElementsByClassName('copy_item')
              parent.removeChild(dom[dom.length - 1])
            }
          }
        }
      }
    } else {
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
              <div className="dom_item" onMouseDown={(event) => { getDoms(event, index) }} style={e.style} key={String(index)}>
                <div style={e.style.title}>{e.title ? e.title : 'Titile'}</div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}