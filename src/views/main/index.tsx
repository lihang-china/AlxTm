import { Suspense, useState } from "react"
import { Menu } from 'antd';
import './index.scss'
import { MenuList } from '../../router/index'
import { Redirect, Route, Switch } from 'react-router-dom'
import { DropboxOutlined, DownSquareOutlined, UpSquareOutlined } from '@ant-design/icons'
/*
 * @Descriptin: 
 * @Version: 0.1
 * @Autor: Your Name
 * @Date: 2022-08-17 15:55:31
 * @LastEditors: Your Name
 * @LastEditTime: 2022-08-24 16:44:31
 */
import Changeuser from './components/ChangeUser'
export default function Main(props: any) {
  const [clickEvent, setOpen] = useState({ open: false })
  const defaultAvtive = props.history.location.pathname
  const handleOut = (e: any) => {
    props.history.push(e.path)
  }
  const handleClick = (e: any) => {
    setOpen({ ...e, open: !clickEvent.open })
  }
  return (
    <div className="main app-container">
      <Changeuser clickEvent={clickEvent} />
      <div className="main-menu">
        <div className="menu-header">
          <span onClick={handleClick}><DropboxOutlined className="header-icon" />Funct
            {clickEvent.open ? <UpSquareOutlined className="header-btn" /> : <DownSquareOutlined className="header-btn" />}</span>
          <span>Ant Design 2022-8-20</span>
          <span>web</span>
        </div>
        <Menu mode='vertical' selectedKeys={[defaultAvtive]} >
          {MenuList.map((e, index) => (
            <Menu.Item icon={e.icon} onClick={() => handleOut(e)} key={e.path}>{e.title}</Menu.Item>
          ))}
        </Menu>
      </div>
      <div className="main-container">
        <Suspense >
          <Switch >
            <Redirect exact from='/main' to="/main/index" />
            {
              MenuList.map((e, index) => (
                <Route key={index} path={e.path} component={e.component
                } />
              ))
            }
          </Switch>
        </Suspense>
      </div>
    </div>
  )
} 