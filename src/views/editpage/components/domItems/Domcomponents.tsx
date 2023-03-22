/*
 * @Descriptin:
 * @Version: 0.1
 * @Autor: Your Name
 * @Date: 2022-11-28 19:03:24
 * @LastEditors: 李航 864217697@qq.com
 * @LastEditTime: 2023-02-22 20:00:54
 */
/*
 * @Descriptin:
 * @Version: 0.1
 * @Autor: Your Name
 * @Date: 2022-11-28 19:03:24
 * @LastEditors: Your Name
 * @LastEditTime: 2023-02-21 19:05:00
 */
import {memo} from 'react'
import DomTemplate from './Domtemplate'

interface DefaultDoms {
    Text: Element,
    Card: Element
}

//props:{index:number} 被渲染在组件列表内index必传,其余不要传
const DefaultDom = memo((props: any) => {
    //计算元素位置y,间隔为20px的纵向排序
    let y = props.index >= 0 ? (Number(props.data.style.height) + 20) * props.index : 0
    const {onMouseDown} = props
    const style = JSON.parse(JSON.stringify(props.data.style))
    delete style.transform
    return (
        <g style={y ? {transform: `translate(0,${y}px)`} : {transform: props.data.style.transform}}
           onMouseDown={(e) => {
               onMouseDown(e)
           }} id={props.id || null} className={props.active ? 'dom_item active_border' : 'dom_item'}>
            <g className='item_container'>
                <rect style={style}/>
                <foreignObject style={{borderRadius: '4.5px', overflow: 'hidden'}} width={style.width}
                               height={style.height}>
                    <div className="template-container" style={{width: "100%", height: '100%', display: 'flex', flexDirection: 'column'}}>
                        <div style={{
                            width: '100%',
                            color: '#fff',
                            background: 'rgba(255,255,255,0.1)',
                            padding: '6px'
                        }}>{props.data.title}
                        </div>
                        <div style={{padding: '8px', height: '100%', overflow: 'hidden'}}>
                            <DomTemplate data={props.data} ></DomTemplate>
                        </div>
                    </div>
                </foreignObject>
            </g>
        </g>
    )
}, (prevProps, nextProps) => {
    //判断前后两个props地址是否相同
    return prevProps.data === nextProps.data
})
export {DefaultDom}


