import React, { useState } from 'react';
import './index.scss'
import { Button, Flex, Space, Row, Col } from 'antd';
import type { FlexProps } from 'antd';
import { connect } from 'react-redux';
import Login from '@/components/Login';
import { OPEN_LOGIN_MODAL, OPEN_REGISTER_MODAL, CLOSE_LOGIN_MODAL } from '@/store/actionType';
const NavTop = ({ isLogin, show, onChangeMode, onCancel, onOk }) => {
  const [selectedMode, setSelectedMode] = useState('card');
  const handleModeChange = (mode) => {
    setSelectedMode(mode);
    onChangeMode(mode);
  };
  return (<>
      <Flex gap="middle" className="nav-top" justify='center' >
        <div className="container">
          <Flex align='center' justify='space-between' flex={1} style={{height: '100%'}} >
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Button  type={selectedMode === 'card' ? 'primary' : 'default'} onClick={() => handleModeChange('card')}>卡片模式</Button>
              </Col>
              <Col span={12}>
                <Button  type={selectedMode === 'date' ? 'primary' : 'default'} onClick={() => handleModeChange('date')}>日期模式</Button>
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Button className="btn" type="text" onClick={ () => onOk(OPEN_LOGIN_MODAL) }>登录</Button>
              <Button className="btn" type="text" onClick={ () => onOk(OPEN_REGISTER_MODAL) }>注册</Button>
            </Row>
          </Flex>
        </div>
      </Flex>
      <Login show={show} isLogin={isLogin} onCancel={onCancel} />
    </>
  );
};
const mapStateToProps = state => ({
  show: state.login.visible,
  isLogin: state.login.isLogin
});

const mapDispatchToProps = dispatch => ({
  onCancel: () => {
    console.log('onCancel')
    dispatch({ type: CLOSE_LOGIN_MODAL })
  },
  onOk: (type) => {
    dispatch({ type })
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(NavTop);
