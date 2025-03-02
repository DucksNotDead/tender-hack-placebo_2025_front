import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { useResizeDetector } from 'react-resize-detector';

import { IChartProps } from '../model/dashboardTypes';
import { generateColor } from '../lib/generateColor';

import Styles from './DashboarChartWidget.module.scss';

export function DashboardChartWidget({
  type,
  horizontal,
  data,
  categories,
  detail,
}: IChartProps) {
  const { width, ref: wrapper } = useResizeDetector();
  const chartBox = useRef<HTMLDivElement>(null);
  const chart = useRef<echarts.EChartsType | null>(null);

  useEffect(() => {
    if (chartBox.current && !chart.current) {
      chart.current = echarts.init(chartBox.current);
    }
  }, [chartBox, chart]);

  useEffect(() => {
    const { dataAxis, categoryAxis } = horizontal
      ? { dataAxis: 'xAxis', categoryAxis: 'yAxis' }
      : { dataAxis: 'yAxis', categoryAxis: 'xAxis' };
    const plantValues = data.reduce<number[]>(
      (state, current) => [...state, ...current.values],
      [],
    );
    const minValue = Math.min(...plantValues);
    const maxValue = Math.max(...plantValues);
    const option: echarts.EChartsOption = {
      [categoryAxis]: categories.length
        ? {
            data: categories,
            type: 'category',
            nameGap: 200,
          }
        : {},
      [dataAxis]: {
        type: 'value',
        interval: minValue,
        min: detail?.min ?? 0,
        max: detail?.max ?? maxValue + (maxValue % minValue),
        nameGap: 200,
      },
      legend: detail?.dataSwitch
        ? {
            data: data.map(({ name }) => name),
          }
        : undefined,
      title: {
        text: detail?.title,
      },
      tooltip: {
        show: !!detail,
        trigger: 'axis',
      },
      toolbox: {
        show: !!detail,
        feature: {
          saveAsImage: { show: true },
        },
      },
      calculable: true,
      axisLabel: {
        formatter: function (value: string) {
          const maxLength = 18; // Максимальная длина метки
          if (value.length > maxLength) {
            return value.substring(0, maxLength) + '...';
          } else {
            return value;
          }
        },
      },
      series: data.map((group, index) => ({
        name: group.name,
        data: group.values,
        itemStyle: {
          color: generateColor(index, data.length),
        },
        smooth: detail?.smooth,
        type,
      })),
    };
    chart.current?.setOption(option);
  }, [chart, data, horizontal, detail]);

  useEffect(() => {
    const validatedWidth = detail?.width ?? Math.min(Math.max(width ?? 0, 300), 400);
    chart.current?.resize({
      width: validatedWidth,
      height: validatedWidth / 1.2,
    });
  }, [chart, width, detail?.width]);

  return (
    <div ref={wrapper} className={Styles.wrapper}>
      <div ref={chartBox}></div>
    </div>
  );
}
