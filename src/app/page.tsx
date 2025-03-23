/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { EChart } from '@/components/foo/echart';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table as UITable,
} from '@/components/ui/table';
import Camera from '@/icons/camera';
import DashBoard from '@/icons/dashboard';
import Model from '@/icons/model';
import { useState } from 'react';

const Home = () => {
  const [currentTime] = useState(new Date());
  const [runningTime] = useState(1230);

  // // 更新当前时间
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setCurrentTime(new Date());
  //     setRunningTime(prev => prev + 1);
  //   }, 1000);

  //   return () => clearInterval(timer);
  // }, []);

  // 模型部署数据
  const modelData = [
    { name: 'YOLOv8', type: '目标检测', status: '已部署', device: 'GPU' },
    { name: 'ResNet50', type: '图像分类', status: '已部署', device: 'CPU' },
    { name: 'MobileNetV2', type: '图像分类', status: '未部署', device: '-' },
  ];

  // 摄像头状态数据
  const cameraData = [
    { id: 'CAM001', location: '前门', status: '在线', fps: 30 },
    { id: 'CAM002', location: '后门', status: '在线', fps: 25 },
    { id: 'CAM003', location: '仓库', status: '离线', fps: 0 },
    { id: 'CAM004', location: '办公室', status: '在线', fps: 15 },
  ];

  // 格式化运行时间
  const formatRunningTime = (seconds: any) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="h-full w-full overflow-auto p-4">
      {/* 顶部状态卡片 */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <DashBoard className="h-4 w-4" />
              当前时间
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {currentTime.toLocaleTimeString()}
            </div>
            <p className="text-muted-foreground mt-1 text-xs">
              {currentTime.toLocaleDateString()}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <DashBoard className="h-4 w-4" />
              地点
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">总部</div>
            <p className="text-muted-foreground mt-1 text-xs">北京市海淀区</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <DashBoard className="h-4 w-4" />
              运行时长
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatRunningTime(runningTime)}
            </div>
            <p className="text-muted-foreground mt-1 text-xs">自系统启动以来</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <DashBoard className="h-4 w-4" />
              系统状态
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">运行中</div>
            <p className="text-muted-foreground mt-1 text-xs">所有服务正常</p>
          </CardContent>
        </Card>
      </div>

      {/* 主要内容区域 */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* 左侧：模型部署情况 */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Model className="h-5 w-5" />
              模型部署情况
            </CardTitle>
            <CardDescription>当前已部署的AI模型状态</CardDescription>
          </CardHeader>
          <CardContent>
            <UITable>
              <TableHeader>
                <TableRow>
                  <TableHead>模型名称</TableHead>
                  <TableHead>类型</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>运行设备</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {modelData.map((model, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{model.name}</TableCell>
                    <TableCell>{model.type}</TableCell>
                    <TableCell>
                      <span
                        className={
                          model.status === '已部署'
                            ? 'text-green-500'
                            : 'text-gray-500'
                        }
                      >
                        {model.status}
                      </span>
                    </TableCell>
                    <TableCell>{model.device}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </UITable>

            <div className="mt-6">
              <h3 className="mb-2 text-sm font-medium">模型使用统计</h3>
              <div className="h-[400px]">
                <EChart
                  options={{
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
                        data: modelData.map(model => model.name),
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
                        name: '调用次数',
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
                        name: '模型调用次数',
                        type: 'bar',
                        barWidth: '60%',
                        data: [156, 120, 0], // 对应模型的调用次数
                        itemStyle: {
                          color: '#2563eb',
                        },
                      },
                    ],
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 右侧：摄像头状态 */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5" />
              摄像头状态
            </CardTitle>
            <CardDescription>连接的摄像头实时状态</CardDescription>
          </CardHeader>
          <CardContent>
            <UITable>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>位置</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>帧率</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cameraData.map((camera, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{camera.id}</TableCell>
                    <TableCell>{camera.location}</TableCell>
                    <TableCell>
                      <span
                        className={
                          camera.status === '在线'
                            ? 'text-green-500'
                            : 'text-red-500'
                        }
                      >
                        {camera.status}
                      </span>
                    </TableCell>
                    <TableCell>{camera.fps} FPS</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </UITable>

            <div className="mt-6">
              <h3 className="mb-2 text-sm font-medium">摄像头数据统计</h3>
              <div className="h-[300px]">
                <EChart
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
                        name: '摄像头状态',
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
                          { value: 3, name: '在线' },
                          { value: 1, name: '离线' },
                        ],
                      },
                    ],
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;
