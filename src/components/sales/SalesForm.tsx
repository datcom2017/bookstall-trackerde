
import React, { useState, useEffect } from "react";
import { CustomButton } from "@/components/ui/CustomButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookOpen, Percent, Tag } from "lucide-react";
import { useGoogleSheets, SalesEntry, BookInfo } from "@/hooks/useGoogleSheets";

export const SalesForm: React.FC = () => {
  const { addSalesEntry, getBooks, isLoading } = useGoogleSheets({
    sheetId: "your-sheet-id",
    apiKey: "your-api-key",
  });

  const [formData, setFormData] = useState<Omit<SalesEntry, "id" | "total">>({
    date: new Date().toISOString().split("T")[0],
    customerName: "",
    bookTitle: "",
    quantity: 1,
    price: 0,
    discountPercentage: 0,
  });

  const [selectedBook, setSelectedBook] = useState<BookInfo | null>(null);
  const [finalPrice, setFinalPrice] = useState<number>(0);
  const books = getBooks();

  // Update price when book or discount changes
  useEffect(() => {
    if (selectedBook) {
      const discountMultiplier = 1 - (formData.discountPercentage || 0) / 100;
      const calculatedPrice = selectedBook.basePrice * discountMultiplier;
      setFinalPrice(calculatedPrice);
      setFormData(prev => ({
        ...prev,
        bookTitle: selectedBook.title,
        price: calculatedPrice,
      }));
    }
  }, [selectedBook, formData.discountPercentage]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "quantity" || name === "price" || name === "discountPercentage" 
        ? Number(value) 
        : value,
    });
  };

  const handleBookSelect = (book: BookInfo) => {
    setSelectedBook(book);
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
      discountPercentage: 0,
    });
    setSelectedBook(null);
    setFinalPrice(0);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <GlassCard className="w-full md:w-1/2 p-6">
        <h2 className="text-xl font-medium mb-6">Available Books</h2>
        <div className="grid grid-cols-1 gap-3 max-h-[400px] overflow-auto pr-2">
          {books.map((book) => (
            <div
              key={book.id}
              onClick={() => handleBookSelect(book)}
              className={`p-3 rounded-lg border cursor-pointer transition-all ${
                selectedBook?.id === book.id
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{book.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  <span>₹{book.basePrice.toFixed(2)}</span>
                </div>
              </div>
              {book.stock !== undefined && (
                <div className="mt-1 text-xs text-muted-foreground">
                  Stock: {book.stock} copies
                </div>
              )}
            </div>
          ))}
        </div>
      </GlassCard>
      
      <GlassCard className="w-full md:w-1/2 p-6">
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
            <Label htmlFor="bookTitle">Selected Book</Label>
            <Input
              id="bookTitle"
              name="bookTitle"
              value={formData.bookTitle}
              onChange={handleInputChange}
              placeholder="Select a book from the list"
              readOnly
              className="bg-muted/30"
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
              <Label htmlFor="discountPercentage">Discount (%)</Label>
              <div className="relative">
                <Input
                  id="discountPercentage"
                  name="discountPercentage"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.discountPercentage}
                  onChange={handleInputChange}
                />
                <Percent className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </div>
          
          {selectedBook && (
            <div className="p-3 bg-muted/20 rounded-md">
              <div className="flex justify-between text-sm">
                <span>Base Price:</span>
                <span>₹{selectedBook.basePrice.toFixed(2)}</span>
              </div>
              {formData.discountPercentage > 0 && (
                <div className="flex justify-between text-sm">
                  <span>Discount:</span>
                  <span>-₹{(selectedBook.basePrice - finalPrice).toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-medium mt-1 pt-1 border-t">
                <span>Final Price:</span>
                <span>₹{finalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold mt-2 pt-2 border-t">
                <span>Total:</span>
                <span>₹{(finalPrice * formData.quantity).toFixed(2)}</span>
              </div>
            </div>
          )}
          
          <div className="pt-2">
            <CustomButton 
              type="submit" 
              className="w-full" 
              disabled={isLoading || !selectedBook}
            >
              {isLoading ? "Saving..." : "Record Sale"}
            </CustomButton>
          </div>
        </form>
      </GlassCard>
    </div>
  );
};
