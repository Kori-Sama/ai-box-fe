'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useWorkflow } from './workflow-context';
import { v4 as uuidv4 } from 'uuid';

// 示例数据类型
const dataTypes = [
    'string',
    'number',
    'boolean',
    'array',
    'object',
    'image',
    'video',
    'audio',
    'text',
    'json',
    'any'
];

export const ModelWorkflowSettings = () => {
    const {
        selectedNodeId,
        getSelectedNode,
        updateNode,
    } = useWorkflow();

    const selectedNode = getSelectedNode();

    const [newPortName, setNewPortName] = useState('');
    const [newPortType, setNewPortType] = useState('any');
    const [isAddingInput, setIsAddingInput] = useState(false);
    const [isAddingOutput, setIsAddingOutput] = useState(false);

    // 添加新的输入或输出端口
    const handleAddPort = (isInput: boolean) => {
        if (!selectedNode || !newPortName) return;

        const newPort = {
            id: `${isInput ? 'input' : 'output'}-${uuidv4()}`,
            name: newPortName,
            type: newPortType
        };

        if (isInput) {
            updateNode(selectedNode.id, {
                ...selectedNode,
                inputs: [...selectedNode.inputs, newPort]
            });
        } else {
            updateNode(selectedNode.id, {
                ...selectedNode,
                outputs: [...selectedNode.outputs, newPort]
            });
        }

        // 重置表单
        setNewPortName('');
        setNewPortType('any');
        setIsAddingInput(false);
        setIsAddingOutput(false);
    };

    // 删除端口
    const handleDeletePort = (portId: string, isInput: boolean) => {
        if (!selectedNode) return;

        if (isInput) {
            updateNode(selectedNode.id, {
                ...selectedNode,
                inputs: selectedNode.inputs.filter(input => input.id !== portId)
            });
        } else {
            updateNode(selectedNode.id, {
                ...selectedNode,
                outputs: selectedNode.outputs.filter(output => output.id !== portId)
            });
        }
    };

    // 更新端口类型
    const handleChangePortType = (portId: string, newType: string, isInput: boolean) => {
        if (!selectedNode) return;

        if (isInput) {
            updateNode(selectedNode.id, {
                ...selectedNode,
                inputs: selectedNode.inputs.map(input =>
                    input.id === portId ? { ...input, type: newType } : input
                )
            });
        } else {
            updateNode(selectedNode.id, {
                ...selectedNode,
                outputs: selectedNode.outputs.map(output =>
                    output.id === portId ? { ...output, type: newType } : output
                )
            });
        }
    };

    // 更新节点名称
    const handleNameChange = (name: string) => {
        if (!selectedNode) return;
        updateNode(selectedNode.id, {
            ...selectedNode,
            name
        });
    };

    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>工作流设置</CardTitle>
                <CardDescription>配置选中节点的输入输出</CardDescription>
            </CardHeader>
            <CardContent>
                {!selectedNode ? (
                    <div className="text-center py-10 text-muted-foreground">
                        请选择一个节点进行配置
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-sm font-medium mb-2">节点名称</h3>
                            <Input
                                value={selectedNode.name}
                                onChange={(e) => handleNameChange(e.target.value)}
                            />
                        </div>

                        {/* 输入配置 */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-sm font-medium">输入端口</h3>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setIsAddingInput(!isAddingInput)}
                                >
                                    {isAddingInput ? '取消' : '添加输入'}
                                </Button>
                            </div>

                            {isAddingInput && (
                                <div className="space-y-2 mb-4 p-2 border border-border rounded-md">
                                    <Input
                                        placeholder="输入端口名称"
                                        value={newPortName}
                                        onChange={(e) => setNewPortName(e.target.value)}
                                    />
                                    <select
                                        className="w-full p-2 rounded-md border border-border bg-background"
                                        value={newPortType}
                                        onChange={(e) => setNewPortType(e.target.value)}
                                    >
                                        {dataTypes.map(type => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                    <Button
                                        size="sm"
                                        onClick={() => handleAddPort(true)}
                                        disabled={!newPortName}
                                    >
                                        添加
                                    </Button>
                                </div>
                            )}

                            <div className="space-y-2">
                                {selectedNode.inputs.map(input => (
                                    <div key={input.id} className="flex items-center space-x-2 p-2 border border-border rounded-md">
                                        <span className="text-xs flex-1">{input.name}</span>
                                        <select
                                            className="text-xs p-1 rounded border border-border bg-background"
                                            value={input.type}
                                            onChange={(e) => handleChangePortType(input.id, e.target.value, true)}
                                        >
                                            {dataTypes.map(type => (
                                                <option key={type} value={type}>{type}</option>
                                            ))}
                                        </select>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-6 w-6 p-0 text-xs text-destructive"
                                            onClick={() => handleDeletePort(input.id, true)}
                                        >
                                            ✕
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 输出配置 */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-sm font-medium">输出端口</h3>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setIsAddingOutput(!isAddingOutput)}
                                >
                                    {isAddingOutput ? '取消' : '添加输出'}
                                </Button>
                            </div>

                            {isAddingOutput && (
                                <div className="space-y-2 mb-4 p-2 border border-border rounded-md">
                                    <Input
                                        placeholder="输出端口名称"
                                        value={newPortName}
                                        onChange={(e) => setNewPortName(e.target.value)}
                                    />
                                    <select
                                        className="w-full p-2 rounded-md border border-border bg-background"
                                        value={newPortType}
                                        onChange={(e) => setNewPortType(e.target.value)}
                                    >
                                        {dataTypes.map(type => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                    <Button
                                        size="sm"
                                        onClick={() => handleAddPort(false)}
                                        disabled={!newPortName}
                                    >
                                        添加
                                    </Button>
                                </div>
                            )}

                            <div className="space-y-2">
                                {selectedNode.outputs.map(output => (
                                    <div key={output.id} className="flex items-center space-x-2 p-2 border border-border rounded-md">
                                        <span className="text-xs flex-1">{output.name}</span>
                                        <select
                                            className="text-xs p-1 rounded border border-border bg-background"
                                            value={output.type}
                                            onChange={(e) => handleChangePortType(output.id, e.target.value, false)}
                                        >
                                            {dataTypes.map(type => (
                                                <option key={type} value={type}>{type}</option>
                                            ))}
                                        </select>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-6 w-6 p-0 text-xs text-destructive"
                                            onClick={() => handleDeletePort(output.id, false)}
                                        >
                                            ✕
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};