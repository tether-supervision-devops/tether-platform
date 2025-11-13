import KBar from '@/components/kbar';
import Header from '@/components/layout/header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';
import { getRoleBasePath, getUserRoleFromAuth } from '@/lib/user-role';
import { redirect } from 'next/navigation';
import RoleBasedSidebar from '@/components/layout/role-based-sidebar';

export const metadata: Metadata = {
  title: 'Next Shadcn Dashboard Starter',
  description: 'Basic dashboard with Next.js and Shadcn'
};

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  // Check authentication and get user role from database
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/auth/sign-in');
  }

  const role = await getUserRoleFromAuth(supabase, user);
  const basePath = getRoleBasePath(role);

  // Redirect to role-based route instead of showing dashboard content
  return redirect(`${basePath}/overview`);
}
