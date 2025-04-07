
import React from "react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { App, Client } from "@/services/mockData";

import OverviewTab from "./OverviewTab";
import ClientsTab from "./ClientsTab";
import FeaturesTab from "./FeaturesTab";

interface AppDetailsDialogProps {
  app: App | null;
  clients: Client[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AppDetailsDialog: React.FC<AppDetailsDialogProps> = ({ 
  app, 
  clients, 
  open, 
  onOpenChange 
}) => {
  if (!app) return null;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl">{app.name}</DialogTitle>
            <Badge variant="outline">{app.version}</Badge>
          </div>
          <DialogDescription>
            {app.description}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="overview">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="clients">Clients</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <OverviewTab app={app} clients={clients} />
          </TabsContent>

          {/* Clients Tab */}
          <TabsContent value="clients">
            <ClientsTab clients={clients} />
          </TabsContent>

          {/* Features Tab */}
          <TabsContent value="features">
            <FeaturesTab features={app.features} appName={app.name} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AppDetailsDialog;
