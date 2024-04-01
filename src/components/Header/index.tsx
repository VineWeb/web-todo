import React, { useState, useEffect, useMemo } from 'react';
import './index.header.scss'
import { Button, Divider, Flex, Space, Row, Col } from 'antd';
import type { FlexProps } from 'antd';
import { connect } from 'react-redux';
import Login from '@/components/Login/index.tsx';
import { OPEN_LOGIN_MODAL, OPEN_REGISTER_MODAL, CLOSE_LOGIN_MODAL, EXIT_LOGIN } from '@/store/actionType';
import { useNavigate } from "react-router-dom";
const NavTop = ({ isLogin, show, onChangeMode, onLoginCancel, onDispatchFn }) => {
  const navigate = useNavigate();
  const [selectedMode, setSelectedMode] = useState('');
  const handleModeChange = (mode: string) => {
    setSelectedMode(mode);
    onChangeMode(mode);
    if (mode === 'class' || mode === 'function' || mode === 'event') {
      navigate(`/${mode}`)
    } else {
      navigate('/')
    }
  };
  const info = localStorage.getItem('userinfo')
  const [userinfo, setUserinfo] = useState(info)
  useEffect(() => {
    let info = localStorage.getItem('userinfo')
    if (info) {
      info = JSON.parse(info)
      setUserinfo(info)
    }
  }, [show])
  const exit = () => {
    setUserinfo({})
    onDispatchFn(EXIT_LOGIN)
    onDispatchFn(OPEN_LOGIN_MODAL)
    localStorage.removeItem('token')
    localStorage.removeItem('userid')
    localStorage.removeItem('userinfo')
  }
  return (<>
      <Flex gap="middle" className="nav-top" justify='center' >
        <div className="container">
          <Flex align='center' justify='space-between' flex={1} style={{height: '100%'}} >
            <Row gutter={[16, 16]}>
              <Col span={6}>
                <Button  type={selectedMode === 'card' ? 'primary' : 'default'} onClick={() => handleModeChange('card')}>卡片模式</Button>
              </Col>
              <Col span={6}>
                <Button type={selectedMode === 'date' ? 'primary' : 'default'} onClick={() => handleModeChange('date')}>问答模式</Button>
              </Col>
              <Col span={6}>
                <Button type={selectedMode === 'class' ? 'primary' : 'default'} onClick={() => handleModeChange('class')}>类组件</Button>
              </Col>
              <Col span={6}>
                <Button type={selectedMode === 'function' ? 'primary' : 'default'} onClick={() => handleModeChange('function')}>函数组件</Button>
              </Col>
            </Row>
            { userinfo?.username ?
              (<Row gutter={[16, 16]} style={{display: 'flex', alignItems: 'center'}}>
                <Button className="btn" type="text">{userinfo?.username}</Button>
                <Divider type="vertical" style={{borderColor: '#fff', top: 0}} orientation='center' />
                <Button className="btn" type="text" onClick={ () => exit() }>退出</Button>
              </Row>) :
              (<Row gutter={[16, 16]} style={{display: 'flex', alignItems: 'center'}}>
                <Button className="btn" type="text" onClick={ () => onDispatchFn(OPEN_LOGIN_MODAL) }>登录</Button>
                <Divider type="vertical" style={{borderColor: '#fff', top: 0}} orientation='center' />
                <Button className="btn" type="text" onClick={ () => onDispatchFn(OPEN_REGISTER_MODAL) }>注册</Button>
              </Row>)
            }
          </Flex>
        </div>
      </Flex>
      <Login show={show} isLogin={isLogin} onCancel={onLoginCancel} />
    </>
  );
};
const mapStateToProps = state => ({
  show: state.login.visible,
  isLogin: state.login.isLogin
});

const mapDispatchToProps = dispatch => ({
  onLoginCancel: () => {
    dispatch({ type: CLOSE_LOGIN_MODAL })
  },
  onDispatchFn: (type) => {
    dispatch({ type })
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(NavTop);
