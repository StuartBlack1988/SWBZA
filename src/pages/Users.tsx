import React, { useState, useEffect } from "react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  User as UserIcon, 
  MoreHorizontal, 
  Search, 
  PlusCircle,
  CheckCircle,
  XCircle,
  KeyRound,
  UserCog
} from "lucide-react";
import { 
  users as mockUsers, 
  User,
  clients
} from "@/services/mockData";
import { toast } from "@/hooks/useToast";

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [clientFilter, setClientFilter] = useState<string>("");
  const [roleFilter, setRoleFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [startDateFilter, setStartDateFilter] = useState<string>("");
  const [endDateFilter, setEndDateFilter] = useState<string>("");

  useEffect(() => {
    fetchUsers();
  }, []);

  // SWBZA TODO: Replace with actual API call to fetch users
  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      setTimeout(() => {
        setUsers(mockUsers);
        setIsLoading(false);
      }, 500);
    } catch (error) {
      toast.error("Failed to load users");
      setIsLoading(false);
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesClient = clientFilter ? user.clientId === clientFilter : true;
    const matchesRole = roleFilter ? user.role === roleFilter : true;
    const matchesStatus = statusFilter ? user.status === statusFilter : true;
    
    const userStartDate = new Date(user.startDate);
    const filterStartDate = startDateFilter ? new Date(startDateFilter) : null;
    const matchesStartDate = filterStartDate ? userStartDate >= filterStartDate : true;
    
    const userEndDate = user.endDate ? new Date(user.endDate) : null;
    const filterEndDate = endDateFilter ? new Date(endDateFilter) : null;
    const matchesEndDate = filterEndDate 
      ? userEndDate 
        ? userEndDate <= filterEndDate 
        : false
      : true;
    
    return matchesSearch && matchesClient && matchesRole && matchesStatus && 
           matchesStartDate && matchesEndDate;
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
  const changeUserRole = (userId: string, role: "admin" | "manager" | "user") => {
    try {
      setUsers(users.map(user => 
        user.id === userId ? { ...user, role } : user
      ));
      toast.success("User role updated successfully");
    } catch (error) {
      toast.error("Failed to update user role");
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setClientFilter("");
    setRoleFilter("");
    setStatusFilter("");
    setStartDateFilter("");
    setEndDateFilter("");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
            <p className="text-muted-foreground mt-2">
              Manage all users across client accounts
            </p>
          </div>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>
        
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <Select value={clientFilter} onValueChange={setClientFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Client" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all_clients">All Clients</SelectItem>
                  {clients.map(client => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.companyName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all_roles">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all_statuses">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="flex items-center gap-2">
              <label className="text-sm whitespace-nowrap">Start Date:</label>
              <Input
                type="date"
                value={startDateFilter}
                onChange={(e) => setStartDateFilter(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm whitespace-nowrap">End Date:</label>
              <Input
                type="date"
                value={endDateFilter}
                onChange={(e) => setEndDateFilter(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="rounded-md border">
          {isLoading ? (
            <div className="py-8 text-center">Loading users...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      No users found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => {
                    const client = clients.find(c => c.id === user.clientId);
                    return (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{client?.companyName}</TableCell>
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
                        <TableCell>{user.endDate || '-'}</TableCell>
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
      </div>
    </DashboardLayout>
  );
};

export default Users;
