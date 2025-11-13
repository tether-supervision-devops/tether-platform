'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Video, CalendarDays, Building2, Bell } from 'lucide-react';
import PageContainer from '@/components/layout/page-container';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

type SupervisionSession = {
  id: string;
  scheduledStart: string;
  scheduledEnd: string;
  status: 'Active' | 'Upcoming';
};

enum CoverageStatus {
  Active = 'Active',
  Upcoming = 'Upcoming'
}

export default function Page() {
  return (
    <SchedulePage
      onStartVideoCall={() => console.log('Starting call...')}
      getFacilityNameForSession={() => 'Demo Facility'}
      getTechnologistForSession={() => 'Demo Technologist'}
    />
  );
}

const demoSessions: SupervisionSession[] = [
  {
    id: '1',
    scheduledStart: new Date(new Date().setHours(9, 0, 0, 0)).toISOString(),
    scheduledEnd: new Date(new Date().setHours(10, 0, 0, 0)).toISOString(),
    status: CoverageStatus.Active
  },
  {
    id: '2',
    scheduledStart: new Date(
      new Date().setDate(new Date().getDate() + 1)
    ).toISOString(),
    scheduledEnd: new Date(
      new Date().setDate(new Date().getDate() + 1)
    ).toISOString(),
    status: CoverageStatus.Upcoming
  },
  {
    id: '3',
    scheduledStart: new Date(
      new Date().setDate(new Date().getDate() + 2)
    ).toISOString(),
    scheduledEnd: new Date(
      new Date().setDate(new Date().getDate() + 2)
    ).toISOString(),
    status: CoverageStatus.Upcoming
  },
  {
    id: '4',
    scheduledStart: new Date(new Date().setHours(14, 0, 0, 0)).toISOString(),
    scheduledEnd: new Date(new Date().setHours(15, 0, 0, 0)).toISOString(),
    status: CoverageStatus.Upcoming
  },
  {
    id: '5',
    scheduledStart: new Date(
      new Date().setDate(new Date().getDate() + 3)
    ).toISOString(),
    scheduledEnd: new Date(
      new Date().setDate(new Date().getDate() + 3)
    ).toISOString(),
    status: CoverageStatus.Upcoming
  }
];

interface SchedulePageProps {
  sessions?: SupervisionSession[];
  onStartVideoCall: (session: SupervisionSession) => void;
  getFacilityNameForSession: (
    session: SupervisionSession
  ) => string | undefined;
  getTechnologistForSession: (
    session: SupervisionSession
  ) => string | undefined;
}

function CalendarView({ sessions }: { sessions: SupervisionSession[] }) {
  // Determine the month and year to display (use current month)
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // 0-based

  // Get first day of month
  const firstDay = new Date(year, month, 1);
  // Get last day of month
  const lastDay = new Date(year, month + 1, 0);
  // Number of days in month
  const daysInMonth = lastDay.getDate();

  // Determine what day of the week the month starts on (0=Sunday)
  const startDay = firstDay.getDay();

  // Create array for calendar cells (including blanks for previous month days)
  const totalCells = Math.ceil((startDay + daysInMonth) / 7) * 7;

  // Map sessions by date string "YYYY-MM-DD" for counting
  const sessionCountsByDate: Record<string, number> = {};
  sessions.forEach((session) => {
    const date = new Date(session.scheduledStart);
    const key = date.toISOString().slice(0, 10);
    sessionCountsByDate[key] = (sessionCountsByDate[key] || 0) + 1;
  });

  // Helper to format date as M/D/YYYY
  function formatDate(date: Date) {
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  }

  // Generate calendar cells
  const cells = [];
  for (let i = 0; i < totalCells; i++) {
    const dayNumber = i - startDay + 1;
    if (dayNumber > 0 && dayNumber <= daysInMonth) {
      const cellDate = new Date(year, month, dayNumber);
      const dateKey = cellDate.toISOString().slice(0, 10);
      const count = sessionCountsByDate[dateKey] || 0;

      cells.push(
        <div
          key={i}
          className='flex flex-col items-center justify-center rounded border border-gray-700 bg-gray-800 p-2 text-white'
        >
          <div className='font-semibold'>{dayNumber}</div>
          {count > 0 && (
            <div className='mt-1 rounded bg-blue-600 px-2 py-0.5 text-sm'>
              {count} session{count > 1 ? 's' : ''}
            </div>
          )}
        </div>
      );
    } else {
      cells.push(
        <div
          key={i}
          className='rounded border border-gray-700 bg-gray-900 p-2'
        ></div>
      );
    }
  }

  return (
    <div className='mx-auto mt-6 grid max-w-4xl grid-cols-7 gap-2 text-white'>
      {/* Weekday headers */}
      <div className='text-center font-semibold'>Sun</div>
      <div className='text-center font-semibold'>Mon</div>
      <div className='text-center font-semibold'>Tue</div>
      <div className='text-center font-semibold'>Wed</div>
      <div className='text-center font-semibold'>Thu</div>
      <div className='text-center font-semibold'>Fri</div>
      <div className='text-center font-semibold'>Sat</div>

      {cells}
    </div>
  );
}

