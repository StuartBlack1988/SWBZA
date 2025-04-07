
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Building, UsersIcon, Clock } from "lucide-react";
import { App, Client } from "@/services/mockData";

interface OverviewTabProps {
  app: App;
  clients: Client[];
}

const OverviewTab: React.FC<OverviewTabProps> = ({ app, clients }) => {
  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="flex flex-col items-center p-4 border rounded-md">
            <Building className="h-8 w-8 text-primary mb-2" />
            <div className="text-2xl font-bold">{app.clientCount}</div>
            <div className="text-sm text-muted-foreground">Clients</div>
          </div>
          <div className="flex flex-col items-center p-4 border rounded-md">
            <UsersIcon className="h-8 w-8 text-primary mb-2" />
            <div className="text-2xl font-bold">{app.userCount}</div>
            <div className="text-sm text-muted-foreground">Active Users</div>
          </div>
          <div className="flex flex-col items-center p-4 border rounded-md">
            <Clock className="h-8 w-8 text-primary mb-2" />
            <div className="text-lg font-medium">{app.releaseDate}</div>
            <div className="text-sm text-muted-foreground">Release Date</div>
          </div>
        </div>

        <div className="pt-4 border-t">
          <h3 className="text-lg font-medium mb-2">Active Installations</h3>
          <div className="grid gap-2">
            {clients.length === 0 ? (
              <div className="text-center py-4 text-muted-foreground">
                No clients are using this application
              </div>
            ) : (
              clients.map(client => (
                <div key={client.id} className="flex justify-between items-center p-2 border rounded-md">
                  <div>
                    <div className="font-medium">{client.companyName}</div>
                    <div className="text-sm text-muted-foreground">{client.activeUsers} users</div>
                  </div>
                  <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    client.status === "active" ? "bg-success/10 text-success" : "bg-muted"
                  }`}>
                    {client.status}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OverviewTab;
