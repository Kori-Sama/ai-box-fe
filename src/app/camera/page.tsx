'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table as UITable,
} from '@/components/ui/table';
import { ChevronDownIcon } from 'lucide-react';
import { useState } from 'react';

const Camera = () => {
  // 区域数据
  const areas = ['全部', '前门区域', '后门区域', '仓库区域', '办公区域'];
  const [selectedArea, setSelectedArea] = useState('全部');

  // 摄像头数据
  const cameraData = [
    {
      id: 'CAM001',
      location: '前门',
      area: '前门区域',
      status: '在线',
      fps: 30,
    },
    {
      id: 'CAM002',
      location: '后门',
      area: '后门区域',
      status: '在线',
      fps: 25,
    },
    {
      id: 'CAM003',
      location: '仓库入口',
      area: '仓库区域',
      status: '离线',
      fps: 0,
    },
    {
      id: 'CAM004',
      location: '仓库通道',
      area: '仓库区域',
      status: '在线',
      fps: 15,
    },
    {
      id: 'CAM005',
      location: '办公室前台',
      area: '办公区域',
      status: '在线',
      fps: 20,
    },
    {
      id: 'CAM006',
      location: '办公室走廊',
      area: '办公区域',
      status: '在线',
      fps: 18,
    },
    {
      id: 'CAM007',
      location: '前门侧面',
      area: '前门区域',
      status: '在线',
      fps: 28,
    },
  ];

  // 根据选择的区域过滤摄像头
  const filteredCameras =
    selectedArea === '全部'
      ? cameraData
      : cameraData.filter(camera => camera.area === selectedArea);

  return (
    <div className="flex h-full w-full flex-col p-4">
      <div className="mb-6 flex flex-col gap-6">
        {/* 区域选择和摄像头状态 */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">摄像头管理</h1>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-2">
                  {selectedArea} <ChevronDownIcon className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {areas.map(area => (
                  <DropdownMenuItem
                    key={area}
                    onClick={() => setSelectedArea(area)}
                  >
                    {area}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
              <span className="text-sm">在线</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full bg-gray-400"></div>
              <span className="text-sm">离线</span>
            </div>
          </div>
        </div>

        {/* 摄像头状态表格 */}
        <Card>
          <CardHeader>
            <CardTitle>摄像头状态</CardTitle>
            <CardDescription>
              {selectedArea === '全部' ? '所有区域' : selectedArea}
              的摄像头运行情况
            </CardDescription>
          </CardHeader>
          <CardContent>
            <UITable>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>位置</TableHead>
                  <TableHead>区域</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>帧率</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCameras.map(camera => (
                  <TableRow key={camera.id}>
                    <TableCell className="font-medium">{camera.id}</TableCell>
                    <TableCell>{camera.location}</TableCell>
                    <TableCell>{camera.area}</TableCell>
                    <TableCell>
                      <span
                        className={
                          camera.status === '在线'
                            ? 'text-green-500'
                            : 'text-gray-500'
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
          </CardContent>
        </Card>
      </div>

      {/* 摄像头视图区域 */}
      <div className="mt-6 w-full">
        <h2 className="mb-4 text-xl font-semibold">摄像头视图</h2>
        <div className="overflow-x-auto pb-4">
          <div
            className="flex gap-4 overflow-hidden"
            style={{ minWidth: 'max-content' }}
          >
            {filteredCameras.map(camera => (
              <Card key={camera.id} className="w-[300px] flex-shrink-0">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">
                    {camera.id} - {camera.location}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    className={`flex h-[200px] items-center justify-center rounded-md ${camera.status === '在线' ? 'bg-gray-100' : 'bg-gray-200'}`}
                  >
                    {camera.status === '在线' ? (
                      <div className="relative h-full w-full">
                        {/* 这里可以放置真实的摄像头视频流，现在用占位符 */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="h-16 w-16 animate-pulse rounded-full bg-gray-300"></div>
                        </div>
                        <div className="absolute right-2 bottom-2 rounded bg-black/50 px-2 py-1 text-xs text-white">
                          {camera.fps} FPS
                        </div>
                      </div>
                    ) : (
                      <span className="text-gray-500">离线</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Camera;
