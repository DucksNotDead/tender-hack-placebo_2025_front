import { Button, Select, Space, Typography } from 'antd';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { CheckCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';

import { TDashboardFull } from 'entities/Dashboard';

import Styles from './DashboardDetailMetricsSection.module.scss';

interface IProps {
  metrics: TDashboardFull['metrics'];
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

export function DashboardDetailMetricsSection({ metrics }: IProps) {
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [isCreateModeStepOne, setIsCreateModeStepOne] = useState(false);
  const [isCreateModeStepTwo, setIsCreateModeStepTwo] = useState(false);
  const [isCreateModeStepThree, setIsCreateModeStepThree] = useState(true);

  const mappedMetrics = metrics.map((metric) => ({
    label: metric.name,
    value: metric.value,
  }));

  return (
    <Space size={'large'} className={Styles.main}>
      <AnimatePresence>
        {!isCreateMode && (
          <motion.div>
            <Space size={'large'}>
              {metrics
                .filter((_, i) => i < 4)
                .map((metric) => (
                  <motion.div className={Styles.metricItem} key={metric.id}>
                    <Typography.Text>{metric.name}</Typography.Text>
                    <Typography.Text>
                      {metric.value}
                      {metric.unit}
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
