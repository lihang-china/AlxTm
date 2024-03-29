/*
 * @Descriptin:
 * @Version: 0.1
 * @Autor: Your Name
 * @Date: 2022-12-02 14:50:19
 * @LastEditors: Your Name
 * @LastEditTime: 2022-12-27 13:28:54
 */
import './items.scss'
import {Select, Input, InputNumber} from 'antd'
import {DashOutlined, MinusOutlined} from '@ant-design/icons'
import {SketchPicker} from 'react-color'
import {useEffect, useState} from 'react'

interface ItemsType {
}

export const Items = (props: any) => {
    const domStyle = JSON.parse(JSON.stringify(props.itemData.style))
    const [mValue, setValue] = useState<string>(domStyle[props.data.value])
    const valTypeList = [{label: "百分比", value: '%'}, {label: "像素值", value: 'px'}]
    const [valType, setValueType] = useState<string>()
    const [broderData, setborderData] = useState({size: '', type: '', color: ''})
    useEffect(() => {
        let obj = valTypeList.find((e: any) => domStyle[props.data.value].includes(e.value))
        setValueType(obj?.value)
        let value = domStyle[props.data.value]
        if (props.data.type === 'inputNumber') {
            setValue(value?.includes('%') ? value.split('%')[0] : value?.includes('px') ? value.split('px')[0] : value) //根据像素百分比返回不同类型
        } else {
            if (props.data.type === 'border') {
                let obj: any = {}
                obj.size = domStyle[props.data.width]
                obj.type = domStyle[props.data.status]
                obj.color = domStyle[props.data.value]
                setborderData({...obj})
            }
        }
    }, [props.itemData])//eslint-disable-line
    useEffect(() => {
        setData()
    }, [mValue, valType])//eslint-disable-line
    const options = [
        {
            value: '0,0',
            label: '实线',
            icon: <MinusOutlined/>
        }, {
            value: '4,4',
            label: '虚线',
            icon: <DashOutlined/>
        },
    ]
    const {getDomdata} = props
    const setData = () => {
        let domData: any = {}
        if (props.data.type === 'inputNumber') {
            domData = JSON.parse(JSON.stringify(props.itemData))
            domData.style[props.data.value] = mValue + (valType ? valType : '')
            getDomdata(domData)
        }
    }
    const formatter = (value: any) => {
        return value?.includes('%') ? value.split('%')[0] : value?.includes('px') ? value.split('px')[0] : value
    }
    const parser = (value: any) => {
        return value?.includes('%') ? value.split('%')[0] : value?.includes('px') ? value.split('px')[0] : value
    }
    const handleChange = (e: any) => {
        if (!e) {
            setValue('0')
        } else {
            setValue(e)
        }
    }
    const bgChange = (val: any) => {
        //更新背景色、dom数据
        let rgba = `rgba(${val.rgb.r},${val.rgb.g},${val.rgb.b},${val.rgb.a ? val.rgb.a : 1})`
        let data = JSON.parse(JSON.stringify(props.itemData))
        data.style.fill = rgba
        setValue(rgba)
        getDomdata(data)
    }
    const boderChange = (e: any, str: string) => {
        //更新border数据
        let obj = JSON.parse(JSON.stringify(broderData))
        obj[str] = e
        // setborderData({...obj})
        let data = JSON.parse(JSON.stringify(props.itemData))
        data.style[props.data.width] = obj.size
        data.style[props.data.value] = obj.color
        data.style[props.data.status] = obj.type
        getDomdata(data)
    }
    const itmeData = {
        input: <Input/>,
        color: <SketchPicker color={mValue} onChange={bgChange}/>,
        inputNumber: <div className='number_groupd'><InputNumber min={0}
                                                                 onChange={handleChange} formatter={formatter}
                                                                 parser={parser} stringMode value={mValue}
                                                                 prefix={props.icon}/> <Select onChange={(val) => {
            setValueType(val)
        }} bordered={false} className='my_select' value={valType} defaultValue={'px'}>
            {valTypeList.map(e => {
                return <Select.Option key={e.value} value={e.value}>
                    <div className='color_border_options'><span style={{fontSize: '14px'}}>{e.value}</span><span
                        style={{color: 'rgb(170,170,170)', marginLeft: '4px', fontSize: '8px'}}>{e.label}</span></div>
                </Select.Option>
            })}
        </Select>
        </div>,
        border: <div><Input.Group compact>
            <div className='color_btn' style={{background: broderData.color}}></div>
            <Input onChange={(e) => {
                boderChange(e.target.value, 'color')
            }} value={broderData.color} bordered={false}></Input> </Input.Group>
            <div className='input_group'><InputNumber onChange={(e) => {
                boderChange(e, 'size')
            }} value={broderData.size}/><Select onChange={(e) => {
                boderChange(e, 'type')
            }} value={broderData.type}> {options.map(e => {
                return <Select.Option key={e.value} value={e.value}>
                    <div className='color_border_options'><span
                        className='icon_border'>{e.icon}</span><span>{e.label}</span></div>
                </Select.Option>
            })} </Select></div>
        </div>
    }
    return props.data.type && props.data.value ? itmeData[props.data.type as keyof ItemsType] : null
}
