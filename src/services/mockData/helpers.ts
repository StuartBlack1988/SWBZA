
import { clients, Client, ClientSubscription, getClientSubscriptionByProductId } from './clients';
import { users, User, getUsersByClientOrgId } from './users';
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

// Get invoices by client organization ID
export const getInvoicesByClientOrgId = (clientOrgId: string): Invoice[] => {
  // Get all users for this client organization
  const clientUsers = getUsersByClientOrgId(clientOrgId);
  
  // Get all invoices for these users
  const clientInvoices: Invoice[] = [];
  
  clientUsers.forEach(user => {
    const userInvoices = invoices.filter(invoice => invoice.userId === user.id);
    clientInvoices.push(...userInvoices);
  });
  
  return clientInvoices;
};

// Get client name by client org ID (for compatibility)
export const getClientNameByClientOrgId = (clientOrgId: string): string => {
  const client = clients.find(c => c.id === clientOrgId);
  return client ? client.companyName : "Unknown Client";
};
