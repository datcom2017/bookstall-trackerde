
import React, { useState } from "react";
import { CustomButton } from "@/components/ui/CustomButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGoogleSheets, SalesEntry } from "@/hooks/useGoogleSheets";

export const SalesForm: React.FC = () => {
  const { addSalesEntry, isLoading } = useGoogleSheets({
    sheetId: "your-sheet-id",
    apiKey: "your-api-key",
  });

  const [formData, setFormData] = useState<Omit<SalesEntry, "id" | "total">>({
    date: new Date().toISOString().split("T")[0],
    customerName: "",
    bookTitle: "",
    quantity: 1,
    price: 0,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "quantity" || name === "price" ? Number(value) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Calculate total
    const total = formData.quantity * formData.price;
    
    // Add entry
    addSalesEntry({
      ...formData,
      total,
    });
    
    // Reset form
    setFormData({
      date: new Date().toISOString().split("T")[0],
      customerName: "",
      bookTitle: "",
      quantity: 1,
      price: 0,
    });
  };

  return (
    <GlassCard className="w-full p-6 max-w-md mx-auto">
      <h2 className="text-xl font-medium mb-6">Record Sales</h2>
      
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
          <Label htmlFor="customerName">Customer Name</Label>
          <Input
            id="customerName"
            name="customerName"
            value={formData.customerName}
            onChange={handleInputChange}
            placeholder="Enter customer name"
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
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        
        <div className="pt-2">
          <CustomButton type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Saving..." : "Record Sale"}
          </CustomButton>
        </div>
      </form>
    </GlassCard>
  );
};
