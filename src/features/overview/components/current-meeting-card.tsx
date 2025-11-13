'use client';

import { useEffect, useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  CalendarDays,
  Users,
  Clock,
  Stethoscope,
  PlayCircle
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function SessionCard() {
  // Example session data
  const sessionStart = useMemo(() => {
    const date = new Date();
    date.setHours(16, 0, 0); // 4:00 PM
    return date;
  }, []);
  
  const sessionEnd = useMemo(() => {
    const date = new Date();
    date.setHours(20, 30, 0); // 8:30 PM
    return date;
  }, []);

  const [timeRemaining, setTimeRemaining] = useState<string>('');
  const [hasSession, setHasSession] = useState<boolean>(true);

  useEffect(() => {
    function updateTimeRemaining() {
      const now = new Date().getTime();
      if (now < sessionStart.getTime()) {
        const diff = sessionStart.getTime() - now;
        const minutes = Math.floor(diff / (1000 * 60));
        setTimeRemaining(`Starts in ${minutes}m`);
        setHasSession(true);
      } else if (now >= sessionStart.getTime() && now <= sessionEnd.getTime()) {
        setTimeRemaining('Live Now');
        setHasSession(true);
      } else if (now > sessionEnd.getTime()) {
        setTimeRemaining('Completed');
        setHasSession(false);
      }
    }
    updateTimeRemaining();
    const interval = setInterval(updateTimeRemaining, 1000 * 30); // update every 30s
    return () => clearInterval(interval);
  }, [sessionEnd, sessionStart]);

  const today = new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  // Mock center avatars
  const centers = ['A', 'B', 'C', 'D', 'E'];

  const progress = Math.min(
    100,
    Math.max(
      0,
      ((Date.now() - sessionStart.getTime()) /
        (sessionEnd.getTime() - sessionStart.getTime())) *
        100
    )
  );

  return (
    <Card className='mx-auto h-full w-full'>
      <CardHeader className='flex flex-row items-center justify-between'>
        <div>
          <CardTitle>Today&apos;s Session</CardTitle>
          <CardDescription>Here is your next scheduled session</CardDescription>
        </div>
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
            timeRemaining === 'Live Now'
              ? 'bg-green-100 text-green-800'
              : timeRemaining === 'Completed'
                ? 'bg-gray-100 text-gray-800'
                : 'bg-amber-100 text-amber-800'
          }`}
        >
          {timeRemaining}
        </span>
      </CardHeader>

      <CardContent className='mt-4 grid grid-cols-2 gap-x-10 gap-y-6'>
        <div className='flex items-center gap-3'>
          <CalendarDays className='text-muted-foreground h-5 w-5' />
          <div>
            <div className='text-muted-foreground text-xs tracking-wide'>
              Date
            </div>
            <div className='text-lg font-semibold tabular-nums'>{today}</div>
          </div>
        </div>

        <div className='flex items-center gap-3'>
          <Clock className='text-muted-foreground h-5 w-5' />
          <div>
            <div className='text-muted-foreground text-xs tracking-wide'>
              Time
            </div>
            <div className='text-lg font-semibold tabular-nums'>
              4:00 – 8:30 PM
            </div>
          </div>
        </div>

        <div className='mb-6 flex items-center gap-3'>
          <Users className='text-muted-foreground h-5 w-5' />
          <div>
            <div className='text-muted-foreground text-xs tracking-wide'>
              Centers
            </div>
            <div className='mt-1 flex gap-2'>
              {centers.slice(0, 3).map((c) => (
                <div
                  key={c}
                  className='bg-primary flex h-6 w-6 items-center justify-center rounded-full text-xs text-white'
                >
                  {c}
                </div>
              ))}
              {centers.length > 3 && (
                <div className='bg-muted flex h-6 w-6 items-center justify-center rounded-full text-xs'>
                  +{centers.length - 3}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className='flex items-center gap-3'>
          <Stethoscope className='text-muted-foreground h-5 w-5' />
          <div>
            <div className='text-muted-foreground text-xs tracking-wide'>
              Supervisor
            </div>
            <div className='mt-1 flex items-center gap-2'>
              <Avatar className='h-6 w-6'>
                <AvatarImage src='/assets/tether-logo.png' alt='Supervisor' />
                <AvatarFallback>YP</AvatarFallback>
              </Avatar>
              <span className='text-foreground text-sm font-medium'>
                You (Physician)
              </span>
            </div>
          </div>
        </div>

        <div className='col-span-2 space-y-4 border-t pt-4'>
          <div className='bg-muted h-2 w-full rounded-full'>
            <div
              className='bg-primary h-2 rounded-full transition-all duration-300 ease-in-out'
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className='flex gap-2'>
            <Button variant='outline' size='sm'>
              Protocols
            </Button>
            <Button variant='outline' size='sm'>
              Guidelines
            </Button>
          </div>
        </div>

        <div className='col-span-2 pt-4'>
          <Button
            size='lg'
            className='h-14 w-full'
            disabled={timeRemaining === 'Completed'}
          >
            <span className='flex items-center justify-center gap-3'>
              <PlayCircle className='h-5 w-5' />
              {timeRemaining === 'Live Now' ? 'Join Session' : 'View Details'}
            </span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default SessionCard;
