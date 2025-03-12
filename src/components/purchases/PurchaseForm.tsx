
import React, { useState } from "react";
import { CustomButton } from "@/components/ui/CustomButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGoogleSheets, PurchaseEntry } from "@/hooks/useGoogleSheets";

export const PurchaseForm: React.FC = () => {
  const { addPurchaseEntry, isLoading } = useGoogleSheets({
    sheetId: "your-sheet-id",
    apiKey: "your-api-key",
  });

  const [formData, setFormData] = useState<Omit<PurchaseEntry, "id" | "total">>({
    date: new Date().toISOString().split("T")[0],
    vendorName: "",
    bookTitle: "",
    quantity: 1,
    costPrice: 0,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "quantity" || name === "costPrice" ? Number(value) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Calculate total
    const total = formData.quantity * formData.costPrice;
    
    // Add entry
    addPurchaseEntry({
      ...formData,
      total,
    });
    
    // Reset form
    setFormData({
      date: new Date().toISOString().split("T")[0],
      vendorName: "",
      bookTitle: "",
      quantity: 1,
      costPrice: 0,
    });
  };

  return (
    <GlassCard className="w-full p-6 max-w-md mx-auto">
      <h2 className="text-xl font-medium mb-6">Record Purchases</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="vendorName">Vendor Name</Label>
          <Input
            id="vendorName"
            name="vendorName"
            value={formData.vendorName}
            onChange={handleInputChange}
            placeholder="Enter vendor name"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="bookTitle">Book Title</Label>
          <Input
            id="bookTitle"
            name="bookTitle"
            value={formData.bookTitle}
            onChange={handleInputChange}
            placeholder="Enter book title"
            required
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              name="quantity"
              type="number"
              min="1"
              value={formData.quantity}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="costPrice">Cost Price</Label>
            <Input
              id="costPrice"
              name="costPrice"
              type="number"
              min="0"
              step="0.01"
              value={formData.costPrice}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        
        <div className="pt-2">
          <CustomButton type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Saving..." : "Record Purchase"}
          </CustomButton>
        </div>
      </form>
    </GlassCard>
  );
};
