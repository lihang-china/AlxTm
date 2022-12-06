/*
 * @Descriptin: 
 * @Version: 0.1
 * @Autor: Your Name
 * @Date: 2022-08-17 14:48:14
 * @LastEditors: Your Name
 * @LastEditTime: 2022-12-05 09:40:23
 */
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.scss';
import './assets/style/ant-design.scss'
import './assets/style/ant-design-black.scss'
import 'antd/dist/antd.min.css'
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/mode-json5"
// import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
// import store from './store/index'
// import { Provider } from 'react-redux'
moment.locale('zh-cn')
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <Provider store={store}> 
  <App />
  // </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
