
/*
 * @Descriptin: 
 * @Version: 0.1
 * @Autor: Your Name
 * @Date: 2022-08-23 18:27:35
 * @LastEditors: Your Name
 * @LastEditTime: 2022-08-24 16:41:43
 */
import { Button } from 'antd'
import { useEffect, useState } from 'react'
import './changeuser.scss'
export default function Changeuser(props: { clickEvent: any }) {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    setOpen(props.clickEvent.open)
  }, [props.clickEvent.open])
  if (open) {
    return (
      <div className={['changeuser-components', props.clickEvent.open ? ' fadeIn' : ' fadeOut'].join(' ')} style={{ left: props.clickEvent.clientX - 100 + 'px', top: props.clickEvent.clientY + 30 + 'px' }}>
        <img src={require('../../../assets/img/logo.png')} alt="" />
        <span>还未登录请登录账号</span>
        <Button shape="circle" type='primary'>登录账号</Button>
      </div>
    )
  } else {
    return null
  }
}