'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useState } from 'react';
import { useWorkflow } from './workflow-context';

interface ModelType {
  id: string;
  name: string;
  type: string;
  description: string;
  icon?: string;
}

// 示例模型类型
const modelTypes: ModelType[] = [
  {
    id: 'image-classification',
    name: '图像分类',
    type: 'vision',
    description: '识别图像中的对象类别',
  },
  {
    id: 'object-detection',
    name: '目标检测',
    type: 'vision',
    description: '检测图像中的物体位置和类别',
  },
  {
    id: 'image-segmentation',
    name: '图像分割',
    type: 'vision',
    description: '精确区分图像中的不同对象边界',
  },
  {
    id: 'text-classification',
    name: '文本分类',
    type: 'nlp',
    description: '对文本进行分类',
  },
  {
    id: 'text-generation',
    name: '文本生成',
    type: 'nlp',
    description: '生成新的文本内容',
  },
  {
    id: 'data-preprocessing',
    name: '数据预处理',
    type: 'util',
    description: '清洗和准备数据',
  },
  {
    id: 'model',
    name: '模型',
    type: 'model',
    description: '模型相关配置',
  },
];

export const ModelSelector = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const { addNode } = useWorkflow();

  const filteredModels = selectedType
    ? modelTypes.filter(model => model.type === selectedType)
    : modelTypes;

  const handleDragStart = (e: React.DragEvent, model: ModelType) => {
    e.dataTransfer.setData('application/json', JSON.stringify(model));
    e.dataTransfer.effectAllowed = 'copy';
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>模型库</CardTitle>
        <CardDescription>拖拽模型到工作流画布中</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-wrap gap-2">
          <Button
            variant={selectedType === null ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedType(null)}
          >
            全部
          </Button>
          <Button
            variant={selectedType === 'vision' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedType('vision')}
          >
            视觉
          </Button>
          <Button
            variant={selectedType === 'nlp' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedType('nlp')}
          >
            自然语言
          </Button>
          <Button
            variant={selectedType === 'util' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedType('util')}
          >
            工具
          </Button>
        </div>

        <div className="space-y-3">
          {filteredModels.map(model => (
            <div
              key={model.id}
              className="border-border bg-card hover:border-primary cursor-move rounded-md border p-3 transition-colors"
              draggable
              onDragStart={e => handleDragStart(e, model)}
            >
              <h4 className="font-medium">{model.name}</h4>
              <p className="text-muted-foreground text-xs">
                {model.description}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
