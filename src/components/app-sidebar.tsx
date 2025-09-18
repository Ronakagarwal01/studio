'use client';

import {
  BrainCircuit,
  LayoutDashboard,
  HeartPulse,
  BookHeart,
  Sparkles,
  ClipboardCheck,
  Headphones,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Button } from './ui/button';

const links = [
    { href: '/', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/journal', label: 'Journal', icon: BookHeart },
    { href: '/exercises', label: 'Exercises', icon: Headphones },
    { href: '/resources', label: 'Resources', icon: ClipboardCheck },
    { href: '/symptom-checker', label: 'Symptom Checker', icon: BrainCircuit },
    { href: '/recommendations', label: 'AI Coach', icon: Sparkles },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary text-primary-foreground">
            <HeartPulse className="w-6 h-6" />
          </div>
          <span className="font-bold text-lg group-data-[collapsible=icon]:hidden">MindCare Hub</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {links.map((link) => (
            <SidebarMenuItem key={link.href}>
              <SidebarMenuButton asChild isActive={pathname === link.href} tooltip={link.label}>
                <Link href={link.href} className="justify-start">
                  <link.icon className="h-5 w-5" />
                  <span>{link.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4">
          <div className="p-4 rounded-lg bg-accent/20 text-center group-data-[collapsible=icon]:hidden">
              <p className="text-sm font-semibold text-accent-foreground mb-2">Feeling Overwhelmed?</p>
              <p className="text-xs text-muted-foreground mb-4">
                  Talk to our AI Coach for personalized recommendations.
              </p>
              <Button asChild size="sm" className="w-full bg-accent hover:bg-accent/80 text-accent-foreground">
                  <Link href="/recommendations">
                      <Sparkles className="mr-2 h-4 w-4"/>
                      Get Help
                  </Link>
              </Button>
          </div>
      </SidebarFooter>
    </Sidebar>
  );
}
