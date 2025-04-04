
import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileText, MoreHorizontal, PlusCircle, CheckCircle, Search } from "lucide-react";
import { 
  clients, 
  invoices as mockInvoices, 
  Invoice, 
  getClientById,
  InvoiceItem 
} from "@/services/mockData";
import { toast } from "@/hooks/useToast";
import { format } from "date-fns";

const Invoices: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newInvoice, setNewInvoice] = useState<{
    clientId: string;
    issueDate: string;
    dueDate: string;
    items: InvoiceItem[];
  }>({
    clientId: "",
    issueDate: format(new Date(), "yyyy-MM-dd"),
    dueDate: format(new Date().setDate(new Date().getDate() + 30), "yyyy-MM-dd"),
    items: [{ description: "", quantity: 1, unitPrice: 0 }]
  });

  // Filter invoices based on search term
  const filteredInvoices = invoices.filter(invoice => {
    const client = getClientById(invoice.clientId);
    return (
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client?.companyName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Calculate invoice total
  const calculateInvoiceTotal = (items: InvoiceItem[]) => {
    return items.reduce((total, item) => total + (item.quantity * item.unitPrice), 0);
  };

  // Mark invoice as paid
  const markAsPaid = (invoiceId: string) => {
    setInvoices(invoices.map(invoice => 
      invoice.id === invoiceId ? { ...invoice, status: "paid" } : invoice
    ));
    toast.success(`Invoice ${invoiceId} marked as paid`);
  };

  // Add item to new invoice
  const addInvoiceItem = () => {
    setNewInvoice({
      ...newInvoice,
      items: [...newInvoice.items, { description: "", quantity: 1, unitPrice: 0 }]
    });
  };

  // Update item in new invoice
  const updateInvoiceItem = (index: number, field: keyof InvoiceItem, value: string | number) => {
    const updatedItems = [...newInvoice.items];
    updatedItems[index] = { 
      ...updatedItems[index], 
      [field]: field === "description" ? value : Number(value) 
    };
    setNewInvoice({ ...newInvoice, items: updatedItems });
  };

  // Remove item from new invoice
  const removeInvoiceItem = (index: number) => {
    if (newInvoice.items.length > 1) {
      const updatedItems = [...newInvoice.items];
      updatedItems.splice(index, 1);
      setNewInvoice({ ...newInvoice, items: updatedItems });
    }
  };

  // Handle create invoice
  const handleCreateInvoice = () => {
    const newInvoiceId = `INV-${String(invoices.length + 1).padStart(3, "0")}`;
    const createdInvoice: Invoice = {
      id: newInvoiceId,
      clientId: newInvoice.clientId,
      issueDate: newInvoice.issueDate,
      dueDate: newInvoice.dueDate,
      items: newInvoice.items,
      status: "pending",
      amount: calculateInvoiceTotal(newInvoice.items)
    };
    
    setInvoices([...invoices, createdInvoice]);
    setIsCreateDialogOpen(false);
    toast.success(`Invoice ${newInvoiceId} created successfully`);
    
    // Reset form
    setNewInvoice({
      clientId: "",
      issueDate: format(new Date(), "yyyy-MM-dd"),
      dueDate: format(new Date().setDate(new Date().getDate() + 30), "yyyy-MM-dd"),
      items: [{ description: "", quantity: 1, unitPrice: 0 }]
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Invoices</h2>
            <p className="text-muted-foreground mt-2">
              Manage and track your client invoices
            </p>
          </div>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Invoice
          </Button>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search invoices..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice ID</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Issue Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No invoices found
                  </TableCell>
                </TableRow>
              ) : (
                filteredInvoices.map((invoice) => {
                  const client = getClientById(invoice.clientId);
                  return (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.id}</TableCell>
                      <TableCell>{client?.companyName}</TableCell>
                      <TableCell>${invoice.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          invoice.status === "paid" ? "bg-success/10 text-success" :
                          invoice.status === "pending" ? "bg-pending/10 text-pending" :
                          "bg-destructive/10 text-destructive"
                        }`}>
                          {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                        </div>
                      </TableCell>
                      <TableCell>{invoice.issueDate}</TableCell>
                      <TableCell>{invoice.dueDate}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem 
                              className="cursor-pointer"
                              onClick={() => markAsPaid(invoice.id)}
                              disabled={invoice.status === "paid"}
                            >
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Mark as Paid
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                              <FileText className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Create Invoice Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Create New Invoice</DialogTitle>
            <DialogDescription>
              Fill in the details to create a new invoice
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label htmlFor="client" className="text-sm font-medium">Client</label>
                <Select
                  value={newInvoice.clientId}
                  onValueChange={(value) => setNewInvoice({ ...newInvoice, clientId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select client" />
                  </SelectTrigger>
                  <SelectContent>
                    {clients.map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.companyName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label htmlFor="issueDate" className="text-sm font-medium">Issue Date</label>
                <Input
                  id="issueDate"
                  type="date"
                  value={newInvoice.issueDate}
                  onChange={(e) => setNewInvoice({ ...newInvoice, issueDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="dueDate" className="text-sm font-medium">Due Date</label>
                <Input
                  id="dueDate"
                  type="date"
                  value={newInvoice.dueDate}
                  onChange={(e) => setNewInvoice({ ...newInvoice, dueDate: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">Items</label>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={addInvoiceItem}
                >
                  Add Item
                </Button>
              </div>

              <div className="space-y-4">
                {newInvoice.items.map((item, index) => (
                  <div key={index} className="grid grid-cols-12 gap-2 items-center">
                    <div className="col-span-6">
                      <Input
                        placeholder="Description"
                        value={item.description}
                        onChange={(e) => updateInvoiceItem(index, "description", e.target.value)}
                      />
                    </div>
                    <div className="col-span-2">
                      <Input
                        type="number"
                        placeholder="Qty"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateInvoiceItem(index, "quantity", e.target.value)}
                      />
                    </div>
                    <div className="col-span-3">
                      <Input
                        type="number"
                        placeholder="Unit Price"
                        min="0"
                        step="0.01"
                        value={item.unitPrice}
                        onChange={(e) => updateInvoiceItem(index, "unitPrice", e.target.value)}
                      />
                    </div>
                    <div className="col-span-1 flex justify-center">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeInvoiceItem(index)}
                        disabled={newInvoice.items.length <= 1}
                      >
                        ×
                      </Button>
                    </div>
                  </div>
                ))}

                <div className="flex justify-end pt-4 border-t">
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Total</div>
                    <div className="text-xl font-bold">
                      ${calculateInvoiceTotal(newInvoice.items).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsCreateDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              type="button" 
              onClick={handleCreateInvoice}
              disabled={!newInvoice.clientId || newInvoice.items.some(item => !item.description)}
            >
              Create Invoice
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Invoices;
