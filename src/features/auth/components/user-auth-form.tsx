'use client';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams, useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import GithubSignInButton from './github-auth-button';
import { FormInput } from '@/components/forms/form-input';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';

const formSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' })
});

type UserFormValue = z.infer<typeof formSchema>;

export default function UserAuthForm({
  isSignUp = false
}: {
  isSignUp?: boolean;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, startTransition] = useTransition();
  const defaultValues = {
    email: '',
    password: ''
  };
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const onSubmit = async (data: UserFormValue) => {
    startTransition(async () => {
      const supabase = createClient();

      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`
          }
        });

        if (error) {
          toast.error(error.message);
        } else {
          toast.success('Check your email to confirm your account!');
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password
        });

        if (error) {
          toast.error(error.message);
        } else {
          toast.success('Signed In Successfully!');

          // Get user role and redirect to appropriate dashboard
          const {
            data: { user: authUser }
          } = await supabase.auth.getUser();
          if (authUser) {
            // Query database for role
            const { data: userData } = await supabase
              .from('users')
              .select('role')
              .eq('id', authUser.id)
              .single();

            if (userData) {
              const role = userData.role as
                | 'supervisor'
                | 'center_operator'
                | 'tether_admin';
              const rolePaths: Record<string, string> = {
                supervisor: '/supervisor/overview',
                center_operator: '/center-operator/overview',
                tether_admin: '/admin/overview'
              };
              const redirectPath = rolePaths[role] || '/supervisor/overview';
              router.push(redirectPath);
            } else {
              // Fallback to callbackUrl or default
              const callbackUrl =
                searchParams.get('callbackUrl') || '/supervisor/overview';
              router.push(callbackUrl);
            }
          } else {
            // Fallback to callbackUrl or default
            const callbackUrl =
              searchParams.get('callbackUrl') || '/supervisor/overview';
            router.push(callbackUrl);
          }
        }
      }
    });
  };

  return (
    <>
      <Form
        form={form as any}
        onSubmit={form.handleSubmit(onSubmit)}
        className='w-full space-y-2'
      >
        <FormInput
          control={form.control}
          name='email'
          label='Email'
          placeholder='Enter your email...'
          disabled={loading}
        />
        <FormInput
          control={form.control}
          name='password'
          label='Password'
          type='password'
          placeholder='Enter your password...'
          disabled={loading}
        />
        <Button
          disabled={loading}
          className='mt-2 ml-auto w-full'
          type='submit'
        >
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </Button>
      </Form>
      {!isSignUp && (
        <div className='text-center text-sm'>
          <Link
            href='/auth/forgot-password'
            className='text-primary hover:underline'
          >
            Forgot password?
          </Link>
        </div>
      )}
      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <span className='w-full border-t' />
        </div>
        <div className='relative flex justify-center text-xs uppercase'>
          <span className='bg-background text-muted-foreground px-2'>
            Or continue with
          </span>
        </div>
      </div>
      <GithubSignInButton />
    </>
  );
}
