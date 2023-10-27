import React, { useState } from 'react';
import './index.scss'
import { Button, Flex, Space, Row, Col } from 'antd';
import type { FlexProps } from 'antd';
const NavTop = ({ onChangeMode }) => {
  const [selectedMode, setSelectedMode] = useState('card');
  const handleModeChange = (mode) => {
    setSelectedMode(mode);
    onChangeMode(mode);
  };
  return (
    <Flex gap="middle" className="nav-top" justify='center' >
      <div className="container">
        <Flex align='center' flex={1} style={{height: '100%'}} >
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Button  type={selectedMode === 'card' ? 'primary' : 'default'} onClick={() => handleModeChange('card')}>卡片模式</Button>
          </Col>
          <Col span={12}>
            <Button  type={selectedMode === 'date' ? 'primary' : 'default'} onClick={() => handleModeChange('date')}>日期模式</Button>
          </Col>
        </Row>
        </Flex>
      </div>
    </Flex>
  );
};

export default NavTop;
