/*
 * @Descriptin: 
 * @Version: 0.1
 * @Autor: Your Name
 * @Date: 2022-11-24 11:11:24
 * @LastEditors: Your Name
 * @LastEditTime: 2022-12-06 13:55:09
 */
import './StyleEdit.scss'
import { RightOutlined, ColumnHeightOutlined, ColumnWidthOutlined, BorderOuterOutlined, RadiusUpleftOutlined } from '@ant-design/icons';
import 'quill/dist/quill.snow.css';
import AceEditor from "react-ace";
import { useEffect, useState } from 'react';
import { Form } from 'antd'
import { Items } from './formItems/items';
export default function StyleEdit(props: any) {
  const { handleClose } = props
  const [areaValue, setAreaVal] = useState<string>()
  const [formData, setFormData] = useState(JSON.parse(JSON.stringify(props.domData)))
  useEffect(() => {
    setFormData(JSON.parse(JSON.stringify(props.domData)))
    setAreaVal(JSON.stringify(JSON.parse(JSON.stringify(props.domData.style)), null, '\t') || '')
  }, [props.domData])
  const { handleChange } = props
  //表单item元素数据
  const itemList = [{ label: '长度', type: 'inputNumber', icon: <ColumnWidthOutlined />, value: "width" },
  { label: '高度', type: 'inputNumber', icon: <ColumnHeightOutlined />, value: "height" },
  { label: '边框', type: 'border', icon: <BorderOuterOutlined />, value: "border" },
  { label: '圆角', type: 'inputNumber', icon: <RadiusUpleftOutlined />, value: "borderRadius" },
  { label: '背景颜色', type: 'color', value: "background" }]
  const getDomdata = (data: any) => {
    handleChange(data.style)
  }
  return (
    <div className="styleedit_conponent">
      <div className='styleedit_header'><span>Edit</span><span onClick={handleClose}><RightOutlined /></span></div>
      <div className='styleedit_main'>
        <Form layout="vertical">
          {
            itemList.map((e, index) => {
              return (
                <Form.Item key={index} labelAlign="left" label={e.label}>
                  <Items getDomdata={getDomdata} itemData={formData} type={e.type} icon={e.icon} value={e.value} />
                </Form.Item>
              )
            })
          }
        </Form>
        <AceEditor style={{ width: '100%', height: '350px', borderRadius: '8px' }} mode="json5"
          theme="dracula"
          onChange={(e) => {
            setAreaVal(e)
          }}
          onBlur={(e) => {
            handleChange(JSON.parse(areaValue as ''))
          }}
          value={areaValue}
          setOptions={{
            tabSize: 2,
            fontSize: 10,
            showPrintMargin: false,
            showLineNumbers: false
          }
          }
        />
      </div>
    </div>
  )
}