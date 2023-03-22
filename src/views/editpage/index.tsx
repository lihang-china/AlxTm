import "./style/index.scss";
import DomEdit from "./components/DomEdit";
import StyleEdit from "./components/StyleEdit";
import {useState, useRef} from "react";
import {DefaultDom} from "./components/domItems/Domcomponents";
import {EyeOutlined, CheckOutlined} from "@ant-design/icons";
import {dragTargetDom} from "../../public/auth";
// import { useHistory } from 'react-router-dom'
export default function EditPage() {
    // const history = useHistory()
    const buttonList = [
        {label: "查看", icon: <EyeOutlined/>},
        {label: "保存", icon: <CheckOutlined/>},
    ];
    const [domList, setDomList] = useState<any>([]);
    const dataList = useRef<any>([]); //解决鼠标事件嵌套导致hook的闭包问题，确保数据唯一性
    const [open, setOpen] = useState(false);
    const [domIndex, setDomindex] = useState<number>();
    dataList.current = domList
    const getDom = (dom: any, data: { style: object }) => {
        //拷贝dom数据信息，更新数据列表
        let arr = [...dataList.current];
        let copyData = {...data};
        copyData.style = {
            ...copyData.style,
            transform: dom.style.transform,
        };
        arr.push(copyData);
        setDomList(JSON.parse(JSON.stringify(arr)));
    };
    const handleMouseDown = (event: any, data: any, index: number) => {
        if (event.buttons === 1) {
            dragTargetDom(event, data, (dom: any) => {
                let arr = [...dataList.current];
                arr[index].style = {
                    ...arr[index].style,
                    transform: dom.style.transform
                }
                setDomList(JSON.parse(JSON.stringify(arr)));
            }, false);
        } else {
            setDomindex(index)
            //鼠标右键事件
            setOpen(true)
        }
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleChange = (e: object) => {
        //同步编辑栏抛出的对象信息
        let arr = [...domList];
        arr[domIndex as 0].style = e;
        setDomList(JSON.parse(JSON.stringify(arr)));
    };
    const handleSaveBtn = () => {
        localStorage.setItem("DomList", JSON.stringify(dataList.current));
        // history.push({ pathname: '/visual' })
        window.open(`${window.location.origin}/#/visual`);
    };
    return (
        <div className="edit_container">
            <div className="button_list">
                {buttonList.map((e, index) => {
                    return (
                        <div onClick={handleSaveBtn} key={index} className="button_save">
                            {e.icon}
                        </div>
                    )
                })}
            </div>
            <DomEdit
                getDom={(dom: any, data: { style: object }) => {
                    getDom(dom, data);
                }}
            />
            <svg className="edit_main" width={"100%"} height={"100%"}>
                {
                    dataList.current.map((e: { title: String | '', style: any }, index: number) => {
                        return (
                            <DefaultDom  onMouseDown={(event: any) => {
                                handleMouseDown(event, e, index);
                            }} active={index === domIndex ? true : false} id={'main_dom' + String(index)} key={index}
                                        data={e}/>
                        )
                    })
                }
            </svg>
            {open ?
                <StyleEdit
                    handleChange={(e: object) => {
                        handleChange(e);
                    }}
                    handleClose={handleClose}
                    domData={dataList.current[domIndex as 0]}
                />
                : null}
        </div>
    );
}
