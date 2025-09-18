'use client';

import { useMoodData } from '@/hooks/use-mood-data';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { useMemo } from 'react';
import { subDays, format, eachDayOfInterval } from 'date-fns';
import { Skeleton } from '../ui/skeleton';

const chartConfig = {
  mood: {
    label: 'Mood Level',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;

export function MoodChart() {
  const { moodData, isLoading } = useMoodData();

  const chartData = useMemo(() => {
    const endDate = new Date();
    const startDate = subDays(endDate, 29);
    const dateRange = eachDayOfInterval({ start: startDate, end: endDate });

    return dateRange.map(date => {
      const dateString = format(date, 'yyyy-MM-dd');
      const entry = moodData.find(d => d.date === dateString);
      return {
        date: format(date, 'MMM d'),
        mood: entry ? entry.mood : null,
      };
    });
  }, [moodData]);
  
  if (isLoading) {
    return <Skeleton className="h-[350px] w-full" />;
  }
  
  const hasData = useMemo(() => moodData.length > 0, [moodData]);

  if (!hasData) {
      return (
          <div className="h-[350px] w-full flex items-center justify-center text-center rounded-lg bg-muted/50">
              <p className="text-muted-foreground">No mood data yet. <br/> Start tracking your mood to see your progress here!</p>
          </div>
      )
  }

  return (
    <div className="h-[350px] w-full">
      <ChartContainer config={chartConfig} className="w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{
              top: 5,
              right: 20,
              left: -10,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-border" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis domain={[0, 5]} tickCount={6} tickLine={false} axisLine={false} />
            <ChartTooltip
              cursor={true}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Line
              dataKey="mood"
              type="monotone"
              stroke="var(--color-mood)"
              strokeWidth={3}
              dot={{ r: 4, fill: "var(--color-mood)", stroke: "hsl(var(--background))", strokeWidth: 2 }}
              activeDot={{ r: 6 }}
              connectNulls
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}
