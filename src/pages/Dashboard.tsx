import React, { useEffect, useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FileText, Users, User, LayoutGrid, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { clients, invoices, users, applications } from "@/services/mockData";
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

const InvoiceStatusCard: React.FC<{
  title: string;
  value: number;
  total: number;
  icon: React.ReactNode;
  className?: string;
}> = ({ title, value, total, icon, className }) => (
  <div className="flex items-center p-4 gap-4 rounded-lg border bg-card text-card-foreground shadow-sm">
    <div className={`rounded-full p-2 ${className}`}>{icon}</div>
    <div className="flex-1">
      <h3 className="text-sm font-medium">{title}</h3>
      <div className="mt-1 flex items-center gap-2">
        <div className="text-2xl font-bold">{value}</div>
        <div className="text-xs text-muted-foreground">of {total}</div>
      </div>
      <Progress 
        value={value / total * 100} 
        className={`h-1.5 mt-2 ${className?.replace('bg-', '')}`} 
      />
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState({
    clients: [],
    invoices: [],
    users: [],
    applications: [],
    isLoading: true
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setTimeout(() => {
        setDashboardData({
          clients: clients,
          invoices: invoices,
          users: users,
          applications: applications,
          isLoading: false
        });
      }, 500);
    } catch (error) {
      toast.error("Failed to load dashboard data");
      setDashboardData(prev => ({ ...prev, isLoading: false }));
    }
  };

  const totalClients = dashboardData.clients.length;
  const activeClients = dashboardData.clients.filter(client => client.status === "active").length;
  const totalInvoices = dashboardData.invoices.length;
  const paidInvoices = dashboardData.invoices.filter(invoice => invoice.status === "paid").length;
  const pendingInvoices = dashboardData.invoices.filter(invoice => invoice.status === "pending").length;
  const overdueInvoices = dashboardData.invoices.filter(invoice => invoice.status === "overdue").length;
  const totalUsers = dashboardData.users.length;
  const totalApps = dashboardData.applications.length;
  
  const totalRevenue = dashboardData.invoices
    .filter(invoice => invoice.status === "paid")
    .reduce((acc, invoice) => acc + invoice.amount, 0);

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
            title="Clients"
            value={totalClients}
            description={`${activeClients} active clients`}
            icon={<Users className="h-5 w-5 text-primary" />}
            linkTo="/clients"
          />
          <DashboardOverviewCard
            title="Invoices"
            value={totalInvoices}
            description={`${paidInvoices} paid, ${pendingInvoices} pending`}
            icon={<FileText className="h-5 w-5 text-primary" />}
            linkTo="/invoices"
          />
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
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Invoice Status</CardTitle>
              <CardDescription>Overview of current invoice status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <InvoiceStatusCard
                title="Paid Invoices"
                value={paidInvoices}
                total={totalInvoices}
                icon={<CheckCircle className="h-5 w-5 text-white" />}
                className="bg-success/20 text-success"
              />
              <InvoiceStatusCard
                title="Pending Invoices"
                value={pendingInvoices}
                total={totalInvoices}
                icon={<Clock className="h-5 w-5 text-white" />}
                className="bg-pending/20 text-pending"
              />
              <InvoiceStatusCard
                title="Overdue Invoices"
                value={overdueInvoices}
                total={totalInvoices}
                icon={<AlertCircle className="h-5 w-5 text-white" />}
                className="bg-destructive/20 text-destructive"
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
              <CardDescription>Total revenue from paid invoices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-8 justify-center h-full">
                <div className="text-center">
                  <div className="text-4xl font-bold">${totalRevenue.toLocaleString()}</div>
                  <p className="text-sm text-muted-foreground mt-2">From {paidInvoices} paid invoices</p>
                </div>
                
                <div>
                  <div className="text-sm font-medium">Recent Activity</div>
                  <ul className="mt-2 space-y-2">
                    {invoices.slice(0, 3).map(invoice => {
                      const client = clients.find(c => c.id === invoice.clientId);
                      return (
                        <li key={invoice.id} className="flex items-center justify-between text-sm">
                          <span>{invoice.id} - {client?.companyName}</span>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            invoice.status === "paid" ? "bg-success/10 text-success" :
                            invoice.status === "pending" ? "bg-pending/10 text-pending" :
                            "bg-destructive/10 text-destructive"
                          }`}>
                            ${invoice.amount}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
