
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Search, 
  PlusCircle,
  Package,
  Users,
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  CheckCircle,
  XCircle,
  MoreHorizontal
} from "lucide-react";
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
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  getApplicationById,
  getProductsByApplicationId,
  getClientsByProductId,
  countUsersForProduct
} from "@/services/mockData";
import { toast } from "@/hooks/useToast";

const ApplicationProducts: React.FC = () => {
  const { applicationId } = useParams<{ applicationId: string }>();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  
  const application = applicationId ? getApplicationById(applicationId) : undefined;
  const products = applicationId ? getProductsByApplicationId(applicationId) : [];
  
  if (!application) {
    return (
      <DashboardLayout>
        <div className="text-center py-10">
          <h2 className="text-3xl font-bold tracking-tight">Application Not Found</h2>
          <p className="text-muted-foreground mt-2">
            The application you're looking for doesn't exist.
          </p>
          <Link to="/applications">
            <Button className="mt-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Applications
            </Button>
          </Link>
        </div>
      </DashboardLayout>
    );
  }
  
  // Filter products based on search term
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedProduct = selectedProductId 
    ? products.find(product => product.id === selectedProductId) 
    : null;
  
  const clientsForSelectedProduct = selectedProduct 
    ? getClientsByProductId(selectedProduct.id) 
    : [];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Link to="/applications">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <h2 className="text-3xl font-bold tracking-tight">{application.name} Products</h2>
            </div>
            <p className="text-muted-foreground mt-2">
              Manage products for {application.name}
            </p>
          </div>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>
        
        <div className="relative w-full max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            className="pl-8 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Available Products</CardTitle>
            <CardDescription>
              Products that can be subscribed to by clients
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>VAT</TableHead>
                  <TableHead>Billing Type</TableHead>
                  <TableHead className="text-center">Subscription</TableHead>
                  <TableHead className="text-center">Clients</TableHead>
                  <TableHead className="text-center">Users</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-4 text-muted-foreground">
                      No products found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProducts.map((product) => {
                    const clientCount = getClientsByProductId(product.id).length;
                    const userCount = countUsersForProduct(product.id);
                    
                    return (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">
                          <div className="font-medium">{product.name}</div>
                          <div className="text-sm text-muted-foreground line-clamp-1">
                            {product.description}
                          </div>
                        </TableCell>
                        <TableCell>${product.price.toFixed(2)}</TableCell>
                        <TableCell>{product.vat}%</TableCell>
                        <TableCell className="capitalize">{product.duration}</TableCell>
                        <TableCell className="text-center">
                          {product.isSubscription ? (
                            <CheckCircle className="h-5 w-5 text-success mx-auto" />
                          ) : (
                            <XCircle className="h-5 w-5 text-muted-foreground mx-auto" />
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge>{clientCount}</Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant="outline">{userCount}</Badge>
                        </TableCell>
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
                                onClick={() => setSelectedProductId(product.id)}
                              >
                                <Users className="mr-2 h-4 w-4" />
                                View Clients
                              </DropdownMenuItem>
                              <DropdownMenuItem className="cursor-pointer">
                                <Package className="mr-2 h-4 w-4" />
                                Edit Product
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
          </CardContent>
        </Card>
      </div>

      {/* Product Clients Dialog */}
      <Dialog open={selectedProductId !== null} onOpenChange={(open) => !open && setSelectedProductId(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedProduct?.name} - Client Subscriptions</DialogTitle>
            <DialogDescription>
              Clients that are subscribed to this product
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead className="text-center">User Count</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clientsForSelectedProduct.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                      No clients are using this product
                    </TableCell>
                  </TableRow>
                ) : (
                  clientsForSelectedProduct.map((client) => {
                    const subscription = client.subscriptions.find(sub => 
                      sub.productId === selectedProductId
                    );
                    
                    return (
                      <TableRow key={client.id}>
                        <TableCell className="font-medium">
                          <div className="font-medium">{client.companyName}</div>
                          <div className="text-sm text-muted-foreground">
                            {client.contactName}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={subscription?.status === "active" ? "default" : "secondary"}
                            className={subscription?.status === "active" ? "bg-success" : 
                                      subscription?.status === "pending" ? "bg-warning" : "bg-muted"}
                          >
                            {subscription?.status === "active" ? "Active" : 
                             subscription?.status === "pending" ? "Pending" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell>{subscription?.startDate}</TableCell>
                        <TableCell>{subscription?.endDate || "-"}</TableCell>
                        <TableCell className="text-center">
                          <Badge>{subscription?.userCount || 0}</Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button>Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default ApplicationProducts;
