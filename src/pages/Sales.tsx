
import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { SalesForm } from "@/components/sales/SalesForm";
import { useGoogleSheets } from "@/hooks/useGoogleSheets";
import { GlassCard } from "@/components/ui/GlassCard";
import { CustomButton } from "@/components/ui/CustomButton";

const Sales = () => {
  const { getSalesEntries } = useGoogleSheets({
    sheetId: "your-sheet-id",
    apiKey: "your-api-key",
  });

  const [view, setView] = useState<"form" | "list">("form");
  const salesEntries = getSalesEntries();

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-medium">Sales</h1>
          <div className="flex space-x-2">
            <CustomButton
              variant={view === "form" ? "default" : "outline"}
              size="sm"
              onClick={() => setView("form")}
            >
              Add Sale
            </CustomButton>
            <CustomButton
              variant={view === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setView("list")}
            >
              View All
            </CustomButton>
          </div>
        </div>

        {view === "form" ? (
          <SalesForm />
        ) : (
          <GlassCard className="p-6">
            <h2 className="text-xl font-medium mb-6">Sales History</h2>
            
            <div className="overflow-auto max-h-[400px]">
              <table className="w-full">
                <thead className="text-left border-b">
                  <tr>
                    <th className="pb-2 font-medium">Date</th>
                    <th className="pb-2 font-medium">Customer</th>
                    <th className="pb-2 font-medium">Book</th>
                    <th className="pb-2 font-medium text-right">Qty</th>
                    <th className="pb-2 font-medium text-right">Price</th>
                    <th className="pb-2 font-medium text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {salesEntries.map((entry) => (
                    <tr key={entry.id} className="hover:bg-muted/20 transition-colors">
                      <td className="py-3">{entry.date}</td>
                      <td className="py-3">{entry.customerName}</td>
                      <td className="py-3">{entry.bookTitle}</td>
                      <td className="py-3 text-right">{entry.quantity}</td>
                      <td className="py-3 text-right">₹{entry.price.toFixed(2)}</td>
                      <td className="py-3 text-right font-medium">₹{entry.total.toFixed(2)}</td>
                    </tr>
                  ))}
                  {salesEntries.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-4 text-center text-muted-foreground">
                        No sales records found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </GlassCard>
        )}
      </div>
    </AppLayout>
  );
};

export default Sales;
