import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState } from 'react';
import { Flex, Button, Input } from 'antd'
import React from 'react';

function InputCom (props: { onConfirm: (arg0: string) => void; }) {
  const [value, setValue] = useState('')
  const confirm  = () => {
    props.onConfirm(value)
    setValue('')
  }
  const onChange = (e: { target: { value: any; }; }) => {
    const newValue = e.target.value
    setValue(newValue)
  }
  return (
    <>
      <Flex style={{width: '400px', margin: '20px 0'}}>
        <Input value={value}  onChange={onChange}></Input>
        <Button onClick={confirm}>提交</Button>
      </Flex>
    </>
  )
}


class ListCom extends React.Component {
  constructor (props: { list: any[]; }) {
    super(props)
  }
  componentDidMount(): void {
      console.log('ListCom componentDidMount')
  }
  componentDidUpdate(): void {
    console.log('ListCom componentDidUpdate')
  }
  render () {
    return (
      <>
        <ul>
          {this.props.list.map((item: { id: Key | null | undefined; content: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }) => {
            return <li key={item.id}>{item.content}</li>
          })}
        </ul>
      </>
    )
  }
}

class FooterCom extends React.PureComponent {
  constructor(props: {text: string}) {
    super(props)
  }
  componentDidMount(): void {
      console.log('FooterCom componentDidMount')
  }
  componentDidUpdate(): void {
    console.log('FooterCom componentDidUpdate')
  }
 
  render () {
    return (
      <>
        <div style={{marginTop: '20px'}}>{this.props.text}</div>
      </>
    )
  }
}
class FooterCom1 extends React.Component {
  constructor(props: {text: string}) {
    super(props)
    this.state = {
      name: '尾部标题组件',
      age: 18
    }
  }
  componentDidMount(): void {
      console.log('FooterCom1 componentDidMount')
  }
  componentDidUpdate(): void {
    console.log('FooterCom1 componentDidUpdate')
  }
  shouldComponentUpdate(nextProps: { text: string; }, nextState: any) {
    console.log(nextProps, nextState)
    if (this.props.text !== nextProps.text) {
      return true
    }
    return false
  }
  render () {
    return (
      <>
        <div style={{marginTop: '20px'}}>{this.props.text}</div>
      </>
    )
  }
}


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [
        {id: '1', content: '我是标题1'},
        {id: '2', content: '我是标题2'},
        {id: '3', content: '我是标题3'},
        {id: '4', content: '我是标题4'},
        {id: '5', content: '我是标题5'},
        {id: '6', content: '我是标题6'}
      ]
    }
  }
  onConfirm = (val: string ) =>  {
    console.log('app onConfirm', val)
    const item = {
      id: Date(),
      content: val
    }
    this.setState({
      list: [...this.state.list, item]
    })
  }
  componentDidMount(): void {
      console.log('App componentDidMount')
  }
  componentDidUpdate(): void {
    console.log('App componentDidUpdate')
  }
  render () {
    return (
      <>
        <InputCom onConfirm={this.onConfirm}></InputCom>
        <ListCom list={this.state.list}></ListCom>
        <FooterCom text={'我是尾部的文字'}></FooterCom>
        <FooterCom1 text={'我是尾部的文字1'}></FooterCom1>
      </>
    )
  }
}
// React 默认, 父组件有更新, 子组件则无条件更新

export default App