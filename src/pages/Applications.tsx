
import React, { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  PlusCircle,
  Package,
  Users as UsersIcon,
  Calendar,
  ArrowUpDown,
  ArrowRight
} from "lucide-react";
import { applications, Application } from "@/services/mockData";
import { toast } from "@/hooks/useToast";

const Applications: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [sortBy, setSortBy] = useState<"name" | "clientCount" | "createdAt">("clientCount");

  // Filter applications based on search term
  const filteredApplications = applications.filter(app => 
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort applications
  const sortedApplications = [...filteredApplications].sort((a, b) => {
    if (sortBy === "name") {
      return sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else if (sortBy === "clientCount") {
      return sortOrder === "asc"
        ? a.clientCount - b.clientCount
        : b.clientCount - a.clientCount;
    } else {
      return sortOrder === "asc"
        ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const changeSortBy = (field: "name" | "clientCount" | "createdAt") => {
    if (sortBy === field) {
      toggleSortOrder();
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };

  const handleAddApplication = () => {
    toast.success("This would open an application creation modal");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Applications</h2>
            <p className="text-muted-foreground mt-2">
              Manage your system applications and their products
            </p>
          </div>
          <Button onClick={handleAddApplication}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Application
          </Button>
        </div>
        
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search applications..."
              className="pl-8 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => changeSortBy("name")}
            >
              Name {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => changeSortBy("clientCount")}
            >
              Clients {sortBy === "clientCount" && (sortOrder === "asc" ? "↑" : "↓")}
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => changeSortBy("createdAt")}
            >
              Date {sortBy === "createdAt" && (sortOrder === "asc" ? "↑" : "↓")}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedApplications.map((app) => (
            <ApplicationCard key={app.id} application={app} />
          ))}
        </div>

        {sortedApplications.length === 0 && (
          <div className="text-center py-10 text-muted-foreground">
            No applications found
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

interface ApplicationCardProps {
  application: Application;
}

const ApplicationCard: React.FC<ApplicationCardProps> = ({ application }) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{application.name}</CardTitle>
          <Badge variant="outline">{application.activeProducts} products</Badge>
        </div>
        <CardDescription className="line-clamp-2">
          {application.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex justify-between text-sm text-muted-foreground mb-4">
          <div className="flex items-center">
            <UsersIcon className="mr-1 h-4 w-4" />
            <span>{application.clientCount} clients</span>
          </div>
          <div className="flex items-center">
            <UsersIcon className="mr-1 h-4 w-4" />
            <span>{application.userCount} users</span>
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          <div className="flex items-center">
            <Calendar className="mr-1 h-4 w-4" />
            <span>Created: {new Date(application.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <div className="flex gap-2 w-full">
          <Link 
            to={`/applications/${application.id}/products`} 
            className="flex-1"
          >
            <Button variant="outline" className="w-full">
              <Package className="mr-2 h-4 w-4" />
              Products
            </Button>
          </Link>
          <Link 
            to={`/applications/${application.id}/details`} 
            className="flex-1"
          >
            <Button className="w-full">
              Manage
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Applications;
