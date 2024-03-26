import React from 'react';
import './index.scss'
class EventCom extends React.Component {
  constructor (props: {} | Readonly<{}>) {
    super(props)
    this.parentRef = React.createRef()
    this.childrenRef = React.createRef()
  }
  handleParent = () => {
    console.log('React事件, 父元素的点击')
  }
  handleChildren = () => {
    console.log('React事件, 子元素的点击')
  }
  render () {
    return (
      <div className='parent' ref={this.parentRef} onClick={this.handleParent}>
        父元素
        <div className='children' ref={this.childrenRef} onClick={this.handleChildren}>
          子元素
          事件的执行顺序
        </div>
      </div>
    )
  }

  componentDidMount () {
    this.parentRef.current.addEventListener('click', () => {
      console.log('dom 元素 父元素的点击')
    })
    this.childrenRef.current.addEventListener('click', () => {
      console.log('dom 元素 子元素的点击')
    })

    document.addEventListener('click', () => {
      console.log('dom 元素的点击')
    })
    document.body.addEventListener('click', () => {
      console.log('dom body 元素的点击')
    })
  }
}

export default EventCom;