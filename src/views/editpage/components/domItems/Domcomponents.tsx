/*
 * @Descriptin: 
 * @Version: 0.1
 * @Autor: Your Name
 * @Date: 2022-11-28 19:03:24
 * @LastEditors: Your Name
 * @LastEditTime: 2022-12-02 13:33:53
 */
import { v4 as uuidv4 } from 'uuid'
import { memo } from 'react'
import { DomTemplate } from './Domtemplate'
interface DefaultDoms {
  Text: Element,
  Card: Element
}
const DefaultDom = memo((params: any) => {
  const data = DomTemplate
  const { onMouseDown } = params
  const Item = () => {
    return data[params.data.type as keyof DefaultDoms]
  }
  return (
    <div id={params.id || null} className="dom_item" onMouseDown={(event) => { onMouseDown(event) }} style={params.data.style} key={uuidv4()}>
      {params.data.tShow ? <div style={params.data.style.title}>{params.data.title ? params.data.title : 'Titile'} </div> : null}
      <div className='dom_main'>
        <Item />
      </div>
    </div>
  )
}, (prevProps, nextProps) => {
  //判断前后两个props地址是否相同
  return prevProps.data === nextProps.data
})
export { DefaultDom }


