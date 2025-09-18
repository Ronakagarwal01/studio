import { MoodChart } from '@/components/dashboard/mood-chart';
import { MoodTracker } from '@/components/dashboard/mood-tracker';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome to your Dashboard</h1>
        <p className="text-muted-foreground">Here's a snapshot of your mental wellness journey.</p>
      </div>
      
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Mood Tracker</CardTitle>
            <CardDescription>How are you feeling today? Log your mood to see your patterns.</CardDescription>
          </CardHeader>
          <CardContent>
            <MoodTracker />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tip of the Day</CardTitle>
            <CardDescription>A small step towards a better you.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center text-center p-6">
            <div className="p-3 bg-accent/20 rounded-full mb-4">
              <Lightbulb className="h-8 w-8 text-accent-foreground" />
            </div>
            <p className="font-semibold">Practice mindful breathing for 5 minutes.</p>
            <p className="text-sm text-muted-foreground mt-1">It can help reduce stress and increase focus.</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Progress</CardTitle>
          <CardDescription>Here's a look at your mood trends over the last 30 days.</CardDescription>
        </CardHeader>
        <CardContent>
          <MoodChart />
        </CardContent>
      </Card>
    </div>
  );
}
