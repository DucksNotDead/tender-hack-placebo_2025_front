import { TProperty } from 'entities/Property';

export interface IChartProps {
  type: 'bar' | 'line';
  data: { name: string; values: number[] }[];
  categories: string[];
  horizontal?: boolean;
  detail?: {
    title?: string;
    index?: number;
    dataSwitch?: boolean;
    smooth?: boolean;
    loading?: boolean;
    min?: number;
    max?: number;
    created_at?: string;
    updated_at?: string;
  };
}

export interface IDashboardSubscriber {
  id: number;
  full_name: string;
  email: string;
  supplier_id: number;
}

export interface IDashboardMetric {
  id: number;
  name: string;
  value: number;
  unit: string;
}

export type TDashboardFilter = Record<string, string>;

interface IDashboardBase {
  id: string;
  title: string;
  owner: IDashboardSubscriber;
  properties: TProperty[];
  metrics: IDashboardMetric[];
  subscribers: IDashboardSubscriber[];
}

export type TDashboardCreateRequest = Pick<
  IDashboardBase,
  'title' | 'properties'
> & { owner_id: number };

export type TDashboardCard = IDashboardBase & {
  mainChart: IChartProps;
};

export type TDashboardFull = IDashboardBase & {
  charts: IChartProps[];
  filters: TDashboardFilter[];
};
