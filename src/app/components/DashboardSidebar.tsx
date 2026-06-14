'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BookOpen,
  Plus,
  FolderPlus,
  LayoutGrid,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu } from 'react-icons/fi';

import { useAuth } from '@/contexts/AuthContext';
import { useSidebar } from '@/contexts/SidebarContext';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/app/components/ui/accordion';
import { Toggle } from '@/app/components/ui/toggle';
import { Separator } from '@/app/components/ui/separator';
import { ResizablePanel, ResizablePanelGroup } from '@/app/components/ui/resizable';
import { Sheet, SheetTrigger, SheetContent } from '@/app/components/ui/sheet';

export default function DashboardSidebar() {
  const { role } = useAuth();
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebar();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const width = collapsed ? 64 : 256;
    document.documentElement.style.setProperty('--sidebar-width', `${width}px`);
  }, [collapsed]);

  if (!role) return null;
  const isTeacher = role === 'teacher';

  const navItems = {
    Classes: [
      {
        label: isTeacher ? 'Strandhoots Shared' : 'Strandhoots Attempted',
        href: isTeacher ? '/strandhoot-routes/shared' : '/strandhoot/attempted',
        icon: <BookOpen size={20} />,
      },
      ...(isTeacher
        ? [{ label: 'Add Class', href: '/classroom/add', icon: <Plus size={20} /> }]
        : []),
    ],
    Tools: isTeacher
      ? [
          { label: 'Make Collection', href: '/collections/new', icon: <FolderPlus size={20} /> },
          { label: 'Google Classroom', href: '/integrations/google-classroom', icon: <LayoutGrid size={20} /> },
          { label: 'Strandhoot Builder', href: '/strandhoot-builder', icon: <span className="text-lg">🛠️</span> },
        ]
      : [],
  };

  const SidebarContent = () => (
    <motion.div
      key="sidebar"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      transition={{ type: 'tween', duration: 0.3 }}
      className="h-full flex flex-col bg-[#DFF1F1] text-gameducation-navy"
    >
      <div className="flex items-center gap-3 p-4">
        {!collapsed && <span className="text-lg font-bold"> </span>}
      </div>
      <Separator className="bg-gameducation-navy/10 mb-3" />

      <nav className="flex-1 overflow-y-auto px-2">
        <Accordion type="multiple" defaultValue={Object.keys(navItems)}>
          {Object.entries(navItems).map(([group, links]) => (
            <AccordionItem key={group} value={group}>
              <AccordionTrigger
                className={`${collapsed ? 'justify-center' : ''} text-xs font-bold uppercase tracking-wide`}
              >
                {!collapsed && group}
              </AccordionTrigger>
              <AccordionContent className="space-y-1">
                {links.map(({ label, href, icon }) => {
                  const isActive = pathname.startsWith(href);
                  return (
                    <Link href={href} key={href}>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className={`flex items-center gap-2 px-3 py-2 rounded text-sm transition-colors ${
                          isActive
                            ? 'bg-palette-cream text-gameducation-navy font-semibold'
                            : 'hover:bg-palette-cream text-gameducation-navy'
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
    </motion.div>
  );

  return (
    <>
      {/* Mobile Hamburger Menu */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger asChild>
          <button
            className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded shadow"
            aria-label="Toggle Sidebar"
          >
            <FiMenu size={20} />
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 bg-[#DFF1F1] text-gameducation-navy p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="hidden md:block h-[calc(100vh-64px)] mt-0.5">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel
            defaultSize={collapsed ? 12 : 24}
            minSize={10}
            maxSize={30}
            className="border-r border-white/10 transition-all duration-300"
          >
            <AnimatePresence mode="wait">
              <SidebarContent key={collapsed ? 'collapsed' : 'expanded'} />
            </AnimatePresence>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </>
  );
}
