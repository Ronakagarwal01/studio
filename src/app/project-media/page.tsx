'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Clapperboard, Loader2, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateVideoFromText } from '@/lib/actions';

export default function ProjectMediaPage() {
  const [prompt, setPrompt] = useState('');
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerateVideo = async () => {
    if (!prompt) {
      toast({
        title: 'Prompt required',
        description: "Please enter a description for the video you'd like to create.",
        variant: 'destructive',
      });
      return;
    }
    setIsLoading(true);
    setVideoUrl(null);
    try {
      const result = await generateVideoFromText({ prompt });
      setVideoUrl(result.videoDataUri);
    } catch (error) {
      console.error(error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
      toast({
        title: 'Error Generating Video',
        description: `Failed to create video. Please try again. Error: ${errorMessage}`,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-center">AI Project Media Generator</h1>
        <p className="text-muted-foreground text-center">Create a short video clip from a text description using AI.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clapperboard className="w-6 h-6" />
            <span>Video Prompt</span>
          </CardTitle>
          <CardDescription>Describe the scene you want to generate. Be as descriptive as you like.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="e.g., 'A majestic dragon soaring over a mystical forest at dawn.'"
            className="min-h-[100px]"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <Button onClick={handleGenerateVideo} disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Video (this may take a minute)...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Video
              </>
            )}
          </Button>
        </CardContent>
      </Card>
      
      {isLoading && !videoUrl && (
         <div className="flex flex-col items-center justify-center pt-8 text-center space-y-3">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="text-muted-foreground">The AI is creating your video. Please wait...</p>
            <p className="text-xs text-muted-foreground">(Generation can take up to a minute or two)</p>
         </div>
      )}

      {videoUrl && (
        <Card>
          <CardHeader>
            <CardTitle>Your Generated Video</CardTitle>
            <CardDescription>Here is the video created from your prompt.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative aspect-video w-full bg-muted rounded-md overflow-hidden border">
                <video
                    src={videoUrl}
                    controls
                    autoPlay
                    className="w-full h-full object-contain"
                >
                    Your browser does not support the video tag.
                </video>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
