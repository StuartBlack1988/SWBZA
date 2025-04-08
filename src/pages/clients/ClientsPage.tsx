
import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import ClientForm from "./components/ClientForm";
import ClientsTable from "./components/ClientsTable";
import { Client, clients, addClient, updateClient, deleteClient } from "@/services/mockData";

const ClientsPage: React.FC = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [clientsList, setClientsList] = useState<Client[]>(clients);

  const handleAddClient = (data: { name: string }) => {
    const newClient = addClient(data.name);
    setClientsList([...clientsList]);
    setIsAddDialogOpen(false);
    toast.success("Client added successfully");
  };

  const handleEditClient = (data: { name: string }) => {
    if (!selectedClient) return;
    
    updateClient(selectedClient.id, { name: data.name });
    setClientsList([...clientsList]);
    setIsEditDialogOpen(false);
    setSelectedClient(null);
    toast.success("Client updated successfully");
  };

  const handleDeleteClient = () => {
    if (!selectedClient) return;
    
    deleteClient(selectedClient.id);
    setClientsList([...clientsList]);
    setIsDeleteDialogOpen(false);
    setSelectedClient(null);
    toast.success("Client deleted successfully");
  };

  const openEditDialog = (client: Client) => {
    setSelectedClient(client);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (client: Client) => {
    setSelectedClient(client);
    setIsDeleteDialogOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Clients</h2>
            <p className="text-muted-foreground mt-2">
              Manage your client organizations
            </p>
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Client
          </Button>
        </div>

        <ClientsTable
          clients={clientsList}
          onEdit={openEditDialog}
          onDelete={openDeleteDialog}
        />

        {/* Add Client Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Client</DialogTitle>
            </DialogHeader>
            <ClientForm
              onSubmit={handleAddClient}
              onCancel={() => setIsAddDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>

        {/* Edit Client Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Client</DialogTitle>
            </DialogHeader>
            {selectedClient && (
              <ClientForm
                client={selectedClient}
                onSubmit={handleEditClient}
                onCancel={() => setIsEditDialogOpen(false)}
              />
            )}
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete the client{" "}
                <strong>{selectedClient?.name}</strong>. This action cannot be
                undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteClient}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </DashboardLayout>
  );
};

export default ClientsPage;
