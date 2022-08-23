
/*
 * @Descriptin: 
 * @Version: 0.1
 * @Autor: Your Name
 * @Date: 2022-08-23 18:27:35
 * @LastEditors: Your Name
 * @LastEditTime: 2022-08-23 19:21:54
 */
import { Button } from 'antd'
import './changeuser.scss'
export default function Changeuser(props: { clickEvent: any }) {
  if (props.clickEvent.open) {
    return (
      <div className="changeuser-components" style={{ left: props.clickEvent.clientX - 100 + 'px', top: props.clickEvent.clientY + 30 + 'px' }}>
        <img src={require('../../../assets/img/logo.png')} alt="" />
        <span>还未登录请登录账号</span>
        <Button shape="circle" type='primary'>登录账号</Button>
      </div>
    )
  } else {
    return null
  }

}