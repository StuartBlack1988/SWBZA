
import { v4 as uuidv4 } from 'uuid';

export interface PriceHistory {
  id: string;
  productId: string;
  price: number;
  createdAt: string;
  updatedAt: string;
}

export const productPriceHistory: PriceHistory[] = [
  // Sample price history for products
  {
    id: uuidv4(),
    productId: "prod1",
    price: 8.99,
    createdAt: "2022-12-15T10:30:00Z",
    updatedAt: "2022-12-15T10:30:00Z"
  },
  {
    id: uuidv4(),
    productId: "prod1",
    price: 9.99,
    createdAt: "2023-01-20T08:30:00Z",
    updatedAt: "2023-01-20T08:30:00Z"
  },
  {
    id: uuidv4(),
    productId: "prod2",
    price: 17.99,
    createdAt: "2022-12-20T14:30:00Z",
    updatedAt: "2022-12-20T14:30:00Z"
  },
  {
    id: uuidv4(),
    productId: "prod2",
    price: 19.99,
    createdAt: "2023-01-25T14:45:00Z",
    updatedAt: "2023-01-25T14:45:00Z"
  }
];

// Helper functions for price history
export const getProductPriceHistory = (productId: string): PriceHistory[] => {
  return productPriceHistory
    .filter(history => history.productId === productId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

export const addPriceHistory = (productId: string, price: number): PriceHistory => {
  const newPriceHistory: PriceHistory = {
    id: uuidv4(),
    productId,
    price,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  productPriceHistory.push(newPriceHistory);
  return newPriceHistory;
};
