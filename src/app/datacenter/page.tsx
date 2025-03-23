'use client';

import { EChart } from '@/components/foo/echart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EChartsOption } from 'echarts';

// 模拟模型历年数据
const modelYearlyData = [
  { year: '2019', count: 120 },
  { year: '2020', count: 250 },
  { year: '2021', count: 380 },
  { year: '2022', count: 470 },
  { year: '2023', count: 650 },
  { year: '2024', count: 820 },
];

// 模拟摄像头历年数据
const cameraYearlyData = [
  { year: '2019', count: 35 },
  { year: '2020', count: 78 },
  { year: '2021', count: 120 },
  { year: '2022', count: 189 },
  { year: '2023', count: 256 },
  { year: '2024', count: 310 },
];

// 模型类型分布数据
const modelTypeData = [
  { value: 425, name: '图像识别' },
  { value: 310, name: '目标检测' },
  { value: 234, name: '人脸识别' },
  { value: 155, name: '姿态估计' },
  { value: 130, name: '语义分割' },
];

// 摄像头类型分布数据
const cameraTypeData = [
  { value: 150, name: '室内固定' },
  { value: 108, name: '室外固定' },
  { value: 86, name: '云台摄像头' },
  { value: 72, name: '智能球机' },
  { value: 48, name: '热成像' },
];

const DataCenter = () => {
  // 模型历年数据图表配置
  const modelYearlyOptions: EChartsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    legend: {
      data: ['模型数量'],
      textStyle: {
        color: 'var(--foreground)',
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
        data: modelYearlyData.map(item => item.year),
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
        name: '数量',
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
        name: '模型数量',
        type: 'bar',
        barWidth: '60%',
        data: modelYearlyData.map(item => item.count),
        itemStyle: {
          color: '#2563eb',
        },
      },
    ],
  };

  // 摄像头历年数据图表配置
  const cameraYearlyOptions: EChartsOption = {
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['摄像头数量'],
      textStyle: {
        color: 'var(--foreground)',
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: cameraYearlyData.map(item => item.year),
      axisLabel: {
        color: 'var(--muted-foreground)',
      },
      axisLine: {
        lineStyle: {
          color: 'var(--border)',
        },
      },
    },
    yAxis: {
      type: 'value',
      name: '数量',
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
    series: [
      {
        name: '摄像头数量',
        type: 'line',
        stack: 'Total',
        data: cameraYearlyData.map(item => item.count),
        smooth: true,
        lineStyle: {
          color: '#10b981',
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(16, 185, 129, 0.5)',
              },
              {
                offset: 1,
                color: 'rgba(16, 185, 129, 0.05)',
              },
            ],
          },
        },
      },
    ],
  };

  // 模型类型分布图表配置
  const modelTypeOptions: EChartsOption = {
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
        name: '模型类型',
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
        data: modelTypeData,
      },
    ],
  };

  // 摄像头类型分布图表配置
  const cameraTypeOptions: EChartsOption = {
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
        name: '摄像头类型',
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
        data: cameraTypeData,
      },
    ],
  };

  return (
    <div className="h-full w-full overflow-auto p-6">
      <h1 className="mb-6 text-2xl font-bold">数据中心</h1>

      {/* 模型数据部分 */}
      <div className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">模型数据统计</h2>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>模型历年数量趋势</CardTitle>
            </CardHeader>
            <CardContent>
              <EChart options={modelYearlyOptions} height={300} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>模型类型分布</CardTitle>
            </CardHeader>
            <CardContent>
              <EChart options={modelTypeOptions} height={300} />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 摄像头数据部分 */}
      <div>
        <h2 className="mb-4 text-xl font-semibold">摄像头数据统计</h2>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>摄像头历年数量趋势</CardTitle>
            </CardHeader>
            <CardContent>
              <EChart options={cameraYearlyOptions} height={300} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>摄像头类型分布</CardTitle>
            </CardHeader>
            <CardContent>
              <EChart options={cameraTypeOptions} height={300} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DataCenter;
