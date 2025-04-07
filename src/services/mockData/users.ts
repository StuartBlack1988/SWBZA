
// Users
export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "manager" | "user" | "clientAdmin";
  status: "active" | "inactive";
  startDate: string;
  endDate: string | null;
  applicationId: string; // Added to associate user with an application
  clientOrgId?: string; // Optional reference to client organization
}

export const users: User[] = [
  {
    id: "u1",
    name: "John Smith",
    email: "john.smith@onlinetoday.com",
    role: "clientAdmin",
    status: "active",
    startDate: "2023-01-15",
    endDate: null,
    applicationId: "app1",
    clientOrgId: "c1"
  },
  {
    id: "u2",
    name: "Sarah Johnson",
    email: "sarah@onlinetoday.com",
    role: "manager",
    status: "active",
    startDate: "2023-02-10",
    endDate: null,
    applicationId: "app1",
    clientOrgId: "c1"
  },
  {
    id: "u3",
    name: "Michael Williams",
    email: "michael@dietitianassist.com",
    role: "clientAdmin",
    status: "active",
    startDate: "2023-03-22",
    endDate: null,
    applicationId: "app2",
    clientOrgId: "c2"
  },
  {
    id: "u4",
    name: "Jessica Brown",
    email: "jessica@dietitianassist.com",
    role: "user",
    status: "inactive",
    startDate: "2023-04-05",
    endDate: "2024-02-15",
    applicationId: "app2",
    clientOrgId: "c2"
  },
  {
    id: "u5",
    name: "David Miller",
    email: "david@clubassist.com",
    role: "clientAdmin",
    status: "active",
    startDate: "2023-05-10",
    endDate: null,
    applicationId: "app4",
    clientOrgId: "c3"
  },
  {
    id: "u6",
    name: "Emily Taylor",
    email: "emily@clubassist.com",
    role: "manager",
    status: "active",
    startDate: "2023-06-20",
    endDate: null,
    applicationId: "app4",
    clientOrgId: "c3"
  },
  {
    id: "u7",
    name: "Robert Wilson",
    email: "robert@clubassist.com",
    role: "user",
    status: "active",
    startDate: "2023-07-15",
    endDate: null,
    applicationId: "app4",
    clientOrgId: "c3"
  },
  {
    id: "u8",
    name: "Lucius Fox",
    email: "lucius@practiceassist.com",
    role: "clientAdmin",
    status: "active",
    startDate: "2023-07-03",
    endDate: null,
    applicationId: "app5",
    clientOrgId: "c4"
  },
  {
    id: "u9",
    name: "Amanda Lee",
    email: "amanda@bookingsassist.com",
    role: "clientAdmin",
    status: "active",
    startDate: "2023-04-10",
    endDate: null,
    applicationId: "app3",
    clientOrgId: "c5"
  },
  {
    id: "u10",
    name: "Mark Rodriguez",
    email: "mark@bookingsassist.com",
    role: "user",
    status: "active",
    startDate: "2023-04-15",
    endDate: null,
    applicationId: "app3",
    clientOrgId: "c5"
  }
];

// Helper functions for users
export const getUserById = (id: string): User | undefined => {
  return users.find(user => user.id === id);
};

export const getUsersByClientOrgId = (clientOrgId: string): User[] => {
  return users.filter(user => user.clientOrgId === clientOrgId);
};

export const getUsersByApplicationId = (applicationId: string): User[] => {
  return users.filter(user => user.applicationId === applicationId);
};

export const getClientAdminUsers = (): User[] => {
  return users.filter(user => user.role === "clientAdmin");
};

export const getClientOrgIdByUserId = (userId: string): string | undefined => {
  const user = getUserById(userId);
  return user?.clientOrgId;
};

// Get client admin user ID by client organization ID
export const getClientAdminByClientOrgId = (clientOrgId: string): User | undefined => {
  return users.find(user => user.clientOrgId === clientOrgId && user.role === "clientAdmin");
};

