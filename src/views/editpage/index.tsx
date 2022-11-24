/*
 * @Descriptin: 
 * @Version: 0.1
 * @Autor: Your Name
 * @Date: 2022-11-24 11:06:39
 * @LastEditors: Your Name
 * @LastEditTime: 2022-11-24 18:31:34
 */
import './style/index.scss'
import DomEdit from "./components/DomEdit"
import { useState } from 'react'
export default function EditPage() {
  const [state, setState] = useState(false)
  return (
    <div className="edit_container" >
      <DomEdit isDown={{ state }} />
      <div className='edit_main' onMouseEnter={() => {
        setState(true)
      }} onMouseLeave={() => {
        setState(false)

      }}></div>
    </div>
  )
}