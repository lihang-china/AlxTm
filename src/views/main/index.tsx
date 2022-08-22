import React, { Suspense, useEffect, useState } from "react"
import { Menu } from 'antd';
import './index.scss'
import { MenuList } from '../../router/index'
import { Redirect, Route, Switch } from 'react-router-dom'
import { DropboxOutlined, DownSquareOutlined } from '@ant-design/icons'
/*
 * @Descriptin: 
 * @Version: 0.1
 * @Autor: Your Name
 * @Date: 2022-08-17 15:55:31
 * @LastEditors: Your Name
 * @LastEditTime: 2022-08-22 10:26:49
 */
export default function Main(props: any) {
  const defaultAvtive = props.history.location.pathname
  const handleClick = (e: any) => {
    props.history.push(e.path)
  }
  return (
    <div className="main app-container">
      <div className="main-menu">
        <div className="menu-header">
          <span><DropboxOutlined className="header-icon" />Funct <DownSquareOutlined className="header-btn" /></span>
          <span>Ant Design 2022-8-20</span>
          <span>web</span>
        </div>
        <Menu mode='vertical' selectedKeys={[defaultAvtive]} >
          {MenuList.map((e, index) => (
            <Menu.Item icon={e.icon} onClick={() => handleClick(e)} key={e.path}>{e.title}</Menu.Item>
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