import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { AppChart, IChartProps } from 'entities/Chart';

import { testReportPageApi } from '../api/testReportPageApi';

export function TestReportPage() {
  const { data: response } = useQuery({
    queryKey: ['getSuppliersSuccessRate'],
    queryFn: testReportPageApi.getSuppliersSuccessRate,
  });

  const { data, categories } = useMemo<
    Pick<IChartProps, 'data' | 'categories'>
  >(() => {
    const values: number[] = [];
    const categories: string[] = [];

    for (const item of response?.data ?? []) {
      values.push(item.win_rate_percent);
      categories.push(item.supplier_name);
    }

    return { data: [{ name: 'Процент побед', values }], categories };
  }, [response]);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <AppChart
        title={'Процент побед каждого поставщика'}
        type={'bar'}
        data={data}
        categories={categories}
        horizontal
      />
    </div>
  );
}
