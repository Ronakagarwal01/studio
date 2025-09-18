'use client';

import { useState } from 'react';
import { useMoodData } from '@/hooks/use-mood-data';
import { Smile, Frown, Meh, Laugh, Annoyed } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const moods = [
  { level: 1, label: 'Awful', icon: Frown },
  { level: 2, label: 'Bad', icon: Annoyed },
  { level: 3, label: 'Okay', icon: Meh },
  { level: 4, label: 'Good', icon: Smile },
  { level: 5, label: 'Great', icon: Laugh },
];

export function MoodTracker() {
  const { addMoodEntry, moodData } = useMoodData();
  const [today, setToday] = useState('');

  // Prevent hydration mismatch by getting today's date on the client
  useState(() => {
    setToday(new Date().toISOString().split('T')[0]);
  });
  
  const todaysMood = moodData.find(entry => entry.date === today);

  return (
    <TooltipProvider>
      <div className="flex justify-around items-center p-4 rounded-lg bg-background">
        {moods.map((mood) => (
          <Tooltip key={mood.level} delayDuration={100}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  'w-16 h-16 rounded-full transition-all duration-200 transform hover:scale-110 focus:scale-110',
                  todaysMood?.mood === mood.level
                    ? 'bg-primary/20 border-2 border-primary scale-110'
                    : 'text-muted-foreground hover:text-foreground'
                )}
                onClick={() => addMoodEntry({ mood: mood.level })}
              >
                <mood.icon className="w-8 h-8" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{mood.label}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}
