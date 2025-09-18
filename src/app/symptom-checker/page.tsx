'use client';
import { useState } from 'react';
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
  const [score, setScore] = useState<number | null>(null);

  const currentQuestion = symptomCheckerQuestions[step];
  const totalSteps = symptomCheckerQuestions.length;

  const handleNext = (answerIndex: number) => {
    const newAnswers = [...answers.slice(0, step), answerIndex];
    setAnswers(newAnswers);
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      const totalScore = newAnswers.reduce((sum, val) => sum + val, 0);
      setScore(totalScore);
      setStep(step + 1);
    }
  };

  const handleSelect = (value: string) => {
    const answerIndex = currentQuestion.options.indexOf(value);
    handleNext(answerIndex);
  };
  
  const handleRestart = () => {
    setStep(0);
    setAnswers([]);
    setScore(null);
  };

  const progress = ((step) / totalSteps) * 100;

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-center">Symptom Checker</h1>
        <p className="text-muted-foreground text-center">An interactive tool to help identify potential mental health concerns.</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            {step > 0 && (
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setStep(step - 1)}>
                  <ArrowLeft className="h-4 w-4" />
                </Button>
            )}
            <Progress value={progress} className="w-full" />
          </div>
        </CardHeader>
        <CardContent className="p-8">
          {step < totalSteps ? (
            <div className="space-y-6">
              <p className="text-lg font-semibold text-center">{currentQuestion.question}</p>
              <RadioGroup onValueChange={handleSelect} value={currentQuestion.options[answers[step]]} className="space-y-2 flex flex-col items-center">
                {currentQuestion.options.map((option, index) => (
                  <div key={index} className='w-full max-w-sm'>
                     <Label
                      htmlFor={`option-${index}`}
                      className={cn(
                        buttonVariants({ variant: 'outline' }),
                        'w-full h-12 justify-start px-4 text-left font-normal text-base cursor-pointer'
                      )}
                    >
                      <RadioGroupItem value={option} id={`option-${index}`} className="mr-3"/>
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold">Your Results</h2>
              {score !== null && score > 4 ? (
                  <p>Your responses suggest you might be experiencing significant emotional distress. It could be beneficial to speak with a mental health professional.</p>
              ): (
                  <p>Your responses indicate you may be experiencing some mild emotional distress. Monitoring your feelings and practicing self-care is a good step.</p>
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
