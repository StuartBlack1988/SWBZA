
import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { apps, App, clients, Client } from "@/services/mockData";

// Import components
import AppSearchAndFilter from "./apps/AppSearchAndFilter";
import AppListGrid from "./apps/AppListGrid";
import AppDetailsDialog from "./apps/AppDetails/AppDetailsDialog";

const Apps: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Filter apps based on search term
  const filteredApps = apps.filter(app => 
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort apps by client count
  const sortedApps = [...filteredApps].sort((a, b) => {
    return sortOrder === "asc" 
      ? a.clientCount - b.clientCount 
      : b.clientCount - a.clientCount;
  });

  // Get selected app
  const selectedApp = selectedAppId 
    ? apps.find(app => app.id === selectedAppId) 
    : null;

  // Get clients using the app
  const getClientsUsingApp = (appId: string): Client[] => {
    return clients.filter(client => client.apps.includes(appId));
  };

  // Toggle sort order
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Application Management</h2>
            <p className="text-muted-foreground mt-2">
              Manage your available applications and services
            </p>
          </div>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Application
          </Button>
        </div>
        
        <AppSearchAndFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          sortOrder={sortOrder}
          onSortToggle={toggleSortOrder}
        />

        <AppListGrid
          apps={sortedApps}
          onViewDetails={setSelectedAppId}
        />

        <AppDetailsDialog
          app={selectedApp}
          clients={selectedApp ? getClientsUsingApp(selectedApp.id) : []}
          open={selectedAppId !== null}
          onOpenChange={(open) => !open && setSelectedAppId(null)}
        />
      </div>
    </DashboardLayout>
  );
};

export default Apps;
