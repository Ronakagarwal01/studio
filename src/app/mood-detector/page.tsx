
'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Camera, Sparkles, Wand } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { detectMoodFromImage, DetectMoodFromImageOutput } from '@/lib/actions';

export default function MoodDetectorPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<DetectMoodFromImageOutput | null>(null);
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
          description: 'Please enable camera permissions in your browser settings to use this app.',
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
            const analysisResult = await detectMoodFromImage({ photoDataUri });
            setResult(analysisResult);
        } catch (error) {
            console.error('Error analyzing mood:', error);
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
    <div className="space-y-8 max-w-3xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-center">AI Mood Detector</h1>
        <p className="text-muted-foreground text-center">Use your camera to get an instant mood analysis and recommendations.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="w-6 h-6" />
            <span>Live Camera Feed</span>
          </CardTitle>
          {hasCameraPermission === false && (
            <Alert variant="destructive" className="mt-4">
              <AlertTitle>Camera Access Required</AlertTitle>
              <AlertDescription>
                Please allow camera access in your browser settings to use this feature.
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
                <Wand className="mr-2 h-4 w-4" />
                Analyze My Mood
              </>
            )}
          </Button>
        </CardContent>
      </Card>
      
      {result && result.mood && (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-primary"/>
                    <span>Analysis Result</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Alert>
                    <Wand className="h-4 w-4" />
                    <AlertTitle>You seem to be feeling: {result.mood}</AlertTitle>
                    <AlertDescription className="whitespace-pre-wrap mt-2">
                        {result.recommendations}
                    </AlertDescription>
                </Alert>
            </CardContent>
        </Card>
      )}
    </div>
  );
}
