import { createFileRoute } from "@tanstack/react-router";
import React, { useEffect } from "react";
import { useOrderStore } from "../../store/ordersStore";

const Orders = () => {
  const { orders, isFetching, fetchOrders } = useOrderStore();
  useEffect(() => {
    if (orders.length === 0) {
      fetchOrders();
    }
    console.log(orders);
  }, []);
  return <h1>Orders</h1>;
};

export const Route = createFileRoute("/admin/orders")({
  component: Orders,
});
