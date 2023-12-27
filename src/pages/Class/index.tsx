import React, { Component } from 'react';
import Header from '@/components/Header';
class ClassCom extends Component {
  render() {
    const onChangeMode = (mode: string) => {
      console.log('类组件', mode)
    }
    return (
      <>
        {/* <Header onChangeMode={ onChangeMode }/> */}
        <p>类组件</p>
      </>
    )
  }
}

export default ClassCom;