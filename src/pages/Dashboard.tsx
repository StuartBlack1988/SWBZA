
import React, { useEffect, useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, LayoutGrid, Building, Archive } from "lucide-react";
import { users, apps, clients, products } from "@/services/mockData";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/useToast";

const DashboardOverviewCard: React.FC<{
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  linkTo: string;
}> = ({ title, value, description, icon, linkTo }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
      <Link 
        to={linkTo} 
        className="mt-3 inline-block text-xs text-primary hover:underline"
      >
        View details →
      </Link>
    </CardContent>
  </Card>
);

const Dashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState({
    users: [],
    applications: [],
    clients: [],
    products: [],
    isLoading: true
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setTimeout(() => {
        setDashboardData({
          users: users,
          applications: apps,
          clients: clients,
          products: products,
          isLoading: false
        });
      }, 500);
    } catch (error) {
      toast.error("Failed to load dashboard data");
      setDashboardData(prev => ({ ...prev, isLoading: false }));
    }
  };

  const totalUsers = dashboardData.users.length;
  const totalApps = dashboardData.applications.length;
  const totalClients = dashboardData.clients.length;
  const totalProducts = dashboardData.products.length;

  if (dashboardData.isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <p>Loading dashboard data...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground mt-2">
            Welcome to your SWBZA Control Panel
          </p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <DashboardOverviewCard
            title="Users"
            value={totalUsers}
            description="Across all clients"
            icon={<User className="h-5 w-5 text-primary" />}
            linkTo="/users"
          />
          <DashboardOverviewCard
            title="Applications"
            value={totalApps}
            description="Active services"
            icon={<LayoutGrid className="h-5 w-5 text-primary" />}
            linkTo="/apps"
          />
          <DashboardOverviewCard
            title="Clients"
            value={totalClients}
            description="Organizations"
            icon={<Building className="h-5 w-5 text-primary" />}
            linkTo="/clients"
          />
          <DashboardOverviewCard
            title="Products"
            value={totalProducts}
            description="Active catalog items"
            icon={<Archive className="h-5 w-5 text-primary" />}
            linkTo="/products"
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
