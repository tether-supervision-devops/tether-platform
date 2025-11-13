import { NavItem } from '@/types';
import type { UserRole } from '@/lib/user-role';

/**
 * Navigation items for Supervisor role
 */
export const supervisorNavItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/supervisor/overview',
    icon: 'dashboard',
    isActive: false,
    shortcut: ['d', 'd'],
    items: []
  },
  {
    title: 'Schedule',
    url: '/supervisor/schedule',
    icon: 'calendar',
    shortcut: ['s', 'c'],
    isActive: false,
    items: []
  },
  {
    title: 'Meetings',
    url: '/supervisor/meeting',
    icon: 'video',
    shortcut: ['m', 't'],
    isActive: false,
    items: []
  },
  {
    title: 'Account',
    url: '#',
    icon: 'billing',
    isActive: true,
    items: [
      {
        title: 'Profile',
        url: '/supervisor/profile',
        icon: 'userPen',
        shortcut: ['p', 'p']
      }
    ]
  }
];

/**
 * Navigation items for Center Operator role
 */
export const centerOperatorNavItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/center-operator/overview',
    icon: 'dashboard',
    isActive: false,
    shortcut: ['d', 'd'],
    items: []
  },
  {
    title: 'Sessions',
    url: '/center-operator/sessions',
    icon: 'calendar',
    shortcut: ['s', 's'],
    isActive: false,
    items: []
  },
  {
    title: 'Meetings',
    url: '/center-operator/meeting',
    icon: 'video',
    shortcut: ['m', 't'],
    isActive: false,
    items: []
  },
  {
    title: 'Account',
    url: '#',
    icon: 'billing',
    isActive: true,
    items: [
      {
        title: 'Profile',
        url: '/center-operator/profile',
        icon: 'userPen',
        shortcut: ['p', 'p']
      }
    ]
  }
];

/**
 * Navigation items for Tether Admin role
 */
export const tetherAdminNavItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/admin/overview',
    icon: 'dashboard',
    isActive: false,
    shortcut: ['d', 'd'],
    items: []
  },
  {
    title: 'Users',
    url: '/admin/users',
    icon: 'userPen',
    shortcut: ['u', 'u'],
    isActive: false,
    items: []
  },
  {
    title: 'Centers',
    url: '/admin/centers',
    icon: 'product',
    shortcut: ['c', 'c'],
    isActive: false,
    items: []
  },
  {
    title: 'Sessions',
    url: '/admin/sessions',
    icon: 'calendar',
    shortcut: ['s', 's'],
    isActive: false,
    items: []
  },
  {
    title: 'Meetings',
    url: '/admin/meeting',
    icon: 'video',
    shortcut: ['m', 't'],
    isActive: false,
    items: []
  },
  {
    title: 'Settings',
    url: '#',
    icon: 'billing',
    isActive: true,
    items: [
      {
        title: 'Profile',
        url: '/admin/profile',
        icon: 'userPen',
        shortcut: ['p', 'p']
      },
      {
        title: 'System Settings',
        url: '/admin/settings',
        icon: 'billing',
        shortcut: ['s', 's']
      }
    ]
  }
];

/**
 * Get navigation items based on user role
 */
export function getNavItemsForRole(role: UserRole): NavItem[] {
  switch (role) {
    case 'supervisor':
      return supervisorNavItems;
    case 'center_operator':
      return centerOperatorNavItems;
    case 'tether_admin':
      return tetherAdminNavItems;
    default:
      return supervisorNavItems;
  }
}

