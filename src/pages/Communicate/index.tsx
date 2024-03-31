// ParentCom.tsx
/*
import React from "react";
function ChildrenCom (props: any) {
  console.log(props)
  return (
    <div>{props.name}</div>
  )
}
function ParentCom () {
  return (
    <>
      <div>父元素</div>
      <ChildrenCom name="父元素传递过来的值" />
    </>
  )
}

export default ParentCom
 */


import React from 'react';
class ChildrenCom extends React.Component {
  constructor (props: { getName: () => void }) {
    super(props)
  }
  getName = (name: string) => {
    console.log(name, 'name')
    this.props.getName(name)
  }
  render () {
    return (
      <>
      <button onClick={() => this.getName('张三')}>点我传值张三</button>
      <button onClick={() => this.getName('李四')}>点我传值李四</button>
      </>
    )
  }
}
class ParentCom extends React.Component{
  constructor (props: {} | Readonly<{}>) {
    super(props)
    this.state = {
      childName: '父组件默认值'
    }
  }
  getChildName = (name: any) => {
    console.log(name, 'getChildName')
    this.setState({
      childName: name
    })
  }
  render () {
    return (
      <>
      <div>父组件元素</div>
      <div>子组件传递的元素{this.state.childName}</div>
      <ChildrenCom getName={this.getChildName} /></>
    )
  }
}

export default ParentCom