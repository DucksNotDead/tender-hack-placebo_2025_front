import { Card, Row, Space, Typography } from 'antd';
import { useMemo } from 'react';

import { useAuth } from 'entities/Auth';

import type { TDashboardCard } from '../model/dashboardTypes';

import { DashboardChartWidget } from './DashboardChartWidget';
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
      (state, current, index) => `${state}${index ? ',' : ''} ${current.full_name}`,
      '',
    );
  }, [subscribers, user]);

  return (
    <Card className={Styles.main}>
      <Space direction={'vertical'} style={{ width: '100%' }}>
        <div className={Styles.header}>
          {metrics
            .filter((_, index) => index < 4)
            .map((metric) => (
              <div key={metric.id} className={Styles.metricItem}>
                <Typography.Text type={'secondary'}>{metric.name}</Typography.Text>

                <Typography.Text>{metric.value}</Typography.Text>
              </div>
            ))}
        </div>
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
