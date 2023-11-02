import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Input, Space, Divider, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Api from '@/api';
import CryptoJS from 'crypto-js';
import { secretPwKey } from '@/config/secret'; // 自定义的公钥
import './index.scss'
const Login = ({ isLogin, show, onCancel }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  // useEffect(() => {}, []);
  const onFinish = async (values: any) => {
    const { username, password  }  = values
    // 登录
    try {
      if (isLogin) {
        const encryptedPassword = CryptoJS.AES.encrypt(password, secretPwKey).toString();
        const res = await Api.login({ username,  password: encryptedPassword })
    
      } else { // 注册
  
      }
      form.resetFields()
      onCancel()
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: error?.message,
      });
    }
  };

  const modalOnCancel = () => {
    form.resetFields()
    onCancel()
  }
  return (
    <>
    { contextHolder }
     <Modal style={{top: '300px'}} footer={null} open={show} onCancel={modalOnCancel}>
        <div className='login'>
          <div className="login-title">{ isLogin ? '登录': '快速注册' }</div>
          <Divider />
          <Form form={form} name="horizontal_login" onFinish={onFinish}>
            <Form.Item
              name="username"
              rules={[{ required: true, message: '请输入账号/邮箱！' }]}
            >
              <Input size="large" placeholder="请输入账号/邮箱" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码！' }]}
            >
              <Input.Password size="large" type="password" placeholder="请输入密码" />
            </Form.Item>
            { !isLogin && 
              <Form.Item
                name="emailCode"
                rules={[{ required: true, message: '请输入邮箱验证码！' }]}
              >
                <Space.Compact style={{ width: '100%' }}>
                  <Input size='large' placeholder="请输入邮箱验证码" suffix={<Button type="link">获取验证码</Button>}/>
                </Space.Compact>
              </Form.Item>
            }
            <Form.Item shouldUpdate>
              {() => (
                <Button
                  style={{width: "100%"}}
                  type="primary"
                  size='large'
                  htmlType="submit"
                  disabled={
                    !form.isFieldsTouched(true) ||
                    !!form.getFieldsError().filter(({ errors }) => errors.length).length
                  }
                >
                  { isLogin ? '登录': '快速注册' }
                </Button>
              )}
            </Form.Item>
        </Form>
        </div>
      </Modal>
    </>
  )
}
export default Login