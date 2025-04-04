
import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  LayoutGrid, 
  Search, 
  PlusCircle,
  ArrowUpDown,
  Users as UsersIcon,
  Building,
  Clock,
  CheckCircle,
  Layers
} from "lucide-react";
import { 
  apps as mockApps, 
  App, 
  clients,
  Client
} from "@/services/mockData";

const Apps: React.FC = () => {
  const [apps, setApps] = useState<App[]>(mockApps);
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
        
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search applications..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" onClick={toggleSortOrder}>
            <ArrowUpDown className="mr-2 h-4 w-4" />
            Sort by Clients {sortOrder === "asc" ? "↑" : "↓"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {sortedApps.map((app) => (
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
                  onClick={() => setSelectedAppId(app.id)}
                >
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {sortedApps.length === 0 && (
          <div className="text-center py-10 text-muted-foreground">
            No applications found
          </div>
        )}
      </div>

      {/* App Details Dialog */}
      <Dialog open={selectedAppId !== null} onOpenChange={(open) => !open && setSelectedAppId(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedApp && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <DialogTitle className="text-2xl">{selectedApp.name}</DialogTitle>
                  <Badge variant="outline">{selectedApp.version}</Badge>
                </div>
                <DialogDescription>
                  {selectedApp.description}
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
                  <Card>
                    <CardContent className="pt-6 space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="flex flex-col items-center p-4 border rounded-md">
                          <Building className="h-8 w-8 text-primary mb-2" />
                          <div className="text-2xl font-bold">{selectedApp.clientCount}</div>
                          <div className="text-sm text-muted-foreground">Clients</div>
                        </div>
                        <div className="flex flex-col items-center p-4 border rounded-md">
                          <UsersIcon className="h-8 w-8 text-primary mb-2" />
                          <div className="text-2xl font-bold">{selectedApp.userCount}</div>
                          <div className="text-sm text-muted-foreground">Active Users</div>
                        </div>
                        <div className="flex flex-col items-center p-4 border rounded-md">
                          <Clock className="h-8 w-8 text-primary mb-2" />
                          <div className="text-lg font-medium">{selectedApp.releaseDate}</div>
                          <div className="text-sm text-muted-foreground">Release Date</div>
                        </div>
                      </div>

                      <div className="pt-4 border-t">
                        <h3 className="text-lg font-medium mb-2">Active Installations</h3>
                        <div className="grid gap-2">
                          {getClientsUsingApp(selectedApp.id).map(client => (
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
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Clients Tab */}
                <TabsContent value="clients">
                  <Card>
                    <CardHeader>
                      <CardTitle>Client Usage</CardTitle>
                      <CardDescription>
                        Clients currently using {selectedApp.name}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Company</TableHead>
                            <TableHead>Contact</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Active Users</TableHead>
                            <TableHead>License Expires</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {getClientsUsingApp(selectedApp.id).length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                                No clients are using this application
                              </TableCell>
                            </TableRow>
                          ) : (
                            getClientsUsingApp(selectedApp.id).map(client => (
                              <TableRow key={client.id}>
                                <TableCell className="font-medium">{client.companyName}</TableCell>
                                <TableCell>{client.contactName}</TableCell>
                                <TableCell>
                                  <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    client.status === "active" ? "bg-success/10 text-success" : "bg-muted"
                                  }`}>
                                    {client.status}
                                  </div>
                                </TableCell>
                                <TableCell>{client.activeUsers}</TableCell>
                                <TableCell>{client.licenseExpiry}</TableCell>
                              </TableRow>
                            ))
                          )}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Features Tab */}
                <TabsContent value="features">
                  <Card>
                    <CardHeader>
                      <CardTitle>Application Features</CardTitle>
                      <CardDescription>
                        Features available in {selectedApp.name}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedApp.features.map((feature, index) => (
                          <div key={index} className="flex items-start space-x-2 p-3 border rounded-md">
                            <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                            <div>
                              <div className="font-medium">{feature}</div>
                              <p className="text-sm text-muted-foreground">
                                {feature === "Custom Templates" ? "Create and save custom invoice templates" :
                                 feature === "Automated Reminders" ? "Set up automatic payment reminders" :
                                 feature === "Payment Integration" ? "Accept payments from multiple providers" :
                                 feature === "Tax Calculation" ? "Automatic tax calculation and reporting" :
                                 feature === "Invoice History" ? "Access complete invoice history" :
                                 feature === "Payment Processing" ? "Process payments directly within the system" :
                                 feature === "Communication Center" ? "Centralized client communication" :
                                 feature === "Document Storage" ? "Secure storage for important documents" :
                                 feature === "Interactive Charts" ? "Visual representation of financial data" :
                                 feature === "Custom Reports" ? "Generate tailored financial reports" :
                                 feature === "Data Export" ? "Export data in multiple formats" :
                                 feature === "Trend Analysis" ? "Identify trends in financial data" :
                                 feature === "Invoice Creation" ? "Create invoices on mobile devices" :
                                 feature === "Photo Receipt Capture" ? "Capture receipt photos for expenses" :
                                 feature === "Offline Mode" ? "Use application without internet connection" :
                                 feature === "Push Notifications" ? "Get real-time updates on invoice status" :
                                 "Additional system functionality"}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Apps;
