
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ArrowUpDown } from "lucide-react";

interface AppSearchAndFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  sortOrder: "asc" | "desc";
  onSortToggle: () => void;
}

const AppSearchAndFilter: React.FC<AppSearchAndFilterProps> = ({
  searchTerm,
  onSearchChange,
  sortOrder,
  onSortToggle
}) => {
  return (
    <div className="flex items-center gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search applications..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <Button variant="outline" onClick={onSortToggle}>
        <ArrowUpDown className="mr-2 h-4 w-4" />
        Sort by Clients {sortOrder === "asc" ? "↑" : "↓"}
      </Button>
    </div>
  );
};

export default AppSearchAndFilter;
