
import { v4 as uuidv4 } from 'uuid';

// Role types
export interface Role {
  id: string;
  name: "admin" | "manager" | "user" | "clientAdmin";
  description: string;
}

// Define roles
export const roles: Role[] = [
  {
    id: "role-admin",
    name: "admin",
    description: "System administrator with full access"
  },
  {
    id: "role-manager",
    name: "manager",
    description: "Manager with elevated permissions"
  },
  {
    id: "role-user",
    name: "user",
    description: "Regular user with limited access"
  },
  {
    id: "role-client-admin",
    name: "clientAdmin",
    description: "Client administrator with access to their organization's resources"
  }
];

// Users
export interface User {
  id: string;
  name: string;
  email: string;
  roleId: string; // Reference to a role
  role: "admin" | "manager" | "user" | "clientAdmin"; // For backward compatibility
  status: "active" | "inactive";
  clientId: string; // Reference to a client
  startDate: string;
  endDate: string | null;
  applicationId: string; // Added to associate user with an application
  companyName?: string;
}

export const users: User[] = [
  {
    id: uuidv4(),
    name: "John Admin",
    email: "john@example.com",
    roleId: "role-admin",
    role: "admin",
    status: "active",
    clientId: "system", // System user not tied to a client
    startDate: "2023-01-01",
    endDate: null,
    applicationId: "app1"
  },
  {
    id: uuidv4(),
    name: "Alice Manager",
    email: "alice@acme.com",
    roleId: "role-manager",
    role: "manager",
    status: "active",
    clientId: "client1", // Linked to Acme Corporation
    startDate: "2023-02-15",
    endDate: null,
    applicationId: "app1",
    companyName: "Acme Corp"
  },
  {
    id: uuidv4(),
    name: "Bob User",
    email: "bob@acme.com",
    roleId: "role-user",
    role: "user",
    status: "active",
    clientId: "client1", // Linked to Acme Corporation
    startDate: "2023-03-10",
    endDate: null,
    applicationId: "app2",
    companyName: "Acme Corp"
  },
  {
    id: uuidv4(),
    name: "Charlie Client Admin",
    email: "charlie@globex.com",
    roleId: "role-client-admin",
    role: "clientAdmin",
    status: "active",
    clientId: "client2", // Linked to Globex Industries
    startDate: "2023-01-20",
    endDate: null,
    applicationId: "app3",
    companyName: "Globex Inc"
  },
  {
    id: uuidv4(),
    name: "David User",
    email: "david@globex.com",
    roleId: "role-user",
    role: "user",
    status: "inactive",
    clientId: "client2", // Linked to Globex Industries
    startDate: "2023-04-05",
    endDate: "2023-12-31",
    applicationId: "app2",
    companyName: "Globex Inc"
  },
  {
    id: uuidv4(),
    name: "Eva Client Admin",
    email: "eva@stark.com",
    roleId: "role-client-admin",
    role: "clientAdmin",
    status: "inactive",
    clientId: "client3", // Linked to Stark Enterprises
    startDate: "2023-02-01",
    endDate: "2023-11-30",
    applicationId: "app1",
    companyName: "Stark Enterprises"
  }
];

// Helper functions for users
export const getUserById = (id: string): User | undefined => {
  return users.find(user => user.id === id);
};

export const getUsersByApplicationId = (applicationId: string): User[] => {
  return users.filter(user => user.applicationId === applicationId);
};

export const getClientAdminUsers = (): User[] => {
  return users.filter(user => user.role === "clientAdmin");
};

export const getUsersByClientId = (clientId: string): User[] => {
  return users.filter(user => user.clientId === clientId);
};

export const getRoleById = (id: string): Role | undefined => {
  return roles.find(role => role.id === id);
};
