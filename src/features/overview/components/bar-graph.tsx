'use client';

import * as React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';

export const description = 'An interactive bar chart';

const chartData = [
  { date: '2024-04-01', supervisedHours: 5 },
  { date: '2024-04-02', supervisedHours: 8 },
  { date: '2024-04-03', supervisedHours: 6 },
  { date: '2024-04-04', supervisedHours: 7 },
  { date: '2024-04-05', supervisedHours: 4 },
  { date: '2024-04-06', supervisedHours: 9 },
  { date: '2024-04-07', supervisedHours: 3 },
  { date: '2024-04-08', supervisedHours: 6 },
  { date: '2024-04-09', supervisedHours: 5 },
  { date: '2024-04-10', supervisedHours: 7 },
  { date: '2024-04-11', supervisedHours: 8 },
  { date: '2024-04-12', supervisedHours: 4 },
  { date: '2024-04-13', supervisedHours: 7 },
  { date: '2024-04-14', supervisedHours: 6 },
  { date: '2024-04-15', supervisedHours: 5 },
  { date: '2024-04-16', supervisedHours: 8 },
  { date: '2024-04-17', supervisedHours: 9 },
  { date: '2024-04-18', supervisedHours: 7 },
  { date: '2024-04-19', supervisedHours: 6 },
  { date: '2024-04-20', supervisedHours: 5 },
  { date: '2024-04-21', supervisedHours: 8 },
  { date: '2024-04-22', supervisedHours: 7 },
  { date: '2024-04-23', supervisedHours: 6 },
  { date: '2024-04-24', supervisedHours: 9 },
  { date: '2024-04-25', supervisedHours: 5 },
  { date: '2024-04-26', supervisedHours: 4 },
  { date: '2024-04-27', supervisedHours: 8 },
  { date: '2024-04-28', supervisedHours: 7 },
  { date: '2024-04-29', supervisedHours: 6 },
  { date: '2024-04-30', supervisedHours: 9 },
  { date: '2024-05-01', supervisedHours: 5 },
  { date: '2024-05-02', supervisedHours: 7 },
  { date: '2024-05-03', supervisedHours: 6 },
  { date: '2024-05-04', supervisedHours: 8 },
  { date: '2024-05-05', supervisedHours: 9 },
  { date: '2024-05-06', supervisedHours: 7 },
  { date: '2024-05-07', supervisedHours: 6 },
  { date: '2024-05-08', supervisedHours: 5 },
  { date: '2024-05-09', supervisedHours: 8 },
  { date: '2024-05-10', supervisedHours: 7 },
  { date: '2024-05-11', supervisedHours: 6 },
  { date: '2024-05-12', supervisedHours: 9 },
  { date: '2024-05-13', supervisedHours: 5 },
  { date: '2024-05-14', supervisedHours: 7 },
  { date: '2024-05-15', supervisedHours: 6 },
  { date: '2024-05-16', supervisedHours: 8 },
  { date: '2024-05-17', supervisedHours: 9 },
  { date: '2024-05-18', supervisedHours: 7 },
  { date: '2024-05-19', supervisedHours: 6 },
  { date: '2024-05-20', supervisedHours: 5 },
  { date: '2024-05-21', supervisedHours: 8 },
  { date: '2024-05-22', supervisedHours: 7 },
  { date: '2024-05-23', supervisedHours: 6 },
  { date: '2024-05-24', supervisedHours: 9 },
  { date: '2024-05-25', supervisedHours: 5 },
  { date: '2024-05-26', supervisedHours: 4 },
  { date: '2024-05-27', supervisedHours: 8 },
  { date: '2024-05-28', supervisedHours: 7 },
  { date: '2024-05-29', supervisedHours: 6 },
  { date: '2024-05-30', supervisedHours: 9 },
  { date: '2024-05-31', supervisedHours: 5 },
  { date: '2024-06-01', supervisedHours: 7 },
  { date: '2024-06-02', supervisedHours: 6 },
  { date: '2024-06-03', supervisedHours: 8 },
  { date: '2024-06-04', supervisedHours: 9 },
  { date: '2024-06-05', supervisedHours: 7 },
  { date: '2024-06-06', supervisedHours: 6 },
  { date: '2024-06-07', supervisedHours: 5 },
  { date: '2024-06-08', supervisedHours: 8 },
  { date: '2024-06-09', supervisedHours: 7 },
  { date: '2024-06-10', supervisedHours: 6 },
  { date: '2024-06-11', supervisedHours: 9 },
  { date: '2024-06-12', supervisedHours: 5 },
  { date: '2024-06-13', supervisedHours: 7 },
  { date: '2024-06-14', supervisedHours: 6 },
  { date: '2024-06-15', supervisedHours: 8 },
  { date: '2024-06-16', supervisedHours: 9 },
  { date: '2024-06-17', supervisedHours: 7 },
  { date: '2024-06-18', supervisedHours: 6 },
  { date: '2024-06-19', supervisedHours: 5 },
  { date: '2024-06-20', supervisedHours: 8 },
  { date: '2024-06-21', supervisedHours: 7 },
  { date: '2024-06-22', supervisedHours: 6 },
  { date: '2024-06-23', supervisedHours: 9 },
  { date: '2024-06-24', supervisedHours: 5 },
  { date: '2024-06-25', supervisedHours: 7 },
  { date: '2024-06-26', supervisedHours: 6 },
  { date: '2024-06-27', supervisedHours: 8 },
  { date: '2024-06-28', supervisedHours: 9 },
  { date: '2024-06-29', supervisedHours: 7 },
  { date: '2024-06-30', supervisedHours: 6 }
];

