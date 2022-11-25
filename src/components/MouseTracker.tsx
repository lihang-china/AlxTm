/*
 * @Descriptin: 
 * @Version: 0.1
 * @Autor: Your Name
 * @Date: 2022-08-18 14:57:01
 * @LastEditors: Your Name
 * @LastEditTime: 2022-11-25 10:30:09
 */
import React from "react";
interface MouseTracker {
  props: {
    render: any
  }
}
class MouseTracker extends React.Component {
  state = {
    x: 0,
    y: 0
  }
  handleMouseMove = (e: any) => {
    this.setState({
      x: e.clientX,
      y: e.clientY
    })
  }
  render(): React.ReactNode {
    return (
      <div style={{ height: '100%', width: '100%' }} onMouseMove={this.handleMouseMove}>
      </div>
    )
  }
}
export default MouseTracker