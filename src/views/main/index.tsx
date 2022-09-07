import { Suspense, useState } from "react"
import { Menu } from 'antd';
import './index.scss'
import { MenuList } from '../../router/index'
import { Redirect, Route, Switch } from 'react-router-dom'
import { DropboxOutlined, DownSquareOutlined, UpSquareOutlined } from '@ant-design/icons'
import { Input, Button } from 'antd';
import { SearchOutlined, UserSwitchOutlined } from '@ant-design/icons'
/*
 * @Descriptin: 
 * @Version: 0.1
 * @Autor: Your Name
 * @Date: 2022-08-17 15:55:31
 * @LastEditors: Your Name
 * @LastEditTime: 2022-09-07 19:11:18
 */
import Changeuser from './components/ChangeUser'
export default function Main(props: any) {
  const navList = ['帮助中心', '百度一下', '相关工具']
  const [clickEvent, setOpen] = useState({ open: false })
  const defaultAvtive = props.history.location.pathname
  const [status, setStatus] = useState('default')
  const [loading, setLoading] = useState(false)
  const handleOut = (e: any) => {
    props.history.push(e.key)
  }
  const handleClick = (e: any) => {
    setOpen({ ...e, open: !clickEvent.open })
  }
  interface items {
    label: React.ReactNode,
    key: React.Key,
    icon: React.ReactNode
  }
  const items: items[] = []
  MenuList.forEach(e => {
    items.push({
      label: e.title,
      key: e.path,
      icon: e.icon
    })
  })
  const moudelChange = () => {
    setLoading(true)
    setTimeout(() => {
      status === 'default' ? setStatus('black') : setStatus('default')
      setLoading(false)
    }, 3000)

  }
  return (
    <div className={status === 'default' ? 'main app-container moudel-default' : status === 'black' ? 'main app-container moudel-black' : ''} >
      {loading ? <div className="status-loading" style={status === 'default'? { background: 'rgb(20,20,20)' } : { background: 'rgb(250,250,250)' }}></div> : ''}
      <Changeuser clickEvent={clickEvent} />
      <div className="main-menu">
        <div className="menu-header">
          <span onClick={handleClick}><DropboxOutlined className="header-icon" />Funct
            {clickEvent.open ? <UpSquareOutlined className="header-btn" /> : <DownSquareOutlined className="header-btn" />}</span>
          <span>Ant Design 2022-8-20</span>
          <span>web</span>
        </div>
        <Menu mode='vertical' onClick={handleOut} items={items} selectedKeys={[defaultAvtive]} />
      </div>
      <div className="main-container">
        <div className="banner-header" style={props.location.pathname !== '/main/index' ? { borderBottom: '1px solid rgba(240, 240, 240, 0.5)' } : {}}>
          <div className="change-moudel">
            <span onClick={moudelChange} style={status === 'default' ? { background: 'rgb(0,0,0)', color: 'rgb(255,255,255)' } : { background: 'rgb(255,255,255)', color: 'rgb(0,0,0)' }}>{status === 'default' ? '暗夜' : '默认'}</span>
          </div>
          <Input style={{ width: '400px' }} bordered={false} placeholder='请输入文档名称' prefix={<SearchOutlined style={{ color: 'rgb(200,200,200)' }} />} />
          <ul>{navList.map(e => (<li key={e}>{e}</li>))}
            <li onClick={() => props.history.push('/gis')}><UserSwitchOutlined /></li>
          </ul>
        </div>
        <div className="router-page" style={props.location.pathname !== '/main/index' ? { overflow: 'auto' } : {}}>
          <Suspense >
            <Switch>
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
    </div>
  )
} 