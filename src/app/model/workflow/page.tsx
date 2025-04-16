'use client';

import { ModelWorkflow, ModelWorkflowSettings, ModelSelector } from '@/components/model/workflow';
import { WorkflowProvider } from '@/components/model/workflow/workflow-context';

const WorkflowPage = () => {
    return (
        <div className="h-full w-full overflow-auto p-6">
            <h1 className="mb-6 text-2xl font-bold">模型工作流</h1>
            <WorkflowProvider>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                    <div className="lg:col-span-3">
                        <ModelSelector />
                    </div>
                    <div className="lg:col-span-6">
                        <ModelWorkflow />
                    </div>
                    <div className="lg:col-span-3">
                        <ModelWorkflowSettings />
                    </div>
                </div>
            </WorkflowProvider>
        </div>
    );
};

export default WorkflowPage;