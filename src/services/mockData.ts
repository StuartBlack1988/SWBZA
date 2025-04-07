
// Mock data for the invoice hub control panel

// Applications
export interface Application {
  id: string;
  name: string;
  description: string;
  logoUrl?: string;
  clientCount: number;
  userCount: number;
  activeProducts: number;
  createdAt: string;
}

export const applications: Application[] = [
  {
    id: "app1",
    name: "Online Today",
    description: "Web hosting and domain management solution",
    clientCount: 12,
    userCount: 45,
    activeProducts: 4,
    createdAt: "2023-01-15"
  },
  {
    id: "app2",
    name: "Dietitian Assist",
    description: "Nutrition planning and client management for dietitians",
    clientCount: 8,
    userCount: 32,
    activeProducts: 2,
    createdAt: "2023-03-22"
  },
  {
    id: "app3",
    name: "Bookings Assist",
    description: "Appointment scheduling and management system",
    clientCount: 15,
    userCount: 60,
    activeProducts: 3,
    createdAt: "2023-04-10"
  },
  {
    id: "app4",
    name: "Club Assist",
    description: "Membership and facility management for clubs",
    clientCount: 7,
    userCount: 28,
    activeProducts: 4,
    createdAt: "2023-05-10"
  },
  {
    id: "app5",
    name: "Practice Assist",
    description: "Healthcare practice management system",
    clientCount: 10,
    userCount: 40,
    activeProducts: 3,
    createdAt: "2023-02-19"
  }
];

// Products
export interface Product {
  id: string;
  applicationId: string;
  name: string;
  description: string;
  price: number;
  vat: number;
  isSubscription: boolean;
  duration: string; // monthly, annual, quarterly, etc.
  createdAt: string;
}

export const products: Product[] = [
  // Online Today Products
  {
    id: "prod1",
    applicationId: "app1",
    name: "Hosting Basic",
    description: "Basic web hosting package with 5GB storage",
    price: 9.99,
    vat: 20,
    isSubscription: true,
    duration: "monthly",
    createdAt: "2023-01-20"
  },
  {
    id: "prod2",
    applicationId: "app1",
    name: "Hosting Premium",
    description: "Premium web hosting with 20GB storage and advanced features",
    price: 19.99,
    vat: 20,
    isSubscription: true,
    duration: "monthly",
    createdAt: "2023-01-25"
  },
  {
    id: "prod3",
    applicationId: "app1",
    name: "Domain Registration",
    description: "Register a new domain name",
    price: 14.99,
    vat: 20,
    isSubscription: true,
    duration: "annual",
    createdAt: "2023-02-05"
  },
  {
    id: "prod4",
    applicationId: "app1",
    name: "Email Services",
    description: "Professional email hosting with spam protection",
    price: 4.99,
    vat: 20,
    isSubscription: true,
    duration: "monthly",
    createdAt: "2023-02-10"
  },
  
  // Dietitian Assist Products
  {
    id: "prod5",
    applicationId: "app2",
    name: "Dietitian Basics",
    description: "Client management and basic meal planning tools",
    price: 29.99,
    vat: 20,
    isSubscription: true,
    duration: "monthly",
    createdAt: "2023-03-25"
  },
  {
    id: "prod6",
    applicationId: "app2",
    name: "Dietitian Pro",
    description: "Advanced nutrition analysis and client tracking",
    price: 49.99,
    vat: 20,
    isSubscription: true,
    duration: "monthly",
    createdAt: "2023-03-30"
  },
  
  // Bookings Assist Products
  {
    id: "prod7",
    applicationId: "app3",
    name: "Bookings Essential",
    description: "Basic appointment scheduling for small businesses",
    price: 19.99,
    vat: 20,
    isSubscription: true,
    duration: "monthly",
    createdAt: "2023-04-15"
  },
  {
    id: "prod8",
    applicationId: "app3",
    name: "Bookings Professional",
    description: "Advanced booking system with staff management",
    price: 39.99,
    vat: 20,
    isSubscription: true,
    duration: "monthly",
    createdAt: "2023-04-20"
  },
  {
    id: "prod9",
    applicationId: "app3",
    name: "SMS Notifications",
    description: "SMS reminder add-on for booking confirmations",
    price: 9.99,
    vat: 20,
    isSubscription: true,
    duration: "monthly",
    createdAt: "2023-04-25"
  },
  
  // Club Assist Products
  {
    id: "prod10",
    applicationId: "app4",
    name: "Membership Manager",
    description: "Membership tracking and management",
    price: 29.99,
    vat: 20,
    isSubscription: true,
    duration: "monthly",
    createdAt: "2023-05-15"
  },
  {
    id: "prod11",
    applicationId: "app4",
    name: "Facility Booking",
    description: "Court and facility reservation system",
    price: 19.99,
    vat: 20,
    isSubscription: true,
    duration: "monthly",
    createdAt: "2023-05-20"
  },
  {
    id: "prod12",
    applicationId: "app4",
    name: "Events Manager",
    description: "Tournament and event organization tools",
    price: 24.99,
    vat: 20,
    isSubscription: true,
    duration: "monthly",
    createdAt: "2023-05-25"
  },
  
  // Practice Assist Products
  {
    id: "prod13",
    applicationId: "app5",
    name: "Patient Records",
    description: "Electronic patient record management",
    price: 39.99,
    vat: 20,
    isSubscription: true,
    duration: "monthly",
    createdAt: "2023-02-25"
  },
  {
    id: "prod14",
    applicationId: "app5",
    name: "Appointment Scheduling",
    description: "Patient appointment booking system",
    price: 24.99,
    vat: 20,
    isSubscription: true,
    duration: "monthly",
    createdAt: "2023-03-05"
  },
  {
    id: "prod15",
    applicationId: "app5",
    name: "Billing Module",
    description: "Insurance and patient billing management",
    price: 29.99,
    vat: 20,
    isSubscription: true,
    duration: "monthly",
    createdAt: "2023-03-10"
  }
];

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
}

