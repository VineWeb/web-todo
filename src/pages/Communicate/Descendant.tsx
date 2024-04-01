// Descendant.tsx 
import React, { Component } from 'react'
import { Button } from 'antd';
const MyContext = React.createContext('王五的饭')
class Chilren extends Component {
  render(): React.ReactNode {
      return (
        <>
          <div>子元素组件</div>
          <MyContext.Consumer>
            {
              value => (
                  <div>祖组件传递过来的参数: {value}</div>
              )
            }
          </MyContext.Consumer>
        </>
      )
  }
}
class ParentCom extends Component {
  render(): React.ReactNode {
      return (
        <>
        <div>父元素组件</div>
        <Chilren></Chilren>
        </>
      )
  }
}
class Descendant extends Component {
  state = {
    name: '默认值'
  }
  changeName = () => {
    const name = this.state.name === '张三的菜' ? '李四的茶' : '张三的菜'
    this.setState({
      name
    })
  }
  render(): React.ReactNode {
      return (
        <MyContext.Provider value={this.state.name}>
          <ParentCom></ParentCom>
          <Button className='btn' onClick={this.changeName}>点我更改nane值</Button>
        </MyContext.Provider>
      )
  }
}

export default Descendant