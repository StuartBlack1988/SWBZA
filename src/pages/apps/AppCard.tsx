
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building, UsersIcon } from "lucide-react";
import { App } from "@/services/mockData";

interface AppCardProps {
  app: App;
  onViewDetails: (appId: string) => void;
}

const AppCard: React.FC<AppCardProps> = ({ app, onViewDetails }) => {
  return (
    <Card key={app.id} className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{app.name}</CardTitle>
          <Badge variant="outline">{app.version}</Badge>
        </div>
        <CardDescription className="line-clamp-2">{app.description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <div className="flex items-center">
            <Building className="mr-1 h-4 w-4" />
            <span>{app.clientCount} {app.clientCount === 1 ? 'client' : 'clients'}</span>
          </div>
          <div className="flex items-center">
            <UsersIcon className="mr-1 h-4 w-4" />
            <span>{app.userCount} users</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => onViewDetails(app.id)}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AppCard;
