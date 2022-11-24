import { Key, useEffect, useRef, useState } from "react"
import { defaultDom } from './setting'
/*
 * @Descriptin: 
 * @Version: 0.1
 * @Autor: Your Name
 * @Date: 2022-11-24 11:10:02
 * @LastEditors: Your Name
 * @LastEditTime: 2022-11-24 19:20:24
 */
import './DomEdit.scss'
import { Button } from 'antd'

export default function DomEdit(props: any) {
  const [domList, changeList] = useState<any>([])
  const [dom, setDom] = useState<any>()
  const [isDown, setDown] = useState<Boolean>(false)
  let state = useRef<Boolean>()
  useEffect(() => {
    state.current = isDown || false

  }, [isDown])
  const defaultData = defaultDom
  const handleAddDom = () => {
    let arr = [...domList]
    arr.push(defaultData)
    changeList(arr)
  }
  const getDoms = (event: any, index: Key | null | undefined) => {
    let copyDom: any = document.getElementsByClassName('dom_item')[index as 0].cloneNode(true)
    let parent = document.getElementsByClassName('domedit_component')[0]
    let fn = (event: any) => {
      copyDom.style.position = 'absolute'
      copyDom.style.top = `${event.pageY - 50}px`
      copyDom.style.left = `${event.pageX - 50}px`
      copyDom.setAttribute('class', 'copy_item')
    }
    fn(event)
    parent.appendChild(copyDom)
    document.onmousemove = (e) => {
      fn(e)
      let parentDom: any = document.getElementsByClassName('domedit_component')[0]
      if (copyDom.offsetLeft > parentDom.offsetWidth) {
        copyDom.style.opacity = '1'
        setDown(true)
      } else {
        copyDom.style.opacity = '0.3'
        setDown(false)
      }
    }
    document.onmouseup = () => {
      document.onmousemove = null
      console.log(state, isDown, 'isDown');
      if (state.current) {

      } else {
        if (document.getElementsByClassName('copy_item')[0]?.nodeType === 1) {
          let dom = document.getElementsByClassName('copy_item')
          parent.removeChild(dom[dom.length - 1])
        }
      }
    }
  }
  return (
    <div className="domedit_component" >
      <div className="component_header">
        <span >Components {String(isDown)}</span><span onClick={handleAddDom}>+</span>
      </div>
      <div className="component_group" >
        {
          domList.map((e: { title: String | '', style: any }, index: Key | null | undefined) => {
            return (
              <div className="dom_item" onMouseDown={(event) => { getDoms(event, index) }} style={e.style} key={index}>
                <div style={e.style.title}>{e.title ? e.title : 'Titile'}</div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}