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
const Home = ({ userid, show, isAddStatus, onClickTodo }) => {
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
  const onSearch = (value, _e, info) => {
    setKeyword(value)
  }
  const [list, setList] = useState([])
  const [total, setTotal] = useState(0)
  const [keyword, setKeyword] = useState('')
  const [pageNum, setPageNum] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  // 获取待办列表
  const getTodoList = async () => {
    const params = {
      userid,
      keyword,
      pageNum,
      pageSize
    }
    try {
      const { data } = await Api.getTodoList(params)
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
      const res = await Api.deleteTodo({id})
      getTodoList()
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
    getTodoList()
    setTodoData({})
    onClickTodo(ADD_TODO)
  }
  const onTodo = (type) => {
    getTodoList()
    setTodoData({})
    onClickTodo(CLOSE_ADD_TODO_MODAL)
  }
  // 切换page 
  const onChangePage = (pageNum, pageSize) => {
    setPageNum(pageNum)
    setPageSize(pageSize)
  }
  const isCard = useMemo(() => mode === 'card' )
  return <>
    {contextHolder}
    <Header onChangeMode={ onChangeMode } />
    <div className='warp'>
      <div className='container'>
        <Flex justify={ isCard ? 'space-between': 'flex-end' } style={{marginBottom: '20PX'}}>
          { isCard &&  <Search className='search-inp' placeholder="输入关键字搜索" allowClear size="large" onSearch={onSearch} enterButton />}
          <Space>
            <Button icon={<BorderInnerOutlined />} size="large" disabled={!isLoginStatus} type='primary' onClick={ () => addTodoItem() }>新增待办</Button>
          </Space>
        </Flex>
      {
        isCard ?  
        (list.length ? <CardContainer list={list} updateTodo={updateTodoItem} deleteTodoItem={deleteTodoItem}/> 
        : (!list.length && <Empty />) )
        : <DateContainer list={list} />
      }
       {
        isCard &&  <Pagination
         className='page'
         total={total}
         showTotal={(total) => `总共：${total}条`}
         defaultPageSize={pageSize}
         defaultCurrent={pageNum}
         current={pageNum}
         pageSizeOptions={[5, 10, 20]}
         showSizeChanger
         onChange={onChangePage}
       />
       }
        </div>
    </div>
    <AddTodo show={show} isAddStatus={isAddStatus} onTodo={onTodo} data={todoData} ></AddTodo>
  </>
}

const mapStateToProps = state => ({
  show: state.home.visible,
  isAddStatus: state.home.isAdd,
  userid: state.userid
})
const mapDispatchToProps = dispatch => ({
  onClickTodo: (type) => {
    dispatch({type})
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)