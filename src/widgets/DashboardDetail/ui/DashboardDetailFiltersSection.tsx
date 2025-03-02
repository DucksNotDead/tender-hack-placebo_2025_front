import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Button, DatePicker, Flex, Input, Space } from 'antd';
import { EnterOutlined } from '@ant-design/icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { TDashboardFull } from 'entities/Dashboard';
import { dashboardDetailApi } from 'widgets/DashboardDetail/api/dashboardDetailApi';
import { useAuth } from 'entities/Auth';

interface IProps {
  filters: TDashboardFull['filters'];
  onChange: Dispatch<SetStateAction<TDashboardFull['filters']>>;
}

export function DashboardDetailFiltersSection({ onChange, filters }: IProps) {
  const [inn, setInn] = useState('');
  const { setUserSupplierId } = useAuth();
  const queryClient = useQueryClient();

  const { mutate: getSupplier } = useMutation({
    mutationKey: ['getSupplierId'],
    mutationFn: dashboardDetailApi.getSupplierInn,
    onSuccess: ({ data }) => {
      setUserSupplierId(data.id);
    },
  });

  useEffect(() => {
    void queryClient.invalidateQueries({ queryKey: ['my_revenue'] });
    void queryClient.invalidateQueries({
      queryKey: ['avg_reduction_percent'],
    });
    void queryClient.invalidateQueries({ queryKey: ['win_rate'] });
    void queryClient.invalidateQueries({
      queryKey: ['hhi_index'],
    });

    void queryClient.invalidateQueries({ queryKey: ['revenue_by_customers'] });
    void queryClient.invalidateQueries({
      queryKey: ['revenue_trend_by_mounth'],
    });
    void queryClient.invalidateQueries({ queryKey: ['revenue_by_regions'] });
    void queryClient.invalidateQueries({
      queryKey: ['total_revenue_by_kpgz_category'],
    });
  }, [queryClient, inn, filters]);

  return (
    <Flex justify={'center'} style={{ padding: 24 }}>
      <Space size={'large'}>
        <DatePicker.RangePicker
          size={'large'}
          type={'range'}
          onChange={(data) => {
            if (data) {
              const [start, end] = data as any;
              onChange((prevState) => ({
                ...prevState,
                start_date: start.toISOString().split('T')[0],
                end_date: end.toISOString().split('T')[0],
              }));
            } else {
              onChange((prevState) => ({
                ...prevState,
                start_date: '1999-01-01',
                end_date: '2025-01-01',
              }));
            }
          }}
        />
        <Space>
          <Input
            size={'large'}
            placeholder={'ИНН'}
            onChange={(e) => setInn(() => e.target.value)}
          />
          <Button
            onClick={() => getSupplier(inn)}
            shape={'circle'}
            icon={<EnterOutlined />}
          />
        </Space>
      </Space>
    </Flex>
  );
}
