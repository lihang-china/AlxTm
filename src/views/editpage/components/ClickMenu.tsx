
/*
 * @Descriptin: 
 * @Version: 0.1
 * @Autor: Your Name
 * @Date: 2022-08-23 18:27:35
 * @LastEditors: Your Name
 * @LastEditTime: 2022-11-25 14:51:42
 */
import { Button } from 'antd'
import { useEffect, useState } from 'react'
import './ClickMenu.scss'
export default function ClickMenu(props: { clickEvent: any, handleClick: Function }) {
  const [open, setOpen] = useState(false)
  const menuList = [{ label: "删除模板" }]
  useEffect(() => {
    setOpen(props.clickEvent.open)
  }, [props.clickEvent.open])
  const { handleClick } = props
  if (open) {
    return (
      <div className={['click_menu', props.clickEvent.open ? ' fadeIn' : ' fadeOut'].join(' ')} style={{ left: props.clickEvent.clientX + 'px', top: props.clickEvent.clientY + 'px' }}>
        <ul>
          {menuList.map((e, index) => {
            return <li key={index} onClick={() => { handleClick(props.clickEvent) }}>{e.label}</li>
          })}
        </ul>
      </div>
    )
  } else {
    return null
  }
}