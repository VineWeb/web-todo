import store, { increment, decrement, incrementByAmount, incrementAsync }from './store';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';
function StoreComponent () {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()
  return (
    <>
      <div>{count}</div>
      <Button className='btn p' onClick={() => dispatch(increment())}> 点我+1 </Button>
      <Button className='btn p' onClick={() => dispatch(decrement())}> 点我-1 </Button>
      <Button className='btn p' onClick={() => dispatch(incrementByAmount(10))}> 点我+10 </Button>
      <Button className='btn p' onClick={() => dispatch(incrementAsync(1))}> 点我过一秒后+1 </Button>
    </>
  )
}
function App1 () {
  return (
    <Provider store={store}>
      <StoreComponent></StoreComponent>
    </Provider>
  ) 
}

export default App1