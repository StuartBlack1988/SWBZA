
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Client } from "@/services/mockData";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Client name must be at least 2 characters.",
  }),
});

interface ClientFormProps {
  client?: Client;
  onSubmit: (data: z.infer<typeof formSchema>) => void;
  onCancel: () => void;
}

const ClientForm: React.FC<ClientFormProps> = ({ 
  client, 
  onSubmit, 
  onCancel 
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: client?.name || "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Client Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter client name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onCancel} type="button">
            Cancel
          </Button>
          <Button type="submit">
            {client ? "Update Client" : "Add Client"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ClientForm;