const chartConfig = {
  supervisedHours: {
    label: 'Supervised Hours',
    color: 'var(--primary)'
  }
} satisfies ChartConfig;

export function BarGraph() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>('supervisedHours');

  const total = React.useMemo(
    () => chartData.reduce((acc, curr) => acc + curr.supervisedHours, 0),
    []
  );

  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <Card className='@container/card !pt-3'>
      <CardHeader className='flex flex-col items-stretch space-y-0 border-b !p-0 sm:flex-row'>
        <div className='flex flex-1 flex-col justify-center gap-1 px-6 !py-0'>
          <CardTitle>Supervised Hours</CardTitle>
          <CardDescription>
            <span className='hidden @[540px]/card:block'>
              Total for the last 3 months
            </span>
            <span className='@[540px]/card:hidden'>Last 3 months</span>
          </CardDescription>
        </div>
        <div className='flex'>
          {['supervisedHours'].map((key) => {
            const chart = key as keyof typeof chartConfig;
            if (!chart || total === 0) return null;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className='data-[active=true]:bg-primary/5 hover:bg-primary/5 relative flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left transition-colors duration-200 even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6'
                onClick={() => setActiveChart(chart)}
              >
                <span className='text-muted-foreground text-xs'>
                  {chartConfig[chart].label}
                </span>
                <span className='text-lg leading-none font-bold sm:text-3xl'>
                  {total.toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className='px-2 pt-4 sm:px-6 sm:pt-6'>
        <ChartContainer
          config={chartConfig}
          className='aspect-auto h-[260px] w-full'
        >
          <BarChart
            data={chartData}
            margin={{
              left: 12,
              right: 12
            }}
          >
            <defs>
              <linearGradient id='fillBar' x1='0' y1='0' x2='0' y2='1'>
                <stop
                  offset='0%'
                  stopColor='var(--primary)'
                  stopOpacity={0.8}
                />
                <stop
                  offset='100%'
                  stopColor='var(--primary)'
                  stopOpacity={0.2}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='date'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric'
                });
              }}
            />
            <ChartTooltip
              cursor={{ fill: 'var(--primary)', opacity: 0.1 }}
              content={
                <ChartTooltipContent
                  className='w-[150px]'
                  nameKey='views'
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    });
                  }}
                />
              }
            />
            <Bar
              dataKey={activeChart}
              fill='url(#fillBar)'
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
