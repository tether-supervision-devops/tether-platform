'use client';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { FormInput } from '@/components/forms/form-input';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';

const formSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email address' })
});

type ForgotPasswordFormValue = z.infer<typeof formSchema>;

export default function ForgotPasswordForm() {
  const router = useRouter();
  const [loading, startTransition] = useTransition();
  const defaultValues = {
    email: ''
  };
  const form = useForm<ForgotPasswordFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const onSubmit = async (data: ForgotPasswordFormValue) => {
    startTransition(async () => {
      const supabase = createClient();

      const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: `${window.location.origin}/auth/reset-password`
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Check your email for the password reset link!');
        // Optionally redirect to sign-in after a delay
        setTimeout(() => {
          router.push('/auth/sign-in');
        }, 2000);
      }
    });
  };

  return (
    <Form
      form={form as any}
      onSubmit={form.handleSubmit(onSubmit)}
      className='w-full space-y-4'
    >
      <div className='space-y-2'>
        <p className='text-muted-foreground text-sm'>
          Enter your email address and we&apos;ll send you a link to reset your
          password.
        </p>
      </div>
      <FormInput
        control={form.control}
        name='email'
        label='Email'
        placeholder='Enter your email...'
        disabled={loading}
      />
      <Button disabled={loading} className='mt-2 ml-auto w-full' type='submit'>
        {loading ? 'Sending...' : 'Send Reset Link'}
      </Button>
      <div className='text-center text-sm'>
        <Link href='/auth/sign-in' className='text-primary hover:underline'>
          Back to Sign In
        </Link>
      </div>
    </Form>
  );
}
