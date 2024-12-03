"use client";
import React from "react";

import OrderCard from "./OrderCard";
import { useOrders } from "@/hooks/useOrders";
const Orders = () => {
  const { data: orders } = useOrders();

  return (
    <div className="flex items-center justify-center flex-wrap gap-4">
      {orders?.map((order: any) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
};

export default Orders;
