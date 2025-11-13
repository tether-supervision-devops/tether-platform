import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { getUserRoleFromAuth, getRoleBasePath } from '@/lib/user-role';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const next = requestUrl.searchParams.get('next');
  const type = requestUrl.searchParams.get('type');

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (error) {
      // If there's an error, redirect to sign-in
      return NextResponse.redirect(`${requestUrl.origin}/auth/sign-in?error=${encodeURIComponent(error.message)}`);
    }

    // If it's a password recovery flow, redirect to reset password page
    if (type === 'recovery') {
      return NextResponse.redirect(`${requestUrl.origin}/auth/reset-password`);
    }

    // If next is provided, use it (for OAuth callbacks with specific redirects)
    if (next) {
      return NextResponse.redirect(`${requestUrl.origin}${next}`);
    }

    // Otherwise, get user role and redirect to appropriate dashboard
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (user) {
      const role = await getUserRoleFromAuth(supabase, user);
      const basePath = getRoleBasePath(role);
      return NextResponse.redirect(`${requestUrl.origin}${basePath}/overview`);
    }
  }

  // Fallback to sign-in if no code or user
  return NextResponse.redirect(`${requestUrl.origin}/auth/sign-in`);
}

