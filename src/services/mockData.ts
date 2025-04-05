
// Mock data for the invoice hub control panel

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
  apps: string[];
  createdAt: string;
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
    apps: ["app1", "app3"],
    createdAt: "2023-01-15"
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
    apps: ["app1", "app2"],
    createdAt: "2023-03-22"
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
    apps: ["app1", "app2", "app3", "app4"],
    createdAt: "2023-05-10"
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
    apps: ["app1"],
    createdAt: "2023-02-19"
  },
  {
    id: "c5",
    companyName: "Wayne Enterprises",
    contactName: "Bruce Wayne",
    email: "bruce@wayne.com",
    phone: "(555) 228-6283",
    address: "1 Wayne Tower, Gotham City, NJ 08401",
    licenseExpiry: "2025-10-17",
    status: "active",
    activeUsers: 35,
    modules: ["Financial Management", "Reporting", "User Management", "API Access"],
    apps: ["app1", "app2", "app4"],
    createdAt: "2023-07-03"
  }
];

// Invoices
export interface Invoice {
  id: string;
  clientId: string;
  amount: number;
  status: "paid" | "pending" | "overdue";
  issueDate: string;
  dueDate: string;
  items: InvoiceItem[];
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
}

export const invoices: Invoice[] = [
  {
    id: "INV-001",
    clientId: "c1",
    amount: 2500,
    status: "paid",
    issueDate: "2024-03-01",
    dueDate: "2024-03-31",
    items: [
      { description: "Website Hosting (Annual)", quantity: 1, unitPrice: 1200 },
      { description: "Domain Registration", quantity: 5, unitPrice: 120 },
      { description: "Email Services", quantity: 10, unitPrice: 50 }
    ]
  },
  {
    id: "INV-002",
    clientId: "c2",
    amount: 1800,
    status: "pending",
    issueDate: "2024-03-15",
    dueDate: "2024-04-15",
    items: [
      { description: "Dietitian Assist App Subscription", quantity: 6, unitPrice: 200 },
      { description: "Implementation Fee", quantity: 1, unitPrice: 600 }
    ]
  },
  {
    id: "INV-003",
    clientId: "c3",
    amount: 4200,
    status: "paid",
    issueDate: "2024-02-10",
    dueDate: "2024-03-10",
    items: [
      { description: "Club Management Software License", quantity: 14, unitPrice: 200 },
      { description: "Premium Support", quantity: 1, unitPrice: 1400 }
    ]
  },
  {
    id: "INV-004",
    clientId: "c1",
    amount: 1200,
    status: "overdue",
    issueDate: "2024-01-15",
    dueDate: "2024-02-15",
    items: [
      { description: "Website Creation Package", quantity: 1, unitPrice: 1200 }
    ]
  },
  {
    id: "INV-005",
    clientId: "c4",
    amount: 3500,
    status: "pending",
    issueDate: "2024-03-25",
    dueDate: "2024-04-25",
    items: [
      { description: "Practice Management Software", quantity: 15, unitPrice: 200 },
      { description: "Custom Development", quantity: 5, unitPrice: 100 }
    ]
  }
];

// Users
export interface User {
  id: string;
  clientId: string;
  name: string;
  email: string;
  role: "admin" | "manager" | "user";
  status: "active" | "inactive";
  startDate: string;
  endDate: string | null;
}

export const users: User[] = [
  {
    id: "u1",
    clientId: "c1",
    name: "John Smith",
    email: "john.smith@onlinetoday.com",
    role: "admin",
    status: "active",
    startDate: "2023-01-15",
    endDate: null
  },
  {
    id: "u2",
    clientId: "c1",
    name: "Sarah Johnson",
    email: "sarah@onlinetoday.com",
    role: "manager",
    status: "active",
    startDate: "2023-02-10",
    endDate: null
  },
  {
    id: "u3",
    clientId: "c2",
    name: "Michael Williams",
    email: "michael@dietitianassist.com",
    role: "admin",
    status: "active",
    startDate: "2023-03-22",
    endDate: null
  },
  {
    id: "u4",
    clientId: "c2",
    name: "Jessica Brown",
    email: "jessica@dietitianassist.com",
    role: "user",
    status: "inactive",
    startDate: "2023-04-05",
    endDate: "2024-02-15"
  },
  {
    id: "u5",
    clientId: "c3",
    name: "David Miller",
    email: "david@clubassist.com",
    role: "admin",
    status: "active",
    startDate: "2023-05-10",
    endDate: null
  },
  {
    id: "u6",
    clientId: "c3",
    name: "Emily Taylor",
    email: "emily@clubassist.com",
    role: "manager",
    status: "active",
    startDate: "2023-06-20",
    endDate: null
  },
  {
    id: "u7",
    clientId: "c3",
    name: "Robert Wilson",
    email: "robert@clubassist.com",
    role: "user",
    status: "active",
    startDate: "2023-07-15",
    endDate: null
  },
  {
    id: "u8",
    clientId: "c4",
    name: "Lucius Fox",
    email: "lucius@practiceassist.com",
    role: "admin",
    status: "active",
    startDate: "2023-07-03",
    endDate: null
  }
];

// Apps
export interface App {
  id: string;
  name: string;
  description: string;
  version: string;
  releaseDate: string;
  clientCount: number;
  userCount: number;
  features: string[];
}

export const apps: App[] = [
  {
    id: "app1",
    name: "Hosting Services",
    description: "Web hosting solutions with high uptime and reliability",
    version: "3.1.0",
    releaseDate: "2023-12-10",
    clientCount: 5,
    userCount: 112,
    features: ["SSD Storage", "CDN Integration", "Daily Backups", "Security Monitoring"]
  },
  {
    id: "app2",
    name: "Dietitian Portal",
    description: "Client management and nutrition planning tool for dietitians",
    version: "1.5.2",
    releaseDate: "2024-01-22",
    clientCount: 3,
    userCount: 87,
    features: ["Client Records", "Meal Planning", "Nutrition Analysis", "Progress Tracking"]
  },
  {
    id: "app3",
    name: "Domain Management",
    description: "Domain registration and management tools",
    version: "2.2.0",
    releaseDate: "2024-02-15",
    clientCount: 3,
    userCount: 42,
    features: ["Domain Registration", "DNS Management", "Transfer Tools", "WHOIS Privacy"]
  },
  {
    id: "app4",
    name: "Club Manager",
    description: "Comprehensive club and membership management solution",
    version: "1.0.5",
    releaseDate: "2024-03-05",
    clientCount: 2,
    userCount: 35,
    features: ["Member Database", "Event Calendar", "Payment Processing", "Communication Tools"]
  }
];

// Helper function to get client by ID
export const getClientById = (id: string): Client | undefined => {
  return clients.find(client => client.id === id);
};

// Helper function to get all invoices for a client
export const getInvoicesByClientId = (clientId: string): Invoice[] => {
  return invoices.filter(invoice => invoice.clientId === clientId);
};

// Helper function to get all users for a client
export const getUsersByClientId = (clientId: string): User[] => {
  return users.filter(user => user.clientId === clientId);
};

// Helper function to get app by ID
export const getAppById = (id: string): App | undefined => {
  return apps.find(app => app.id === id);
};
