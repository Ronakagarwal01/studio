'use client';

import { useState } from 'react';
import { useMoodData } from '@/hooks/use-mood-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { providePersonalizedRecommendations } from '@/lib/actions';
import { Sparkles, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function RecommendationsPage() {
  const [userInput, setUserInput] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { moodData, isLoading: isLoadingMood } = useMoodData();
  const { toast } = useToast();

  const handleGetRecommendation = async () => {
    if (!userInput) {
      toast({
        title: 'Input required',
        description: 'Please describe what\'s on your mind.',
        variant: 'destructive',
      });
      return;
    }
    setIsLoading(true);
    setRecommendation('');
    try {
      const moodDataString = JSON.stringify(moodData);
      const result = await providePersonalizedRecommendations({
        moodData: moodDataString,
        userInput: userInput,
      });
      setRecommendation(result.recommendations);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Failed to get recommendations. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-center">Your AI Wellness Coach</h1>
        <p className="text-muted-foreground text-center">Get personalized recommendations based on your mood and concerns.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>How can I help?</CardTitle>
          <CardDescription>Describe your current feelings or challenges. Your mood data from the last 30 days will be shared anonymously to provide better recommendations.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="e.g., 'I've been feeling anxious about work lately and have trouble sleeping.'"
            className="min-h-[120px]"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <Button onClick={handleGetRecommendation} disabled={isLoading || isLoadingMood} className="w-full">
            {isLoading || isLoadingMood ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isLoadingMood ? 'Loading mood data...' : 'Analyzing...'}
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Get My Recommendation
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {isLoading && (
         <div className="flex flex-col items-center justify-center pt-8 text-center space-y-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Your AI coach is thinking...</p>
         </div>
      )}

      {recommendation && (
        <Alert className="mt-8">
          <Sparkles className="h-4 w-4" />
          <AlertTitle>Here are some recommendations for you</AlertTitle>
          <AlertDescription className="whitespace-pre-wrap">
            {recommendation}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
