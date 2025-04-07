
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

interface FeaturesTabProps {
  features: string[];
  appName: string;
}

const getFeatureDescription = (feature: string): string => {
  const descriptions: Record<string, string> = {
    "Custom Templates": "Create and save custom invoice templates",
    "Automated Reminders": "Set up automatic payment reminders",
    "Payment Integration": "Accept payments from multiple providers",
    "Tax Calculation": "Automatic tax calculation and reporting",
    "Invoice History": "Access complete invoice history",
    "Payment Processing": "Process payments directly within the system",
    "Communication Center": "Centralized client communication",
    "Document Storage": "Secure storage for important documents",
    "Interactive Charts": "Visual representation of financial data",
    "Custom Reports": "Generate tailored financial reports",
    "Data Export": "Export data in multiple formats",
    "Trend Analysis": "Identify trends in financial data",
    "Invoice Creation": "Create invoices on mobile devices",
    "Photo Receipt Capture": "Capture receipt photos for expenses",
    "Offline Mode": "Use application without internet connection",
    "Push Notifications": "Get real-time updates on invoice status"
  };

  return descriptions[feature] || "Additional system functionality";
};

const FeaturesTab: React.FC<FeaturesTabProps> = ({ features, appName }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Application Features</CardTitle>
        <CardDescription>
          Features available in {appName}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-2 p-3 border rounded-md">
              <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <div className="font-medium">{feature}</div>
                <p className="text-sm text-muted-foreground">
                  {getFeatureDescription(feature)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FeaturesTab;
