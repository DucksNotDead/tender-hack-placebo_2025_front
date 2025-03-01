import { Card } from 'antd';
import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

import { IChartProps } from '../model/chartTypes';

function generateColor(index: number, totalItems: number) {
  const hue = (index / totalItems) * 360; // Распределяем оттенки равномерно по кругу
  return `hsla(${hue}, 70%, 50%, 0.7)`; // HSLA с 50% прозрачностью
}

export function AppChart({
  smooth,
  title,
  type,
  horizontal,
  data,
  categories,
  dataSwitch,
}: IChartProps) {
  const wrapper = useRef<HTMLDivElement>(null);
  const chart = useRef<echarts.EChartsType | null>(null);

  useEffect(() => {
    if (wrapper.current && !chart.current) {
      chart.current = echarts.init(wrapper.current);
    }
  }, [wrapper, chart]);

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
        min: 0,
        max: maxValue + (maxValue % minValue),
        nameGap: 200,
      },
      legend: dataSwitch
        ? {
            data: data.map(({ name }) => name),
          }
        : undefined,
      title: {
        text: title,
      },
      tooltip: {
        trigger: 'axis',
      },
      toolbox: {
        show: true,
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
        }
      },
      series: data.map((group, index) => ({
        name: group.name,
        data: group.values,
        itemStyle: {
          color: generateColor(index, data.length),
        },
        smooth,
        type,
      })),
    };
    chart.current?.setOption(option);
  }, [chart, data, horizontal, title]);

  return (
    <Card>
      <div ref={wrapper} style={{ width: 1700, height: 700 }}></div>
    </Card>
  );
}
