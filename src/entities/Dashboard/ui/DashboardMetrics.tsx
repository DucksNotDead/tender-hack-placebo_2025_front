import { Space, Typography } from 'antd';

import { IDashboardMetric } from '../model/dashboardTypes';

interface IProps {
  metrics: IDashboardMetric[];
}

export function DashboardMetrics({ metrics }: IProps) {
  return (
    <Space>
      {metrics.map((metric) => (
        <Typography.Text>{metric.value}</Typography.Text>
      ))}
    </Space>
  );
}
