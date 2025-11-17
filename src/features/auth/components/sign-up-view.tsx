import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { IconStar } from '@tabler/icons-react';
import { Metadata } from 'next';
import Link from 'next/link';
import UserAuthForm from './user-auth-form';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.'
};

export default function SignUpViewPage({ stars }: { stars: number }) {
  return (
    <div className='relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
      <Link
        href='/examples/authentication'
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute top-4 right-4 hidden md:top-8 md:right-8'
        )}
      >
        Sign Up
      </Link>
      <div className='bg-muted relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r'>
        <div className='absolute inset-0'>
          <Image
            src='/assets/background.png' // ⬅️ your image path
            alt='Background'
            fill
            priority
            className='object-cover'
          />
          <div className='absolute inset-0 bg-zinc-900/70' />{' '}
          {/* Optional dark overlay */}
        </div>
        <div className='relative z-20 flex items-center text-lg font-medium'>
          <img
            src='/assets/full-logo.svg' // ⬅️ replace with your actual image path
            alt='Tether Logo'
            className='mr-2 h-auto w-40 object-contain'
          />
        </div>
        <div className='relative z-20 mt-auto'>
          <blockquote className='space-y-2'>
            <p className='text-lg'>
              “With Tether Supervision, I never feel like I’m working alone. The
              support is immediate, the communication is clear, and our patients
              feel the difference.”
            </p>
            <footer className='text-sm'>Senior MRI Technologist</footer>
          </blockquote>
        </div>
      </div>
      <div className='flex h-full items-center justify-center p-4 lg:p-8'>
        <div className='flex w-full max-w-md flex-col items-center justify-center space-y-6'>
          {/* github link  */}
          <Link
            className={cn('group inline-flex hover:text-yellow-200')}
            target='_blank'
            href={'https://github.com/kiranism/next-shadcn-dashboard-starter'}
          >
            <div className='flex items-center'>
              <GitHubLogoIcon className='size-4' />
              <span className='ml-1 inline'>Star on GitHub</span>{' '}
            </div>
            <div className='ml-2 flex items-center gap-1 text-sm md:flex'>
              <IconStar
                className='size-4 text-gray-500 transition-all duration-300 group-hover:text-yellow-300'
                fill='currentColor'
              />
              <span className='font-display font-medium'>{stars}</span>
            </div>
          </Link>
          <UserAuthForm isSignUp />
          <p className='text-muted-foreground px-8 text-center text-sm'>
            By clicking continue, you agree to our{' '}
            <Link
              href='/terms'
              className='hover:text-primary underline underline-offset-4'
            >
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link
              href='/privacy'
              className='hover:text-primary underline underline-offset-4'
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
