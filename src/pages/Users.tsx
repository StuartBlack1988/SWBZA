
import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { 
  User as UserIcon, 
  MoreHorizontal, 
  Search, 
  PlusCircle,
  CheckCircle,
  XCircle,
  KeyRound,
  UserCog,
  Building,
  Users as UsersIcon
} from "lucide-react";
import { 
  users as mockUsers, 
  User,
  clients as mockClients,
  Client,
  applications,
  getClientById,
  getApplicationById
} from "@/services/mockData";
import { toast } from "@/hooks/useToast";

const Users: React.FC = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState<User[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [applicationFilter, setApplicationFilter] = useState<string>("");
  const [roleFilter, setRoleFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");

  useEffect(() => {
    fetchData();
  }, []);

  // Fetch users and clients
  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      setTimeout(() => {
        setUsers(mockUsers);
        setClients(mockClients);
        setIsLoading(false);
      }, 500);
    } catch (error) {
      toast.error("Failed to load data");
      setIsLoading(false);
    }
  };

  // Filter users based on search and filters
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesApplication = applicationFilter ? user.applicationId === applicationFilter : true;
    const matchesRole = roleFilter ? user.role === roleFilter : true;
    const matchesStatus = statusFilter ? user.status === statusFilter : true;
    
    return matchesSearch && matchesApplication && matchesRole && matchesStatus;
  });

  // Filter clients based on search and application filter
  const filteredClients = clients.filter(client => {
    const matchesSearch = 
      client.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    // For application filter, we need to check if any user from this client belongs to the selected application
    const matchesApplication = applicationFilter 
      ? users.some(user => user.clientId === client.id && user.applicationId === applicationFilter)
      : true;
    
    return matchesSearch && matchesApplication;
  });

  // SWBZA TODO: Replace with actual API call to activate user
  const activateUser = (userId: string) => {
    try {
      setUsers(users.map(user => 
        user.id === userId ? { ...user, status: "active" } : user
      ));
      toast.success("User activated successfully");
    } catch (error) {
      toast.error("Failed to activate user");
    }
  };

  // SWBZA TODO: Replace with actual API call to deactivate user
  const deactivateUser = (userId: string) => {
    try {
      setUsers(users.map(user => 
        user.id === userId ? { ...user, status: "inactive", endDate: new Date().toISOString().split('T')[0] } : user
      ));
      toast.success("User deactivated successfully");
    } catch (error) {
      toast.error("Failed to deactivate user");
    }
  };

  // SWBZA TODO: Replace with actual API call to send password reset
  const sendPasswordReset = (userId: string) => {
    try {
      toast.success("Password reset link sent successfully");
    } catch (error) {
      toast.error("Failed to send password reset");
    }
  };

  // SWBZA TODO: Replace with actual API call to change user role
  const changeUserRole = (userId: string, role: "admin" | "manager" | "user" | "clientAdmin") => {
    try {
      setUsers(users.map(user => 
        user.id === userId ? { ...user, role } : user
      ));
      toast.success("User role updated successfully");
    } catch (error) {
      toast.error("Failed to update user role");
    }
  };

  // SWBZA TODO: Replace with actual API call to activate client
  const activateClient = (clientId: string) => {
    try {
      setClients(clients.map(client => 
        client.id === clientId ? { ...client, status: "active" } : client
      ));
      toast.success("Client activated successfully");
    } catch (error) {
      toast.error("Failed to activate client");
    }
  };

  // SWBZA TODO: Replace with actual API call to deactivate client
  const deactivateClient = (clientId: string) => {
    try {
      setClients(clients.map(client => 
        client.id === clientId ? { ...client, status: "inactive" } : client
      ));
      toast.success("Client deactivated successfully");
    } catch (error) {
      toast.error("Failed to deactivate client");
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setApplicationFilter("");
    setRoleFilter("");
    setStatusFilter("");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
            <p className="text-muted-foreground mt-2">
              Manage all users and clients across applications
            </p>
          </div>
          <div className="flex gap-2">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add User
            </Button>
            <Button variant="outline">
              <Building className="mr-2 h-4 w-4" />
              Add Client
            </Button>
          </div>
        </div>
        
        <Tabs 
          defaultValue="users" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="users" className="flex items-center">
              <UserIcon className="mr-2 h-4 w-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="clients" className="flex items-center">
              <Building className="mr-2 h-4 w-4" />
              Clients
            </TabsTrigger>
          </TabsList>
          
          <div className="mt-4 flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={activeTab === "users" ? "Search users..." : "Search clients..."}
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <Select value={applicationFilter} onValueChange={setApplicationFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Application" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Applications</SelectItem>
                    {applications.map(app => (
                      <SelectItem key={app.id} value={app.id}>
                        {app.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                {activeTab === "users" && (
                  <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Roles</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="clientAdmin">Client Admin</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                    </SelectContent>
                  </Select>
                )}
                
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button variant="outline" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            </div>
          </div>

          <TabsContent value="users" className="mt-4">
            <div className="rounded-md border">
              {isLoading ? (
                <div className="py-8 text-center">Loading users...</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Application</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                          No users found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredUsers.map((user) => {
                        const client = getClientById(user.clientId);
                        const application = getApplicationById(user.applicationId);
                        return (
                          <TableRow key={user.id}>
                            <TableCell className="font-medium">{user.name}</TableCell>
                            <TableCell>{client?.companyName || "—"}</TableCell>
                            <TableCell>{application?.name || "—"}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell className="capitalize">{user.role}</TableCell>
                            <TableCell>
                              <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                user.status === "active" ? "bg-success/10 text-success" : "bg-muted"
                              }`}>
                                {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Actions</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  {user.status === "inactive" ? (
                                    <DropdownMenuItem 
                                      className="cursor-pointer"
                                      onClick={() => activateUser(user.id)}
                                    >
                                      <CheckCircle className="mr-2 h-4 w-4" />
                                      Activate User
                                    </DropdownMenuItem>
                                  ) : (
                                    <DropdownMenuItem 
                                      className="cursor-pointer"
                                      onClick={() => deactivateUser(user.id)}
                                    >
                                      <XCircle className="mr-2 h-4 w-4" />
                                      Deactivate User
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuItem 
                                    className="cursor-pointer"
                                    onClick={() => sendPasswordReset(user.id)}
                                  >
                                    <KeyRound className="mr-2 h-4 w-4" />
                                    Send Password Reset
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>
                                    <UserCog className="mr-2 h-4 w-4" />
                                    Change Role
                                    <DropdownMenu>
                                      <DropdownMenuTrigger className="ml-auto">
                                        <Button variant="ghost" size="icon">
                                          <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent>
                                        <DropdownMenuItem 
                                          className="cursor-pointer"
                                          onClick={() => changeUserRole(user.id, "admin")}
                                        >
                                          Admin
                                        </DropdownMenuItem>
                                        <DropdownMenuItem 
                                          className="cursor-pointer"
                                          onClick={() => changeUserRole(user.id, "clientAdmin")}
                                        >
                                          Client Admin
                                        </DropdownMenuItem>
                                        <DropdownMenuItem 
                                          className="cursor-pointer"
                                          onClick={() => changeUserRole(user.id, "manager")}
                                        >
                                          Manager
                                        </DropdownMenuItem>
                                        <DropdownMenuItem 
                                          className="cursor-pointer"
                                          onClick={() => changeUserRole(user.id, "user")}
                                        >
                                          User
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="clients" className="mt-4">
            <div className="rounded-md border">
              {isLoading ? (
                <div className="py-8 text-center">Loading clients...</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Company</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Users</TableHead>
                      <TableHead>Active Subscriptions</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>License Expires</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredClients.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                          No clients found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredClients.map((client) => {
                        return (
                          <TableRow key={client.id}>
                            <TableCell className="font-medium">{client.companyName}</TableCell>
                            <TableCell>
                              <div>{client.contactName}</div>
                              <div className="text-sm text-muted-foreground">{client.email}</div>
                            </TableCell>
                            <TableCell>
                              <Badge>{client.activeUsers}</Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">
                                {client.subscriptions.filter(sub => sub.status === "active").length}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                client.status === "active" ? "bg-success/10 text-success" : "bg-muted"
                              }`}>
                                {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                              </div>
                            </TableCell>
                            <TableCell>{client.licenseExpiry}</TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Actions</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  {client.status === "inactive" ? (
                                    <DropdownMenuItem 
                                      className="cursor-pointer"
                                      onClick={() => activateClient(client.id)}
                                    >
                                      <CheckCircle className="mr-2 h-4 w-4" />
                                      Activate Client
                                    </DropdownMenuItem>
                                  ) : (
                                    <DropdownMenuItem 
                                      className="cursor-pointer"
                                      onClick={() => deactivateClient(client.id)}
                                    >
                                      <XCircle className="mr-2 h-4 w-4" />
                                      Deactivate Client
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuItem className="cursor-pointer">
                                    <UsersIcon className="mr-2 h-4 w-4" />
                                    View Users
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="cursor-pointer">
                                    <Building className="mr-2 h-4 w-4" />
                                    Manage Client
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Users;
