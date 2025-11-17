'use client';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useTransition, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { FormInput } from '@/components/forms/form-input';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';

const formSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' }),
    confirmPassword: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
  });

type ResetPasswordFormValue = z.infer<typeof formSchema>;

export default function ResetPasswordForm() {
  const router = useRouter();
  const [loading, startTransition] = useTransition();
  const [checkingSession, setCheckingSession] = useState(true);
  const defaultValues = {
    password: '',
    confirmPassword: ''
  };
  const form = useForm<ResetPasswordFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  useEffect(() => {
    const supabase = createClient();

    // Check if user has a valid session (from the reset password link)
    supabase.auth.getUser().then(({ data: { user }, error }) => {
      if (error || !user) {
        toast.error('Invalid or expired reset link. Please request a new one.');
        router.push('/auth/forgot-password');
      }
      setCheckingSession(false);
    });

    // Listen for auth state changes (when hash is processed)
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setCheckingSession(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  const onSubmit = async (data: ResetPasswordFormValue) => {
    startTransition(async () => {
      const supabase = createClient();

      // Verify user is still authenticated
      const {
        data: { user }
      } = await supabase.auth.getUser();
      if (!user) {
        toast.error('Session expired. Please request a new reset link.');
        router.push('/auth/forgot-password');
        return;
      }

      const { error } = await supabase.auth.updateUser({
        password: data.password
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Password updated successfully!');
        router.push('/auth/sign-in');
      }
    });
  };

  if (checkingSession) {
    return (
      <div className='w-full space-y-4'>
        <p className='text-muted-foreground text-center text-sm'>
          Verifying reset link...
        </p>
      </div>
    );
  }

  return (
    <Form
      form={form as any}
      onSubmit={form.handleSubmit(onSubmit)}
      className='w-full space-y-4'
    >
      <div className='space-y-2'>
        <p className='text-muted-foreground text-sm'>
          Enter your new password below.
        </p>
      </div>
      <FormInput
        control={form.control}
        name='password'
        label='New Password'
        type='password'
        placeholder='Enter your new password...'
        disabled={loading}
      />
      <FormInput
        control={form.control}
        name='confirmPassword'
        label='Confirm Password'
        type='password'
        placeholder='Confirm your new password...'
        disabled={loading}
      />
      <Button disabled={loading} className='mt-2 ml-auto w-full' type='submit'>
        {loading ? 'Updating...' : 'Update Password'}
      </Button>
      <div className='text-center text-sm'>
        <Link href='/auth/sign-in' className='text-primary hover:underline'>
          Back to Sign In
        </Link>
      </div>
    </Form>
  );
}
