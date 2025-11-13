import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription
} from '@/components/ui/card';

const salesData = [
  {
    name: 'User Name',
    email: 'October 5, 2025',
    avatar: 'https://api.slingacademy.com/public/sample-users/4.png',
    fallback: 'OM',
    amount: '+22.5 hrs'
  },
  {
    name: 'User Name',
    email: 'October 6, 2025',
    avatar: 'https://api.slingacademy.com/public/sample-users/4.png',
    fallback: 'JL',
    amount: '+12.0 hrs'
  },
  {
    name: 'User Name',
    email: 'October 7, 2025',
    avatar: 'https://api.slingacademy.com/public/sample-users/4.png',
    fallback: 'IN',
    amount: '+6.5 hrs'
  },
  {
    name: 'User Name',
    email: 'October 8, 2025',
    avatar: 'https://api.slingacademy.com/public/sample-users/4.png',
    fallback: 'WK',
    amount: '+4.0 hrs'
  },
  {
    name: 'User Name',
    email: 'October 9, 2025',
    avatar: 'https://api.slingacademy.com/public/sample-users/4.png',
    fallback: 'SD',
    amount: '+18.0 hrs'
  }
];

export function RecentSales() {
  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle>Recent Sessions Supervised</CardTitle>
        <CardDescription>You&apos;ve worked 63 hours this month.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-8'>
          {salesData.map((sale, index) => (
            <div key={index} className='flex items-center'>
              <Avatar className='h-9 w-9'>
                <AvatarImage src={sale.avatar} alt='Avatar' />
                <AvatarFallback>{sale.fallback}</AvatarFallback>
              </Avatar>
              <div className='ml-4 space-y-1'>
                <p className='text-sm leading-none font-medium'>{sale.name}</p>
                <p className='text-muted-foreground text-sm'>{sale.email}</p>
              </div>
              <div className='ml-auto font-medium'>{sale.amount}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
