
import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription, 
  CardFooter 
} from "@/components/ui/card";
import { 
  Users, 
  MoreHorizontal, 
  PlusCircle, 
  Settings,
  FileText,
  User,
  CalendarClock,
  Search
} from "lucide-react";
import { 
  clients as mockClients, 
  Client,
  getInvoicesByClientId,
  getUsersByClientId
} from "@/services/mockData";
import { toast } from "@/components/ui/sonner";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

const Clients: React.FC = () => {
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);

  // Filter clients based on search term
  const filteredClients = clients.filter(client => 
    client.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get selected client
  const selectedClient = selectedClientId 
    ? clients.find(client => client.id === selectedClientId) 
    : null;

  // Handle saving client changes
  const handleSaveClient = (updatedClient: Client) => {
    setClients(clients.map(client => 
      client.id === updatedClient.id ? updatedClient : client
    ));
    toast.success(`${updatedClient.companyName} updated successfully`);
  };

  // Client status badge component
  const ClientStatusBadge: React.FC<{ status: "active" | "inactive" }> = ({ status }) => (
    <Badge 
      variant={status === "active" ? "default" : "secondary"}
      className={status === "active" ? "bg-success" : "bg-muted"}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Clients</h2>
            <p className="text-muted-foreground mt-2">
              Manage your client accounts and settings
            </p>
          </div>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Client
          </Button>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search clients..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>License Expires</TableHead>
                <TableHead>Active Users</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No clients found
                  </TableCell>
                </TableRow>
              ) : (
                filteredClients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell className="font-medium">{client.companyName}</TableCell>
                    <TableCell>
                      <div>{client.contactName}</div>
                      <div className="text-sm text-muted-foreground">{client.email}</div>
                    </TableCell>
                    <TableCell>
                      <ClientStatusBadge status={client.status} />
                    </TableCell>
                    <TableCell>{client.licenseExpiry}</TableCell>
                    <TableCell>{client.activeUsers}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem 
                            className="cursor-pointer"
                            onClick={() => setSelectedClientId(client.id)}
                          >
                            <Settings className="mr-2 h-4 w-4" />
                            Manage Client
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Client Details Dialog */}
      <Dialog open={selectedClientId !== null} onOpenChange={(open) => !open && setSelectedClientId(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedClient?.companyName}</DialogTitle>
            <DialogDescription>
              Manage client details, billing, and permissions
            </DialogDescription>
          </DialogHeader>

          {selectedClient && (
            <Tabs defaultValue="details">
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="modules">Modules & Apps</TabsTrigger>
                <TabsTrigger value="invoices">Invoices</TabsTrigger>
                <TabsTrigger value="users">Users</TabsTrigger>
              </TabsList>

              {/* Details Tab */}
              <TabsContent value="details">
                <Card>
                  <CardHeader>
                    <CardTitle>Client Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Company Name</label>
                        <Input defaultValue={selectedClient.companyName} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Contact Name</label>
                        <Input defaultValue={selectedClient.contactName} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Email</label>
                        <Input type="email" defaultValue={selectedClient.email} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Phone</label>
                        <Input defaultValue={selectedClient.phone} />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-medium">Address</label>
                        <Input defaultValue={selectedClient.address} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">License Expiry</label>
                        <Input type="date" defaultValue={selectedClient.licenseExpiry} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Status</label>
                        <div className="flex items-center space-x-2 h-10 px-3 border rounded-md">
                          <Checkbox 
                            id="status" 
                            checked={selectedClient.status === "active"}
                          />
                          <label htmlFor="status">Active</label>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button onClick={() => handleSaveClient(selectedClient)}>
                      Save Changes
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* Modules & Apps Tab */}
              <TabsContent value="modules">
                <Card>
                  <CardHeader>
                    <CardTitle>Modules & Applications</CardTitle>
                    <CardDescription>
                      Configure access to modules and applications
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">Modules</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {["Invoicing", "Reporting", "User Management", "API Access", "Support Portal", "File Storage"].map(module => (
                          <div key={module} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`module-${module}`} 
                              checked={selectedClient.modules.includes(module)}
                            />
                            <label htmlFor={`module-${module}`}>{module}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3">Applications</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {["app1", "app2", "app3", "app4"].map(appId => (
                          <div key={appId} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`app-${appId}`} 
                              checked={selectedClient.apps.includes(appId)}
                            />
                            <label htmlFor={`app-${appId}`}>
                              {appId === "app1" ? "Invoice Generator" :
                               appId === "app2" ? "Client Portal" :
                               appId === "app3" ? "Analytics Dashboard" :
                               "Mobile Companion"}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button onClick={() => handleSaveClient(selectedClient)}>
                      Save Changes
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* Invoices Tab */}
              <TabsContent value="invoices">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Client Invoices</CardTitle>
                      <CardDescription>
                        View and manage invoices for this client
                      </CardDescription>
                    </div>
                    <Button size="sm">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      New Invoice
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Invoice ID</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Issue Date</TableHead>
                          <TableHead>Due Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {getInvoicesByClientId(selectedClient.id).length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                              No invoices found for this client
                            </TableCell>
                          </TableRow>
                        ) : (
                          getInvoicesByClientId(selectedClient.id).map(invoice => (
                            <TableRow key={invoice.id}>
                              <TableCell className="font-medium">{invoice.id}</TableCell>
                              <TableCell>${invoice.amount.toLocaleString()}</TableCell>
                              <TableCell>
                                <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  invoice.status === "paid" ? "bg-success/10 text-success" :
                                  invoice.status === "pending" ? "bg-pending/10 text-pending" :
                                  "bg-destructive/10 text-destructive"
                                }`}>
                                  {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                                </div>
                              </TableCell>
                              <TableCell>{invoice.issueDate}</TableCell>
                              <TableCell>{invoice.dueDate}</TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Users Tab */}
              <TabsContent value="users">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Client Users</CardTitle>
                      <CardDescription>
                        Manage users for this client account
                      </CardDescription>
                    </div>
                    <Button size="sm">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add User
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Start Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {getUsersByClientId(selectedClient.id).length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                              No users found for this client
                            </TableCell>
                          </TableRow>
                        ) : (
                          getUsersByClientId(selectedClient.id).map(user => (
                            <TableRow key={user.id}>
                              <TableCell className="font-medium">{user.name}</TableCell>
                              <TableCell>{user.email}</TableCell>
                              <TableCell className="capitalize">{user.role}</TableCell>
                              <TableCell>
                                <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  user.status === "active" ? "bg-success/10 text-success" : "bg-muted"
                                }`}>
                                  {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                                </div>
                              </TableCell>
                              <TableCell>{user.startDate}</TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Clients;
