import { Row, Typography } from 'antd';
import { AnimatePresence, motion } from 'framer-motion';
import { TDashboardFull } from 'entities/Dashboard';
import { useState } from 'react';

import Styles from './DashboardPageMetricsSection.module.scss';

interface IProps {
  metrics: TDashboardFull['metrics'];
}

export function DashboardPageMetricsSection({ metrics }: IProps) {
  const [isCreateMode, setIsCreateMode] = useState(false);

  return (
    <Row>
      <AnimatePresence>
        {!isCreateMode && (
          <motion.div>
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
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div className={Styles.metricItem}>

      </motion.div>
    </Row>
  );
}
