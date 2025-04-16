'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// 工作流类型定义
interface Workflow {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

const WorkflowManagementPage = () => {
  const router = useRouter();
  const [workflows, setWorkflows] = useState<Workflow[]>([
    {
      id: '1',
      name: '文本处理工作流',
      description: '用于处理和分析文本数据的工作流',
      createdAt: '2023-05-15',
      updatedAt: '2023-06-20',
    },
    {
      id: '2',
      name: '图像识别工作流',
      description: '用于图像识别和分类的工作流',
      createdAt: '2023-07-10',
      updatedAt: '2023-07-10',
    },
    {
      id: '3',
      name: '数据分析工作流',
      description: '用于数据清洗和分析的工作流',
      createdAt: '2023-08-05',
      updatedAt: '2023-09-12',
    },
  ]);

  const [newWorkflow, setNewWorkflow] = useState<
    Omit<Workflow, 'id' | 'createdAt' | 'updatedAt'>
  >({
    name: '',
    description: '',
  });

  const [editWorkflow, setEditWorkflow] = useState<Workflow | null>(null);

  // 生成随机ID
  const generateId = () => Math.random().toString(36).substring(2, 9);

  // 创建新工作流
  const handleCreateWorkflow = () => {
    if (!newWorkflow.name.trim()) return;

    const now = new Date().toISOString().split('T')[0];
    const workflow: Workflow = {
      id: generateId(),
      name: newWorkflow.name,
      description: newWorkflow.description,
      createdAt: now,
      updatedAt: now,
    };

    setWorkflows([...workflows, workflow]);
    setNewWorkflow({ name: '', description: '' });
  };

  // 更新工作流
  const handleUpdateWorkflow = () => {
    if (!editWorkflow || !editWorkflow.name.trim()) return;

    const now = new Date().toISOString().split('T')[0];
    const updatedWorkflow = {
      ...editWorkflow,
      updatedAt: now,
    };

    setWorkflows(
      workflows.map(w => (w.id === updatedWorkflow.id ? updatedWorkflow : w))
    );
    setEditWorkflow(null);
  };

  // 删除工作流
  const handleDeleteWorkflow = (id: string) => {
    if (confirm('确定要删除这个工作流吗？')) {
      setWorkflows(workflows.filter(w => w.id !== id));
    }
  };

  // 打开编辑工作流
  const handleEditClick = (workflow: Workflow) => {
    setEditWorkflow(workflow);
  };

  // 导航到工作流编辑页面
  const handleWorkflowClick = (id: string) => {
    router.push(`/model/workflow?id=${id}`);
  };

  return (
    <div className="h-full w-full overflow-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">工作流管理</h1>
        <div className="flex gap-2">
          <Link href="/model">
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
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              返回模型管理
            </Button>
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button className="flex items-center gap-2">
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
                  <path d="M12 5v14M5 12h14" />
                </svg>
                新建工作流
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>新建工作流</SheetTitle>
                <SheetDescription>创建一个新的模型工作流</SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label htmlFor="name">工作流名称</label>
                  <Input
                    id="name"
                    value={newWorkflow.name}
                    onChange={e =>
                      setNewWorkflow({ ...newWorkflow, name: e.target.value })
                    }
                    placeholder="输入工作流名称"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="description">工作流描述</label>
                  <Input
                    id="description"
                    value={newWorkflow.description}
                    onChange={e =>
                      setNewWorkflow({
                        ...newWorkflow,
                        description: e.target.value,
                      })
                    }
                    placeholder="输入工作流描述"
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <SheetClose asChild>
                  <Button variant="outline">取消</Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button onClick={handleCreateWorkflow}>创建</Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {workflows.map(workflow => (
          <Card
            key={workflow.id}
            className="hover:border-primary cursor-pointer transition-colors"
          >
            <CardHeader className="pb-2">
              <CardTitle
                className="hover:text-primary text-xl transition-colors"
                onClick={() => handleWorkflowClick(workflow.id)}
              >
                {workflow.name}
              </CardTitle>
              <CardDescription>
                创建于: {workflow.createdAt}
                {workflow.updatedAt !== workflow.createdAt &&
                  ` · 更新于: ${workflow.updatedAt}`}
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-muted-foreground text-sm">
                {workflow.description}
              </p>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={e => {
                      e.stopPropagation();
                      handleEditClick(workflow);
                    }}
                  >
                    编辑
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>编辑工作流</SheetTitle>
                    <SheetDescription>修改工作流信息</SheetDescription>
                  </SheetHeader>
                  {editWorkflow && (
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <label htmlFor="edit-name">工作流名称</label>
                        <Input
                          id="edit-name"
                          value={editWorkflow.name}
                          onChange={e =>
                            setEditWorkflow({
                              ...editWorkflow,
                              name: e.target.value,
                            })
                          }
                          placeholder="输入工作流名称"
                        />
                      </div>
                      <div className="grid gap-2">
                        <label htmlFor="edit-description">工作流描述</label>
                        <Input
                          id="edit-description"
                          value={editWorkflow.description}
                          onChange={e =>
                            setEditWorkflow({
                              ...editWorkflow,
                              description: e.target.value,
                            })
                          }
                          placeholder="输入工作流描述"
                        />
                      </div>
                    </div>
                  )}
                  <div className="mt-4 flex justify-end gap-2">
                    <SheetClose asChild>
                      <Button variant="outline">取消</Button>
                    </SheetClose>
                    <SheetClose asChild>
                      <Button onClick={handleUpdateWorkflow}>保存</Button>
                    </SheetClose>
                  </div>
                </SheetContent>
              </Sheet>
              <Button
                variant="outline"
                size="sm"
                className="text-destructive hover:bg-destructive hover:text-white"
                onClick={e => {
                  e.stopPropagation();
                  handleDeleteWorkflow(workflow.id);
                }}
              >
                删除
              </Button>
              <Button
                size="sm"
                onClick={e => {
                  e.stopPropagation();
                  handleWorkflowClick(workflow.id);
                }}
              >
                编辑工作流
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WorkflowManagementPage;
