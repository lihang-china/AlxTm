import { lazy } from "react"

/*
 * @Descriptin: 
 * @Version: 0.1
 * @Autor: Your Name
 * @Date: 2022-08-19 14:13:06
 * @LastEditors: Your Name
 * @LastEditTime: 2022-08-20 10:32:16
 */
const MenuList = [
  {
    title: '首页',
    icon: '',
    path: '/main/index',
    component: lazy(() => import('../views/main/main'))
  },
      {
        title: '产品管理',
        icon: '',
        path: '/main/device',
        component: lazy(() => import('../views/device/index'))
      },
      {
        title: '设备管理',
        icon: '',
        path: '/main/product',
        component: lazy(() => import('../views/product/index'))
      }
    ]
export { MenuList }