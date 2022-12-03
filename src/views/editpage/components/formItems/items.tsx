/*
 * @Descriptin: 
 * @Version: 0.1
 * @Autor: Your Name
 * @Date: 2022-12-02 14:50:19
 * @LastEditors: Your Name
 * @LastEditTime: 2022-12-03 17:15:44
 */
import './items.scss'
import { Select, Input, InputNumber } from 'antd'
import { DashOutlined, MinusOutlined } from '@ant-design/icons'
import { SketchPicker } from 'react-color'
import { useEffect, useState } from 'react'
interface ItemsType { }
export const Items = (props: any) => {
  const [mValue, setValue] = useState<string>(JSON.parse(JSON.stringify(props.itemData.style[props.value])))
  const valTypeList = [{ label: "百分比", value: '%' }, { label: "像素值", value: 'px' }]
  const [valType, setValueType] = useState<string>()
  useEffect(() => {
    let obj = valTypeList.find(e => {
      if (props.itemData.style[props.value].includes(e.value)) {
        return e
      }
    })
    setValueType(obj?.value)
    let value = props.itemData.style[props.value]
    if (props.type === 'inputNumber') {
      setValue(value?.includes('%') ? value.split('%')[0] : value?.includes('px') ? value.split('px')[0] : value)
    } else {
      setValue(value)
    }

  }, [props.itemData])
  const options = [
    {
      value: 'solid',
      label: '实线',
      icon: <MinusOutlined />
    }, {
      value: '1',
      label: '虚线',
      icon: <DashOutlined />
    },
  ]
  const formatter = (value: any) => {
    return value?.includes('%') ? value.split('%')[0] : value?.includes('px') ? value.split('px')[0] : value
  }
  const parser = (value: any) => {
    return value?.includes('%') ? value.split('%')[0] : value?.includes('px') ? value.split('px')[0] : value
  }
  const handleChange = (e: any) => {
    setValue(e)
  }

  const itmeData = {
    input: <Input />,
    color: <SketchPicker color={mValue} />,
    inputNumber: <div className='number_groupd'><InputNumber
      onChange={handleChange} formatter={formatter} parser={parser} stringMode value={mValue}
      prefix={props.icon} /> <Select onChange={(val) => { setValueType(val) }} bordered={false} className='my_select' value={valType} defaultValue={'px'} >
        {valTypeList.map(e => {
          return <Select.Option key={e.value} value={e.value}><div className='color_border_options'><span style={{ fontSize: '14px' }}>{e.value}</span><span style={{ color: 'rgb(170,170,170)', marginLeft: '4px', fontSize: '8px' }}>{e.label}</span></div> </Select.Option>
        })}
      </Select>
    </div>,
    border: <div><Input.Group compact> <div className='color_btn' style={{ background: mValue.split(' ')[2] }}></div> <Input defaultValue={mValue.split(' ')[2]} bordered={false}></Input> </Input.Group>
      <div className='input_group'>  <InputNumber value={mValue.split(' ')[0]} /><Select value={mValue.split(' ')[1]}> {options.map(e => {
        return <Select.Option key={e.value} value={e.value}><div className='color_border_options'><span className='icon_border'>{e.icon}</span><span>{e.label}</span></div> </Select.Option>
      })} </Select>  </div>
    </div>
  }
  return props.type && props.value ? itmeData[props.type as keyof ItemsType] : null
}