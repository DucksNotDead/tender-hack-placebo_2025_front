import { useQuery } from '@tanstack/react-query';

import {
  DashboardChartWidget,
  IChartProps,
  TDashboardFilter,
} from 'entities/Dashboard';

import { dashboardDetailApi } from '../api/dashboardDetailApi';
import { useMemo } from 'react';

interface IProps {
  filters: TDashboardFilter;
}

export function DashboardDetailChartsSection({ filters }: IProps) {
  const { data: total_revenue_by_kpgz_category } = useQuery({
    queryKey: ['total_revenue_by_kpgz_category', filters],
    queryFn: () =>
      dashboardDetailApi.total_revenue_by_kpgz_category(
        filters.start_date,
        filters.end_date,
      ),
  });

  const total_revenue_by_kpgz_category_chart = useMemo<
    Pick<IChartProps, 'data' | 'categories'>
  >(() => {
    const data: number[] = [];
    const categories: string[] = [];
    total_revenue_by_kpgz_category?.data.forEach((item: any) => {
      data.push(item.total_revenue);
      categories.push(item.aggregated_kpgz);
    });

    return {
      data: [{ name: 'Общая выручка по категории КПГЗ', values: data }],
      categories,
    };
  }, [total_revenue_by_kpgz_category]);

  return (
    <>
      <DashboardChartWidget
        type={'bar'}
        data={total_revenue_by_kpgz_category_chart.data}
        categories={total_revenue_by_kpgz_category_chart.categories}
        detail={{
          title: 'Общая выручка по категории КПГЗ',
          width: 600,
        }}
      />
      <DashboardChartWidget type={'bar'} data={[]} categories={[]} horizontal />
      <DashboardChartWidget type={'line'} data={[]} categories={[]} />
      <DashboardChartWidget type={'bar'} data={[]} categories={[]} />
    </>
  );
}
