'use client';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import Camera from '@/icons/camera';
import DashBoard from '@/icons/dashboard';
import Model from '@/icons/model';
import Monitoring from '@/icons/monitoring';
import Package from '@/icons/package';
import Link from 'next/link';

interface Router {
  label: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const AppSidebar = () => {
  const { state } = useSidebar();
  const routers: Router[] = [
    {
      label: '仪表盘',
      href: '/',
      icon: DashBoard,
    },
    {
      label: '数据中心',
      href: '/datacenter',
      icon: Monitoring,
    },
    {
      label: '摄像头',
      href: '/camera',
      icon: Camera,
    },
    {
      label: '模型管理',
      href: '/model',
      icon: Model,
    },
  ];
  return (
    <Sidebar collapsible="icon" className="p-0.5" variant="inset">
      <SidebarHeader>
        <div
          className={`inline-flex text-2xl font-bold ${state === 'collapsed' ? 'justify-center' : 'justify-start'}`}
        >
          {state === 'collapsed' ? (
            <Package className="h-full max-h-[36px] w-full max-w-[33px]" />
          ) : (
            <div className="inline-flex items-center gap-2">
              <Package className="size-11" />
              <span>AI Box</span>
            </div>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Projects</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {routers.map(router => (
                <SidebarMenuItem key={router.label}>
                  <Link
                    href={router.href}
                    className={`inline-flex h-full w-full items-center gap-2 rounded-xl bg-gray-100 p-2 hover:bg-gray-300 ${state === 'collapsed' ? 'justify-center' : 'justify-start'} `}
                  >
                    <router.icon
                      className={state === 'collapsed' ? 'size-7' : ''}
                    />
                    {state === 'collapsed' ? null : <span>{router.label}</span>}
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};

export default AppSidebar;
