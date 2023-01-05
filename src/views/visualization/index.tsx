/*
 * @Descriptin: 
 * @Version: 0.1
 * @Autor: Your Name
 * @Date: 2023-01-04 16:37:01
 * @LastEditors: Your Name
 * @LastEditTime: 2023-01-04 18:21:33
 */
import { DefaultDom } from "../editpage/components/domItems/Domcomponents"
export default function VisuaLization() {
  const domList = JSON.parse(localStorage.getItem('DomList') as '')
  return <div style={{ width: '100%', height: '100%', background: 'rgb(70,70,70)' }}>
    {domList.map((e: any, index: number) => {
      return <DefaultDom data={e} key={index} />
    })}

  </div>

}