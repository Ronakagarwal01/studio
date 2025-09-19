'use client';
import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button, buttonVariants } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { symptomCheckerQuestions } from '@/lib/data';
import { ArrowLeft, RefreshCw, TriangleAlert } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function SymptomCheckerPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  
  const totalSteps = symptomCheckerQuestions.length;
  const isCompleted = step >= totalSteps;

  const currentQuestion = symptomCheckerQuestions[step];
  
  const score = useMemo(() => {
    if (!isCompleted) return null;
    return answers.reduce((sum, val) => sum + val, 0);
  }, [isCompleted, answers]);

  const handleSelect = (value: string) => {
    const answerIndex = currentQuestion.options.indexOf(value);
    const newAnswers = [...answers.slice(0, step), answerIndex];
    setAnswers(newAnswers);
    setTimeout(() => setStep(step + 1), 200); // Add a small delay for better UX
  };
  
  const handleRestart = () => {
    setStep(0);
    setAnswers([]);
  };

  const getScoreInterpretation = (finalScore: number | null) => {
    if (finalScore === null) return '';
    if (finalScore <= 4) return { level: 'Minimal', message: 'Your score suggests minimal to no depression symptoms. It\'s still a good practice to monitor your mood.' };
    if (finalScore <= 9) return { level: 'Mild', message: 'Your responses suggest you may be experiencing mild depression. Consider discussing your feelings with someone you trust or a professional.' };
    if (finalScore <= 14) return { level: 'Moderate', message: 'Your score indicates moderate depression symptoms. It is highly recommended to consult with a mental health professional.' };
    if (finalScore <= 19) return { level: 'Moderately Severe', message: 'Your responses suggest moderately severe depression. Professional help is very important. Please seek support.' };
    return { level: 'Severe', message: 'Your score indicates severe depression. It is crucial to seek professional help immediately.' };
  }

  const interpretation = getScoreInterpretation(score);

  const progress = ((step) / totalSteps) * 100;

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-center">Symptom Checker</h1>
        <p className="text-muted-foreground text-center">Over the last 2 weeks, how often have you been bothered by any of the following problems?</p>
      </div>

      <Card>
        <CardHeader>
            <Progress value={progress} className="w-full" />
        </CardHeader>
        <CardContent className="p-6 sm:p-8">
          {!isCompleted ? (
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg">
                    {step + 1}
                  </div>
                  <p className="text-lg font-semibold flex-1 mt-1">{currentQuestion.question}</p>
              </div>

              {step > 0 && (
                <Button variant="ghost" size="sm" onClick={() => setStep(step - 1)} className="text-muted-foreground">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              )}
              
              <RadioGroup onValueChange={handleSelect} key={step} className="space-y-3 pt-4">
                {currentQuestion.options.map((option, index) => (
                  <div key={index} className='w-full'>
                     <Label
                      htmlFor={`option-${index}`}
                      className={cn(
                        buttonVariants({ variant: 'outline', size: 'lg' }),
                        'w-full h-auto justify-start px-4 py-3 text-left font-normal text-base cursor-pointer has-[[data-state=checked]]:bg-primary/10 has-[[data-state=checked]]:border-primary'
                      )}
                    >
                      <RadioGroupItem value={option} id={`option-${index}`} className="mr-4"/>
                      <span>{option} <span className="text-muted-foreground text-xs">({index} point{index !== 1 && 's'})</span></span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold">Your PHQ-9 Results</h2>
              <p className="text-muted-foreground">Your total score is:</p>
              <p className="text-6xl font-bold text-primary">{score}</p>
              {interpretation && (
                <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="font-bold text-lg">{interpretation.level} Depression</p>
                    <p>{interpretation.message}</p>
                </div>
              )}
              
              <Card className="bg-destructive/10 border-destructive/50 p-4 mt-6">
                  <div className="flex items-center justify-center gap-3">
                    <TriangleAlert className="h-6 w-6 text-destructive"/>
                    <CardTitle className="text-destructive">Disclaimer</CardTitle>
                  </div>
                  <CardDescription className="text-destructive/90 mt-2">
                    This is not a medical diagnosis. This tool is for informational purposes only. Please consult a healthcare professional for an accurate assessment.
                  </CardDescription>
              </Card>
              <div className="flex gap-4 justify-center pt-4">
                <Button onClick={handleRestart} variant="outline">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Take Again
                </Button>
                <Button asChild>
                    <Link href="/resources">Find a Professional</Link>
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
