
import React, { useState, useEffect } from "react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { 
  Search, 
  Plus, 
  MoreHorizontal,
  FileText,
  Eye,
  Download,
  Mail,
  Building
} from "lucide-react";
import { 
  invoices, 
  Invoice,
  getUserById,
  getClientById,
  getClientAdminUsers,
  User
} from "@/services/mockData";
import { toast } from "@/hooks/useToast";

const Invoices: React.FC = () => {
  const [allInvoices, setAllInvoices] = useState<Invoice[]>([]);
  const [filteredInvoices, setFilteredInvoices] = useState<Invoice[]>([]);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [userFilter, setUserFilter] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [clientAdminUsers, setClientAdminUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchInvoices();
    setClientAdminUsers(getClientAdminUsers());
  }, []);

  useEffect(() => {
    applyFilters();
  }, [allInvoices, searchTerm, statusFilter, userFilter]);

  const fetchInvoices = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      setTimeout(() => {
        setAllInvoices(invoices);
        setFilteredInvoices(invoices);
        setIsLoading(false);
      }, 500);
    } catch (error) {
      toast.error("Failed to load invoices");
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...allInvoices];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(invoice => 
        invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
        invoice.amount.toString().includes(searchTerm)
      );
    }

    // Apply status filter
    if (statusFilter) {
      filtered = filtered.filter(invoice => invoice.status === statusFilter);
    }

    // Apply user filter
    if (userFilter) {
      filtered = filtered.filter(invoice => invoice.userId === userFilter);
    }

    setFilteredInvoices(filtered);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("");
    setUserFilter("");
  };

  const handleViewInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
  };

  const handleSendInvoice = (invoiceId: string) => {
    toast.success(`Invoice ${invoiceId} sent to client`);
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    toast.success(`Invoice ${invoiceId} downloaded`);
  };

  // Get user and company name for display
  const getUserAndCompany = (userId: string): { userName: string, companyName: string } => {
    const user = getUserById(userId);
    const client = user ? getClientById(user.clientId) : undefined;
    
    return {
      userName: user?.name || "Unknown User",
      companyName: client?.companyName || "Unknown Company"
    };
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Invoices</h2>
            <p className="text-muted-foreground mt-2">
              Manage all invoices for client subscriptions
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Invoice
          </Button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search invoices..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Statuses</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={userFilter} onValueChange={setUserFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Client" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Clients</SelectItem>
                {clientAdminUsers.map(user => {
                  const client = getClientById(user.clientId);
                  return (
                    <SelectItem key={user.id} value={user.id}>
                      {client?.companyName || user.name}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            
            <Button variant="outline" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        </div>

        <div className="rounded-md border">
          {isLoading ? (
            <div className="py-8 text-center">Loading invoices...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
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
                    const { userName, companyName } = getUserAndCompany(invoice.userId);
                    return (
                      <TableRow key={invoice.id}>
                        <TableCell className="font-medium">{invoice.id}</TableCell>
                        <TableCell>
                          <div className="font-medium">{companyName}</div>
                          <div className="text-sm text-muted-foreground">{userName}</div>
                        </TableCell>
                        <TableCell>${invoice.amount.toLocaleString()}</TableCell>
                        <TableCell>
                          <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            invoice.status === 'paid'
                              ? 'bg-success/10 text-success'
                              : invoice.status === 'pending'
                              ? 'bg-muted'
                              : 'bg-destructive/10 text-destructive'
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
                                onClick={() => handleViewInvoice(invoice)}
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="cursor-pointer"
                                onClick={() => handleDownloadInvoice(invoice.id)}
                              >
                                <Download className="mr-2 h-4 w-4" />
                                Download
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="cursor-pointer"
                                onClick={() => handleSendInvoice(invoice.id)}
                              >
                                <Mail className="mr-2 h-4 w-4" />
                                Send to Client
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
          )}
        </div>
      </div>

      {/* Invoice Details Dialog */}
      {selectedInvoice && (
        <Dialog open={Boolean(selectedInvoice)} onOpenChange={(open) => !open && setSelectedInvoice(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Invoice {selectedInvoice.id}</DialogTitle>
              <DialogDescription>
                Invoice details for {getUserAndCompany(selectedInvoice.userId).companyName}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Client</h3>
                  <div className="text-lg font-semibold">{getUserAndCompany(selectedInvoice.userId).companyName}</div>
                  <div className="text-sm">{getUserAndCompany(selectedInvoice.userId).userName}</div>
                </div>
                <div className="text-right">
                  <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                  <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${
                    selectedInvoice.status === 'paid'
                      ? 'bg-success/10 text-success'
                      : selectedInvoice.status === 'pending'
                      ? 'bg-muted'
                      : 'bg-destructive/10 text-destructive'
                  }`}>
                    {selectedInvoice.status.charAt(0).toUpperCase() + selectedInvoice.status.slice(1)}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Issue Date</h3>
                  <div>{selectedInvoice.issueDate}</div>
                </div>
                <div className="text-right">
                  <h3 className="text-sm font-medium text-muted-foreground">Due Date</h3>
                  <div>{selectedInvoice.dueDate}</div>
                </div>
              </div>
              
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Quantity</TableHead>
                      <TableHead className="text-right">Unit Price</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedInvoice.items.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.description}</TableCell>
                        <TableCell className="text-right">{item.quantity}</TableCell>
                        <TableCell className="text-right">${item.unitPrice.toFixed(2)}</TableCell>
                        <TableCell className="text-right">${(item.quantity * item.unitPrice).toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={3} className="text-right font-bold">Total</TableCell>
                      <TableCell className="text-right font-bold">${selectedInvoice.amount.toFixed(2)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
            
            <DialogFooter className="flex gap-2">
              <Button 
                variant="outline"
                onClick={() => handleSendInvoice(selectedInvoice.id)}
              >
                <Mail className="mr-2 h-4 w-4" />
                Send to Client
              </Button>
              <Button
                onClick={() => handleDownloadInvoice(selectedInvoice.id)}
              >
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
              <DialogClose asChild>
                <Button variant="secondary">Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </DashboardLayout>
  );
};

export default Invoices;
