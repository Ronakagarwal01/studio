
'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Camera, Sparkles, Wand, Search, Music } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { recommendIndianMusic, RecommendIndianMusicOutput } from '@/lib/actions';
import { Input } from '@/components/ui/input';

export default function SoundTherapyPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<RecommendIndianMusicOutput | null>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const getCameraPermission = async () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.error('Camera not supported on this browser.');
        toast({
          variant: 'destructive',
          title: 'Camera Not Supported',
          description: 'Your browser does not support camera access.',
        });
        setHasCameraPermission(false);
        return;
      }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setHasCameraPermission(true);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings to use this feature.',
        });
      }
    };

    getCameraPermission();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    }
  }, [toast]);

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
  }

  const captureAndAnalyze = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    setIsLoading(true);
    setResult(null);

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    if (context) {
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        const photoDataUri = canvas.toDataURL('image/jpeg');

        try {
            const analysisResult = await recommendIndianMusic({ photoDataUri });
            setResult(analysisResult);
        } catch (error) {
            console.error('Error analyzing image:', error);
            toast({
                title: 'Analysis Failed',
                description: 'Could not analyze the image. Please try again.',
                variant: 'destructive',
            });
        } finally {
            stopCamera();
        }
    }
    setIsLoading(false);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Sound Therapy</h1>
        <p className="text-muted-foreground">Get personalized Indian music recommendations or search for sounds.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wand className="w-6 h-6" />
              <span>AI Music Recommender</span>
            </CardTitle>
            <CardDescription>Use your camera to get personalized Indian song recommendations.</CardDescription>
            {hasCameraPermission === false && (
              <Alert variant="destructive" className="mt-4">
                <AlertTitle>Camera Access Required</AlertTitle>
                <AlertDescription>
                  Please allow camera access to use this feature.
                </AlertDescription>
              </Alert>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative aspect-video w-full bg-muted rounded-md overflow-hidden border">
              <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
              {hasCameraPermission === null && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                      <Loader2 className="h-8 w-8 animate-spin text-white" />
                  </div>
              )}
            </div>
            <canvas ref={canvasRef} className="hidden" />
            <Button
              onClick={captureAndAnalyze}
              disabled={isLoading || !hasCameraPermission}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Analyze and Recommend
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-6 h-6" />
              <span>Search for Sounds</span>
            </CardTitle>
            <CardDescription>Find specific sounds, like "rain" or "piano".</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex w-full items-center space-x-2">
                <Input type="text" placeholder="e.g., Ocean sounds, classical music" />
                <Button type="submit">Search</Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {result && result.recommendations && (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Music className="w-6 h-6 text-primary"/>
                    <span>Your Recommended Playlist</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Alert>
                    <Sparkles className="h-4 w-4" />
                    <AlertTitle>Based on your analysis, here are some relaxing Indian songs</AlertTitle>
                    <AlertDescription className="whitespace-pre-wrap mt-2">
                        <ul className="list-disc pl-5 space-y-1">
                            {result.recommendations.map((song, index) => (
                                <li key={index}>{song}</li>
                            ))}
                        </ul>
                    </AlertDescription>
                </Alert>
            </CardContent>
        </Card>
      )}
    </div>
  );
}
