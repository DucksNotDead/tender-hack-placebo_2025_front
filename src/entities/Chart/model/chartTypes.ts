export interface IChart {}

export interface IChartProps {
  title: string;
  type: 'bar' | 'line';
  data: { name: string; values: number[] }[];
  categories: string[];
  horizontal?: boolean;
  dataSwitch?: boolean;
  smooth?: boolean;
  loading?: boolean;
  min?: number;
  max?: number;
}