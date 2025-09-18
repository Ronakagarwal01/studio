import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { resources, resourceCategories } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Phone, Users, UserCheck } from 'lucide-react';

const icons: { [key: string]: React.ReactNode } = {
  therapists: <UserCheck className="w-5 h-5 mr-2" />,
  supportGroups: <Users className="w-5 h-5 mr-2" />,
  hotlines: <Phone className="w-5 h-5 mr-2" />,
};

export default function ResourcesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Resource Directory</h1>
        <p className="text-muted-foreground">Find curated mental health resources, support, and professional help.</p>
      </div>

      <Tabs defaultValue="therapists" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          {Object.entries(resourceCategories).map(([key, value]) => (
            <TabsTrigger key={key} value={key} className="flex items-center">
              {icons[key]}
              {value}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(resources).map(([category, items]) => (
          <TabsContent key={category} value={category}>
            <div className="grid gap-6 mt-6 md:grid-cols-2">
              {items.map((item) => (
                <Card key={item.id} className="flex flex-col">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        {icons[category]}
                        {item.name}
                    </CardTitle>
                    <CardDescription>{item.specialty}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <span className="text-sm text-muted-foreground">{item.location}</span>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">{item.contact}</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
