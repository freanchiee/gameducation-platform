'use client';

import { useSidebar } from '@/contexts/SidebarContext';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/app/components/ui/accordion';
import { Toggle } from '@/app/components/ui/toggle';
import { ResizablePanel, ResizablePanelGroup } from '@/app/components/ui/resizable';
import { Separator } from '@/app/components/ui/separator';
import {
  LayoutGrid,
  FolderPlus,
  Users,
  BarChart2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';

type SidebarLink = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

export default function LiveDashboardSidebar() {
  const { collapsed, setCollapsed } = useSidebar();
  const pathname = usePathname();

  const navItems: Record<string, SidebarLink[]> = {
    Tools: [
      { label: 'My Sessions', href: '/dashboard/sessions', icon: <FolderPlus size={20} /> },
      { label: 'Templates', href: '/dashboard/templates', icon: <LayoutGrid size={20} /> },
      { label: 'Reports', href: '/dashboard/reports', icon: <BarChart2 size={20} /> },
      { label: 'Students', href: '/dashboard/students', icon: <Users size={20} /> },
    ],
  };

  const SidebarContent = () => (
    <div className="h-full flex flex-col bg-[#e0f2f1] text-[#1f3674]">
      <div className="flex items-center gap-3 p-4">
        <Image src="/logo-icon.png" width={32} height={32} alt="Logo" />
        {!collapsed && <span className="text-lg font-bold">Live Dashboard</span>}
      </div>
      <Separator className="bg-[#1f3674]/10 mb-3" />
      <nav className="flex-1 overflow-y-auto px-2">
        <Accordion type="multiple" defaultValue={Object.keys(navItems)}>
          {Object.entries(navItems).map(([group, links]) => (
            <AccordionItem key={group} value={group}>
              <AccordionTrigger className={`${collapsed ? 'justify-center' : ''} text-xs font-bold uppercase tracking-wide`}>
                {!collapsed && group}
              </AccordionTrigger>
              <AccordionContent className="space-y-1">
                {links.map(({ label, href, icon }, index) => {
                  const isActive = pathname.startsWith(href);
                  return (
                    <Link href={href} key={`${href}-${label}-${index}`}>
                      <motion.div
                        initial={false}
                        animate={{ opacity: 1 }}
                        className={`flex items-center gap-2 px-3 py-2 rounded text-sm transition-colors ${
                          isActive
                            ? 'bg-palette-cream text-[#1f3674] font-semibold'
                            : 'hover:bg-palette-cream text-[#1f3674]'
                        }`}
                      >
                        <span>{icon}</span>
                        {!collapsed && <span>{label}</span>}
                      </motion.div>
                    </Link>
                  );
                })}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </nav>
      <div className="p-2">
        <Toggle
          onClick={() => setCollapsed(!collapsed)}
          pressed={collapsed}
          className="w-full bg-white/40 hover:bg-white/60"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Toggle>
      </div>
    </div>
  );

  return (
    <div className="hidden md:block mt-0.5 h-[calc(100vh-64px)]">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel
          defaultSize={collapsed ? 12 : 24}
          minSize={10}
          maxSize={30}
          className="border-r border-white/10 transition-all duration-300"
        >
          <SidebarContent />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
