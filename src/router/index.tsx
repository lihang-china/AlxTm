import { lazy } from "react"

/*
 * @Descriptin: 
 * @Version: 0.1
 * @Autor: Your Name
 * @Date: 2022-08-19 14:13:06
 * @LastEditors: Your Name
 * @LastEditTime: 2022-09-07 13:24:59
 */
import { AppstoreAddOutlined, BarsOutlined,ConsoleSqlOutlined } from '@ant-design/icons'
const MenuList = [
  {
    title: '首页',
    name:'首页',
    icon: <BarsOutlined />,
    path: '/main/index',
    component: lazy(() => import('../views/main/main'))
  },
  {
    title: '设备管理',
    icon: <ConsoleSqlOutlined />,
    path: '/main/device',
    component: lazy(() => import('../views/device/index'))
  },
  {
    title: '产品管理',
    icon: <AppstoreAddOutlined />,
    path: '/main/product',
    component: lazy(() => import('../views/product/index'))
  }
]
export { MenuList }