export function SchedulePage({
  sessions = demoSessions,
  onStartVideoCall,
  getFacilityNameForSession,
  getTechnologistForSession
}: SchedulePageProps) {
  function formatTimeBlock(session: SupervisionSession) {
    const start = session.scheduledStart
      ? new Date(session.scheduledStart)
      : undefined;
    const end = session.scheduledEnd
      ? new Date(session.scheduledEnd)
      : undefined;

    if (start && end) {
      const formatter = new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });

      return `${formatter.format(start)} - ${formatter.format(end)}`;
    }

    return '';
  }

  function formatDate(session: SupervisionSession) {
    const date = session.scheduledStart
      ? new Date(session.scheduledStart)
      : undefined;
    if (!date) return '';
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  }

  return (
    <PageContainer scrollable={true}>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading
            title='Schedule'
            description='Manage active and upcoming supervision sessions'
          />
        </div>
        <Separator />
        <Card className='mx-auto w-full max-w-6xl'>
          <Tabs defaultValue='list'>
            <CardHeader className='flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0'>
              <div>
                <CardTitle>Supervision Sessions</CardTitle>
                <CardDescription>
                  Manage active and upcoming sessions
                </CardDescription>
              </div>
              <TabsList>
                <TabsTrigger value='list'>List</TabsTrigger>
                <TabsTrigger value='calendar'>Calendar</TabsTrigger>
              </TabsList>
            </CardHeader>
            <CardContent>
              <TabsContent value='list'>
                <div className='space-y-4'>
                  {sessions
                    .slice()
                    .sort(
                      (a, b) =>
                        new Date(a.scheduledStart).getTime() -
                        new Date(b.scheduledStart).getTime()
                    )
                    .map((session) => (
                      <Card
                        key={session.id}
                        className='from-primary/5 to-card dark:data-[slot=card]:bg-card @container/card w-full shadow-xs data-[slot=card]:bg-gradient-to-t'
                      >
                        <CardHeader>
                          <CardTitle className='flex items-center space-x-2 text-lg font-semibold'>
                            <Bell className='h-5 w-5' />
                            <span>Alarm Name: Demo Alarm</span>
                          </CardTitle>
                          <CardDescription className='flex items-center space-x-2'>
                            <CalendarDays className='h-4 w-4' />
                            <span>Date: {formatDate(session)}</span>
                          </CardDescription>
                        </CardHeader>
                        <CardContent className='flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0'>
                          <div className='flex items-center space-x-2 text-gray-600 dark:text-gray-300'>
                            <Clock className='h-4 w-4' />
                            <span>{formatTimeBlock(session)}</span>
                          </div>
                          <div className='flex items-center space-x-2 text-gray-600 dark:text-gray-300'>
                            <Building2 className='h-4 w-4' />
                            <span>Centers Extended: 3</span>
                          </div>
                          <Button
                            variant='outline'
                            size='sm'
                            onClick={() => onStartVideoCall(session)}
                            className={`flex items-center space-x-1 ${session.status === 'Active' ? 'border-blue-200 text-blue-600 hover:bg-blue-50' : 'border-yellow-300 text-yellow-500 hover:bg-yellow-100'}`}
                          >
                            <Video className='h-4 w-4' />
                            <span>
                              {session.status === 'Active' ? 'Join' : 'Update'}
                            </span>
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>
              <TabsContent value='calendar'>
                <CalendarView sessions={sessions} />
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </PageContainer>
  );
}
