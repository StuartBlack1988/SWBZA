
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { toast } from "@/hooks/useToast";

// Role definitions
const roles = [
  {
    id: "swbza-admin",
    name: "SWBZA Admin",
    description: "Full administrative access to all system features"
  },
  {
    id: "client-admin",
    name: "Client Admin",
    description: "Administrative access to client-specific features"
  },
  {
    id: "client-manager",
    name: "Client Manager",
    description: "Manage client data and users but with limited administrative capabilities"
  },
  {
    id: "client-user",
    name: "Client User",
    description: "Basic access to client-specific features"
  }
];

const UserSettings: React.FC = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [currentRole, setCurrentRole] = useState<typeof roles[0] | null>(null);
  const [roleName, setRoleName] = useState("");
  const [roleDescription, setRoleDescription] = useState("");
  const [roleType, setRoleType] = useState("client-user");

  const handleAddRole = () => {
    setCurrentRole(null);
    setRoleName("");
    setRoleDescription("");
    setRoleType("client-user");
    setOpenDialog(true);
  };

  const handleEditRole = (role: typeof roles[0]) => {
    setCurrentRole(role);
    setRoleName(role.name);
    setRoleDescription(role.description);
    setRoleType(role.id);
    setOpenDialog(true);
  };

  const handleSaveRole = () => {
    // In a real application, you would update your backend here
    toast.success(currentRole ? "Role updated successfully" : "Role added successfully");
    setOpenDialog(false);
  };

  const handleDeleteRole = (roleId: string) => {
    // In a real application, you would delete from your backend here
    toast.success("Role deleted successfully");
  };

  return (
    <div className="space-y-6">
      {/* User Roles Management */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>User Roles</CardTitle>
            <CardDescription>
              Manage user roles and permissions
            </CardDescription>
          </div>
          <Button onClick={handleAddRole}>Add Role</Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell className="font-medium">{role.name}</TableCell>
                  <TableCell>{role.description}</TableCell>
                  <TableCell>{role.id}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditRole(role)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteRole(role.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Role Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {currentRole ? "Edit Role" : "Add New Role"}
            </DialogTitle>
            <DialogDescription>
              {currentRole
                ? "Update the role details below."
                : "Fill in the details for the new role."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="role-name">Role Name</Label>
              <Input
                id="role-name"
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
                placeholder="Enter role name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role-description">Description</Label>
              <Input
                id="role-description"
                value={roleDescription}
                onChange={(e) => setRoleDescription(e.target.value)}
                placeholder="Enter role description"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role-type">Role Type</Label>
              <Select
                value={roleType}
                onValueChange={setRoleType}
              >
                <SelectTrigger id="role-type">
                  <SelectValue placeholder="Select role type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="swbza-admin">SWBZA Admin</SelectItem>
                  <SelectItem value="client-admin">Client Admin</SelectItem>
                  <SelectItem value="client-manager">Client Manager</SelectItem>
                  <SelectItem value="client-user">Client User</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveRole}>
              {currentRole ? "Update" : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserSettings;