export interface ClientSubscription {
  productId: string;
  startDate: string;
  endDate: string | null;
  status: "active" | "inactive" | "pending";
  userCount: number;
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
    subscriptions: [
      { productId: "prod5", startDate: "2023-03-25", endDate: null, status: "active", userCount: 12 },
      { productId: "prod6", startDate: "2023-03-30", endDate: null, status: "active", userCount: 6 }
    ],
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
    subscriptions: [
      { productId: "prod10", startDate: "2023-05-15", endDate: null, status: "active", userCount: 20 },
      { productId: "prod11", startDate: "2023-05-20", endDate: null, status: "active", userCount: 15 },
      { productId: "prod12", startDate: "2023-05-25", endDate: null, status: "active", userCount: 7 }
    ],
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
    subscriptions: [
      { productId: "prod13", startDate: "2023-02-25", endDate: "2024-01-25", status: "inactive", userCount: 0 }
    ],
    createdAt: "2023-02-19"
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
    createdAt: "2023-07-03"
  }
];

// Invoices
export interface Invoice {
  id: string;
  userId: string; // Changed from clientId to userId
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
    userId: "u1", // Changed to refer to user with ClientAdmin role
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
    userId: "u3", // Changed to refer to user with ClientAdmin role
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
    userId: "u5", // Changed to refer to user with ClientAdmin role
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
    userId: "u1", // Changed to refer to user with ClientAdmin role
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
    userId: "u8", // Changed to refer to user with ClientAdmin role
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

// Helper functions

// Get application by ID
export const getApplicationById = (id: string): Application | undefined => {
  return applications.find(app => app.id === id);
};

// Get products by application ID
export const getProductsByApplicationId = (applicationId: string): Product[] => {
  return products.filter(product => product.applicationId === applicationId);
};

// Get product by ID
export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

// Get client by ID
export const getClientById = (id: string): Client | undefined => {
  return clients.find(client => client.id === id);
};

// Get clients by subscription to product ID
export const getClientsByProductId = (productId: string): Client[] => {
  return clients.filter(client => 
    client.subscriptions.some(sub => sub.productId === productId)
  );
};

// Get users by client ID
export const getUsersByClientId = (clientId: string): User[] => {
  return users.filter(user => user.clientId === clientId);
};

// Get user by ID
export const getUserById = (id: string): User | undefined => {
  return users.find(user => user.id === id);
};

// Get users by application ID
export const getUsersByApplicationId = (applicationId: string): User[] => {
  return users.filter(user => user.applicationId === applicationId);
};

// Get invoices by user ID
export const getInvoicesByUserId = (userId: string): Invoice[] => {
  return invoices.filter(invoice => invoice.userId === userId);
};

// Get client admin users
export const getClientAdminUsers = (): User[] => {
  return users.filter(user => user.role === "clientAdmin");
};

// Get client subscription by product ID
export const getClientSubscriptionByProductId = (client: Client, productId: string): ClientSubscription | undefined => {
  return client.subscriptions.find(sub => sub.productId === productId);
};

// Count users for a product across all clients
export const countUsersForProduct = (productId: string): number => {
  return clients.reduce((total, client) => {
    const subscription = getClientSubscriptionByProductId(client, productId);
    return total + (subscription?.userCount || 0);
  }, 0);
};
