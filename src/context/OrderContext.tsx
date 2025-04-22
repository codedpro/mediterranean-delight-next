"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { MenuItem } from "@/data/menu";
import { useSession } from "next-auth/react";

interface OrderItem extends MenuItem {
  quantity: number;
}

interface OrderContextType {
  orderItems: OrderItem[];
  addToOrder: (item: MenuItem) => void;
  removeFromOrder: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearOrder: () => void;
  totalItems: number;
  totalPrice: number;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const { data: session } = useSession();

  // Load order from database when user signs in
  useEffect(() => {
    const loadOrder = async () => {
      if (session?.user?.id) {
        try {
          const response = await fetch("/api/orders/current");
          const data = await response.json();
          if (data.order) {
            setOrderItems(data.order.items);
          }
        } catch (error) {
          console.error("Error loading order:", error);
        }
      }
    };

    loadOrder();
  }, [session]);

  const addToOrder = async (item: MenuItem) => {
    setOrderItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      const newItems = existingItem
        ? prevItems.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          )
        : [...prevItems, { ...item, quantity: 1 }];

      // Save to database if user is logged in
      if (session?.user?.id) {
        saveOrderToDatabase(newItems);
      }

      return newItems;
    });
  };

  const removeFromOrder = async (itemId: string) => {
    setOrderItems((prevItems) => {
      const newItems = prevItems.filter((item) => item.id !== itemId);

      // Save to database if user is logged in
      if (session?.user?.id) {
        saveOrderToDatabase(newItems);
      }

      return newItems;
    });
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromOrder(itemId);
      return;
    }

    setOrderItems((prevItems) => {
      const newItems = prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      );

      // Save to database if user is logged in
      if (session?.user?.id) {
        saveOrderToDatabase(newItems);
      }

      return newItems;
    });
  };

  const clearOrder = async () => {
    setOrderItems([]);

    // Clear order in database if user is logged in
    if (session?.user?.id) {
      try {
        await fetch("/api/orders/clear", { method: "POST" });
      } catch (error) {
        console.error("Error clearing order:", error);
      }
    }
  };

  const saveOrderToDatabase = async (items: OrderItem[]) => {
    try {
      await fetch("/api/orders/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items }),
      });
    } catch (error) {
      console.error("Error saving order:", error);
    }
  };

  const totalItems = orderItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <OrderContext.Provider
      value={{
        orderItems,
        addToOrder,
        removeFromOrder,
        updateQuantity,
        clearOrder,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
} 