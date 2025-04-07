
// Users
export interface User {
  id: string;
  clientId: string;
  name: string;
  email: string;
  role: "admin" | "manager" | "user" | "clientAdmin";
  status: "active" | "inactive";
  startDate: string;
  endDate: string | null;
  applicationId: string; // Added to associate user with an application
}

export const users: User[] = [
  {
    id: "u1",
    clientId: "c1",
    name: "John Smith",
    email: "john.smith@onlinetoday.com",
    role: "clientAdmin",
    status: "active",
    startDate: "2023-01-15",
    endDate: null,
    applicationId: "app1"
  },
  {
    id: "u2",
    clientId: "c1",
    name: "Sarah Johnson",
    email: "sarah@onlinetoday.com",
    role: "manager",
    status: "active",
    startDate: "2023-02-10",
    endDate: null,
    applicationId: "app1"
  },
  {
    id: "u3",
    clientId: "c2",
    name: "Michael Williams",
    email: "michael@dietitianassist.com",
    role: "clientAdmin",
    status: "active",
    startDate: "2023-03-22",
    endDate: null,
    applicationId: "app2"
  },
  {
    id: "u4",
    clientId: "c2",
    name: "Jessica Brown",
    email: "jessica@dietitianassist.com",
    role: "user",
    status: "inactive",
    startDate: "2023-04-05",
    endDate: "2024-02-15",
    applicationId: "app2"
  },
  {
    id: "u5",
    clientId: "c3",
    name: "David Miller",
    email: "david@clubassist.com",
    role: "clientAdmin",
    status: "active",
    startDate: "2023-05-10",
    endDate: null,
    applicationId: "app4"
  },
  {
    id: "u6",
    clientId: "c3",
    name: "Emily Taylor",
    email: "emily@clubassist.com",
    role: "manager",
    status: "active",
    startDate: "2023-06-20",
    endDate: null,
    applicationId: "app4"
  },
  {
    id: "u7",
    clientId: "c3",
    name: "Robert Wilson",
    email: "robert@clubassist.com",
    role: "user",
    status: "active",
    startDate: "2023-07-15",
    endDate: null,
    applicationId: "app4"
  },
  {
    id: "u8",
    clientId: "c4",
    name: "Lucius Fox",
    email: "lucius@practiceassist.com",
    role: "clientAdmin",
    status: "active",
    startDate: "2023-07-03",
    endDate: null,
    applicationId: "app5"
  },
  {
    id: "u9",
    clientId: "c5",
    name: "Amanda Lee",
    email: "amanda@bookingsassist.com",
    role: "clientAdmin",
    status: "active",
    startDate: "2023-04-10",
    endDate: null,
    applicationId: "app3"
  },
  {
    id: "u10",
    clientId: "c5",
    name: "Mark Rodriguez",
    email: "mark@bookingsassist.com",
    role: "user",
    status: "active",
    startDate: "2023-04-15",
    endDate: null,
    applicationId: "app3"
  }
];

// Helper functions for users
export const getUserById = (id: string): User | undefined => {
  return users.find(user => user.id === id);
};

export const getUsersByClientId = (clientId: string): User[] => {
  return users.filter(user => user.clientId === clientId);
};

export const getUsersByApplicationId = (applicationId: string): User[] => {
  return users.filter(user => user.applicationId === applicationId);
};

export const getClientAdminUsers = (): User[] => {
  return users.filter(user => user.role === "clientAdmin");
};
