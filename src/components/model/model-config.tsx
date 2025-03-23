'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

interface ConfigFormData {
  name: string;
  threshold: string;
  device: 'cpu' | 'gpu';
}

export const ModelConfig = () => {
  const [formData, setFormData] = useState<ConfigFormData>({
    name: '',
    threshold: '0.5',
    device: 'cpu',
  });
  const [deploying, setDeploying] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDeviceChange = (device: 'cpu' | 'gpu') => {
    setFormData(prev => ({
      ...prev,
      device,
    }));
  };

  const handleDeploy = () => {
    setDeploying(true);
    // 模拟部署过程
    setTimeout(() => {
      setDeploying(false);
      // 这里应该添加成功提示
      alert('模型部署成功！');
    }, 2000);

    // 实际项目中，这里应该调用API部署模型
    // await fetch('/api/models/deploy', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(formData),
    // });
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>模型配置</CardTitle>
        <CardDescription>配置选中的模型参数并部署</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="model-name" className="text-sm font-medium">
            模型名称
          </label>
          <Input
            id="model-name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="输入模型名称"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="threshold" className="text-sm font-medium">
            检测阈值
          </label>
          <Input
            id="threshold"
            name="threshold"
            type="number"
            min="0"
            max="1"
            step="0.01"
            value={formData.threshold}
            onChange={handleInputChange}
            placeholder="0.5"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">运行设备</label>
          <div className="flex gap-2">
            <Button
              variant={formData.device === 'cpu' ? 'default' : 'outline'}
              onClick={() => handleDeviceChange('cpu')}
              size="sm"
            >
              CPU
            </Button>
            <Button
              variant={formData.device === 'gpu' ? 'default' : 'outline'}
              onClick={() => handleDeviceChange('gpu')}
              size="sm"
            >
              GPU
            </Button>
          </div>
        </div>

        <Button
          onClick={handleDeploy}
          disabled={!formData.name || deploying}
          className="mt-4"
        >
          {deploying ? '部署中...' : '部署模型'}
        </Button>
      </CardContent>
    </Card>
  );
};
