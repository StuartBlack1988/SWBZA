
import React from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { CheckCircle, MoreHorizontal, XCircle } from "lucide-react";
import { User } from "@/services/mockData/users";

interface UsersTableProps {
  users: User[];
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

export default UsersTable;
