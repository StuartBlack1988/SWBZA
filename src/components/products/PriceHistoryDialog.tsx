
import React from "react";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from "@/components/ui/table";
import { getProductPriceHistory } from "@/services/mockData";
import { format } from "date-fns";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface PriceHistoryDialogProps {
  productId: string;
  productName: string;
}

const PriceHistoryDialog: React.FC<PriceHistoryDialogProps> = ({ 
  productId,
  productName
}) => {
  const priceHistory = getProductPriceHistory(productId);
  
  const getPriceChangeIcon = (index: number) => {
    if (index === priceHistory.length - 1) return <Minus className="h-4 w-4" />;
    
    const currentPrice = priceHistory[index].price;
    const previousPrice = priceHistory[index + 1].price;
    
    if (currentPrice > previousPrice) {
      return <TrendingUp className="h-4 w-4 text-red-500" />;
    } else if (currentPrice < previousPrice) {
      return <TrendingDown className="h-4 w-4 text-green-500" />;
    } else {
      return <Minus className="h-4 w-4" />;
    }
  };
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">{productName}</h3>
      
      {priceHistory.length === 0 ? (
        <p className="text-center py-6 text-muted-foreground">
          No price history available
        </p>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Change</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {priceHistory.map((history, index) => (
                <TableRow key={history.id}>
                  <TableCell>
                    {format(new Date(history.createdAt), "PPP")}
                  </TableCell>
                  <TableCell>${history.price.toFixed(2)}</TableCell>
                  <TableCell className="flex items-center">
                    {getPriceChangeIcon(index)}
                    {index < priceHistory.length - 1 && (
                      <span className="ml-1">
                        {(history.price - priceHistory[index + 1].price).toFixed(2)}
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default PriceHistoryDialog;
