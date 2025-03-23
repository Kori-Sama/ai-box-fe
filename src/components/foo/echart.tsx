'use client';

import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';

import { cn } from '@/lib/utils';

// 定义ECharts配置类型
type EChartOptions = echarts.EChartsOption;

// 示例数据
const chartData = [
  { month: 'January', value: 186 },
  { month: 'February', value: 305 },
  { month: 'March', value: 237 },
  { month: 'April', value: 73 },
  { month: 'May', value: 209 },
  { month: 'June', value: 214 },
];

// 创建ECharts配置
const getChartOptions = (): EChartOptions => ({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: [
    {
      type: 'category',
      data: chartData.map(item => item.month),
      axisTick: {
        alignWithLabel: true,
      },
      axisLabel: {
        color: 'var(--muted-foreground)',
      },
      axisLine: {
        lineStyle: {
          color: 'var(--border)',
        },
      },
    },
  ],
  yAxis: [
    {
      type: 'value',
      axisLabel: {
        color: 'var(--muted-foreground)',
      },
      axisLine: {
        lineStyle: {
          color: 'var(--border)',
        },
      },
      splitLine: {
        lineStyle: {
          color: 'var(--border)',
          opacity: 0.3,
        },
      },
    },
  ],
  series: [
    {
      name: 'Monthly Data',
      type: 'bar',
      barWidth: '60%',
      data: chartData.map(item => item.value),
      itemStyle: {
        color: '#2563eb',
      },
    },
  ],
});

interface EChartProps extends React.HTMLAttributes<HTMLDivElement> {
  options?: EChartOptions;
  theme?: string;
  loading?: boolean;
  height?: string | number;
}

export function EChart({
  className,
  options,
  theme,
  loading = false,
  height = '400px',
  ...props
}: EChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  // 初始化图表
  useEffect(() => {
    if (!chartRef.current) return;

    // 如果已经有实例，先销毁
    if (chartInstance.current) {
      chartInstance.current.dispose();
    }

    // 创建新实例
    const chart = echarts.init(chartRef.current, theme);
    chartInstance.current = chart;

    // 设置加载状态
    if (loading) {
      chart.showLoading();
    } else {
      chart.hideLoading();
    }

    // 设置选项
    const finalOptions = options || getChartOptions();
    chart.setOption(finalOptions);

    // 响应窗口大小变化
    const handleResize = () => {
      chart.resize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.dispose();
      chartInstance.current = null;
    };
  }, [options, theme, loading]);

  return (
    <div
      ref={chartRef}
      className={cn('w-full', className)}
      style={{ height }}
      {...props}
    />
  );
}

// 示例组件
export function Component() {
  return (
    <div className="space-y-4 p-4">
      <h2 className="text-xl font-semibold">ECharts 示例</h2>
      <EChart className="rounded-lg border" />

      {/* 自定义选项示例 */}
      <h2 className="mt-8 text-xl font-semibold">自定义 ECharts 示例</h2>
      <EChart
        className="rounded-lg border"
        options={{
          tooltip: {
            trigger: 'item',
          },
          legend: {
            top: '5%',
            left: 'center',
            textStyle: {
              color: 'var(--foreground)',
            },
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: 'var(--background)',
                borderWidth: 2,
              },
              label: {
                show: false,
                position: 'center',
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: 16,
                  fontWeight: 'bold',
                },
              },
              labelLine: {
                show: false,
              },
              data: [
                { value: 1048, name: '搜索引擎' },
                { value: 735, name: '直接访问' },
                { value: 580, name: '邮件营销' },
                { value: 484, name: '联盟广告' },
                { value: 300, name: '视频广告' },
              ],
            },
          ],
        }}
      />
    </div>
  );
}
