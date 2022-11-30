/*
 * @Descriptin: 
 * @Version: 0.1
 * @Autor: Your Name
 * @Date: 2022-11-24 11:06:39
 * @LastEditors: Your Name
 * @LastEditTime: 2022-11-30 16:06:55
 */
import './style/index.scss'
import DomEdit from "./components/DomEdit"
import StyleEdit from './components/StyleEdit'
import { useEffect, useState } from 'react'
import { DefaultDom } from "./components/domItems/Domcomponents"
export default function EditPage() {
  interface ObjKeys {
    pageX:string
  }
const [domList,setDomList] = useState<any>([])
const [open ,setOpen] = useState(false)
const [domData,setDomdata] = useState({})
const [domInedx,setDomindex] = useState<number>()
  const getDom = (dom: any,data:{style:object},width:number) => {
    let arr:any = domList
    let copyData = data
    copyData.style = {
      ...copyData.style,
      left:Number(dom.style.left.split('px')[0]) - width + 'px',
      top:dom.style.top,
      position:'absolute'
    }
    arr.push(copyData)
    setDomList(JSON.parse(JSON.stringify(arr)))
            }
  const handleMouseDown = async (e:any,data:object,index:number)=>{
    setDomindex(index)
    setDomdata(Object.assign(data))
            //  await setOpen(false)
            if(e.buttons === 1){
              setOpen(true)
               }
           }
  const handleClose = ()=>{
    setOpen(false)
  }
  const handleChange = (e:object)=>{
      let dom =  document.getElementById('main_dom' + String(domInedx))?.style
      Object.keys(e).forEach((t:any,index:number)=>{
        if(dom){
          dom[t] = Object.values(e)[index]
        }
      })
  }
  return (
    <div className="edit_container" >
      <DomEdit  getDom={(dom: any,data:{style:object},width:number) => { getDom(dom,data,width) }} />
      <div className='edit_main' >
      {
          domList.map((e: { title: String | '', style: any }, index: number) => {
            return (
             <DefaultDom id={'main_dom' + String(index)} key={index} data={e} onMouseDown={(event: any) => {handleMouseDown(event,e,index)}} />
            )
          })
        }
      </div>
      {open ? <StyleEdit  handleChange={(e:object)=>{handleChange(e)}} handleClose={handleClose} domData={domData}/> : null}
    </div>
  )
}