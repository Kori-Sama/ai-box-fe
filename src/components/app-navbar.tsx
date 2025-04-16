'use client';
import React from 'react';
import { useSidebar } from './ui/sidebar';

const NavBar = () => {
  return (
    <div className="flex w-full p-2">
      <ToggleButton />
    </div>
  );
};

export default NavBar;
const ToggleButton = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <nav className="flex w-full items-center gap-2">
      <button
        onClick={() => {
          toggleSidebar();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          className="h-full w-full"
        >
          <path d="M186.01-96.75q-37.58 0-63.42-25.84-25.84-25.84-25.84-63.42v-587.98q0-37.64 25.84-63.53t63.42-25.89h587.98q37.64 0 63.53 25.89t25.89 63.53v587.98q0 37.58-25.89 63.42-25.89 25.84-63.53 25.84H186.01Zm134.02-89.26v-587.98H186.01v587.98h134.02Zm89.42 0h364.54v-587.98H409.45v587.98Zm-89.42 0H186.01h134.02Z" />
        </svg>
      </button>
      <BreadcrumbDemo />
    </nav>
  );
};

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

import { usePathname } from 'next/navigation';

// 路由映射表，将路径段映射到友好的显示名称
const routeMap: Record<string, string> = {
  '': 'Home',
  camera: '摄像头',
  datacenter: '数据中心',
  model: '模型',
  workflow: '工作流',
  'workflow-management': '工作流管理',
};

export function BreadcrumbDemo() {
  const pathname = usePathname();

  // 分割路径并过滤掉空字符串
  const pathSegments = pathname.split('/').filter(Boolean);

  // 生成面包屑项
  const breadcrumbItems = pathSegments.map((segment, index) => {
    // 构建当前段的完整路径
    const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
    const displayName = routeMap[segment] || segment;

    // 如果是最后一个段，则显示为当前页面
    if (index === pathSegments.length - 1) {
      return (
        <React.Fragment key={segment}>
          <BreadcrumbItem>
            <BreadcrumbPage>{displayName}</BreadcrumbPage>
          </BreadcrumbItem>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment key={segment}>
        <BreadcrumbItem>
          <BreadcrumbLink href={href}>{displayName}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
      </React.Fragment>
    );
  });

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* 首页链接 */}
        <BreadcrumbItem>
          <BreadcrumbLink href="/">{routeMap['']}</BreadcrumbLink>
        </BreadcrumbItem>

        {/* 只有当不在首页时才显示分隔符和其他面包屑项 */}
        {pathSegments.length > 0 && (
          <>
            <BreadcrumbSeparator />
            {breadcrumbItems}
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
