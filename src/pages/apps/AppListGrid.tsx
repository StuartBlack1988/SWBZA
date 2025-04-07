
import React from "react";
import AppCard from "./AppCard";
import { App } from "@/services/mockData";

interface AppListGridProps {
  apps: App[];
  onViewDetails: (appId: string) => void;
}

const AppListGrid: React.FC<AppListGridProps> = ({ apps, onViewDetails }) => {
  if (apps.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        No applications found
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {apps.map((app) => (
        <AppCard key={app.id} app={app} onViewDetails={onViewDetails} />
      ))}
    </div>
  );
};

export default AppListGrid;
