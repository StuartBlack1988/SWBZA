
import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { users } from "@/services/mockData/users";
import { getApplicationById, getClientNameByClientOrgId } from "@/services/mockData";
import UserSearchBar from "./components/UserSearchBar";
import UserFilters from "./components/UserFilters";
import UserStatusTabs from "./components/UserStatusTabs";
import { formatRole, getApplicationName } from "./UserUtils";

const UsersPage: React.FC = () => {
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

  // Function to get application name (passing the imported getApplicationById function)
  const getAppName = (applicationId: string): string => {
    return getApplicationName(applicationId, getApplicationById);
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
          <UserSearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <UserFilters 
            userRole={userRole} 
            setUserRole={setUserRole}
            userStatus={userStatus}
            setUserStatus={setUserStatus}
            formatRole={formatRole}
          />
        </div>

        <UserStatusTabs 
          filteredUsers={filteredUsers}
          getClientName={getClientNameByClientOrgId}
          getApplicationName={getAppName}
          formatRole={formatRole}
        />
      </div>
    </DashboardLayout>
  );
};

export default UsersPage;
