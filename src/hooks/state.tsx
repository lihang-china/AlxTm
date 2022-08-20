/*
 * @Descriptin: 
 * @Version: 0.1
 * @Autor: Your Name
 * @Date: 2022-08-20 16:13:36
 * @LastEditors: Your Name
 * @LastEditTime: 2022-08-20 16:42:35
 */
import { useEffect, useState } from "react"
const Info = { menuVal: '', userInfo: {} }
const useSysInfo = (props: any) => {
  let [SYS_INFO, setSysInfo] = useState(Info)
  useEffect(() => {
    console.log(SYS_INFO);
    setSysInfo({ ...SYS_INFO, ...props })
  })
  return SYS_INFO
}
export {
  useSysInfo
}