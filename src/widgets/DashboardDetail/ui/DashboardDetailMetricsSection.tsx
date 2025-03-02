import { Button, Select, Space, Typography } from 'antd';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';

import { TDashboardFull } from 'entities/Dashboard';

import Styles from './DashboardDetailMetricsSection.module.scss';

interface IProps {
  metrics: TDashboardFull['metrics'];
}

export function DashboardDetailMetricsSection({ metrics }: IProps) {
  const [isCreateMode, setIsCreateMode] = useState(false);

  return (
    <Space size={'large'} className={Styles.main}>
      <AnimatePresence>
        {!isCreateMode && (
          <motion.div>
            <Space size={'large'}>
              {metrics
                .filter((_, i) => i < 4)
                .map((metric) => (
                  <motion.div className={Styles.metricItem}>
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
              onClick={() => setIsCreateMode((prevState) => !prevState)}
              shape={'circle'}
              icon={<PlusCircleOutlined />}
            />
          </motion.div>
          <motion.div
            initial={false}
            animate={{ width: isCreateMode ? '100%' : 0 }}
            style={{ overflow: 'hidden' }}
          >
            <Select style={{ width: 320 }} />
          </motion.div>
        </Space>
      </motion.div>
    </Space>
  );
}
