/*
 * @Descriptin: 
 * @Version: 0.1
 * @Autor: Your Name
 * @Date: 2022-11-25 09:37:17
 * @LastEditors: Your Name
 * @LastEditTime: 2022-11-25 11:08:34
 */
import { Modal } from 'antd'
import { useEffect, useRef, useState } from 'react'
export default function EditStyleModal(props: { open: boolean, handleClose: Function, component: any }) {
  const [open, setOpen] = useState(props.open)
  const { handleClose } = props
  const { component } = props
  useEffect(() => {
    setOpen(props.open)
  }, [props.open])
  return (
    <div style={{ color: "#FFF" }}>
      <Modal width={'40%'} className='myModal' title="默认外观" onCancel={() => { handleClose(false) }} visible={open} footer={null}>
        {component}
      </Modal>
    </div>
  )
}