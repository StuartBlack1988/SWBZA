
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Client } from "@/services/mockData";

interface ClientsTabProps {
  clients: Client[];
}

const ClientsTab: React.FC<ClientsTabProps> = ({ clients }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Client Usage</CardTitle>
        <CardDescription>
          Clients currently using this application
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Active Users</TableHead>
              <TableHead>License Expires</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                  No clients are using this application
                </TableCell>
              </TableRow>
            ) : (
              clients.map(client => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">{client.companyName}</TableCell>
                  <TableCell>{client.contactName}</TableCell>
                  <TableCell>
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      client.status === "active" ? "bg-success/10 text-success" : "bg-muted"
                    }`}>
                      {client.status}
                    </div>
                  </TableCell>
                  <TableCell>{client.activeUsers}</TableCell>
                  <TableCell>{client.licenseExpiry}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ClientsTab;
