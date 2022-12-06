/*
 * @Descriptin: 
 * @Version: 0.1
 * @Autor: Your Name
 * @Date: 2022-11-28 19:03:24
 * @LastEditors: Your Name
 * @LastEditTime: 2022-12-05 19:52:09
 */
import { v4 as uuidv4 } from 'uuid'
import { memo } from 'react'
import { DomTemplate } from './Domtemplate'
interface DefaultDoms {
  Text: Element,
  Card: Element
}
const DefaultDom = memo((props: any) => {
  const data = DomTemplate
  const { onMouseDown } = props
  const { onMouseMove } = props
  const Item = () => {
    return data[props.data.type as keyof DefaultDoms]
  }
  return (
    <div id={props.id || null} onMouseMove={onMouseMove} className="dom_item" onMouseDown={onMouseDown} style={props.data.style} key={uuidv4()}>
      {props.data.tShow ? <div style={props.data.style.title}>{props.data.title ? props.data.title : 'Titile'} </div> : null}
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


