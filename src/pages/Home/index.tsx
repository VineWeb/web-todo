import React, { useState } from 'react'
import { Button, Flex } from 'antd'
import Header from '@/components/Header';
import CardContainer from './cardContainer'
import DateContainer from './dateContainer'
import './index.scss'
export default function Home () {
  const [mode, setMode] = useState('card')
  const onChangeMode = (mode: string) => {
    setMode(mode)
  }

  // 新建待办
  const addTodo = () => {
    
  }
  return <>
    <Header onChangeMode={ onChangeMode }/>
    <div className='warp'>
      <div className='container'>
        <Flex justify='flex-end' style={{marginBottom: '20PX'}}> 
          <Button type='primary'>新增待办</Button>
        </Flex>
      </div>
      {
        mode === 'card' ?  <CardContainer /> 
        : <DateContainer />
      }
    </div>
  </>
}