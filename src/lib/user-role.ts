export type UserRole = 'supervisor' | 'center_operator' | 'tether_admin';

export interface UserProfile {
  role: UserRole;
  id: string;
  email: string;
  fullName?: string;
}

/**
 * Database role type from public.user_role enum
 * This should match the enum values in your Supabase database
 */
type DatabaseUserRole = 'supervisor' | 'center_operator' | 'tether_admin';

/**
 * Get user role from public.users table in Supabase
 * This queries the database to get the role from the users table
 */
export async function getUserRole(
  supabase: Awaited<ReturnType<typeof import('./supabase/server').createClient>>,
  userId: string
): Promise<UserRole> {
  if (!userId) return 'supervisor'; // Default role

  try {
    const { data, error } = await supabase
      .from('users')
      .select('role')
      .eq('id', userId)
      .single();

    if (error || !data) {
      console.error('Error fetching user role:', error);
      return 'supervisor'; // Default role on error
    }

    const role = data.role as DatabaseUserRole;
    
    // Validate role
    if (role === 'supervisor' || role === 'center_operator' || role === 'tether_admin') {
      return role;
    }
    
    // Default to supervisor if role is invalid
    return 'supervisor';
  } catch (error) {
    console.error('Exception fetching user role:', error);
    return 'supervisor'; // Default role on exception
  }
}

/**
 * Get user role from auth user (convenience function for server components)
 */
export async function getUserRoleFromAuth(
  supabase: Awaited<ReturnType<typeof import('./supabase/server').createClient>>,
  user: { id: string } | null
): Promise<UserRole> {
  if (!user) return 'supervisor';
  return getUserRole(supabase, user.id);
}

/**
 * Get base path for user role
 */
export function getRoleBasePath(role: UserRole): string {
  switch (role) {
    case 'supervisor':
      return '/supervisor';
    case 'center_operator':
      return '/center-operator';
    case 'tether_admin':
      return '/admin';
    default:
      return '/supervisor';
  }
}

/**
 * Check if user has access to a specific role
 */
export function hasRoleAccess(userRole: UserRole, requiredRole: UserRole): boolean {
  const roleHierarchy: Record<UserRole, number> = {
    'center_operator': 1,
    'supervisor': 2,
    'tether_admin': 3
  };
  
  return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
}

