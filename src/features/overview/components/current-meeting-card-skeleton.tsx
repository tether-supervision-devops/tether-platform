'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function SessionCardSkeleton() {
  return (
    <Card className='mx-auto h-full w-full max-w-4xl'>
      <CardHeader className='mb-6 flex flex-row items-center justify-between'>
        <div className='mt-4 flex flex-col gap-4'>
          <div className='bg-muted h-7 w-40 animate-pulse rounded' />
          <div className='bg-muted h-5 w-56 animate-pulse rounded' />
        </div>
        <div className='bg-muted ml-auto h-7 w-24 animate-pulse self-end rounded-full' />
      </CardHeader>
      <CardContent className='grid grid-cols-2 gap-x-10 gap-y-6'>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className='flex items-center gap-4'>
            <div className='bg-muted h-6 w-6 animate-pulse rounded' />
            <div className='flex flex-col gap-2'>
              <div className='bg-muted h-4 w-20 animate-pulse rounded' />
              <div className='bg-muted h-7 w-32 animate-pulse rounded' />
            </div>
          </div>
        ))}
        <div className='col-span-2 space-y-4 border-t pt-4'>
          <div className='bg-muted h-4 w-full animate-pulse rounded' />
          <div className='flex gap-4'>
            <div className='bg-muted h-10 w-32 animate-pulse rounded-lg' />
            <div className='bg-muted h-10 w-32 animate-pulse rounded-lg' />
          </div>
        </div>
        <div className='col-span-2 pt-4'>
          <div className='bg-muted h-14 w-full animate-pulse rounded-lg' />
        </div>
      </CardContent>
    </Card>
  );
}
