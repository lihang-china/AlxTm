/*
 * @Descriptin:
 * @Version: 0.1
 * @Autor: Your Name
 * @Date: 2022-11-29 16:49:44
 * @LastEditors: 李航 864217697@qq.com
 * @LastEditTime: 2023-02-22 20:03:21
 */
//模板组件
import {Button} from "antd";
import {Gradient} from "../../../../echarts/defaultCharts";
import {useEffect} from "react";

interface domtemplate {
    data: {
        type: string
    }
}

interface key {
}

export default function DomTemplate(props: domtemplate) {
    useEffect(() => {
        if (props.data.type === 'Card') {
            Gradient('.charts')
        }
    }, [props.data])
    const template = {
        Text: <div><p>Lihang</p><p>测试模板文字</p><p>{String(new Date())}</p></div>,
        Card: <div className='charts' style={{width: '100%', height: '100%'}}></div>,
        Button: <Button>按钮</Button>
    }
    return (
        template[props.data.type as keyof key]
    )
}
