/*
 * @Descriptin: 
 * @Version: 0.1
 * @Autor: Your Name
 * @Date: 2023-01-06 14:05:48
 * @LastEditors: Your Name
 * @LastEditTime: 2023-01-06 16:25:24
 */
interface clientObject {
  top: number, height: number, width: number, bottom: number, right: number, left: number
}
//修改元素位置信息
const changeClient = (targetDom: HTMLElement, otherDom: HTMLElement) => {
  let targetDomClient: clientObject = targetDom.getBoundingClientRect()
  let otherDomClient: clientObject = otherDom.getBoundingClientRect()
  let keyList = ['top', 'left', 'bottom', 'right'] //上下左右边距
  let key, AbsNum, i = 0
  while (i <= keyList.length - 1) {
    key = keyList[i]
    AbsNum = Math.abs(targetDomClient[key as keyof clientObject] - otherDomClient[key as keyof clientObject])
    if (AbsNum <= 20) {
      if (key === 'right' || key === 'bottom') {
        key === 'right' ? targetDom.style.cssText += `left:${otherDomClient.right - targetDomClient.width}px` :
          targetDom.style.cssText += `top:${otherDomClient.bottom - targetDomClient.height}px`
      } else {
        targetDom.style.cssText += `${key}:${otherDomClient[key as keyof clientObject]}px`
      }
    }
    i++
  }
}
//元素拖拽,画布边界吸附
const dragTargetDom = (event: { pageY: number, pageX: number }, mainDom: HTMLElement, targetDom: HTMLElement, mouseClicent: Array<number>) => {
  //event：doument.onmousemove 事件。 mainDom：画布元素。 targetDom：目标元素。 mouseClicent:[y,x] 鼠标在元素上的位置
  targetDom.style.cssText += `top:${event.pageY - mouseClicent[0]}px;left:${event.pageX - mouseClicent[1]}px` //鼠标选中拖动元素
  changeClient(targetDom, mainDom)
}
//元素对齐
const alignDom = (mainDom: HTMLElement, targetDom: HTMLElement) => {
  if (mainDom.childNodes.length >= 1)
    //判断画布元素下的dom数量，大于等于1就执行
    mainDom.childNodes.forEach((e: any) => {
      changeClient(targetDom, e)
    })
}
export { dragTargetDom, alignDom }