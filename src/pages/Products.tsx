
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
import { PlusCircle } from "lucide-react";
import { toast } from "@/hooks/useToast";

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
    active: true
  },
  {
    id: "prod2",
    name: "Premium Hosting",
    description: "VPS hosting with 50GB storage and unlimited bandwidth",
    type: "hosting",
    price: 19.99,
    billingType: "monthly",
    active: true
  },
  {
    id: "prod3",
    name: "Domain Registration",
    description: "Domain name registration and management",
    type: "domain",
    price: 12.99,
    billingType: "annual",
    active: true
  },
  {
    id: "prod4",
    name: "Enterprise License",
    description: "Software license for enterprise users",
    type: "license",
    price: 299.99,
    billingType: "annual",
    active: true
  },
  {
    id: "prod5",
    name: "Priority Support",
    description: "24/7 priority support with 1-hour response time",
    type: "support",
    price: 49.99,
    billingType: "monthly",
    active: true
  },
  {
    id: "prod6",
    name: "Data Transfer",
    description: "Outbound data transfer beyond included quota",
    type: "hosting",
    price: 0.10,
    billingType: "usage",
    active: true
  }
];

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newProduct, setNewProduct] = useState<Omit<Product, "id" | "active">>({
    name: "",
    description: "",
    type: "hosting",
    price: 0,
    billingType: "monthly"
  });
  const [filterType, setFilterType] = useState<ProductType | "all">("all");

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
      active: true
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
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
    </DashboardLayout>
  );
};

export default Products;
