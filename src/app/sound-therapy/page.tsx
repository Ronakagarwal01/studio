
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Music, Mic2, Leaf } from 'lucide-react';

export default function SoundTherapyPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Sound Therapy</h1>
        <p className="text-muted-foreground">Calming audio to help you relax, focus, and find peace.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
        
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-3">
                    <Leaf className="w-6 h-6 text-primary"/>
                    <span>Calming Nature Sounds</span>
                </CardTitle>
                <CardDescription>Listen to the soothing sounds of the natural world.</CardDescription>
            </CardHeader>
            <CardContent>
                <iframe 
                    style={{ borderRadius: '12px' }}
                    src="https://open.spotify.com/embed/playlist/37i9dQZF1DX4PP3DA4J0N1?utm_source=generator" 
                    width="100%" 
                    height="352" 
                    allowFullScreen={true}
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                    loading="lazy">
                </iframe>
            </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-3">
                    <Music className="w-6 h-6 text-primary"/>
                    <span>Peaceful Piano</span>
                </CardTitle>
                <CardDescription>Relax with beautiful and calming piano melodies.</CardDescription>
            </CardHeader>
            <CardContent>
                <iframe 
                    style={{ borderRadius: '12px' }}
                    src="https://open.spotify.com/embed/playlist/37i9dQZF1DX4sWSpwq3LiO?utm_source=generator" 
                    width="100%" 
                    height="352" 
                    allowFullScreen={true} 
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                    loading="lazy">
                </iframe>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-3">
                    <Mic2 className="w-6 h-6 text-primary"/>
                    <span>Guided Meditations</span>
                </CardTitle>
                <CardDescription>Follow along with guided sessions for mindfulness and calm.</CardDescription>
            </CardHeader>
            <CardContent>
                <iframe 
                    style={{ borderRadius: '12px' }}
                    src="https://open.spotify.com/embed/show/4t4h32L7Haea2t4pXo2k0j?utm_source=generator" 
                    width="100%" 
                    height="352" 
                    allowFullScreen={true} 
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                    loading="lazy">
                </iframe>
            </CardContent>
        </Card>

      </div>
    </div>
  );
}
