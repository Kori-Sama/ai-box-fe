'use client';

import { ModelConfig } from '@/components/model/model-config';
import { ModelList } from '@/components/model/model-list';
import { ModelUpload } from '@/components/model/model-upload';

const Model = () => {
  return (
    <div className="h-full w-full overflow-auto p-6">
      <h1 className="mb-6 text-2xl font-bold">模型管理</h1>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ModelList />
        </div>
        <div className="flex flex-col gap-6">
          <ModelUpload />
          <ModelConfig />
        </div>
      </div>
    </div>
  );
};

export default Model;
