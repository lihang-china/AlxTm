/*
 * @Descriptin: 
 * @Version: 0.1
 * @Autor: Your Name
 * @Date: 2022-08-20 10:31:16
 * @LastEditors: Your Name
 * @LastEditTime: 2022-09-07 15:44:38
 */
// import '../../assets/mp4/work.mp4'
import { imgGroup } from './common';
import './main.scss'
import { Row, Button } from 'antd';
import { useEffect } from 'react';
export default function MainContainer(props: any) {
  useEffect(() => {
    document.querySelector('.main-container')!.addEventListener('scroll', (e => listenerScroll(e)))
  }, [])
  const listenerScroll = (e: any) => {
    document.querySelectorAll('#img-group').forEach((t: any) => {
      if (t.offsetTop - e.target.scrollTop < 900) {
        t.src = require('../../assets/img/' + t.getAttribute('data-src'))
        t.className = 'img-ani'
      }
    })
  }
  return (
    <div className="main-container">
      <div className="container-banner">
        <div className='banner-control'>
          <Row >Funct Ant Design</Row>
          <Row>企业级的中后台设计系统解决方案</Row>
          <Row><Button type='primary' size="large">说明文档</Button><Button size="large">设计模式</Button></Row>
        </div>
        <video className='banner-video' src={require('../../assets/mp4/work.mp4')} autoPlay={true} loop muted={true}></video>
      </div>
      <div className="container-body">
        <h1>关于我们</h1>
        <ul>
          {
            imgGroup.map((e, index) => (
              <li key={index}>
                <div className='body-textartea'>
                  <h1>{e.title}</h1>
                  <span>{e.text}</span>
                </div>
                <img id='img-group' src='' data-src={e.img} /></li>
            ))
          }
        </ul>
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