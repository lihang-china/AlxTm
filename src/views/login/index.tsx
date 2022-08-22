/*
 * @Descriptin: 
 * @Version: 0.1
 * @Autor: Your Name
 * @Date: 2022-08-17 15:32:50
 * @LastEditors: Your Name
 * @LastEditTime: 2022-08-22 09:17:19
 */
import { Button, Form, Input } from 'antd';
import qs from 'qs';
import { useState } from 'react';
import { useHistory } from 'react-router-dom'
// import { useSysInfo } from '../../hooks/state'
import './index.scss'
export default function Login() {

  const history = useHistory()
  const [form, setFrom] = useState({ name: '', password: '' })

  const formItemLayout = {
    labelCol: {
      sm: { span: 4 },
    }
  };
  const handleSubmit = (props: any) => {
    if (form.name === 'lihang' && form.password === '123') {
      history.push({ pathname: '/main', search: qs.stringify({ id: 1, type: 'edit' }), })
    }
  }
  const handleChange = (e: React.FormEvent) => {
    setFrom({ ...form, [(e.target as HTMLInputElement | HTMLSelectElement).name]: (e.target as HTMLInputElement).value })
  }
  // useSysInfo(form)wo
  return (
    <div className='login app-container' >
      <span className='login-title'>AXXLXXHXX</span>
      <span className='login-title'>TEMPLATE</span>
      <Form className='login-form' {...formItemLayout} onChange={handleChange}>
        <Form.Item><h1>登录</h1></Form.Item>
        <Form.Item label="用户名">
          <Input placeholder='请输入用户名' name='name' value={form.name}></Input>
        </Form.Item>
        <Form.Item label="密码">
          <Input.Password placeholder='请输入密码' name='password' value={form.password}></Input.Password>
        </Form.Item>
        <Form.Item>
          <Button type='primary' onClick={handleSubmit}>登 录</Button>
        </Form.Item>
      </Form >
    </div >
  )
}


