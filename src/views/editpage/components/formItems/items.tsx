/*
 * @Descriptin: 
 * @Version: 0.1
 * @Autor: Your Name
 * @Date: 2022-12-02 14:50:19
 * @LastEditors: Your Name
 * @LastEditTime: 2022-12-02 16:57:32
 */
import './items.scss'
import { Select, Input, InputNumber } from 'antd'
import { SketchPicker } from 'react-color'
interface ItemsType { }
export const Items = (props: any) => {
  const options = [
    {
      value: 'solid',
      label: '实线',
    }, {
      value: '1',
      label: '虚线',
    },
  ]
  const itmeData = {
    input: <Input />,
    color: <SketchPicker />,
    inputNumber: <InputNumber formatter={value => value ? `${value}px` : ""} parser={value => value!.replace('px', '')} />,
    border: <div><Input.Group compact> <div className='color_btn'></div> <Input bordered={false}></Input> </Input.Group>
      <div className='input_group'>  <InputNumber formatter={value => value ? `${value}px` : ""} parser={value => value!.replace('px', '')} /><Select options={options}></Select>  </div>
    </div>
  }
  return props.type ? itmeData[props.type as keyof ItemsType] : null
}