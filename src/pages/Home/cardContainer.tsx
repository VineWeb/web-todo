import React from 'react';
import { Card, Col, Row } from 'antd';

const CardContainer: React.FC = () => (
  <div className='container'>
    <Row gutter={[16, 16]}>
      <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }}>
        <Card title="Card title" bordered={false} hoverable>
          Card content
        </Card>
      </Col>
      <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }}>
        <Card title="Card title" bordered={false} hoverable>
          Card content
        </Card>
      </Col>
      <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }}>
        <Card title="Card title" bordered={false} hoverable>
          Card content
        </Card>
      </Col>
    </Row>
  </div>
);

export default CardContainer;