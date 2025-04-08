import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import ProductForm from "@/components/products/ProductForm";
import ProductFilters from "@/components/products/ProductFilters";
import PriceHistoryDialog from "@/components/products/PriceHistoryDialog";
import { toast } from "@/hooks/useToast";
import { Product, getAllProducts, deleteProduct } from "@/services/mockData";
import { Archive, Edit, Plus, Trash2, History } from "lucide-react";

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showAddEditDialog, setShowAddEditDialog] = useState(false);
  const [showPriceHistoryDialog, setShowPriceHistoryDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterSubscription, setFilterSubscription] = useState<boolean | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [products, search, filterSubscription]);

  const fetchProducts = () => {
    try {
      const data = getAllProducts();
      setProducts(data);
      setFilteredProducts(data);
      setIsLoading(false);
    } catch (error) {
      toast.error("Failed to load products");
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let result = [...products];
    
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchLower) || 
        product.description.toLowerCase().includes(searchLower)
      );
    }
    
    if (filterSubscription !== null) {
      result = result.filter(product => product.isSubscription === filterSubscription);
    }
    
    setFilteredProducts(result);
  };

  const handleProductDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const success = deleteProduct(id);
      if (success) {
        toast.success("Product deleted successfully");
        fetchProducts();
      } else {
        toast.error("Failed to delete product");
      }
    }
  };

  const handleProductUpdated = () => {
    fetchProducts();
    setShowAddEditDialog(false);
    setSelectedProduct(null);
  };

  const handleAddNew = () => {
    setSelectedProduct(null);
    setShowAddEditDialog(true);
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setShowAddEditDialog(true);
  };

  const handleShowPriceHistory = (product: Product) => {
    setSelectedProduct(product);
    setShowPriceHistoryDialog(true);
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <p>Loading products...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Products</h2>
            <p className="text-muted-foreground mt-2">
              Manage your product catalog
            </p>
          </div>
          <Button onClick={handleAddNew} className="w-full md:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Add New Product
          </Button>
        </div>

        <ProductFilters 
          search={search} 
          setSearch={setSearch}
          filterSubscription={filterSubscription}
          setFilterSubscription={setFilterSubscription}
        />

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="hidden md:table-cell">Description</TableHead>
                <TableHead className="hidden md:table-cell">Type</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    <div className="flex flex-col items-center justify-center">
                      <Archive className="h-10 w-10 text-muted-foreground mb-2" />
                      <p>No products found</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell className="hidden md:table-cell max-w-[300px] truncate">
                      {product.description}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {product.isSubscription ? 
                        `Subscription (${product.duration})` : 
                        'One-time'}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleEdit(product)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleShowPriceHistory(product)}
                        >
                          <History className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleProductDelete(product.id)}
                          className="text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={showAddEditDialog} onOpenChange={setShowAddEditDialog}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] p-0">
          <DialogHeader className="px-6 pt-6 sticky top-0 bg-background z-10">
            <DialogTitle>
              {selectedProduct ? 'Edit Product' : 'Add New Product'}
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[calc(90vh-8rem)]">
            <div className="px-6 pb-6">
              <ProductForm 
                product={selectedProduct} 
                onSuccess={handleProductUpdated} 
                onCancel={() => setShowAddEditDialog(false)} 
              />
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <Dialog open={showPriceHistoryDialog} onOpenChange={setShowPriceHistoryDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Price History</DialogTitle>
          </DialogHeader>
          {selectedProduct && (
            <PriceHistoryDialog 
              productId={selectedProduct.id} 
              productName={selectedProduct.name} 
            />
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Products;
