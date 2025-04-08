
// Clients
export interface Client {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export const clients: Client[] = [
  {
    id: "client-1",
    name: "Acme Corporation",
    createdAt: "2023-01-15T10:30:00Z",
    updatedAt: "2023-05-20T14:45:00Z"
  },
  {
    id: "client-2",
    name: "Globex Industries",
    createdAt: "2023-02-22T09:15:00Z",
    updatedAt: "2023-06-10T11:20:00Z"
  },
  {
    id: "client-3",
    name: "Umbrella Enterprises",
    createdAt: "2023-03-05T13:45:00Z",
    updatedAt: "2023-07-01T16:30:00Z"
  }
];

// Helper functions for clients
export const getClientById = (id: string): Client | undefined => {
  return clients.find(client => client.id === id);
};

export const getClientByName = (name: string): Client | undefined => {
  return clients.find(client => client.name.toLowerCase() === name.toLowerCase());
};

export const addClient = (name: string): Client => {
  const newClient: Client = {
    id: `client-${clients.length + 1}`,
    name,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  clients.push(newClient);
  return newClient;
};

export const updateClient = (id: string, data: Partial<Client>): Client | undefined => {
  const clientIndex = clients.findIndex(client => client.id === id);
  
  if (clientIndex === -1) return undefined;
  
  clients[clientIndex] = {
    ...clients[clientIndex],
    ...data,
    updatedAt: new Date().toISOString()
  };
  
  return clients[clientIndex];
};

export const deleteClient = (id: string): boolean => {
  const initialLength = clients.length;
  const newClients = clients.filter(client => client.id !== id);
  
  if (newClients.length === initialLength) {
    return false;
  }
  
  // Update the global clients array
  clients.length = 0;
  clients.push(...newClients);
  
  return true;
};
