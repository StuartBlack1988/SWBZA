
// Mock data for applications
export interface Application {
  id: string;
  name: string;
  description: string;
  logoUrl?: string;
  clientCount: number;
  userCount: number;
  activeProducts: number;
  createdAt: string;
  version: string;
  releaseDate: string;
  features: string[];
}

export const applications: Application[] = [
  {
    id: "app1",
    name: "Online Today",
    description: "Web hosting and domain management solution",
    clientCount: 12,
    userCount: 45,
    activeProducts: 4,
    createdAt: "2023-01-15",
    version: "2.5.0",
    releaseDate: "2023-01-15",
    features: ["Custom Templates", "Automated Reminders", "Payment Integration", "Tax Calculation"]
  },
  {
    id: "app2",
    name: "Dietitian Assist",
    description: "Nutrition planning and client management for dietitians",
    clientCount: 8,
    userCount: 32,
    activeProducts: 2,
    createdAt: "2023-03-22",
    version: "1.8.3",
    releaseDate: "2023-03-22",
    features: ["Invoice History", "Payment Processing", "Communication Center", "Document Storage"]
  },
  {
    id: "app3",
    name: "Bookings Assist",
    description: "Appointment scheduling and management system",
    clientCount: 15,
    userCount: 60,
    activeProducts: 3,
    createdAt: "2023-04-10",
    version: "3.2.1",
    releaseDate: "2023-04-10",
    features: ["Interactive Charts", "Custom Reports", "Data Export", "Trend Analysis"]
  },
  {
    id: "app4",
    name: "Club Assist",
    description: "Membership and facility management for clubs",
    clientCount: 7,
    userCount: 28,
    activeProducts: 4,
    createdAt: "2023-05-10",
    version: "2.0.0",
    releaseDate: "2023-05-10",
    features: ["Invoice Creation", "Photo Receipt Capture", "Offline Mode", "Push Notifications"]
  },
  {
    id: "app5",
    name: "Practice Assist",
    description: "Healthcare practice management system",
    clientCount: 10,
    userCount: 40,
    activeProducts: 3,
    createdAt: "2023-02-19",
    version: "1.5.4",
    releaseDate: "2023-02-19",
    features: ["Payment Integration", "Tax Calculation", "Invoice History", "Document Storage"]
  }
];

// Helper functions for applications
export const getApplicationById = (id: string): Application | undefined => {
  return applications.find(app => app.id === id);
};
