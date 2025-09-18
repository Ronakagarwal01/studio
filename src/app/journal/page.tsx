'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { generateTailoredJournalPrompts } from '@/lib/actions';
import { Sparkles, BookHeart, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const themes = ['Gratitude', 'Self-Discovery', 'Overcoming Challenges', 'Future Goals', 'Mindfulness'];

export default function JournalPage() {
  const [selectedTheme, setSelectedTheme] = useState('');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGeneratePrompt = async () => {
    if (!selectedTheme) {
      toast({
        title: 'Select a theme',
        description: 'Please choose a theme to generate a prompt.',
        variant: 'destructive',
      });
      return;
    }
    setIsLoading(true);
    setGeneratedPrompt('');
    try {
      const result = await generateTailoredJournalPrompts({ theme: selectedTheme });
      setGeneratedPrompt(result.prompt);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Failed to generate prompt. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Your Private Journal</h1>
        <p className="text-muted-foreground">A space for your thoughts, feelings, and reflections.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card className="flex flex-col h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookHeart className="w-6 h-6" />
                <span>Today's Entry</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col">
              {generatedPrompt && (
                <div className="mb-4 p-3 bg-primary/10 border-l-4 border-primary rounded-r-lg">
                  <p className="font-semibold text-primary">Journal Prompt:</p>
                  <p className="text-sm text-foreground">{generatedPrompt}</p>
                </div>
              )}
              <Textarea
                placeholder="Start writing here..."
                className="min-h-[300px] text-base flex-grow"
              />
            </CardContent>
            <CardFooter>
              <Button>Save Entry</Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-accent-foreground" />
                <span>Prompt Generator</span>
              </CardTitle>
              <CardDescription>Need inspiration? Generate a tailored prompt.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select onValueChange={setSelectedTheme} value={selectedTheme}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a theme" />
                </SelectTrigger>
                <SelectContent>
                  {themes.map(theme => (
                    <SelectItem key={theme} value={theme}>{theme}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={handleGeneratePrompt} disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  'Generate Prompt'
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
