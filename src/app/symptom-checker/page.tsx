
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { BrainCircuit, Activity } from 'lucide-react';

const tests = [
  {
    id: 'phq-9',
    title: 'Depression Test (PHQ-9)',
    description: 'This 9-question screening tool can help you understand if you might be experiencing symptoms of depression.',
    icon: BrainCircuit,
  },
  {
    id: 'gad-7',
    title: 'Anxiety Test (GAD-7)',
    description: 'This 7-question screening tool can help identify if you might be experiencing symptoms of generalized anxiety.',
    icon: Activity,
  },
];

export default function SymptomCheckerLandingPage() {
  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-center">Self Checkup</h1>
        <p className="text-muted-foreground text-center">
          Choose one of the self-assessment tools below to get a better understanding of your mental state. These tools are for informational purposes only.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-1">
        {tests.map((test) => (
          <Card key={test.id}>
            <CardHeader>
                <CardTitle className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-md">
                        <test.icon className="w-6 h-6 text-primary"/>
                    </div>
                    <span>{test.title}</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{test.description}</CardDescription>
              <Button asChild className="mt-4">
                <Link href={`/symptom-checker/${test.id}`}>Start Test</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
