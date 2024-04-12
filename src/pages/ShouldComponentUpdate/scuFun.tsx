import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState } from 'react';
import { Flex, Button, Input } from 'antd'

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


function ListCom (props: { list: any[]; }) {
  return (
    <>
      <ul>
        {props.list.map((item: { id: Key | null | undefined; content: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }) => {
          return <li key={item.id}>{item.content}</li>
        })}
      </ul>
    </>
  )
}

function FooterCom (props: {text: string}) {
  useEffect(() => {
    console.log('更新')
  }, [])
  return (
    <>
      <div style={{marginTop: '20px'}}>{props.text}</div>
    </>
  )
}


function App () {
  const [list, useList] = useState([
    {id: '1', content: '我是标题1'},
    {id: '2', content: '我是标题2'},
    {id: '3', content: '我是标题3'},
    {id: '4', content: '我是标题4'},
    {id: '5', content: '我是标题5'},
    {id: '6', content: '我是标题6'}
  ])
  const onConfirm = (val: string ) =>  {
    console.log('app onConfirm', val)
    const item = {
      id: Date(),
      content: val
    }
    useList([...list, item])
  }
  return (
    <>
      <InputCom onConfirm={onConfirm}></InputCom>
      <ListCom list={list}></ListCom>
      <FooterCom text={'我是尾部的文字'}></FooterCom>
    </>
  )
}


export default App