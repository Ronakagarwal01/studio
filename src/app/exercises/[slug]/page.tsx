
'use client';

import { relaxationExercises } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, ArrowLeft, Volume2, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { generateAudioFromText } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';


export default function ExerciseDetailsPage({ params }: { params: { slug: string } }) {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const { toast } = useToast();
  const { slug } = params;

  const exercise = relaxationExercises.find((ex) => ex.id === slug);

  if (!exercise) {
    notFound();
  }

  const image = PlaceHolderImages.find(img => img.id === exercise.image.id);

  const handleGenerateAudio = async () => {
    setIsGeneratingAudio(true);
    setAudioUrl(null);
    try {
      const result = await generateAudioFromText({ text: exercise.description });
      setAudioUrl(result.audioDataUri);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error generating audio',
        description: 'Failed to generate audio for this exercise. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsGeneratingAudio(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
        <div>
            <Button asChild variant="ghost" className="mb-4">
                <Link href="/exercises">
                    <ArrowLeft className="mr-2 h-4 w-4"/>
                    Back to Exercises
                </Link>
            </Button>
            
            <div className="relative h-72 w-full rounded-lg overflow-hidden">
                {image && (
                <Image
                    src={image.imageUrl}
                    alt={image.description}
                    fill
                    className="object-cover"
                    data-ai-hint={image.imageHint}
                />
                )}
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute bottom-0 left-0 p-6">
                    <div className="flex items-center gap-2 mb-2">
                        <exercise.icon className="w-8 h-8 text-white"/>
                        <h1 className="text-3xl font-bold tracking-tight text-white">{exercise.title}</h1>
                    </div>
                    <div className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-2 w-fit">
                        <Clock className="w-4 h-4"/>
                        <span>{exercise.duration}</span>
                    </div>
                </div>
            </div>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>About this exercise</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="whitespace-pre-wrap leading-relaxed">{exercise.description}</p>
                 <Button onClick={handleGenerateAudio} disabled={isGeneratingAudio} variant="outline">
                  {isGeneratingAudio ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating Audio...
                    </>
                  ) : (
                    <>
                      <Volume2 className="mr-2 h-4 w-4" />
                      Listen to this exercise
                    </>
                  )}
                </Button>
                {audioUrl && (
                  <audio controls src={audioUrl} className="w-full">
                    Your browser does not support the audio element.
                  </audio>
                )}
            </CardContent>
        </Card>
    </div>
  );
}
