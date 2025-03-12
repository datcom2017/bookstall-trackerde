
import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PurchaseForm } from "@/components/purchases/PurchaseForm";
import { useGoogleSheets } from "@/hooks/useGoogleSheets";
import { GlassCard } from "@/components/ui/GlassCard";
import { CustomButton } from "@/components/ui/CustomButton";

const Purchases = () => {
  const { getPurchaseEntries } = useGoogleSheets({
    sheetId: "your-sheet-id",
    apiKey: "your-api-key",
  });

  const [view, setView] = useState<"form" | "list">("form");
  const purchaseEntries = getPurchaseEntries();

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-medium">Purchases</h1>
          <div className="flex space-x-2">
            <CustomButton
              variant={view === "form" ? "default" : "outline"}
              size="sm"
              onClick={() => setView("form")}
            >
              Add Purchase
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
          <PurchaseForm />
        ) : (
          <GlassCard className="p-6">
            <h2 className="text-xl font-medium mb-6">Purchase History</h2>
            
            <div className="overflow-auto max-h-[400px]">
              <table className="w-full">
                <thead className="text-left border-b">
                  <tr>
                    <th className="pb-2 font-medium">Date</th>
                    <th className="pb-2 font-medium">Vendor</th>
                    <th className="pb-2 font-medium">Book</th>
                    <th className="pb-2 font-medium text-right">Qty</th>
                    <th className="pb-2 font-medium text-right">Cost</th>
                    <th className="pb-2 font-medium text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {purchaseEntries.map((entry) => (
                    <tr key={entry.id} className="hover:bg-muted/20 transition-colors">
                      <td className="py-3">{entry.date}</td>
                      <td className="py-3">{entry.vendorName}</td>
                      <td className="py-3">{entry.bookTitle}</td>
                      <td className="py-3 text-right">{entry.quantity}</td>
                      <td className="py-3 text-right">₹{entry.costPrice.toFixed(2)}</td>
                      <td className="py-3 text-right font-medium">₹{entry.total.toFixed(2)}</td>
                    </tr>
                  ))}
                  {purchaseEntries.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-4 text-center text-muted-foreground">
                        No purchase records found
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

export default Purchases;
