
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { resources } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Phone, AlertTriangle } from 'lucide-react';

export default function EmergencyHelpPage() {
  const hotlines = resources.hotlines;
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-center">Emergency Help</h1>
        <p className="text-muted-foreground text-center">If you are in crisis or need immediate assistance, please reach out to one of the helplines below.</p>
      </div>

      <Card className="border-destructive/50 bg-destructive/10">
        <CardHeader className="flex-row items-center gap-4">
            <AlertTriangle className="h-8 w-8 text-destructive"/>
            <div>
                <CardTitle className="text-destructive">Immediate Danger</CardTitle>
                <CardDescription className="text-destructive/90">
                    If you or someone else is in immediate danger, please call your local emergency services.
                </CardDescription>
            </div>
        </CardHeader>
      </Card>
      
      <div className="grid gap-6 md:grid-cols-2">
        {hotlines.map((item) => (
          <Card key={item.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-md">
                    <Phone className="w-5 h-5 text-primary"/>
                  </div>
                  {item.name}
              </CardTitle>
              <CardDescription>{item.specialty}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <span className="text-sm font-semibold text-foreground">{item.contact}</span>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                  <a href={`tel:${item.contact.replace(/[^0-9]/g, '')}`}>
                    <Phone className="mr-2 h-4 w-4" />
                    Call Now
                  </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
