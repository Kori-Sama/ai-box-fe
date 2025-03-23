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

export const ModelUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    // 模拟上传过程
    setTimeout(() => {
      setUploading(false);
      setFile(null);
      // 这里应该添加成功提示
      alert('模型上传成功！');
    }, 2000);

    // 实际项目中，这里应该调用API上传文件
    // const formData = new FormData();
    // formData.append('model', file);
    // await fetch('/api/models/upload', {
    //   method: 'POST',
    //   body: formData,
    // });
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>上传模型</CardTitle>
        <CardDescription>选择一个模型文件进行上传</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="model-file" className="text-sm font-medium">
            模型文件
          </label>
          <Input
            id="model-file"
            type="file"
            accept=".onnx,.pt,.pth,.h5,.tflite,.pb"
            onChange={handleFileChange}
            disabled={uploading}
          />
        </div>
        {file && (
          <div className="text-sm">
            <p>文件名: {file.name}</p>
            <p>大小: {(file.size / (1024 * 1024)).toFixed(2)} MB</p>
          </div>
        )}
        <Button
          onClick={handleUpload}
          disabled={!file || uploading}
          className="mt-2"
        >
          {uploading ? '上传中...' : '上传模型'}
        </Button>
      </CardContent>
    </Card>
  );
};
