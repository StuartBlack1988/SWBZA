
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductFiltersProps {
  search: string;
  setSearch: (value: string) => void;
  filterSubscription: boolean | null;
  setFilterSubscription: (value: boolean | null) => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  search,
  setSearch,
  filterSubscription,
  setFilterSubscription,
}) => {
  const handleReset = () => {
    setSearch("");
    setFilterSubscription(null);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-4 items-end">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-8"
        />
      </div>
      
      <Select
        value={filterSubscription === null ? "all" : filterSubscription ? "subscription" : "one-time"}
        onValueChange={(value) => {
          if (value === "all") setFilterSubscription(null);
          else if (value === "subscription") setFilterSubscription(true);
          else setFilterSubscription(false);
        }}
      >
        <SelectTrigger className="md:w-[180px]">
          <Filter className="mr-2 h-4 w-4" />
          <SelectValue placeholder="Filter by type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="subscription">Subscription</SelectItem>
          <SelectItem value="one-time">One-time</SelectItem>
        </SelectContent>
      </Select>
      
      <Button variant="outline" onClick={handleReset}>
        Reset Filters
      </Button>
    </div>
  );
};

export default ProductFilters;
