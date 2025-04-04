
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
    companyName: "Acme Corporation",
    contactName: "John Doe",
    email: "john@acme.com",
    phone: "(555) 123-4567",
    address: "123 Main St, Anytown, CA 12345",
    licenseExpiry: "2025-12-31",
    status: "active",
    activeUsers: 24,
    modules: ["Invoicing", "Reporting", "User Management"],
    apps: ["app1", "app3"],
    createdAt: "2023-01-15"
  },
  {
    id: "c2",
    companyName: "Globex Industries",
    contactName: "Jane Smith",
    email: "jane@globex.com",
    phone: "(555) 987-6543",
    address: "456 Corporate Blvd, Business City, NY 54321",
    licenseExpiry: "2025-06-15",
    status: "active",
    activeUsers: 18,
    modules: ["Invoicing", "Reporting"],
    apps: ["app1", "app2"],
    createdAt: "2023-03-22"
  },
  {
    id: "c3",
    companyName: "Sirius Cybernetics",
    contactName: "Arthur Dent",
    email: "arthur@sirius.com",
    phone: "(555) 424-2424",
    address: "42 Galaxy Way, Universe City, CA 90210",
    licenseExpiry: "2024-08-05",
    status: "active",
    activeUsers: 42,
    modules: ["Invoicing", "User Management", "API Access", "Reporting"],
    apps: ["app1", "app2", "app3", "app4"],
    createdAt: "2023-05-10"
  },
  {
    id: "c4",
    companyName: "Initech Software",
    contactName: "Peter Gibbons",
    email: "peter@initech.com",
    phone: "(555) 867-5309",
    address: "999 Office Park, Cubicle City, TX 75001",
    licenseExpiry: "2024-06-01",
    status: "inactive",
    activeUsers: 0,
    modules: ["Invoicing"],
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
    modules: ["Invoicing", "Reporting", "User Management", "API Access"],
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
      { description: "Software License", quantity: 10, unitPrice: 200 },
      { description: "Support Hours", quantity: 5, unitPrice: 100 }
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
      { description: "Software License", quantity: 6, unitPrice: 200 },
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
      { description: "Software License", quantity: 14, unitPrice: 200 },
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
      { description: "API Access Add-on", quantity: 1, unitPrice: 1200 }
    ]
  },
  {
    id: "INV-005",
    clientId: "c5",
    amount: 3500,
    status: "pending",
    issueDate: "2024-03-25",
    dueDate: "2024-04-25",
    items: [
      { description: "Software License", quantity: 15, unitPrice: 200 },
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
    email: "john.smith@acme.com",
    role: "admin",
    status: "active",
    startDate: "2023-01-15",
    endDate: null
  },
  {
    id: "u2",
    clientId: "c1",
    name: "Sarah Johnson",
    email: "sarah@acme.com",
    role: "manager",
    status: "active",
    startDate: "2023-02-10",
    endDate: null
  },
  {
    id: "u3",
    clientId: "c2",
    name: "Michael Williams",
    email: "michael@globex.com",
    role: "admin",
    status: "active",
    startDate: "2023-03-22",
    endDate: null
  },
  {
    id: "u4",
    clientId: "c2",
    name: "Jessica Brown",
    email: "jessica@globex.com",
    role: "user",
    status: "inactive",
    startDate: "2023-04-05",
    endDate: "2024-02-15"
  },
  {
    id: "u5",
    clientId: "c3",
    name: "David Miller",
    email: "david@sirius.com",
    role: "admin",
    status: "active",
    startDate: "2023-05-10",
    endDate: null
  },
  {
    id: "u6",
    clientId: "c3",
    name: "Emily Taylor",
    email: "emily@sirius.com",
    role: "manager",
    status: "active",
    startDate: "2023-06-20",
    endDate: null
  },
  {
    id: "u7",
    clientId: "c3",
    name: "Robert Wilson",
    email: "robert@sirius.com",
    role: "user",
    status: "active",
    startDate: "2023-07-15",
    endDate: null
  },
  {
    id: "u8",
    clientId: "c5",
    name: "Lucius Fox",
    email: "lucius@wayne.com",
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
    name: "Invoice Generator",
    description: "Core invoicing application with customizable templates and automated reminders",
    version: "2.1.0",
    releaseDate: "2023-12-10",
    clientCount: 5,
    userCount: 112,
    features: ["Custom Templates", "Automated Reminders", "Payment Integration", "Tax Calculation"]
  },
  {
    id: "app2",
    name: "Client Portal",
    description: "Self-service portal allowing clients to view invoices and make payments",
    version: "1.5.2",
    releaseDate: "2024-01-22",
    clientCount: 3,
    userCount: 87,
    features: ["Invoice History", "Payment Processing", "Communication Center", "Document Storage"]
  },
  {
    id: "app3",
    name: "Analytics Dashboard",
    description: "Advanced reporting and analytics for financial performance tracking",
    version: "1.2.0",
    releaseDate: "2024-02-15",
    clientCount: 3,
    userCount: 42,
    features: ["Interactive Charts", "Custom Reports", "Data Export", "Trend Analysis"]
  },
  {
    id: "app4",
    name: "Mobile Companion",
    description: "Mobile application for on-the-go invoice management",
    version: "1.0.5",
    releaseDate: "2024-03-05",
    clientCount: 2,
    userCount: 35,
    features: ["Invoice Creation", "Photo Receipt Capture", "Offline Mode", "Push Notifications"]
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
