import React, { useMemo, useState } from 'react'
import { Button, Flex, Input, Pagination, Space } from 'antd'
import { BorderInnerOutlined } from '@ant-design/icons'
import { connect } from 'react-redux';
import { ADD_TODO, UPDATE_TODO, CLOSE_ADD_TODO_MODAL } from '@/store/actionType';
import Api from '@/api';
import { HomeList } from '@/mock/index'
import Header from '@/components/Header';
import CardContainer from './cardContainer'
import DateContainer from './dateContainer'

// 新增待办
import AddTodo from './addTodo';
import './index.scss'
const { Search } = Input;
const Home = ({ show, isAddStatus, onClickTodo }) => {
  const [mode, setMode] = useState('card')
  const onChangeMode = (mode: string) => {
    setMode(mode)
  }

  // 获取用户表
  const getUsers = async () => {
    const res = await Api.getUsers()
    console.log('getUsers')
  }

  // 搜索
  const onSearch = (value, _e, info) => {console.log(value);}

  // 列表数据
  const [list,  setList] = useState(HomeList || [])
  const total = useMemo(() => {
    return list.length
  }, [list])
  const cardList = useMemo(() => {
    return list.filter((item, i) => i < 20)
  }, [list])

  const [todoData, setTodoData] = useState({})
  // 编辑单条待办
  const updateTodoItem = (item) => {
    onClickTodo(UPDATE_TODO)
    setTodoData(item)
    console.log(item, 'updateTodoItem id')
  } 
  

  // 切换page 
  const onChangePage = (page, pageSize) => {
    console.log(page, pageSize)
  }
  return <>
    <Header onChangeMode={ onChangeMode } />
    <div className='warp'>
      <div className='container'>
        <Flex justify='space-between' style={{marginBottom: '20PX'}}>
          <Search className='search-inp' placeholder="输入关键字搜索"  size="large" onSearch={onSearch} enterButton />
          <Space>
            <Button icon={<BorderInnerOutlined />} size="large" type='primary' onClick={ () => onClickTodo(ADD_TODO) }>新增待办</Button>
            <Button icon={<BorderInnerOutlined />} size="large" onClick={getUsers}>获取用户表</Button>
          </Space>
        </Flex>
      {
        mode === 'card' ?  <CardContainer list={cardList} updateTodo={updateTodoItem} /> 
        : <DateContainer list={list} />
      }
        <Pagination
            className='page'
            total={total}
            showTotal={(total) => `总共：${total}条`}
            defaultPageSize={20}
            defaultCurrent={1}
            showSizeChanger
            onChange={onChangePage}
          />
        </div>
    </div>
    <AddTodo show={show} isAddStatus={isAddStatus} onTodo={onClickTodo} data={todoData}></AddTodo>
  </>
}

const mapStateToProps = state => ({
  show: state.home.visible,
  isAddStatus: state.home.isAdd
})
const mapDispatchToProps = dispatch => ({
  onClickTodo: (type) => {
    console.log(type, 'type')
    dispatch({type})
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)