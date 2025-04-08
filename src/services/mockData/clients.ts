
// Clients
import { v4 as uuidv4 } from 'uuid';

export interface Client {
  id: string;
  name: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  createdAt: string;
  updatedAt: string;
  companyName?: string;
  status?: 'active' | 'inactive';
  activeUsers?: number;
}

export const clients: Client[] = [
  {
    id: "client1",
    name: "Acme Corporation",
    contactEmail: "contact@acme.com",
    contactPhone: "555-123-4567",
    address: "123 Main St, City, Country",
    createdAt: "2023-01-15T08:30:00Z",
    updatedAt: "2023-05-20T14:45:00Z",
    companyName: "Acme Corp",
    status: "active",
    activeUsers: 15
  },
  {
    id: "client2",
    name: "Globex Industries",
    contactEmail: "info@globex.com",
    contactPhone: "555-987-6543",
    address: "456 Business Ave, City, Country",
    createdAt: "2023-02-10T10:15:00Z",
    updatedAt: "2023-06-05T09:20:00Z",
    companyName: "Globex Inc",
    status: "active",
    activeUsers: 8
  },
  {
    id: "client3",
    name: "Stark Enterprises",
    contactEmail: "contact@stark.com",
    contactPhone: "555-456-7890",
    address: "789 Innovation Dr, City, Country",
    createdAt: "2023-03-22T13:45:00Z",
    updatedAt: "2023-05-18T11:30:00Z",
    companyName: "Stark Enterprises",
    status: "inactive",
    activeUsers: 0
  }
];

// Helper functions
export const getClientById = (id: string): Client | undefined => {
  return clients.find(client => client.id === id);
};

export const addClient = (client: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>): Client => {
  const newClient: Client = {
    id: uuidv4(),
    ...client,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'active',
    activeUsers: 0
  };
  
  clients.push(newClient);
  return newClient;
};

export const updateClient = (id: string, updates: Partial<Client>): Client | undefined => {
  const clientIndex = clients.findIndex(client => client.id === id);
  
  if (clientIndex === -1) {
    return undefined;
  }
  
  const updatedClient = {
    ...clients[clientIndex],
    ...updates,
    updatedAt: new Date().toISOString()
  };
  
  clients[clientIndex] = updatedClient;
  return updatedClient;
};

export const deleteClient = (id: string): boolean => {
  const initialLength = clients.length;
  const remainingClients = clients.filter(client => client.id !== id);
  
  if (remainingClients.length === initialLength) {
    return false;
  }
  
  clients.length = 0;
  clients.push(...remainingClients);
  return true;
};
