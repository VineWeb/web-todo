// ParentCom.tsx
// import './index.scss'
import React from 'react';
import { Button } from "antd"
;
class BrotherCom1 extends React.Component {
  constructor (props: { count: number }) {
    super(props)
  }
  render () {
    return (
      <>
        <p className='p'>组件1读取值{this.props.count}</p>
      </>
    )
  }
}
class BrotherCom2 extends React.Component {
  constructor (props: { increment : () => void, count: number }) {
    super(props)
  }
  increment = (number: number) => {
    this.props.increment(number)
  }
  render () {
    return (
      <>
        <Button className='btn' onClick={() => this.increment(1)}>点我+1</Button>
      </>
    )
  }
}
class ParentCom extends React.Component{
  constructor (props: {} | Readonly<{}>) {
    super(props)
    this.state = {
      count: 0
    }
  }
  increment = (number: any) => {
    console.log(name, 'increment')
    this.setState({
      count: this.state.count + number
    })
  }
  render () {
    return (
      <>
        <div>父组件元素</div>
        <BrotherCom1 count={this.state.count} />
        <BrotherCom2 increment={this.increment} />
      </>
    )
  }
}

export default ParentCom