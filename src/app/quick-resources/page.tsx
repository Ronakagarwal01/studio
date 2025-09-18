
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Leaf, Wind, Heart } from 'lucide-react';

const selfCareTips = [
  'Stay hydrated - drink water regularly',
  'Take short breaks every hour',
  'Practice gratitude - list 3 good things',
  'Get 7-9 hours of sleep',
  'Move your body - even 5 minutes helps',
];

const breathingExercises = [
    'Box Breathing: Inhale for 4s, hold for 4s, exhale for 4s, hold for 4s. Repeat.',
    'Alternate Nostril Breathing: Inhale through one nostril, exhale through the other.',
    '4-7-8 Breathing: Inhale for 4s, hold for 7s, exhale for 8s.',
];

const mindfulnessTips = [
    'Focus on your breath for one minute.',
    'Notice 5 things you can see, 4 you can feel, 3 you can hear, 2 you can smell, and 1 you can taste.',
    'Pay full attention to a daily activity, like washing dishes.',
    'Go for a short walk and notice your surroundings.',
]

export default function QuickResourcesPage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-center">Quick Resources</h1>
        <p className="text-muted-foreground text-center">Simple, effective techniques you can use right now.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-1">
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-3">
                    <Heart className="w-6 h-6 text-primary"/>
                    <span>Daily Self-Care</span>
                </CardTitle>
                <CardDescription>Small habits that make a big difference.</CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="space-y-3 list-disc list-inside text-muted-foreground">
                    {selfCareTips.map((tip, index) => (
                        <li key={index}><span className="text-foreground">{tip}</span></li>
                    ))}
                </ul>
            </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-3">
                    <Wind className="w-6 h-6 text-primary"/>
                    <span>Breathing Exercises</span>
                </CardTitle>
                <CardDescription>Calm your mind and body in minutes.</CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="space-y-3 list-disc list-inside text-muted-foreground">
                    {breathingExercises.map((tip, index) => (
                        <li key={index}><span className="text-foreground">{tip}</span></li>
                    ))}
                </ul>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-3">
                    <Leaf className="w-6 h-6 text-primary"/>
                    <span>Mindfulness Tips</span>
                </CardTitle>
                <CardDescription>Bring your attention to the present moment.</CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="space-y-3 list-disc list-inside text-muted-foreground">
                    {mindfulnessTips.map((tip, index) => (
                        <li key={index}><span className="text-foreground">{tip}</span></li>
                    ))}
                </ul>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
