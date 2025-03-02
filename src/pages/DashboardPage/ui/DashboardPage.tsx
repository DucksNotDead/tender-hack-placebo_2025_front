import { Col, Row } from 'antd';

import { TDashboardFull } from 'entities/Dashboard';

import { DashboardPageMetricsSection } from './DashboardPageMetricsSection';
import { DashboardPageFiltersSection } from './DashboardPageFiltersSection';
import { DashboardPageChartsSection } from 'pages/DashboardPage/ui/DashboardPageChartsSection';

const dashboard: TDashboardFull = {
  id: '123',
  title: 'Дашборд',
  owner: {
    id: 1,
    full_name: 'Михайлов Даниил Александрович',
    email: 'mikhaylov_danilka03@mail.ru',
    supplier_id: 1,
  },
  charts: [
    {
      type: 'bar',
      data: [{ name: 'Prop1', values: [1, 4, 2] }],
      categories: ['1', '2', '3'],
    },
  ],
  metrics: [
    {
      id: 1,
      value: 12,
      name: 'Перовое поле',
      unit: '%',
    },
    {
      id: 2,
      value: 6723,
      name: 'Второе поле',
      unit: '',
    },
    {
      id: 3,
      value: 6723,
      name: 'Второе поле',
      unit: '',
    },
    {
      id: 4,
      value: 6723,
      name: 'Второе поле',
      unit: '',
    },
    {
      id: 5,
      value: 6723,
      name: 'Второе поле',
      unit: '',
    },
  ],
  properties: [],
  subscribers: [
    {
      full_name: 'Михайлов Даниил Александрович',
      email: 'mikhaylov_danilka03@mail.ru',
      id: 1,
      supplier_id: 1,
    },
    {
      full_name: 'Холуенко Александр Юрьевич',
      email: 'zerogormy@mail.ru',
      id: 2,
      supplier_id: 2,
    },
  ],
  filters: {},
};

export function DashboardPage() {
  return (
    <Row>
      <Col xs={18}>
        <DashboardPageMetricsSection metrics={dashboard.metrics} />
        <DashboardPageChartsSection charts={dashboard.charts} />
      </Col>
      <Col xs={6}>
        <DashboardPageFiltersSection filters={dashboard.filters} />
      </Col>
    </Row>
  );
}
