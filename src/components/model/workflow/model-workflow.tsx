'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useWorkflow } from './workflow-context';
import { v4 as uuidv4 } from 'uuid';

export const ModelWorkflow = () => {
    const {
        nodes,
        connections,
        selectedNodeId,
        setSelectedNodeId,
        addNode,
        removeNode,
        updateNode,
        addConnection,
        removeConnection,
        clearWorkflow,
        saveWorkflow
    } = useWorkflow();

    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [isConnecting, setIsConnecting] = useState(false);
    const [connectionStart, setConnectionStart] = useState<{
        nodeId: string;
        portId: string;
        isInput: boolean;
        x: number;
        y: number;
    } | null>(null);
    const [connectionEnd, setConnectionEnd] = useState<{
        x: number;
        y: number;
    } | null>(null);

    const canvasRef = useRef<HTMLDivElement>(null);

    // 当节点被拖放到画布上时
    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const modelData = JSON.parse(e.dataTransfer.getData('application/json'));

        const canvasRect = canvasRef.current?.getBoundingClientRect();
        if (!canvasRect) return;

        // 计算放置位置，相对于画布
        const x = e.clientX - canvasRect.left;
        const y = e.clientY - canvasRect.top;

        // 创建新节点
        const newNode = {
            id: `node-${uuidv4()}`,
            type: modelData.id,
            name: modelData.name,
            position: { x, y },
            inputs: [
                { id: `input-${uuidv4()}`, name: '输入', type: 'any' }
            ],
            outputs: [
                { id: `output-${uuidv4()}`, name: '输出', type: 'any' }
            ]
        };

        addNode(newNode);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    // 开始拖动节点
    const startNodeDrag = (e: React.MouseEvent, nodeId: string) => {
        if (e.button !== 0) return; // 只响应左键

        const node = nodes.find(n => n.id === nodeId);
        if (!node) return;

        // 计算鼠标与节点左上角的偏移
        const nodeRect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
        const offsetX = e.clientX - nodeRect.left;
        const offsetY = e.clientY - nodeRect.top;

        setDragOffset({ x: offsetX, y: offsetY });
        setSelectedNodeId(nodeId);
        setIsDragging(true);
    };

    // 拖动节点
    const handleNodeDrag = (e: MouseEvent) => {
        if (!isDragging || !selectedNodeId) return;

        const canvasRect = canvasRef.current?.getBoundingClientRect();
        if (!canvasRect) return;

        // 计算新位置，考虑偏移
        const x = e.clientX - canvasRect.left - dragOffset.x;
        const y = e.clientY - canvasRect.top - dragOffset.y;

        // 更新节点位置
        const node = nodes.find(n => n.id === selectedNodeId);
        if (node) {
            updateNode(selectedNodeId, { ...node, position: { x, y } });
        }
    };

    // 停止拖动
    const stopNodeDrag = () => {
        setIsDragging(false);
    };

    // 开始创建连接
    const startConnection = (e: React.MouseEvent, nodeId: string, portId: string, isInput: boolean) => {
        e.stopPropagation();

        const portElem = e.currentTarget as HTMLDivElement;
        const portRect = portElem.getBoundingClientRect();
        const canvasRect = canvasRef.current?.getBoundingClientRect();

        if (!canvasRect) return;

        // 计算连接起点在画布中的坐标
        const startX = portRect.left + portRect.width / 2 - canvasRect.left;
        const startY = portRect.top + portRect.height / 2 - canvasRect.top;

        setConnectionStart({
            nodeId,
            portId,
            isInput,
            x: startX,
            y: startY
        });

        setConnectionEnd({
            x: startX,
            y: startY
        });

        setIsConnecting(true);
    };

    // 更新连接线的终点
    const updateConnection = (e: MouseEvent) => {
        if (!isConnecting || !connectionStart) return;

        const canvasRect = canvasRef.current?.getBoundingClientRect();
        if (!canvasRect) return;

        setConnectionEnd({
            x: e.clientX - canvasRect.left,
            y: e.clientY - canvasRect.top
        });
    };

    // 完成连接或取消连接
    const finishConnection = (e: MouseEvent) => {
        if (!isConnecting || !connectionStart) return;

        // 尝试查找目标端口
        const portElement = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement;
        const portNodeId = portElement?.dataset.nodeId;
        const portId = portElement?.dataset.portId;
        const isInputPort = portElement?.dataset.isInput === 'true';

        // 如果找到有效的端口且类型匹配（输入连到输出，输出连到输入）
        if (portNodeId && portId && connectionStart.isInput !== isInputPort) {
            // 创建新连接
            const newConnection = {
                id: `connection-${uuidv4()}`,
                sourceNodeId: connectionStart.isInput ? portNodeId : connectionStart.nodeId,
                sourceOutputId: connectionStart.isInput ? portId : connectionStart.portId,
                targetNodeId: connectionStart.isInput ? connectionStart.nodeId : portNodeId,
                targetInputId: connectionStart.isInput ? connectionStart.portId : portId
            };

            addConnection(newConnection);
        }

        // 重置连接状态
        setIsConnecting(false);
        setConnectionStart(null);
        setConnectionEnd(null);
    };

    // 删除节点
    const handleDeleteNode = (nodeId: string) => {
        removeNode(nodeId);
    };

    // 事件监听器
    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleNodeDrag);
            window.addEventListener('mouseup', stopNodeDrag);
        }

        if (isConnecting) {
            window.addEventListener('mousemove', updateConnection);
            window.addEventListener('mouseup', finishConnection);
        }

        return () => {
            window.removeEventListener('mousemove', handleNodeDrag);
            window.removeEventListener('mouseup', stopNodeDrag);
            window.removeEventListener('mousemove', updateConnection);
            window.removeEventListener('mouseup', finishConnection);
        };
    }, [isDragging, isConnecting, selectedNodeId, connectionStart]);

    // 绘制连接线
    const renderConnection = (conn: typeof connections[0]) => {
        const sourceNode = nodes.find(n => n.id === conn.sourceNodeId);
        const targetNode = nodes.find(n => n.id === conn.targetNodeId);

        if (!sourceNode || !targetNode) return null;

        const sourceOutput = sourceNode.outputs.find(o => o.id === conn.sourceOutputId);
        const targetInput = targetNode.inputs.find(i => i.id === conn.targetInputId);

        if (!sourceOutput || !targetInput) return null;

        // 查找输出端口在源节点中的索引
        const sourceOutputIndex = sourceNode.outputs.findIndex(o => o.id === conn.sourceOutputId);
        // 查找输入端口在目标节点中的索引
        const targetInputIndex = targetNode.inputs.findIndex(i => i.id === conn.targetInputId);

        // 假设每个端口高度为24px (包括间距)
        const PORT_HEIGHT = 8;
        // 节点头部高度 (标题部分)
        const NODE_HEADER_HEIGHT = 42;
        // 输入和输出之间的分隔区域高度
        const PORT_SECTION_GAP = 24;
        // 节点左侧边距
        const NODE_PADDING_LEFT = 12;
        // 节点宽度
        const NODE_WIDTH = 180;

        // 源节点输出端口位置计算
        const startX = sourceNode.position.x + NODE_WIDTH; // 右侧边缘
        const startY = sourceNode.position.y + NODE_HEADER_HEIGHT +
            sourceNode.inputs.length * PORT_HEIGHT + // 所有输入端口的高度
            PORT_SECTION_GAP + // 输入和输出之间的间隔
            sourceOutputIndex * PORT_HEIGHT + // 当前输出端口的偏移
            PORT_HEIGHT / 2; // 端口中心点

        // 目标节点输入端口位置计算
        const endX = targetNode.position.x; // 左侧边缘
        const endY = targetNode.position.y + NODE_HEADER_HEIGHT +
            targetInputIndex * PORT_HEIGHT + // 当前输入端口的偏移 
            PORT_HEIGHT / 2; // 端口中心点

        // 绘制连接线（自然贝塞尔曲线）
        // 控制点距离为连线长度的一半，确保曲线平滑
        const controlDistance = Math.abs(startX - endX) / 2;
        const path = `M ${startX} ${startY} C ${startX + controlDistance} ${startY}, ${endX - controlDistance} ${endY}, ${endX} ${endY}`;

        return (
            <path
                key={conn.id}
                d={path}
                stroke="#888"
                strokeWidth="2"
                fill="none"
                onClick={() => removeConnection(conn.id)}
                className="cursor-pointer hover:stroke-red-500"
            />
        );
    };

    // 绘制正在创建的连接线
    const renderCurrentConnection = () => {
        if (!isConnecting || !connectionStart || !connectionEnd) return null;

        // 控制点距离为连线长度的一半，确保曲线平滑
        const controlDistance = Math.abs(connectionStart.x - connectionEnd.x) / 2;
        const path = `M ${connectionStart.x} ${connectionStart.y} C ${connectionStart.x + controlDistance} ${connectionStart.y}, ${connectionEnd.x - controlDistance} ${connectionEnd.y}, ${connectionEnd.x} ${connectionEnd.y}`;

        return (
            <path
                d={path}
                stroke="#888"
                strokeWidth="2"
                fill="none"
                strokeDasharray="5,5"
            />
        );
    };

    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>工作流画布</CardTitle>
                <CardDescription>拖放模型到此处并连接它们</CardDescription>
                <div className="absolute right-4 top-4 flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={saveWorkflow}
                    >
                        保存
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={clearWorkflow}
                    >
                        清空画布
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="relative h-[600px] bg-accent/20 rounded-md overflow-hidden">
                <div
                    ref={canvasRef}
                    className="w-full h-full relative"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                >
                    {/* 节点 */}
                    {nodes.map(node => (
                        <div
                            key={node.id}
                            className={`absolute bg-background rounded-md shadow-md border ${selectedNodeId === node.id ? 'border-primary' : 'border-border'} p-3 w-[180px]`}
                            style={{
                                left: `${node.position.x}px`,
                                top: `${node.position.y}px`,
                            }}
                            onMouseDown={(e) => startNodeDrag(e, node.id)}
                        >
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-sm font-medium">{node.name}</h3>
                                <button
                                    className="text-xs text-destructive"
                                    onClick={() => handleDeleteNode(node.id)}
                                >
                                    ✕
                                </button>
                            </div>

                            {/* 输入端口 */}
                            <div className="mb-3">
                                {node.inputs.map(input => (
                                    <div key={input.id} className="flex items-center my-1">
                                        <div
                                            className="w-3 h-3 rounded-full bg-primary mr-2 cursor-pointer"
                                            data-node-id={node.id}
                                            data-port-id={input.id}
                                            data-is-input="true"
                                            onMouseDown={(e) => startConnection(e, node.id, input.id, true)}
                                        />
                                        <span className="text-xs">{input.name}</span>
                                    </div>
                                ))}
                            </div>

                            {/* 输出端口 */}
                            <div>
                                {node.outputs.map(output => (
                                    <div key={output.id} className="flex items-center justify-end my-1">
                                        <span className="text-xs">{output.name}</span>
                                        <div
                                            className="w-3 h-3 rounded-full bg-primary ml-2 cursor-pointer"
                                            data-node-id={node.id}
                                            data-port-id={output.id}
                                            data-is-input="false"
                                            onMouseDown={(e) => startConnection(e, node.id, output.id, false)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* SVG 用于绘制连接线 */}
                    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
                        {connections.map(renderConnection)}
                        {renderCurrentConnection()}
                    </svg>
                </div>
            </CardContent>
        </Card>
    );
};