
import { Product } from './products';

// Client subscription type
export interface ClientSubscription {
  productId: string;
  startDate: string;
  endDate: string | null;
  status: "active" | "inactive" | "pending";
  userCount: number;
}

// Clients
export interface Client {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  address: string;
  licenseExpiry: string;
  status: "active" | "inactive";
  activeUsers: number;
  modules: string[];
  subscriptions: ClientSubscription[];
  createdAt: string;
  apps: string[]; // Applications the client is using
}

export const clients: Client[] = [
  {
    id: "c1",
    companyName: "Online Today",
    contactName: "John Doe",
    email: "john@onlinetoday.com",
    phone: "(555) 123-4567",
    address: "123 Web Ave, Digital City, CA 12345",
    licenseExpiry: "2025-12-31",
    status: "active",
    activeUsers: 24,
    modules: ["Hosting", "Domains", "Email Services", "Website Creation"],
    subscriptions: [
      { productId: "prod1", startDate: "2023-01-20", endDate: null, status: "active", userCount: 10 },
      { productId: "prod3", startDate: "2023-02-05", endDate: null, status: "active", userCount: 5 },
      { productId: "prod4", startDate: "2023-02-10", endDate: null, status: "active", userCount: 15 }
    ],
    createdAt: "2023-01-15",
    apps: ["app1"]
  },
  {
    id: "c2",
    companyName: "Dietitian Assist",
    contactName: "Jane Smith",
    email: "jane@dietitianassist.com",
    phone: "(555) 987-6543",
    address: "456 Nutrition Blvd, Wellness City, NY 54321",
    licenseExpiry: "2025-06-15",
    status: "active",
    activeUsers: 18,
    modules: ["Client Management", "Meal Planning"],
    subscriptions: [
      { productId: "prod5", startDate: "2023-03-25", endDate: null, status: "active", userCount: 12 },
      { productId: "prod6", startDate: "2023-03-30", endDate: null, status: "active", userCount: 6 }
    ],
    createdAt: "2023-03-22",
    apps: ["app2"]
  },
  {
    id: "c3",
    companyName: "Club Assist",
    contactName: "Arthur Reed",
    email: "arthur@clubassist.com",
    phone: "(555) 424-2424",
    address: "42 Sports Way, Athletic City, CA 90210",
    licenseExpiry: "2024-08-05",
    status: "active",
    activeUsers: 42,
    modules: ["Member Management", "Event Scheduling", "Payment Processing", "Reporting"],
    subscriptions: [
      { productId: "prod10", startDate: "2023-05-15", endDate: null, status: "active", userCount: 20 },
      { productId: "prod11", startDate: "2023-05-20", endDate: null, status: "active", userCount: 15 },
      { productId: "prod12", startDate: "2023-05-25", endDate: null, status: "active", userCount: 7 }
    ],
    createdAt: "2023-05-10",
    apps: ["app4"]
  },
  {
    id: "c4",
    companyName: "Practice Assist",
    contactName: "Peter Gibson",
    email: "peter@practiceassist.com",
    phone: "(555) 867-5309",
    address: "999 Medical Park, Healthcare City, TX 75001",
    licenseExpiry: "2024-06-01",
    status: "inactive",
    activeUsers: 0,
    modules: ["Patient Management"],
    subscriptions: [
      { productId: "prod13", startDate: "2023-02-25", endDate: "2024-01-25", status: "inactive", userCount: 0 }
    ],
    createdAt: "2023-02-19",
    apps: ["app5"]
  },
  {
    id: "c5",
    companyName: "Bookings Assist",
    contactName: "Bruce Wayne",
    email: "bruce@bookingsassist.com",
    phone: "(555) 228-6283",
    address: "1 Wayne Tower, Gotham City, NJ 08401",
    licenseExpiry: "2025-10-17",
    status: "active",
    activeUsers: 35,
    modules: ["Financial Management", "Reporting", "User Management", "API Access"],
    subscriptions: [
      { productId: "prod7", startDate: "2023-04-15", endDate: null, status: "active", userCount: 15 },
      { productId: "prod8", startDate: "2023-04-20", endDate: null, status: "active", userCount: 10 },
      { productId: "prod9", startDate: "2023-04-25", endDate: null, status: "active", userCount: 10 }
    ],
    createdAt: "2023-07-03",
    apps: ["app3"]
  }
];

// Helper functions for clients
export const getClientById = (id: string): Client | undefined => {
  return clients.find(client => client.id === id);
};

export const getClientsByProductId = (productId: string): Client[] => {
  return clients.filter(client => 
    client.subscriptions.some(sub => sub.productId === productId)
  );
};

export const getClientSubscriptionByProductId = (client: Client, productId: string): ClientSubscription | undefined => {
  return client.subscriptions.find(sub => sub.productId === productId);
};
