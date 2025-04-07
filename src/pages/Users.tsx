import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  ChevronDown, 
  MoreHorizontal, 
  Search, 
  SlashIcon, 
  User as UserIcon, 
  Users as UsersIcon,
  XCircle
} from "lucide-react";
import { 
  users, 
  clients, 
  applications, 
  getApplicationById, 
  getClientNameByClientOrgId 
} from "@/services/mockData";

const Users: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [userRole, setUserRole] = useState<string>("all");
  const [userStatus, setUserStatus] = useState<string>("all");

  // Filter users based on search term, role, and status
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = userRole === "all" || user.role === userRole;
    const matchesStatus = userStatus === "all" || user.status === userStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Get application name by application ID
  const getApplicationName = (applicationId: string) => {
    const application = getApplicationById(applicationId);
    return application ? application.name : "Unknown Application";
  };

  // Format role for display
  const formatRole = (role: string) => {
    switch (role) {
      case "admin":
        return "Admin";
      case "manager":
        return "Manager";
      case "user":
        return "User";
      case "clientAdmin":
        return "Client Admin";
      default:
        return role;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Users</h2>
          <p className="text-muted-foreground mt-2">
            Manage user accounts across all applications
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              className="pl-8 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 w-full md:w-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-[130px]">
                  {userRole === "all" ? "All Roles" : formatRole(userRole)}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setUserRole("all")}>
                  All Roles
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setUserRole("clientAdmin")}>
                  Client Admin
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setUserRole("admin")}>
                  Admin
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setUserRole("manager")}>
                  Manager
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setUserRole("user")}>
                  User
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-[130px]">
                  {userStatus === "all" ? "All Status" : 
                   userStatus === "active" ? "Active" : "Inactive"}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setUserStatus("all")}>
                  All Status
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setUserStatus("active")}>
                  Active
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setUserStatus("inactive")}>
                  Inactive
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button>
              <UserIcon className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:w-[400px]">
            <TabsTrigger value="all">All Users</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            <UsersTable 
              users={filteredUsers} 
              getClientName={getClientNameByClientOrgId} 
              getApplicationName={getApplicationName}
              formatRole={formatRole}
            />
          </TabsContent>
          
          <TabsContent value="active" className="mt-6">
            <UsersTable 
              users={filteredUsers.filter(user => user.status === "active")} 
              getClientName={getClientNameByClientOrgId} 
              getApplicationName={getApplicationName}
              formatRole={formatRole}
            />
          </TabsContent>
          
          <TabsContent value="inactive" className="mt-6">
            <UsersTable 
              users={filteredUsers.filter(user => user.status === "inactive")} 
              getClientName={getClientNameByClientOrgId} 
              getApplicationName={getApplicationName}
              formatRole={formatRole}
            />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

interface UsersTableProps {
  users: any[];
  getClientName: (clientOrgId: string) => string;
  getApplicationName: (applicationId: string) => string;
  formatRole: (role: string) => string;
}

const UsersTable: React.FC<UsersTableProps> = ({ 
  users, 
  getClientName, 
  getApplicationName,
  formatRole
}) => {
  if (users.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        No users found
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Client</TableHead>
          <TableHead>Application</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.clientOrgId ? getClientName(user.clientOrgId) : "N/A"}</TableCell>
            <TableCell>{getApplicationName(user.applicationId)}</TableCell>
            <TableCell>
              <Badge variant="outline">{formatRole(user.role)}</Badge>
            </TableCell>
            <TableCell>
              {user.status === "active" ? (
                <div className="flex items-center">
                  <CheckCircle className="mr-1 h-4 w-4 text-success" />
                  <span>Active</span>
                </div>
              ) : (
                <div className="flex items-center">
                  <XCircle className="mr-1 h-4 w-4 text-destructive" />
                  <span>Inactive</span>
                </div>
              )}
            </TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit User</DropdownMenuItem>
                  <DropdownMenuItem>View Details</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {user.status === "active" ? (
                    <DropdownMenuItem className="text-destructive">
                      Deactivate
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem className="text-success">
                      Activate
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Users;
