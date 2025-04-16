'use client';

import { ModelConfig } from '@/components/model/model-config';
import { ModelList } from '@/components/model/model-list';
import { ModelUpload } from '@/components/model/model-upload';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Model = () => {
  return (
    <div className="h-full w-full overflow-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">模型管理</h1>
        <div className="flex gap-2">
          <Link href="/model/workflow-management">
            <Button variant="outline" className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-4"
              >
                <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
                <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2Z"></path>
              </svg>
              工作流管理
            </Button>
          </Link>
        </div>
      </div>
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
