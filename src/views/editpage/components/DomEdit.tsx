/*
 * @Author: 李航 864217697@qq.com
 * @Date: 2022-11-24 11:10:02
 * @LastEditors: 李航 864217697@qq.com
 * @LastEditTime: 2023-02-23 11:17:41
 * @FilePath: \AlxTm\src\views\editpage\components\DomEdit.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useEffect, useState } from "react";
import { modalDom } from "./setting";
import editStyleModal from "./EditStyleModal";
import ClickMenu from "./ClickMenu";
import { DefaultDom } from "./domItems/Domcomponents";
import { dragTargetDom } from "../../../public/auth";
import "./DomEdit.scss";

export default function DomEdit(props: any) {
    const [domList, changeList] = useState<any>([]);
    const [open, setOpen] = useState(false);
    const [clickEvent, setClickEvent] = useState({ open: false });
    const [menuHide, setMenuHide] = useState(false);
    const Model = editStyleModal;
    const { getDom } = props;
    const [svgHeight,setSvgHeight] = useState('100%')
    useEffect(() => {
        //动态计算svg高度
        let childNodes = document.getElementsByClassName('component_group')[0].childNodes as any
        if (childNodes[childNodes.length - 1]) {
            let { top, height } = childNodes[childNodes.length - 1].getBoundingClientRect()
            setSvgHeight(top + height + 40 + 'px')
        }
    })
    const myCom = (
        <div className="card_group">
            {modalDom.map((e: any, index: number) => {
                return (
                    <svg key={index}>
                        <rect
                            className="card"
                            onClick={() => {
                                handleClickCard(e);
                            }}
                            style={{ ...e.style }}
                        >
                        </rect>
                    </svg>
                );
            })}
        </div>
    );
    const handleClickCard = (item: Object) => {
        let copyList = [...domList];
        copyList.push(JSON.parse(JSON.stringify(item)));
        changeList(copyList);
    };
    const handleMouseDown = (event: any, data: any, index: number) => {
        document.oncontextmenu = function (e) {
            /*屏蔽浏览器默认右键事件*/
            e = e || window.event;
            return false;
        };
        if (event.buttons === 1) {
            dragTargetDom(event, data, (e: any) => {
                getDom(e, data);
            }, true);
        } else {
            handlerRight(event, index)//鼠标右键打开菜单
        }
    };
    const handlerRight = (event: any, index: number) => {
        setClickEvent({ ...event, open: true, index: index });
        document.onclick = () => {
            setClickEvent({ ...event, open: false });
        };
    };
    const handleMenuClick = (e: any) => {
        //右键菜单操作
        let arr = [...domList];
        arr.splice(e.index, 1);
        changeList(arr);
    };
    return (
        <div
            className={
                menuHide
                    ? "domedit_component domedit_component_hide"
                    : "domedit_component"
            }
        >
            <div
                className="hide_btn"
                onClick={() => {
                    menuHide ? setMenuHide(false) : setMenuHide(true);
                }}
            >
                +
            </div>
            <ClickMenu
                clickEvent={clickEvent}
                handleClick={(e: any) => {
                    handleMenuClick(e);
                }}
            />
            <Model
                component={myCom}
                open={open}
                handleClose={() => {
                    setOpen(false);
                }}
            />
            <div className="component_header">
                <span>Components</span>
                <span
                    onClick={() => {
                        setOpen(true);
                    }}
                >
                    +
                </span>
            </div>
            <div className="group_scroll">
            <svg className="component_group"  height={svgHeight}>
                {domList.map((e: any, index: number) => {
                    return (
                        <DefaultDom index={index} onMouseDown={(event: any) => {
                            handleMouseDown(event, e, index);
                        }}
                            className="dom_item" key={index} data={e} />
                    );
                })}
            </svg>
            </div>
        </div>
    );
}
