import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import {
  DashboardChartWidget,
  IChartProps,
  TDashboardFilter,
} from 'entities/Dashboard';
import { useAuth } from 'entities/Auth';

import { dashboardDetailApi } from '../api/dashboardDetailApi';

interface IProps {
  filters: TDashboardFilter;
}

export function DashboardDetailChartsSection({ filters }: IProps) {
  const { user } = useAuth();

  const { data: total_revenue_by_kpgz_category } = useQuery({
    queryKey: [
      'total_revenue_by_kpgz_category',
      filters.start_date,
      filters.end_date,
    ],
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

  const { data: revenue_by_regions } = useQuery({
    queryKey: [
      'revenue_by_regions',
      filters.start_date,
      filters.end_date,
      user,
    ],
    queryFn: () =>
      dashboardDetailApi.revenue_by_regions(
        user?.supplier_id!,
        filters.start_date,
        filters.end_date,
      ),
  });

  const revenue_by_regions_chart = useMemo<
    Pick<IChartProps, 'data' | 'categories'>
  >(() => {
    const data: number[] = [];
    const categories: string[] = [];

    revenue_by_regions?.data.forEach((item: any) => {
      data.push(item.revenue);
      categories.push(item.region_name);
    });

    return {
      data: [{ name: 'Выручка по регионам', values: data }],
      categories,
    };
  }, [revenue_by_regions]);

  const { data: revenue_trend_by_mounth } = useQuery({
    queryKey: [
      'revenue_trend_by_mounth',
      filters.start_date,
      filters.end_date,
      user,
    ],
    queryFn: () =>
      dashboardDetailApi.revenue_trend_by_mounth(
        user?.supplier_id!,
        filters.start_date,
        filters.end_date,
      ),
  });

  const revenue_trend_by_mounth_chart = useMemo<
    Pick<IChartProps, 'data' | 'categories'>
  >(() => {
    const data: number[] = [];
    const categories: string[] = [];

    revenue_trend_by_mounth?.data.forEach((item: any) => {
      data.push(item.total_revenue);
      categories.push(item.month);
    });

    return {
      data: [{ name: 'Тренд выручки поставщика по месяцам', values: data }],
      categories,
    };
  }, [revenue_trend_by_mounth]);

  const { data: revenue_by_customers } = useQuery({
    queryKey: [
      'revenue_by_customers',
      filters.start_date,
      filters.end_date,
      user,
    ],
    queryFn: () =>
      dashboardDetailApi.revenue_by_customers(
        user?.supplier_id!,
        filters.start_date,
        filters.end_date,
      ),
  });

  const revenue_by_customers_chart = useMemo<
    Pick<IChartProps, 'data' | 'categories'>
  >(() => {
    const data: number[] = [];
    const categories: string[] = [];

    revenue_by_customers?.data.forEach((item: any) => {
      data.push(item.total_revenue);
      categories.push(item.customer_name);
    });

    return {
      data: [{ name: 'Выручка в разрезе заказчика', values: data }],
      categories,
    };
  }, [revenue_by_customers]);

  return (
    <div
      style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
    >
      <DashboardChartWidget
        type={'bar'}
        data={total_revenue_by_kpgz_category_chart.data}
        categories={total_revenue_by_kpgz_category_chart.categories}
        detail={{
          title: 'Общая выручка по категории КПГЗ',
          width: 650,
        }}
      />
      <DashboardChartWidget
        type={'bar'}
        data={revenue_by_regions_chart.data}
        categories={revenue_by_regions_chart.categories}
        horizontal
        detail={{
          title: 'Выручка по регионам',
          width: 650,
        }}
      />
      <DashboardChartWidget
        type={'line'}
        data={revenue_trend_by_mounth_chart.data}
        categories={revenue_trend_by_mounth_chart.categories}
        detail={{
          title: 'Тренд выручки выручка поставщика по месяцам',
          width: 650,
        }}
      />
      <DashboardChartWidget
        type={'bar'}
        data={revenue_by_customers_chart.data}
        categories={revenue_by_customers_chart.categories}
        detail={{
          title: 'Выручка в разрезе заказчиков',
          width: 650,
        }}
      />
    </div>
  );
}
