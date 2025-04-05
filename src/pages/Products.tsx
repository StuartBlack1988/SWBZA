import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { CardHeader } from "@/components/ui/card";
import { CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  PlusCircle, 
  MoreHorizontal, 
  Package, 
  Users 
} from "lucide-react";
import { toast } from "@/hooks/useToast";
import { clients as mockClients } from "@/services/mockData";

// Product types
type ProductType = "hosting" | "domain" | "license" | "support";
type BillingType = "monthly" | "annual" | "usage";

interface Product {
  id: string;
  name: string;
  description: string;
  type: ProductType;
  price: number;
  billingType: BillingType;
  active: boolean;
  clientIds: string[]; // IDs of clients using this product
}

// Mock products data
const initialProducts: Product[] = [
  {
    id: "prod1",
    name: "Basic Hosting",
    description: "Shared hosting with 10GB storage and 100GB bandwidth",
    type: "hosting",
    price: 5.99,
    billingType: "monthly",
    active: true,
    clientIds: ["client1", "client3"]
  },
  {
    id: "prod2",
    name: "Premium Hosting",
    description: "VPS hosting with 50GB storage and unlimited bandwidth",
    type: "hosting",
    price: 19.99,
    billingType: "monthly",
    active: true,
    clientIds: ["client2"]
  },
  {
    id: "prod3",
    name: "Domain Registration",
    description: "Domain name registration and management",
    type: "domain",
    price: 12.99,
    billingType: "annual",
    active: true,
    clientIds: ["client1", "client2", "client3"]
  },
  {
    id: "prod4",
    name: "Enterprise License",
    description: "Software license for enterprise users",
    type: "license",
    price: 299.99,
    billingType: "annual",
    active: true,
    clientIds: ["client2"]
  },
  {
    id: "prod5",
    name: "Priority Support",
    description: "24/7 priority support with 1-hour response time",
    type: "support",
    price: 49.99,
    billingType: "monthly",
    active: true,
    clientIds: ["client3"]
  },
  {
    id: "prod6",
    name: "Data Transfer",
    description: "Outbound data transfer beyond included quota",
    type: "hosting",
    price: 0.10,
    billingType: "usage",
    active: true,
    clientIds: []
  }
];

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isClientDialogOpen, setIsClientDialogOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [newProduct, setNewProduct] = useState<Omit<Product, "id" | "active" | "clientIds">>({
    name: "",
    description: "",
    type: "hosting",
    price: 0,
    billingType: "monthly"
  });
  const [filterType, setFilterType] = useState<ProductType | "all">("all");

  // Get selected product
  const selectedProduct = selectedProductId ? products.find(p => p.id === selectedProductId) : null;

  // Filter products by type
  const filteredProducts = filterType === "all" 
    ? products 
    : products.filter(product => product.type === filterType);

  // Add new product
  const handleAddProduct = () => {
    const productId = `prod${products.length + 1}`;
    const product: Product = {
      ...newProduct,
      id: productId,
      active: true,
      clientIds: []
    };
    
    setProducts([...products, product]);
    setIsAddDialogOpen(false);
    toast.success(`Product ${product.name} added successfully`);
    
    // Reset form
    setNewProduct({
      name: "",
      description: "",
      type: "hosting",
      price: 0,
      billingType: "monthly"
    });
  };

  // Count users for product by client
  const getUserCountByClient = (productId: string, clientId: string) => {
    // This is a mock implementation - in a real app, this would query the database
    // Static values for demonstration
    const mockUserCounts: Record<string, Record<string, number>> = {
      "prod1": { "client1": 5, "client3": 8 },
      "prod2": { "client2": 12 },
      "prod3": { "client1": 2, "client2": 3, "client3": 1 },
      "prod4": { "client2": 7 },
      "prod5": { "client3": 4 }
    };
    
    return mockUserCounts[productId]?.[clientId] || 0;
  };

  // Get total user count for a product
  const getTotalUserCount = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return 0;
    
    return product.clientIds.reduce((total, clientId) => {
      return total + getUserCountByClient(productId, clientId);
    }, 0);
  };

  // Toggle client for product
  const toggleClientForProduct = (productId: string, clientId: string) => {
    setProducts(products.map(product => {
      if (product.id === productId) {
        const clientIds = product.clientIds.includes(clientId)
          ? product.clientIds.filter(id => id !== clientId)
          : [...product.clientIds, clientId];
        
        return { ...product, clientIds };
      }
      return product;
    }));
  };

  // Format price with billing type
  const formatPrice = (price: number, billingType: BillingType) => {
    return `$${price.toFixed(2)}${billingType === "usage" ? "/unit" : billingType === "monthly" ? "/mo" : "/yr"}`;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Products</h2>
            <p className="text-muted-foreground mt-2">
              Manage your product catalog and pricing
            </p>
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>
        
        {/* Product Type Filter */}
        <div className="flex flex-wrap gap-2">
          <Button 
            variant={filterType === "all" ? "default" : "outline"}
            onClick={() => setFilterType("all")}
          >
            All
          </Button>
          <Button 
            variant={filterType === "hosting" ? "default" : "outline"}
            onClick={() => setFilterType("hosting")}
          >
            Hosting
          </Button>
          <Button 
            variant={filterType === "domain" ? "default" : "outline"}
            onClick={() => setFilterType("domain")}
          >
            Domains
          </Button>
          <Button 
            variant={filterType === "license" ? "default" : "outline"}
            onClick={() => setFilterType("license")}
          >
            Licenses
          </Button>
          <Button 
            variant={filterType === "support" ? "default" : "outline"}
            onClick={() => setFilterType("support")}
          >
            Support
          </Button>
        </div>

        {/* Products Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Billing</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Clients</TableHead>
                <TableHead className="text-center">Users</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                    No products found
                  </TableCell>
                </TableRow>
              ) : (
                filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.description}</TableCell>
                    <TableCell className="capitalize">{product.type}</TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                        {product.billingType === "usage" ? "Per Usage" : 
                         product.billingType === "monthly" ? "Monthly" : "Annual"}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      {product.active ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success/10 text-success">
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-destructive/10 text-destructive">
                          Inactive
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline">{product.clientIds.length}</Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="secondary">{getTotalUserCount(product.id)}</Badge>
                    </TableCell>
                    <TableCell className="text-center">
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
                            onClick={() => {
                              setSelectedProductId(product.id);
                              setIsClientDialogOpen(true);
                            }}
                          >
                            <Users className="mr-2 h-4 w-4" />
                            Manage Clients
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            <Package className="mr-2 h-4 w-4" />
                            Edit Product
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Add Product Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogDescription>
              Create a new product in your catalog
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="name" className="text-sm font-medium">Product Name</label>
              <Input
                id="name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              />
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="description" className="text-sm font-medium">Description</label>
              <Input
                id="description"
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label htmlFor="type" className="text-sm font-medium">Type</label>
                <select
                  id="type"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={newProduct.type}
                  onChange={(e) => setNewProduct({ ...newProduct, type: e.target.value as ProductType })}
                >
                  <option value="hosting">Hosting</option>
                  <option value="domain">Domain</option>
                  <option value="license">License</option>
                  <option value="support">Support</option>
                </select>
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="billingType" className="text-sm font-medium">Billing Type</label>
                <select
                  id="billingType"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={newProduct.billingType}
                  onChange={(e) => setNewProduct({ ...newProduct, billingType: e.target.value as BillingType })}
                >
                  <option value="monthly">Monthly</option>
                  <option value="annual">Annual</option>
                  <option value="usage">Per Usage</option>
                </select>
              </div>
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="price" className="text-sm font-medium">
                Price ({newProduct.billingType === "usage" ? "per unit" : newProduct.billingType === "monthly" ? "per month" : "per year"})
              </label>
              <Input
                id="price"
                type="number"
                min="0"
                step="0.01"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) || 0 })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddProduct} disabled={!newProduct.name}>
              Add Product
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Manage Clients Dialog */}
      <Dialog open={isClientDialogOpen} onOpenChange={setIsClientDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Manage Clients for {selectedProduct?.name}</DialogTitle>
            <DialogDescription>
              Select which clients have access to this product
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Client Access</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">Access</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead className="text-center">Active Users</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockClients.map((client) => (
                      <TableRow key={client.id}>
                        <TableCell>
                          <Checkbox 
                            checked={selectedProduct?.clientIds.includes(client.id)}
                            onCheckedChange={() => {
                              if (selectedProductId) {
                                toggleClientForProduct(selectedProductId, client.id);
                              }
                            }}
                          />
                        </TableCell>
                        <TableCell className="font-medium">{client.companyName}</TableCell>
                        <TableCell>{client.contactName}</TableCell>
                        <TableCell className="text-center">
                          {selectedProductId ? getUserCountByClient(selectedProductId, client.id) : 0}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          <DialogFooter>
            <Button onClick={() => setIsClientDialogOpen(false)}>
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Products;
