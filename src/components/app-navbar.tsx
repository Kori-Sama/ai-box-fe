'use client';
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
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function BreadcrumbDemo() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1">
              <BreadcrumbEllipsis className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>Documentation</DropdownMenuItem>
              <DropdownMenuItem>Themes</DropdownMenuItem>
              <DropdownMenuItem>GitHub</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/docs/components">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
