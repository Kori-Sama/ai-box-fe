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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useState } from 'react';

interface ModelItem {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  status: 'active' | 'inactive';
}

const demoModels: ModelItem[] = [
  {
    id: '1',
    name: 'YOLOv8',
    type: '目标检测',
    size: '15.2MB',
    uploadDate: '2023-12-01',
    status: 'active',
  },
  {
    id: '2',
    name: 'ResNet50',
    type: '图像分类',
    size: '23.5MB',
    uploadDate: '2023-11-15',
    status: 'inactive',
  },
  {
    id: '3',
    name: 'MobileNetV2',
    type: '图像分类',
    size: '8.7MB',
    uploadDate: '2023-10-20',
    status: 'active',
  },
];

export const ModelList = () => {
  const [models, setModels] = useState<ModelItem[]>(demoModels);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  const handleSelectModel = (id: string) => {
    setSelectedModel(id === selectedModel ? null : id);
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>模型列表</CardTitle>
        <CardDescription>选择一个模型进行配置或部署</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>名称</TableHead>
              <TableHead>类型</TableHead>
              <TableHead>大小</TableHead>
              <TableHead>上传日期</TableHead>
              <TableHead>状态</TableHead>
              <TableHead>操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {models.map(model => (
              <TableRow
                key={model.id}
                className={selectedModel === model.id ? 'bg-muted' : ''}
                onClick={() => handleSelectModel(model.id)}
              >
                <TableCell className="font-medium">{model.name}</TableCell>
                <TableCell>{model.type}</TableCell>
                <TableCell>{model.size}</TableCell>
                <TableCell>{model.uploadDate}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${model.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
                  >
                    {model.status === 'active' ? '已激活' : '未激活'}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={e => {
                        e.stopPropagation();
                        // 配置模型逻辑
                      }}
                    >
                      配置
                    </Button>
                    <Button
                      variant={
                        model.status === 'active' ? 'destructive' : 'secondary'
                      }
                      size="sm"
                      onClick={e => {
                        e.stopPropagation();
                        // 激活/停用模型逻辑
                      }}
                    >
                      {model.status === 'active' ? '停用' : '激活'}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
