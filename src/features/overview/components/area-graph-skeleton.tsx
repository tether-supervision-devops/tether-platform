import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function AreaGraphSkeleton() {
  return (
    <Card className='@container/card'>
      <CardHeader>
        <CardTitle>
          <Skeleton className='h-6 w-[180px]' />
        </CardTitle>
        <CardDescription>
          <Skeleton className='h-4 w-[260px]' />
        </CardDescription>
      </CardHeader>
      <CardContent className='px-2 pt-4 sm:px-6 sm:pt-6'>
        <div className='bg-muted relative h-[260px] w-full rounded-md border'>
          <Skeleton className='absolute inset-0 h-full w-full rounded-md' />
        </div>
      </CardContent>
      <CardFooter>
        <div className='flex w-full items-start gap-2 text-sm'>
          <div className='grid w-full gap-2'>
            <Skeleton className='h-4 w-2/3' />
            <Skeleton className='h-3 w-1/3' />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
