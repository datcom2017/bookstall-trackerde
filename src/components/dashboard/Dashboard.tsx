
import React, { useMemo } from "react";
import { BarChart, PieChart, LineChart, BarChartIcon, ArrowDown, ArrowUp, BookOpen, BookText, DollarSign } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { CustomButton } from "@/components/ui/CustomButton";
import { useGoogleSheets } from "@/hooks/useGoogleSheets";
import { useNavigate } from "react-router-dom";

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  
  const {
    getSalesEntries,
    getPurchaseEntries,
    getTotalSales,
    getTotalPurchases,
    getProfit,
  } = useGoogleSheets({
    sheetId: "your-sheet-id",
    apiKey: "your-api-key",
  });

  const salesEntries = getSalesEntries();
  const purchaseEntries = getPurchaseEntries();
  const totalSales = getTotalSales();
  const totalPurchases = getTotalPurchases();
  const profit = getProfit();

  const recentSales = useMemo(() => {
    return [...salesEntries].sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }).slice(0, 3);
  }, [salesEntries]);

  const recentPurchases = useMemo(() => {
    return [...purchaseEntries].sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }).slice(0, 3);
  }, [purchaseEntries]);

  const bookInventory = useMemo(() => {
    const inventory: Record<string, number> = {};
    
    // Add purchased books
    purchaseEntries.forEach(entry => {
      if (!inventory[entry.bookTitle]) {
        inventory[entry.bookTitle] = 0;
      }
      inventory[entry.bookTitle] += entry.quantity;
    });
    
    // Subtract sold books
    salesEntries.forEach(entry => {
      if (!inventory[entry.bookTitle]) {
        inventory[entry.bookTitle] = 0;
      }
      inventory[entry.bookTitle] -= entry.quantity;
    });
    
    return inventory;
  }, [purchaseEntries, salesEntries]);

  const totalBooks = useMemo(() => {
    return Object.values(bookInventory).reduce((sum, quantity) => sum + quantity, 0);
  }, [bookInventory]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-medium">Bookstall Overview</h1>
        <div className="flex space-x-2">
          <CustomButton
            variant="outline"
            size="sm"
            onClick={() => navigate("/sales")}
          >
            New Sale
          </CustomButton>
          <CustomButton
            variant="outline"
            size="sm"
            onClick={() => navigate("/purchases")}
          >
            New Purchase
          </CustomButton>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <GlassCard className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-muted-foreground">Total Sales</p>
              <h3 className="text-2xl font-medium mt-1">₹{totalSales.toFixed(2)}</h3>
              <p className="text-xs text-muted-foreground mt-1">{salesEntries.length} transactions</p>
            </div>
            <div className="bg-primary/10 p-2 rounded-full">
              <DollarSign className="w-5 h-5 text-primary" />
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-muted-foreground">Total Purchases</p>
              <h3 className="text-2xl font-medium mt-1">₹{totalPurchases.toFixed(2)}</h3>
              <p className="text-xs text-muted-foreground mt-1">{purchaseEntries.length} transactions</p>
            </div>
            <div className="bg-primary/10 p-2 rounded-full">
              <BookText className="w-5 h-5 text-primary" />
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-muted-foreground">Net Profit</p>
              <h3 className="text-2xl font-medium mt-1">₹{profit.toFixed(2)}</h3>
              <p className="text-xs flex items-center mt-1">
                {profit > 0 ? (
                  <ArrowUp className="w-3 h-3 text-green-500 mr-1" />
                ) : (
                  <ArrowDown className="w-3 h-3 text-red-500 mr-1" />
                )}
                <span className={profit > 0 ? "text-green-500" : "text-red-500"}>
                  {profit > 0 ? "Profit" : "Loss"}
                </span>
              </p>
            </div>
            <div className="bg-primary/10 p-2 rounded-full">
              <BarChartIcon className="w-5 h-5 text-primary" />
            </div>
          </div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard className="p-4">
          <h3 className="text-lg font-medium mb-3">Recent Sales</h3>
          <div className="space-y-3">
            {recentSales.length > 0 ? (
              recentSales.map((sale) => (
                <div key={sale.id} className="flex justify-between items-center p-2 rounded-md hover:bg-muted/30 transition-colors">
                  <div>
                    <p className="font-medium">{sale.bookTitle}</p>
                    <p className="text-xs text-muted-foreground">
                      {sale.customerName} • {sale.date}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹{sale.total.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">Qty: {sale.quantity}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-sm">No recent sales</p>
            )}
          </div>
          <div className="mt-3 pt-3 border-t">
            <CustomButton
              variant="ghost"
              size="sm"
              className="w-full"
              onClick={() => navigate("/sales")}
            >
              View All Sales
            </CustomButton>
          </div>
        </GlassCard>

        <GlassCard className="p-4">
          <h3 className="text-lg font-medium mb-3">Recent Purchases</h3>
          <div className="space-y-3">
            {recentPurchases.length > 0 ? (
              recentPurchases.map((purchase) => (
                <div key={purchase.id} className="flex justify-between items-center p-2 rounded-md hover:bg-muted/30 transition-colors">
                  <div>
                    <p className="font-medium">{purchase.bookTitle}</p>
                    <p className="text-xs text-muted-foreground">
                      {purchase.vendorName} • {purchase.date}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹{purchase.total.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">Qty: {purchase.quantity}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-sm">No recent purchases</p>
            )}
          </div>
          <div className="mt-3 pt-3 border-t">
            <CustomButton
              variant="ghost"
              size="sm"
              className="w-full"
              onClick={() => navigate("/purchases")}
            >
              View All Purchases
            </CustomButton>
          </div>
        </GlassCard>
      </div>

      <GlassCard className="p-4">
        <h3 className="text-lg font-medium mb-3">Book Inventory</h3>
        <div className="space-y-2">
          {Object.entries(bookInventory).length > 0 ? (
            Object.entries(bookInventory).map(([title, quantity]) => (
              <div key={title} className="flex justify-between items-center p-2 rounded-md hover:bg-muted/30 transition-colors">
                <div className="flex items-center">
                  <BookOpen className="w-4 h-4 mr-2 text-muted-foreground" />
                  <p className="font-medium">{title}</p>
                </div>
                <div>
                  <span className={`text-sm font-medium ${quantity > 0 ? 'text-green-600' : 'text-red-500'}`}>
                    {quantity} {quantity === 1 ? 'copy' : 'copies'}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground text-sm">No books in inventory</p>
          )}
        </div>
        <div className="mt-3 pt-3 border-t">
          <p className="text-sm text-muted-foreground">
            Total Books: {totalBooks}
          </p>
        </div>
      </GlassCard>
    </div>
  );
};
