'use client';

import { IconTrendingUp } from '@tabler/icons-react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';

const chartData = [
  { month: 'January', user: 44, platform: 12 },
  { month: 'February', user: 36, platform: 27 },
  { month: 'March', user: 33, platform: 26 },
  { month: 'April', user: 41, platform: 22 },
  { month: 'May', user: 24, platform: 16 },
  { month: 'June', user: 29, platform: 18 }
];

const chartConfig = {
  visitors: {
    label: 'Visitors'
  },
  user: {
    label: 'You',
    color: 'var(--primary)'
  },
  platform: {
    label: 'Platform Avg',
    color: 'var(--primary)'
  }
} satisfies ChartConfig;

export function AreaGraph() {
  return (
    <Card className='@container/card'>
      <CardHeader>
        <CardTitle>Average Response Time</CardTitle>
        <CardDescription>
          Comparison of your average response time vs platform average
        </CardDescription>
      </CardHeader>
      <CardContent className='px-2 pt-4 sm:px-6 sm:pt-6'>
        <ChartContainer
          config={chartConfig}
          className='aspect-auto h-[250px] w-full'
        >
          <AreaChart
            data={chartData}
            margin={{
              left: -20,
              right: 12
            }}
          >
            <defs>
              <linearGradient id='fillUser' x1='0' y1='0' x2='0' y2='1'>
                <stop
                  offset='5%'
                  stopColor='var(--color-user)'
                  stopOpacity={1.0}
                />
                <stop
                  offset='95%'
                  stopColor='var(--color-user)'
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id='fillPlatform' x1='0' y1='0' x2='0' y2='1'>
                <stop
                  offset='5%'
                  stopColor='var(--color-platform)'
                  stopOpacity={0.95}
                />
                <stop
                  offset='95%'
                  stopColor='var(--color-platform)'
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}s`}
            />
            <XAxis
              dataKey='month'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator='dot' />}
            />
            <Area
              dataKey='user'
              type='natural'
              fill='url(#fillUser)'
              stroke='var(--color-user)'
              stackId='a'
            />
            <Area
              dataKey='platform'
              type='natural'
              fill='url(#fillPlatform)'
              stroke='var(--color-platform)'
              stackId='a'
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className='flex w-full items-start gap-2 text-sm'>
          <div className='grid gap-2'>
            <div className='flex items-center gap-2 leading-none font-medium'>
              Your response time improved by 5.2% this month{' '}
              <IconTrendingUp className='h-4 w-4' />
            </div>
            <div className='text-muted-foreground flex items-center gap-2 leading-none'>
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
