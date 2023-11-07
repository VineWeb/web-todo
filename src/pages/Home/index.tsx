import React, { useMemo, useState, useEffect } from 'react'
import { Button, Flex, Input, Pagination, Space, Modal, message, Empty } from 'antd'
import { BorderInnerOutlined, ExclamationCircleFilled } from '@ant-design/icons'
import { connect, useSelector } from 'react-redux';
import { ADD_TODO, UPDATE_TODO, CLOSE_ADD_TODO_MODAL } from '@/store/actionType';
import Api from '@/api';
import Header from '@/components/Header';
import CardContainer from './cardContainer'
import DateContainer from './dateContainer'
const { confirm } = Modal;

// 新增待办
import AddTodo from './addTodo';
import './index.scss'
const { Search } = Input;
const Home = ({ show, isAddStatus, onClickTodo }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const isLoginStatus = useSelector(state => state.isLoginStatus)
  const errorMeg = (error) => {
    messageApi.open({
      type: 'error',
      content: error,
    });
  };
  const deleteTodoItem = (id) => {
    confirm({
      title: '你要删除此条待办吗?',
      icon: <ExclamationCircleFilled />,
      content: '该待办删除后不可恢复!',
      onOk() {
        deteleTodo(id)
      },
      onCancel() {},
    });
  };
  const [mode, setMode] = useState('card')
  const onChangeMode = (mode: string) => {
    setMode(mode)
  }

  // 搜索
  const onSearch = (value, _e, info) => {console.log(value);}
  const [list,  setList] = useState([])
  const [total,  setTotal] = useState(0)
  const [pageNum,  setPageNum] = useState(0)
  const [pageSize,  setPageSize] = useState(10)
  const [keyword,  setKeyword] = useState('')
  // 获取待办列表
  const getTodoList = async () => {
    try {
      const { data } = await Api.getTodoList()
      setList(data.data)
      setTotal(data.total)
    } catch (error) {
      setList([])
      setTotal(0)
      errorMeg(error.message)
    }
  }
  // 删除待办
  const deteleTodo = async (id) => {
    try {
      await Api.deleteTodo({id})
      setPageNum(1)
    } catch (error) {
      errorMeg(error.message)
    }
  }
  useEffect(() => {
    setList([])
    isLoginStatus && getTodoList()
  }, [pageNum, pageSize, keyword, isLoginStatus])

  // 编辑待办
  const [todoData, setTodoData] = useState({})
  const updateTodoItem = (item) => {
    setTodoData(item)
    onClickTodo(UPDATE_TODO)
  }
  // 添加待办
  const addTodoItem = (item) => {
    setPageNum(1)
    setTodoData({})
    onClickTodo(ADD_TODO)
  }
  const onTodo = (type) => {
    setPageNum(1)
    setTodoData({})
    onClickTodo(CLOSE_ADD_TODO_MODAL)
  }
  // 切换page 
  const onChangePage = (page, pageSize) => {
    console.log(page, pageSize)
  }
  return <>
    {contextHolder}
    <Header onChangeMode={ onChangeMode } />
    <div className='warp'>
      <div className='container'>
        <Flex justify='space-between' style={{marginBottom: '20PX'}}>
          <Search className='search-inp' placeholder="输入关键字搜索"  size="large" onSearch={onSearch} enterButton />
          <Space>
            <Button icon={<BorderInnerOutlined />} size="large" disabled={!isLoginStatus} type='primary' onClick={ () => addTodoItem() }>新增待办</Button>
          </Space>
        </Flex>
      {
        mode === 'card' ?  
        (list.length ? <CardContainer list={list} updateTodo={updateTodoItem} deleteTodoItem={deleteTodoItem}/> 
        : (!list.length && <Empty />) )
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
    dispatch({type})
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)