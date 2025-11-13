import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { getUserRoleFromAuth, getRoleBasePath } from '@/lib/user-role';

export default async function Page() {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/auth/sign-in');
  }

  // Get user role from database and redirect to appropriate dashboard
  const role = await getUserRoleFromAuth(supabase, user);
  const basePath = getRoleBasePath(role);
  
  redirect(`${basePath}/overview`);
}
