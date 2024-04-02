import React from 'react';
import { Button } from 'antd'
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store, setName } from './stores/index';

function SenderComponent () {
  const dispatch = useDispatch()
  const oldName = useSelector((state) => state.name)
  const changeName = () => {
    const name = oldName === '张三' ? '李四' : '张三'
    dispatch(setName(name))
  }
  return (
    <div>
      <Button onClick={changeName}>点击我改变name值</Button>
    </div>
  )
}

function ReceiverComponent () {
  const name = useSelector((state) => state.name)
  return (
    <div>接收到的值: {name}</div>
  )
}

function App () {
  return (
    <Provider store={store}>
        <div>
          <SenderComponent />
          <ReceiverComponent />
        </div>
    </Provider>
  )
}

export default App