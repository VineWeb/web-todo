import React, { useMemo, useState, useEffect } from 'react'
import { Button, Flex, Input, Pagination, Space, Modal } from 'antd'
import { BorderInnerOutlined, ExclamationCircleFilled } from '@ant-design/icons'
import { connect } from 'react-redux';
import { ADD_TODO, UPDATE_TODO, CLOSE_ADD_TODO_MODAL } from '@/store/actionType';
import Api from '@/api';
import { HomeList } from '@/mock/index'
import Header from '@/components/Header';
import CardContainer from './cardContainer'
import DateContainer from './dateContainer'
const { confirm } = Modal;

// 新增待办
import AddTodo from './addTodo';
import './index.scss'
const { Search } = Input;
const Home = ({ show, isAddStatus, onClickTodo }) => {

  const deleteTodoItem = (id) => {
    console.log(id, 'id')
    confirm({
      title: '你要删除此条待办吗?',
      icon: <ExclamationCircleFilled />,
      content: '该待办删除后不可恢复!',
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  const [mode, setMode] = useState('card')
  const onChangeMode = (mode: string) => {
    setMode(mode)
  }

  // 搜索
  const onSearch = (value, _e, info) => {console.log(value);}
  const [list,  setList] = useState(HomeList || [])
  const [total,  setTotal] = useState(0)
  // 获取待办列表
  const getTodoList = async () => {
    try {
      const { data } = await Api.getTodoList()
      setList(data.data)
      setTotal(data.total)
    } catch (error) {
      
    }
  }
  useEffect(() => {
    getTodoList()
  }, [])


  const [todoData, setTodoData] = useState({})
  // 编辑单条待办
  const updateTodoItem = (item) => {
    setTodoData(item)
    onClickTodo(UPDATE_TODO)
    // console.log(item, 'updateTodoItem id')
  } 
  const addTodoItem = (item) => {
    setTodoData({})
    onClickTodo(ADD_TODO)
    // console.log(item, 'addTodoItem')
  } 
  
  const onTodo = (type) => {
    // console.log('index onTodo', type)
    setTodoData({})
    onClickTodo(type)
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
            <Button icon={<BorderInnerOutlined />} size="large" type='primary' onClick={ () => addTodoItem() }>新增待办</Button>
          </Space>
        </Flex>
      {
        mode === 'card' ?  <CardContainer list={list} updateTodo={updateTodoItem}  deleteTodoItem={deleteTodoItem}/> 
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
    <AddTodo show={show} isAddStatus={isAddStatus} onTodo={onTodo} data={todoData} ></AddTodo>
  </>
}

const mapStateToProps = state => ({
  show: state.home.visible,
  isAddStatus: state.home.isAdd
})
const mapDispatchToProps = dispatch => ({
  onClickTodo: (type) => {
    // console.log(type, 'type')
    dispatch({type})
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)