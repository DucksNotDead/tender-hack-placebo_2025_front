import { Card, Row, Space, Typography } from 'antd';
import { useMemo } from 'react';

import { useAuth } from 'entities/Auth';

import type { TDashboardCard } from '../model/dashboardTypes';

import { DashboardChartWidget } from './DashboardChartWidget';
import { DashboardMetrics } from './DashboardMetrics';
import Styles from './DashboardCard.module.scss';

export function DashboardCard({
  title,
  mainChart,
  metrics,
  owner,
  subscribers,
}: TDashboardCard) {
  const { user } = useAuth();

  const ownerName = useMemo(() => {
    if (user?.id === owner.id) {
      return 'Вы владелец ✓';
    }
    return owner.full_name;
  }, [owner, user]);

  const subscribersNames = useMemo(() => {
    return subscribers.reduce(
      (state, current) =>
        current.id !== user?.id ? `${state}, ${current.full_name}` : state,
      '',
    );
  }, [subscribers, user]);

  return (
    <Card className={Styles.main}>
      <Space direction={'vertical'} style={{ width: '100%' }}>
        <DashboardMetrics metrics={metrics} />
        <DashboardChartWidget {...mainChart} />
        <div className={Styles.footer}>
          <Row align={'middle'} justify={'space-between'}>
            <Typography.Title level={3} style={{ margin: 0 }}>
              {title}
            </Typography.Title>
            <Typography.Text type={'secondary'}>{ownerName}</Typography.Text>
          </Row>
          <Row>
            <Typography.Text type={'secondary'}>
              <Typography.Text strong>Подписаны: </Typography.Text>
              {subscribersNames}
            </Typography.Text>
          </Row>
        </div>
      </Space>
    </Card>
  );
}
