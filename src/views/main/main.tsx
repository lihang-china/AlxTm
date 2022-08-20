/*
 * @Descriptin: 
 * @Version: 0.1
 * @Autor: Your Name
 * @Date: 2022-08-20 10:31:16
 * @LastEditors: Your Name
 * @LastEditTime: 2022-08-20 13:50:01
 */
// import '../../assets/mp4/work.mp4'
import './main.scss'
import { Input, Row, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons'
export default function MainContainer() {
  const navList = ['帮助中心', '百度一下', '相关工具']
  return (
    <div className="main-container">
      <div className="container-banner">
        <div className='banner-control'>
          <Row >  Funct Ant Design</Row>
          <Row>企业级的中后台设计系统解决方案</Row>
          <Row><Button type='primary' size="large">说明文档</Button><Button size="large">设计模式</Button></Row>
        </div>
        <div className="banner-header">
          <Input style={{ width: '400px' }} bordered={false} placeholder='请输入文档名称' prefix={<SearchOutlined style={{ color: 'rgb(200,200,200)' }} />} />
          <ul>{navList.map(e => (<li key={e}>{e}</li>))}
          </ul>
        </div>
        <video className='banner-video' src={require('../../assets/mp4/work.mp4')} autoPlay={true} loop muted={true}></video>
      </div>
      <div className="contaienr-footer">
        <div className="footer-left">
          <ul><li>AlxTM Funct</li><li>更聪明的工作，让效率突飞猛进</li><li>Work smarter, as easy as blowing off dust</li></ul>
        </div>
        <div className="footer-right">
        </div>
      </div>
    </div>
  )
}