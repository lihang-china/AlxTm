/*
 * @Descriptin:
 * @Version: 0.1
 * @Autor: Your Name
 * @Date: 2023-01-04 16:37:01
 * @LastEditors: Your Name
 * @LastEditTime: 2023-01-04 18:21:33
 */
import { DefaultDom } from "../editpage/components/domItems/Domcomponents"
import {useEffect} from 'react'
export default function VisuaLization() {
  <script src="https://webapi.amap.com/loader.js"></script>
  let map = null
  const { AMap } = window as any
  const domList = JSON.parse(localStorage.getItem('DomList') as '')
  useEffect(()=>{
    map = new AMap.Map('map',{
      zoom:18,
      viewMode:'3D',
      mapStyle:'amap://styles/13b2ddc90e5ca80ee45e1a39410e95f6',
      pitch:75
    })
  },[])
  return <div  style={{ width: '100%', height: '100%', background: 'rgb(70,70,70)' }}>
    <svg className="edit_main" style={{position:'absolute',top:'0',left:'0'}} width={"100%"} height={"100%"}>
    <foreignObject style={{ width: '100%', height: '100%'}}>
    <div id="map" style={{ width: '100%', height: '100%'}}></div>
    </foreignObject>
      {
        domList.map((e: { title: String | '', style: any }, index: number) => {
          return (
              <DefaultDom   key={index} data={e} />
          )
        })
      }
    </svg>
  </div>
}

