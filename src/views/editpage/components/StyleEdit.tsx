/*
 * @Descriptin: 
 * @Version: 0.1
 * @Autor: Your Name
 * @Date: 2022-11-24 11:11:24
 * @LastEditors: Your Name
 * @LastEditTime: 2022-11-30 19:09:38
 */
import './StyleEdit.scss'
import { RightOutlined} from '@ant-design/icons';
import 'quill/dist/quill.snow.css';
import AceEditor from "react-ace";
import { useEffect, useState } from 'react';
export default function StyleEdit(props:any) {
const {handleClose} = props
const [areaValue,setAreaVal] = useState<string>()
useEffect(()=>{
  setAreaVal(JSON.stringify(JSON.parse(JSON.stringify(props.domData.style)), null, '\t')|| '')
},[props.domData])
const {handleChange} = props
  return (
    <div className="styleedit_conponent">
      <div className='styleedit_header'><span>Edit</span><span onClick={handleClose}><RightOutlined /></span></div>
      <div className='styleedit_main'>
      <AceEditor style={{width:'100%',height:'350px',borderRadius:'8px'}} mode="json5"
    theme="dracula"
    onChange={(e)=>{setAreaVal(e)}}
    onBlur={(e)=>{handleChange(JSON.parse(areaValue as ''))
    }}
    value={areaValue}
    setOptions={ {
      tabSize: 2,
      fontSize: 10,
      showPrintMargin: false,
      showLineNumbers:false}
        }
    
    />
            </div>
    </div>
  )
}