import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { relaxationExercises } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Clock, PlayCircle } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function ExercisesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Relaxation Exercises</h1>
        <p className="text-muted-foreground">Guided sessions to help you manage stress and find calm.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {relaxationExercises.map((exercise) => {
          const image = PlaceHolderImages.find(img => img.id === exercise.image.id);
          return (
            <Card key={exercise.id} className="overflow-hidden flex flex-col group">
              <div className="relative h-48 w-full">
                {image && (
                  <Image
                    src={image.imageUrl}
                    alt={image.description}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint={image.imageHint}
                    width={600}
                    height={400}
                  />
                )}
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute top-4 right-4 bg-background/80 text-foreground text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                    <Clock className="w-3 h-3"/>
                    {exercise.duration}
                </div>
              </div>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <exercise.icon className="w-6 h-6 text-primary"/>
                    {exercise.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">{exercise.description}</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <PlayCircle className="mr-2 h-4 w-4" />
                  Start Exercise
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
