
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
  companyName?: string;
}

export const users: User[] = [];

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


