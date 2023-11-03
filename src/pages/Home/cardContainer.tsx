import React, { useState } from 'react';
import { Card, Col, Row, Space, Button, Tag } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { levels } from '@/config/index'
const CardContainer: React.FC = ({list = [], updateTodo}) => {
  const listStyle = {
    height: `calc(100% - 180px)`,
    'overflowX': 'hidden',
    'overflowY': 'auto'
  }
  const [isHovered, setIsHovered] = useState(false);
  const [id, setId] = useState('0');

  const handleDeleteClick = (id: string) => {
    // 删除按钮点击事件
    console.log('Delete button clicked',  typeof id);
  };
  
  return (
    <>
      <Row gutter={[16, 16]} style={listStyle}>
        {
          list.map((item) => {
            const levelObject = levels.find(level => level.value === item.level);
            let tag = null
            if (levelObject) {
              tag = <div className="tag">
                <Tag color={levelObject.color}>{levelObject.label}</Tag>
              </div>
            }
            return (
              <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} key={item.id}>
                <Card title={item.title} bordered={false} hoverable className="card"
                onMouseEnter={() => { setIsHovered(true); setId(item.id) }} // 当鼠标进入卡片时设置为悬停状态
                onMouseLeave={() => { setIsHovered(false); setId('') }}>
                  { item.content }
                  { isHovered && (id === item.id) && ( // 只有在悬停状态下显示按钮
                    <div className="card-buttons">
                      <Space>
                        <Button type="primary"  size='small'  icon={<EditOutlined />} onClick={ () => updateTodo(item) }>编辑</Button>
                        <Button type="danger" size='small' icon={<DeleteOutlined />} onClick={ () => handleDeleteClick(item.id) }>删除</Button>
                      </Space>
                    </div>
                  )}
                  { tag }
                </Card>
              </Col>
            )
          })
        }
      </Row>
    </>
  )
};

export default CardContainer;