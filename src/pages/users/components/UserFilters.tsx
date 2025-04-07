
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, UserIcon } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface UserFiltersProps {
  userRole: string;
  setUserRole: (role: string) => void;
  userStatus: string;
  setUserStatus: (status: string) => void;
  formatRole: (role: string) => string;
}

const UserFilters: React.FC<UserFiltersProps> = ({ 
  userRole, 
  setUserRole, 
  userStatus, 
  setUserStatus, 
  formatRole 
}) => {
  return (
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
  );
};

export default UserFilters;
