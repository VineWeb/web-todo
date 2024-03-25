import React, { Component } from 'react';
class ClassCom extends Component {
  timer = 0;
  constructor (props: {} | Readonly<{}>) {
    super(props)
    this.state = {
      count: 0
    }
  }
  // 一. react 18
  /* 
   1. react 组件事件: 异步更新 + 合并 state
  */
  increment = () => {
    this.setState({
      count: this.state.count + 1
    })
    this.setState({
      count: this.state.count + 1
    })
    this.setState({
      count: this.state.count + 1
    })
    console.log(this.state.count, 'count')
  }
  timerIncrement = () => {
    /* 
      3. setTimeout 定时器: 异步更新 + 合并 state
    */
    this.timer = setTimeout(() => {
      this.setState({
        count: this.state.count + 1
      })
      this.setState({
        count: this.state.count + 1
      })
      this.setState({
        count: this.state.count + 1
      })
    })
    console.log(this.state.count, 'count')
 
  }
  onBtnClick = () => {
    this.setState({
      count: this.state.count + 1
    })
    this.setState({
      count: this.state.count + 1
    })
    this.setState({
      count: this.state.count + 1
    })
    console.log(this.state.count, 'count')
  }
  componentDidMount() {
      /* 
       2 . react 组件事件: 异步更新 + 合并 state
      */
    document.getElementById('btn')?.addEventListener('click', this.onBtnClick)
  }

  // 卸载时候要解绑自定义事件, 定时器等...
  componentWillUnmount() {
    document.getElementById('btn')?.removeEventListener('click', this.onBtnClick)
    clearTimeout(this.timer)
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log(prevProps, prevState, 'getSnapshotBeforeUpdate')
    return {name: '附加值'}
  }
  
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(prevProps, prevState, snapshot, 'componentDidUpdate')
  }


  render () {
    return (
      <>
        <p>类组件</p>
        Count: <span>{this.state.count}</span>
        <button style={{width: '80px'}} onClick={this.increment}>组件事件点我+1</button>
        <button style={{width: '80px'}} onClick={this.timerIncrement}>定时器点我+1</button>
        <button style={{width: '80px'}} id='btn'>DOM事件点我+1</button>
      </>
    )
  }
}

export default ClassCom;