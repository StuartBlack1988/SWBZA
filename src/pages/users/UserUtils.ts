
import { Application } from "@/services/mockData/applications";

// Format role for display
export const formatRole = (role: string): string => {
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

// Get application name by application ID
export const getApplicationName = (
  applicationId: string, 
  getApplicationById: (id: string) => Application | undefined
): string => {
  const application = getApplicationById(applicationId);
  return application ? application.name : "Unknown Application";
};
