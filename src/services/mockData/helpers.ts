
import { clients, Client, ClientSubscription, getClientSubscriptionByProductId } from './clients';
import { users, User } from './users';
import { invoices, Invoice } from './invoices';
import { products, Product } from './products';
import { applications, Application } from './applications';

// Cross-entity helper functions

// Count users for a product across all clients
export const countUsersForProduct = (productId: string): number => {
  return clients.reduce((total, client) => {
    const subscription = getClientSubscriptionByProductId(client, productId);
    return total + (subscription?.userCount || 0);
  }, 0);
};

// Get invoices by client ID (for backward compatibility)
export const getInvoicesByClientId = (clientId: string): Invoice[] => {
  // Get all users for this client
  const clientUsers = users.filter(user => user.clientId === clientId);
  
  // Get all invoices for these users
  const clientInvoices: Invoice[] = [];
  
  clientUsers.forEach(user => {
    const userInvoices = invoices.filter(invoice => invoice.userId === user.id);
    clientInvoices.push(...userInvoices);
  });
  
  return clientInvoices;
};
