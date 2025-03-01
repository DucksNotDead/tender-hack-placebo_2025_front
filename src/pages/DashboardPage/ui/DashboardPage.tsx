import { Col, Row, Space } from 'antd';

export function DashboardPage() {
  return (
    <Space direction={'vertical'}>
      <Row></Row>
      <Row>
        <Col flex={1}></Col>
        <Col flex={7}></Col>
      </Row>
    </Space>
  );
}
