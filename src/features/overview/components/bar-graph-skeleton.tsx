import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function BarGraphSkeleton() {
  return (
    <Card className='!pt-3'>
      <CardHeader className='flex flex-col items-stretch space-y-0 border-b !p-0 sm:flex-row'>
        <div className='flex flex-1 flex-col justify-center gap-1 px-6 !py-0'>
          <Skeleton className='h-7 w-[180px]' />
          <Skeleton className='h-5 w-[200px]' />
        </div>
        <div className='flex'>
          {[1, 2].map((i) => (
            <div
              key={i}
              className='relative flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:px-8 sm:py-6'
            >
              <Skeleton className='h-3 w-[80px]' />
              <Skeleton className='h-6 w-[100px] sm:h-8' />
            </div>
          ))}
        </div>
      </CardHeader>
      <CardContent className='px-2 pt-4 sm:px-6 sm:pt-6'>
        {/* Bar-like shapes */}
        <div className='flex aspect-auto h-[250px] w-full items-end justify-around gap-2 pt-8'>
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton
              key={i}
              className='h-full max-h-[200px] w-full rounded-t-md'
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
