import { Card } from 'antd';
import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

interface IProps {
  title: string;
  type: 'bar' | 'line';
  data: { name: string; values: number[] }[];
  categories: string[];
  horizontal?: boolean;
  dataSwitch?: boolean;
  smooth?: boolean;
}

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
}: IProps) {
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
    const plantValues = data.reduce<number[]>((state, current) => [...state, ...current.values], [])
    const minValue = Math.min(...plantValues);
    const maxValue = Math.max(...plantValues);
    const option: echarts.EChartsOption = {
      [categoryAxis]: categories.length
        ? {
            data: categories,
            type: 'category',
          }
        : {},
      [dataAxis]: {
        type: 'value',
        interval: minValue,
        min: 0,
        max: maxValue + (maxValue % minValue),
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
      <div ref={wrapper} style={{ width: 900, height: 500 }}></div>
    </Card>
  );
}
