'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { UserRole } from '@/lib/user-role';
import type { User } from '@supabase/supabase-js';

/**
 * Hook to get user role from database (client-side)
 */
export function useUserRole() {
  const [role, setRole] = useState<UserRole | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    // Get authenticated user
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      
      if (!user) {
        setLoading(false);
        return;
      }

      // Query database for user role
      supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single()
        .then(({ data, error }) => {
          if (error || !data) {
            console.error('Error fetching user role:', error);
            setRole('supervisor'); // Default role
          } else {
            const dbRole = data.role as UserRole;
            // Validate role
            if (dbRole === 'supervisor' || dbRole === 'center_operator' || dbRole === 'tether_admin') {
              setRole(dbRole);
            } else {
              setRole('supervisor'); // Default role
            }
          }
          setLoading(false);
        });
    });

    // Listen for auth state changes
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      
      if (session?.user) {
        // Query database for user role when auth state changes
        supabase
          .from('users')
          .select('role')
          .eq('id', session.user.id)
          .single()
          .then(({ data, error }) => {
            if (error || !data) {
              console.error('Error fetching user role:', error);
              setRole('supervisor');
            } else {
              const dbRole = data.role as UserRole;
              if (dbRole === 'supervisor' || dbRole === 'center_operator' || dbRole === 'tether_admin') {
                setRole(dbRole);
              } else {
                setRole('supervisor');
              }
            }
          });
      } else {
        setRole(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return { role, user, loading };
}

