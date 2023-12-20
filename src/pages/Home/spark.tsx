import React, { useState, useEffect } from 'react';
import Api from '@/api';
import { Input, Empty, message, Space, Flex  } from 'antd';
import './spark.scss'
const { Search } = Input;
const Spark: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [list, setList] = useState([{ user: '第一个问题', ai: '这是第一个问题答案' }])
  const [inputValue, setInputValue] = useState('')
  const onChange = (e) => {
     // 获取输入框的当前值
     const newValue = e.target.value;
    
     // 更新状态，重新渲染组件
     setInputValue(newValue);
  }
  const onSearch = async (value) => {
    if (!value) return messageApi.error('问题不能为空!')
    const res = await Api.getSpark({ question: value })
    setList([...list, { user: value, ai: res.data }])
    setInputValue('')
  };
  return  (
    <>
      {contextHolder}
      <div className="answer">
        {
          list.length ? 
            list.map((item, itemIndex) => {
              return (
                <Space direction="vertical" size="middle" style={{ display: 'flex' }} key={itemIndex}>
                  <Flex gap="middle" vertical>
                    <Flex className='user' justify="flex-end">
                      你:
                      {item.user}
                    </Flex>
                    <Flex className='ai'>
                      小星: 
                      {item.ai}
                    </Flex>
                  </Flex>
                
              </Space>
            )
          })
          : 0
        }
      </div>
      <div className='footer'>
        <Search
          value={inputValue}
          placeholder="请输入你想了解的内容"
          allowClear
          enterButton="搜索"
          size="large"
          onChange={onChange}
          onSearch={onSearch}
        />
      </div>
    </>
  )
}

export default Spark