'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

// 类型定义
export interface NodePosition {
    x: number;
    y: number;
}

export interface PortConfig {
    id: string;
    name: string;
    type: string;
}

export interface WorkflowNode {
    id: string;
    type: string;
    name: string;
    position: NodePosition;
    inputs: PortConfig[];
    outputs: PortConfig[];
}

export interface Connection {
    id: string;
    sourceNodeId: string;
    sourceOutputId: string;
    targetNodeId: string;
    targetInputId: string;
}

export interface WorkflowContextType {
    nodes: WorkflowNode[];
    connections: Connection[];
    selectedNodeId: string | null;
    setNodes: React.Dispatch<React.SetStateAction<WorkflowNode[]>>;
    setConnections: React.Dispatch<React.SetStateAction<Connection[]>>;
    setSelectedNodeId: React.Dispatch<React.SetStateAction<string | null>>;
    getSelectedNode: () => WorkflowNode | null;
    updateNode: (nodeId: string, updates: Partial<WorkflowNode>) => void;
    addNode: (node: WorkflowNode) => void;
    removeNode: (nodeId: string) => void;
    addConnection: (connection: Connection) => void;
    removeConnection: (connectionId: string) => void;
    clearWorkflow: () => void;
    saveWorkflow: () => void;
    loadWorkflow: () => void;
}

// 创建上下文
const WorkflowContext = createContext<WorkflowContextType | null>(null);

// 上下文提供者组件
export const WorkflowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [nodes, setNodes] = useState<WorkflowNode[]>([]);
    const [connections, setConnections] = useState<Connection[]>([]);
    const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

    // 获取选中的节点
    const getSelectedNode = (): WorkflowNode | null => {
        if (!selectedNodeId) return null;
        return nodes.find(node => node.id === selectedNodeId) || null;
    };

    // 更新节点
    const updateNode = (nodeId: string, updates: Partial<WorkflowNode>) => {
        setNodes(prevNodes =>
            prevNodes.map(node =>
                node.id === nodeId ? { ...node, ...updates } : node
            )
        );
    };

    // 添加节点
    const addNode = (node: WorkflowNode) => {
        setNodes(prevNodes => [...prevNodes, node]);
    };

    // 删除节点
    const removeNode = (nodeId: string) => {
        // 删除相关连接
        setConnections(prevConnections =>
            prevConnections.filter(
                conn => conn.sourceNodeId !== nodeId && conn.targetNodeId !== nodeId
            )
        );

        // 删除节点
        setNodes(prevNodes => prevNodes.filter(node => node.id !== nodeId));

        // 如果删除的是当前选中的节点，清除选择
        if (selectedNodeId === nodeId) {
            setSelectedNodeId(null);
        }
    };

    // 添加连接
    const addConnection = (connection: Connection) => {
        setConnections(prevConnections => [...prevConnections, connection]);
    };

    // 删除连接
    const removeConnection = (connectionId: string) => {
        setConnections(prevConnections =>
            prevConnections.filter(conn => conn.id !== connectionId)
        );
    };

    // 清空工作流
    const clearWorkflow = () => {
        setNodes([]);
        setConnections([]);
        setSelectedNodeId(null);
    };

    // 保存工作流到本地存储
    const saveWorkflow = () => {
        const workflow = {
            nodes,
            connections
        };
        localStorage.setItem('workflow', JSON.stringify(workflow));
        alert('工作流已保存！');
    };

    // 从本地存储加载工作流
    const loadWorkflow = () => {
        const savedWorkflow = localStorage.getItem('workflow');
        if (savedWorkflow) {
            try {
                const { nodes: savedNodes, connections: savedConnections } = JSON.parse(savedWorkflow);
                setNodes(savedNodes);
                setConnections(savedConnections);
                alert('工作流已加载！');
            } catch (error) {
                console.error('加载工作流失败:', error);
                alert('加载工作流失败！');
            }
        }
    };

    // 在组件挂载时尝试加载保存的工作流
    useEffect(() => {
        const savedWorkflow = localStorage.getItem('workflow');
        if (savedWorkflow) {
            try {
                const { nodes: savedNodes, connections: savedConnections } = JSON.parse(savedWorkflow);
                setNodes(savedNodes);
                setConnections(savedConnections);
            } catch (error) {
                console.error('加载工作流失败:', error);
            }
        }
    }, []);

    // 上下文值
    const contextValue: WorkflowContextType = {
        nodes,
        connections,
        selectedNodeId,
        setNodes,
        setConnections,
        setSelectedNodeId,
        getSelectedNode,
        updateNode,
        addNode,
        removeNode,
        addConnection,
        removeConnection,
        clearWorkflow,
        saveWorkflow,
        loadWorkflow
    };

    return (
        <WorkflowContext.Provider value={contextValue}>
            {children}
        </WorkflowContext.Provider>
    );
};

// 自定义钩子，用于访问上下文
export const useWorkflow = (): WorkflowContextType => {
    const context = useContext(WorkflowContext);
    if (!context) {
        throw new Error('useWorkflow must be used within a WorkflowProvider');
    }
    return context;
}; 