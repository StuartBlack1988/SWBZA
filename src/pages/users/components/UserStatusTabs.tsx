
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import UsersTable from "./UsersTable";
import { User } from "@/services/mockData/users";

interface UserStatusTabsProps {
  filteredUsers: User[];
  getApplicationName: (applicationId: string) => string;
  formatRole: (role: string) => string;
}

const UserStatusTabs: React.FC<UserStatusTabsProps> = ({ 
  filteredUsers, 
  getApplicationName, 
  formatRole 
}) => {
  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="grid w-full grid-cols-3 md:w-[400px]">
        <TabsTrigger value="all">All Users</TabsTrigger>
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="inactive">Inactive</TabsTrigger>
      </TabsList>
      
      <TabsContent value="all" className="mt-6">
        <UsersTable 
          users={filteredUsers} 
          getApplicationName={getApplicationName}
          formatRole={formatRole}
        />
      </TabsContent>
      
      <TabsContent value="active" className="mt-6">
        <UsersTable 
          users={filteredUsers.filter(user => user.status === "active")}  
          getApplicationName={getApplicationName}
          formatRole={formatRole}
        />
      </TabsContent>
      
      <TabsContent value="inactive" className="mt-6">
        <UsersTable 
          users={filteredUsers.filter(user => user.status === "inactive")} 
          getApplicationName={getApplicationName}
          formatRole={formatRole}
        />
      </TabsContent>
    </Tabs>
  );
};

export default UserStatusTabs;
