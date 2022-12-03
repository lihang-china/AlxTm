/*
 * @Descriptin: 
 * @Version: 0.1
 * @Autor: Your Name
 * @Date: 2022-11-24 11:21:17
 * @LastEditors: Your Name
 * @LastEditTime: 2022-12-03 17:19:48
 */
const defaultDom = {
  title: '',
  id: '',
  color: '#fff',
  style: {
    width: '80%',
    maxWidth: '280px',
    height: '180px',
    background: 'rgba(19,203,203,0.5)',
    borderRadius: '6px',
    border: '1px solid rgb(19,203,203)',
    overflow: 'hidden',
    backdropFilter: 'saturate(100%) blur(10px)',
    title: {
      padding: '8px',
      color: '#fff',
      width: '100%',
      background: 'rgba(19,203,203,0.2)',
    }

  }
}
const modalDom = [{
  title: '模板一',
  id: '',
  tShow: true,
  color: '#fff',
  type: 'Button',
  style: {
    width: '80%',
    maxWidth: '280px',
    height: '180px',
    background: 'rgba(19,203,203,0.5)',
    borderRadius: '6px',
    border: '1px solid rgb(19,203,203)',
    overflow: 'hidden',
    backdropFilter: 'saturate(100%) blur(10px)',
    title: {
      padding: '8px',
      color: '#fff',
      width: '100%',
      background: 'rgba(19,203,203,0.2)',
    }

  }
},
{
  title: '模板二',
  id: '',
  color: '#fff',
  type: 'Text',
  tShow: true,
  style: {
    width: '80%',
    maxWidth: '280px',
    height: '180px',
    background: 'rgba(20,20,20,0.5)',
    borderRadius: '6px',
    border: '1px solid rgb(20,20,20)',
    overflow: 'hidden',
    backdropFilter: 'saturate(100%) blur(10px)',
    title: {
      padding: '8px',
      color: '#fff',
      width: '100%',
      background: 'rgba(80,80,80,0.2)',
    }
  }
},
{
  title: '模板三',
  id: '',
  color: '#fff',
  type: 'Text',
  tShow: true,
  style: {
    width: '80%',
    maxWidth: '280px',
    height: '180px',
    background: 'rgba(0,20,20,0.5)',
    borderRadius: '6px',
    border: '1px solid rgb(0,20,20)',
    overflow: 'hidden',
    backdropFilter: 'saturate(100%) blur(10px)',
    title: {
      padding: '8px',
      color: '#fff',
      width: '100%',
      background: 'rgba(80,80,80,0.2)',
    }
  }
},
{
  title: '模板四',
  id: '',
  color: '#fff',
  type: 'Text',
  style: {
    width: '80%',
    maxWidth: '280px',
    height: '180px',
    background: 'rgba(53,152,219,0.5)',
    borderRadius: '6px',
    border: '1px solid rgb(53,152,219)',
    overflow: 'hidden',
    backdropFilter: 'saturate(100%) blur(10px)',
    title: {
      padding: '8px',
      color: '#fff',
      width: '100%',
      background: 'rgba(53,152,219,0.2)',
    }

  }
},
{
  title: '模板五',
  id: '',
  color: '#fff',
  type: 'Text',
  style: {
    width: '80%',
    maxWidth: '280px',
    height: '180px',
    background: 'rgba(231,77,61,0.5)',
    borderRadius: '6px',
    border: '1px solid rgb(231,77,61)',
    overflow: 'hidden',
    backdropFilter: 'saturate(100%) blur(10px)',
    title: {
      padding: '8px',
      color: '#fff',
      width: '100%',
      background: 'rgba(231,77,61,0.2)',
    }

  }
},
{
  title: '模板六',
  id: '',
  color: '#fff',
  type: 'Text',
  style: {
    width: '80%',
    maxWidth: '280px',
    height: '180px',
    background: 'rgba(243,44,44,0.5)',
    borderRadius: '6px',
    border: '1px solid rgb(243,44,44)',
    overflow: 'hidden',
    backdropFilter: 'saturate(100%) blur(10px)',
    title: {
      padding: '8px',
      color: '#fff',
      width: '100%',
      background: 'rgba(243,44,44,0.2)',
    }

  }
}]
export { defaultDom, modalDom }