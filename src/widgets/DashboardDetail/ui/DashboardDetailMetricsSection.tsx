import { Button, Select, Space, Typography } from 'antd';
import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { CheckCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';

import { TDashboardFull } from 'entities/Dashboard';
import { dashboardDetailApi } from 'widgets/DashboardDetail/api/dashboardDetailApi';
import { useAuth } from 'entities/Auth';

import Styles from './DashboardDetailMetricsSection.module.scss';

interface IProps {
  filters: TDashboardFull['filters'];
}

const aggregationFunctions = [
  {
    label: 'Сумма',
    value: 'SUM',
  },
  {
    label: 'Среднее',
    value: 'AVG',
  },
  {
    label: 'Максимум',
    value: 'MAX',
  },
  {
    label: 'Минимум',
    value: 'MIN',
  },
  {
    label: 'Количество',
    value: 'COUNT',
  },
];

export function DashboardDetailMetricsSection({ filters }: IProps) {
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [isCreateModeStepOne, setIsCreateModeStepOne] = useState(false);
  const [isCreateModeStepTwo, setIsCreateModeStepTwo] = useState(false);
  const [isCreateModeStepThree, setIsCreateModeStepThree] = useState(true);
  const { user } = useAuth();

  const { data: hhi_index } = useQuery({
    queryKey: [
      'hhi_index',
      filters.start_date,
      filters.end_date,
      user,
    ],
    queryFn: () =>
      dashboardDetailApi.hhi_index(
        user?.supplier_id!,
        filters.start_date,
        filters.end_date,
      ),
  });

  const { data: win_rate } = useQuery({
    queryKey: [
      'win_rate',
      filters.start_date,
      filters.end_date,
      user,
    ],
    queryFn: () =>
      dashboardDetailApi.win_rate(
        user?.supplier_id!,
        filters.start_date,
        filters.end_date,
      ),
  });

  const { data: avg_reduction_percent } = useQuery({
    queryKey: [
      'avg_reduction_percent',
      filters.start_date,
      filters.end_date,
      user,
    ],
    queryFn: () =>
      dashboardDetailApi.avg_reduction_percent(
        user?.supplier_id!,
        filters.start_date,
        filters.end_date,
      ),
  });

  const { data: my_revenue } = useQuery({
    queryKey: [
      'my_revenue',
      filters.start_date,
      filters.end_date,
      user,
    ],
    queryFn: () =>
      dashboardDetailApi.my_revenue(
        user?.supplier_id!,
        filters.start_date,
        filters.end_date,
      ),
  });

  const metrics = useMemo<TDashboardFull['metrics']>(() => {
    return [my_revenue, avg_reduction_percent, win_rate, hhi_index].map(item => item?.data) as any
  }, [my_revenue, avg_reduction_percent, win_rate, hhi_index]);

  const mappedMetrics = metrics.map((metric) => ({
    label: metric?.name,
    value: metric?.value,
  }));

  return (
    <Space size={'large'} className={Styles.main}>
      <AnimatePresence>
        {!isCreateMode && (
          <motion.div>
            <Space size={'large'}>
              {metrics
                .map((metric) => (
                  <motion.div className={Styles.metricItem} key={metric?.name}>
                    <Typography.Text>{metric?.name}</Typography.Text>
                    <Typography.Text>
                      {metric?.value}
                      {metric?.unit}
                    </Typography.Text>
                  </motion.div>
                ))}
            </Space>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div className={Styles.metricItem}>
        <Space>
          <motion.div
            initial={false}
            animate={{ rotate: isCreateMode ? '45deg' : '0deg' }}
          >
            <Button
              onClick={() => {
                setIsCreateMode((prevState) => !prevState);
                setIsCreateModeStepOne((prevState) => !prevState);
                setIsCreateModeStepTwo(false);
                setIsCreateModeStepThree(true);
              }}
              shape={'circle'}
              icon={<PlusCircleOutlined />}
            />
          </motion.div>
          {isCreateMode && (
            <>
              <motion.div
                initial={false}
                animate={{ width: isCreateModeStepOne ? '100%' : 0 }}
                style={{ overflow: 'hidden' }}
              >
                <Select
                  allowClear
                  optionFilterProp="label"
                  options={aggregationFunctions}
                  placeholder={'Выберите агрегатную функцию'}
                  onSelect={() =>
                    setIsCreateModeStepTwo((prevState) => !prevState)
                  }
                  style={{ width: 280 }}
                />
              </motion.div>
              <motion.div
                initial={false}
                animate={{ width: isCreateModeStepTwo ? '100%' : 0 }}
                style={{ overflow: 'hidden' }}
              >
                <Select
                  allowClear
                  optionFilterProp="label"
                  options={mappedMetrics}
                  placeholder={'Выберите агрегатную функцию'}
                  onSelect={() =>
                    setIsCreateModeStepThree((prevState) => !prevState)
                  }
                  style={{ width: 280 }}
                />
              </motion.div>
              <motion.div
                initial={false}
                animate={{ x: isCreateModeStepThree ? '100vh' : 0 }}
                transition={{
                  bounce: 0,
                }}
                style={{ overflow: 'hidden' }}
              >
                <Button shape={'circle'} icon={<CheckCircleOutlined />} />
              </motion.div>
            </>
          )}
        </Space>
      </motion.div>
    </Space>
  );
}
