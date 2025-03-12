
import { useState, useCallback } from "react";
import { toast } from "@/components/ui/use-toast";

export type BookInfo = {
  id: string;
  title: string;
  basePrice: number;
  stock?: number;
};

export type SalesEntry = {
  id?: string;
  date: string;
  customerName: string;
  bookTitle: string;
  quantity: number;
  price: number;
  discountPercentage?: number;
  total: number;
};

export type PurchaseEntry = {
  id?: string;
  date: string;
  vendorName: string;
  bookTitle: string;
  quantity: number;
  costPrice: number;
  total: number;
};

type SheetData = SalesEntry | PurchaseEntry;

interface UseGoogleSheetsProps {
  sheetId: string;
  apiKey: string;
}

export const useGoogleSheets = ({ sheetId, apiKey }: UseGoogleSheetsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // For a real implementation, we would use the Google Sheets API
  // This is a simulated version for the prototype
  
  // Simulated data storage
  const [salesData, setSalesData] = useState<SalesEntry[]>([
    {
      id: "1",
      date: new Date().toISOString().split('T')[0],
      customerName: "John Doe",
      bookTitle: "The Great Gatsby",
      quantity: 1,
      price: 15,
      discountPercentage: 0,
      total: 15
    },
    {
      id: "2",
      date: new Date().toISOString().split('T')[0],
      customerName: "Jane Smith",
      bookTitle: "To Kill a Mockingbird",
      quantity: 2,
      price: 12,
      discountPercentage: 10,
      total: 21.6
    }
  ]);
  
  const [purchasesData, setPurchasesData] = useState<PurchaseEntry[]>([
    {
      id: "1",
      date: new Date().toISOString().split('T')[0],
      vendorName: "BookWholesale Inc",
      bookTitle: "1984",
      quantity: 5,
      costPrice: 8,
      total: 40
    },
    {
      id: "2",
      date: new Date().toISOString().split('T')[0],
      vendorName: "Literary Supplies",
      bookTitle: "The Catcher in the Rye",
      quantity: 3,
      costPrice: 7,
      total: 21
    }
  ]);

  // Book inventory
  const [bookInventory] = useState<BookInfo[]>([
    { id: "1", title: "The Great Gatsby", basePrice: 15, stock: 10 },
    { id: "2", title: "To Kill a Mockingbird", basePrice: 12, stock: 15 },
    { id: "3", title: "1984", basePrice: 10, stock: 8 },
    { id: "4", title: "Pride and Prejudice", basePrice: 9, stock: 12 },
    { id: "5", title: "The Catcher in the Rye", basePrice: 11, stock: 5 },
    { id: "6", title: "Lord of the Flies", basePrice: 14, stock: 7 },
    { id: "7", title: "Animal Farm", basePrice: 8, stock: 20 },
    { id: "8", title: "The Hobbit", basePrice: 20, stock: 3 },
  ]);

  const addSalesEntry = useCallback((entry: SalesEntry) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      setTimeout(() => {
        const newEntry = {
          ...entry,
          id: Date.now().toString(),
          total: entry.quantity * entry.price
        };
        
        setSalesData(prev => [...prev, newEntry]);
        
        toast({
          title: "Success",
          description: "Sales entry added successfully",
        });
        
        setIsLoading(false);
      }, 800);
    } catch (err) {
      console.error("Error adding sales entry:", err);
      setError("Failed to add sales entry");
      setIsLoading(false);
      
      toast({
        title: "Error",
        description: "Failed to add sales entry",
        variant: "destructive",
      });
    }
  }, []);

  const addPurchaseEntry = useCallback((entry: PurchaseEntry) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      setTimeout(() => {
        const newEntry = {
          ...entry,
          id: Date.now().toString(),
          total: entry.quantity * entry.costPrice
        };
        
        setPurchasesData(prev => [...prev, newEntry]);
        
        toast({
          title: "Success",
          description: "Purchase entry added successfully",
        });
        
        setIsLoading(false);
      }, 800);
    } catch (err) {
      console.error("Error adding purchase entry:", err);
      setError("Failed to add purchase entry");
      setIsLoading(false);
      
      toast({
        title: "Error",
        description: "Failed to add purchase entry",
        variant: "destructive",
      });
    }
  }, []);

  const getSalesEntries = useCallback(() => {
    return salesData;
  }, [salesData]);

  const getPurchaseEntries = useCallback(() => {
    return purchasesData;
  }, [purchasesData]);

  const getTotalSales = useCallback(() => {
    return salesData.reduce((sum, entry) => sum + entry.total, 0);
  }, [salesData]);

  const getTotalPurchases = useCallback(() => {
    return purchasesData.reduce((sum, entry) => sum + entry.total, 0);
  }, [purchasesData]);

  const getProfit = useCallback(() => {
    const totalSales = getTotalSales();
    const totalPurchases = getTotalPurchases();
    return totalSales - totalPurchases;
  }, [getTotalSales, getTotalPurchases]);

  const getBooks = useCallback(() => {
    return bookInventory;
  }, [bookInventory]);

  return {
    isLoading,
    error,
    addSalesEntry,
    addPurchaseEntry,
    getSalesEntries,
    getPurchaseEntries,
    getTotalSales,
    getTotalPurchases,
    getProfit,
    getBooks
  };
};
