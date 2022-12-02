/*
 * @Descriptin: 
 * @Version: 0.1
 * @Autor: Your Name
 * @Date: 2022-11-24 11:06:39
 * @LastEditors: Your Name
 * @LastEditTime: 2022-12-02 13:39:50
 */
import './style/index.scss'
import DomEdit from "./components/DomEdit"
import StyleEdit from './components/StyleEdit'
import { useEffect, useState } from 'react'
import { DefaultDom } from "./components/domItems/Domcomponents"
export default function EditPage() {

  const [domList, setDomList] = useState<any>([])
  const [open, setOpen] = useState(false)
  const [domData, setDomdata] = useState({})
  const [domInedx, setDomindex] = useState<number>()
  const getDom = (dom: any, data: { style: object }, width: number) => {
    //拷贝dom数据信息，更新数据列表
    let arr: any = domList
    let copyData = data
    copyData.style = {
      ...copyData.style,
      left: dom.getBoundingClientRect().left - width + 'px',
      top: dom.getBoundingClientRect().top + 'px',
      position: 'absolute'
    }
    arr.push(JSON.parse(JSON.stringify(copyData)))//改变引用，引用相同可能引起两个元素信息一致的问题
    setDomList(JSON.parse(JSON.stringify(arr)))
  }
  const handleMouseDown = async (e: any, data: object, index: number) => {
    //更新对象和下标
    setDomindex(index)
    setDomdata(Object.assign(data))
    if (e.buttons === 1) {
      //鼠标左键打开编辑栏
      setOpen(true)
    }
  }
  const handleClose = () => {
    setOpen(false)
  }
  const handleChange = (e: object) => {
    //同步编辑栏抛出的对象信息
    let arr = domList
    arr[domInedx as 0].style = JSON.parse(JSON.stringify(e))
    setDomList(JSON.parse(JSON.stringify(arr)))
  }
  return (
    <div className="edit_container" >
      <DomEdit getDom={(dom: any, data: { style: object }, width: number) => { getDom(dom, data, width) }} />
      <div className='edit_main' >
        {
          domList.map((e: { title: String | '', style: any }, index: number) => {
            return (
              <DefaultDom id={'main_dom' + String(index)} key={index} data={e} onMouseDown={(event: any) => { handleMouseDown(event, e, index) }} />
            )
          })
        }
      </div>
      {open ? <StyleEdit handleChange={(e: object) => { handleChange(e) }} handleClose={handleClose} domData={domData} /> : null}
    </div>
  )
}