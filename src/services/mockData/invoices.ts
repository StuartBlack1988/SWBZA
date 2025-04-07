
// Invoices
export interface Invoice {
  id: string;
  userId: string;
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
    userId: "u1",
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
    userId: "u3",
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
    userId: "u5",
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
    userId: "u1",
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
    userId: "u8",
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

// Helper functions for invoices
export const getInvoicesByUserId = (userId: string): Invoice[] => {
  return invoices.filter(invoice => invoice.userId === userId);
};
