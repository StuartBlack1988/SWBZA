import { v4 as uuidv4 } from 'uuid';
import { applications } from './applications';
import { addPriceHistory } from './productPriceHistory';

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
  updatedAt?: string;
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

// Helper functions for products
export const getProductsByApplicationId = (applicationId: string): Product[] => {
  return products.filter(product => product.applicationId === applicationId);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getAllProducts = (): Product[] => {
  return [...products];
};

export const addProduct = (product: {
  name: string;
  description: string;
  price: number;
  vat: number;
  isSubscription: boolean;
  duration: string;
  applicationId: string;
}): Product => {
  const now = new Date().toISOString();
  const newProduct: Product = {
    id: uuidv4(),
    ...product,
    createdAt: now,
    updatedAt: now
  };
  
  products.push(newProduct);
  
  // Add initial price history entry
  addPriceHistory(newProduct.id, newProduct.price);
  
  return newProduct;
};

export const updateProduct = (id: string, updates: Partial<Product>): Product | undefined => {
  const productIndex = products.findIndex(product => product.id === id);
  
  if (productIndex === -1) {
    return undefined;
  }
  
  const oldProduct = products[productIndex];
  const updatedProduct = {
    ...oldProduct,
    ...updates,
    updatedAt: new Date().toISOString()
  };
  
  // If price was updated, create a price history entry
  if (updates.price && updates.price !== oldProduct.price) {
    addPriceHistory(id, updates.price);
  }
  
  products[productIndex] = updatedProduct;
  return updatedProduct;
};

export const deleteProduct = (id: string): boolean => {
  const initialLength = products.length;
  const remainingProducts = products.filter(product => product.id !== id);
  
  if (remainingProducts.length === initialLength) {
    return false;
  }
  
  products.length = 0;
  products.push(...remainingProducts);
  return true;
};
