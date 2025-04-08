
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  FileText, 
  Users, 
  Home, 
  LogOut,
  Settings,
  LayoutGrid,
  Building,
  Archive
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  isActive?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ 
  icon: Icon, 
  label, 
  href, 
  isActive = false 
}) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all hover:text-sidebar-foreground",
        isActive 
          ? "bg-sidebar-accent text-sidebar-foreground" 
          : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50"
      )}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </Link>
  );
};

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { logout } = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="hidden md:flex h-screen w-64 flex-col bg-sidebar fixed left-0 top-0 z-20">
      <div className="flex h-14 items-center border-b border-sidebar-border px-4">
        <Link to="/dashboard" className="flex items-center gap-2 font-semibold text-sidebar-foreground">
          <FileText className="h-6 w-6" />
          <span className="text-lg">SWBZA</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-4">
        <nav className="grid gap-1 px-2">
          <SidebarItem
            icon={Home}
            label="Dashboard"
            href="/dashboard"
            isActive={isActive("/dashboard")}
          />
          <SidebarItem
            icon={LayoutGrid}
            label="Applications"
            href="/applications"
            isActive={isActive("/applications")}
          />
          <SidebarItem
            icon={Users}
            label="Users"
            href="/users"
            isActive={isActive("/users")}
          />
          <SidebarItem
            icon={Building}
            label="Clients"
            href="/clients"
            isActive={isActive("/clients")}
          />
          <SidebarItem
            icon={Archive}
            label="Products"
            href="/products"
            isActive={isActive("/products")}
          />
          <SidebarItem
            icon={Settings}
            label="Settings"
            href="/settings"
            isActive={isActive("/settings")}
          />
        </nav>
      </div>
      <div className="border-t border-sidebar-border p-4">
        <button
          onClick={() => logout()}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-all"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
