'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';

export default function GithubSignInButton() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleGithubSignIn = async () => {
    const supabase = createClient();
    const callbackUrl = searchParams.get('callbackUrl') || '/dashboard/overview';
    
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(callbackUrl)}`
      }
    });
    
    if (error) {
      toast.error(error.message);
    }
  };

  return (
    <Button
      className='w-full'
      variant='outline'
      type='button'
      onClick={handleGithubSignIn}
    >
      <Icons.github className='mr-2 h-4 w-4' />
      Continue with Github
    </Button>
  );
}
