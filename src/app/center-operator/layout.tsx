import KBar from '@/components/kbar';
import Header from '@/components/layout/header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';
import { getUserRoleFromAuth, getRoleBasePath } from '@/lib/user-role';
import { redirect } from 'next/navigation';
import RoleBasedSidebar from '@/components/layout/role-based-sidebar';

export const metadata: Metadata = {
  title: 'Center Operator Dashboard',
  description: 'Center Operator dashboard view'
};

export default async function CenterOperatorLayout({
  children
}: {
  children: React.ReactNode;
}) {
  // Check authentication and verify role from database
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/auth/sign-in');
  }

  const role = await getUserRoleFromAuth(supabase, user);
  
  // Redirect if not center operator
  if (role !== 'center_operator') {
    return redirect(`${getRoleBasePath(role)}/overview`);
  }

  // Persisting the sidebar state in the cookie.
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"
  
  return (
    <KBar>
      <SidebarProvider defaultOpen={defaultOpen}>
        <RoleBasedSidebar role={role} />
        <SidebarInset>
          <Header />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </KBar>
  );
}

