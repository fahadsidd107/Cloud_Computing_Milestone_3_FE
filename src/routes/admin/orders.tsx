//@ts-nocheck
import { createFileRoute } from "@tanstack/react-router";
import React, { useEffect } from "react";
import { useOrderStore } from "../../store/ordersStore";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
} from "@heroui/react";
import { Product } from "../../store/productStore";

interface Order {
  address: string;
  address_type: string;
  city: string;
  country: string;
  date_added: string;
  email: string;
  first_name: string;
  id: number;
  last_name: string;
  paid: string;
  payment_method: string;
  phone: string;
  pincode: string;
  products: Product[];
  status: string;
}

const Orders = () => {
  const { orders, isFetching, fetchOrders } = useOrderStore();
  useEffect(() => {
    if (orders.length === 0) {
      fetchOrders();
    }
    console.log(orders);
  }, []);
  return (
    <div className="p-4">
      {isFetching ? (
        <p>Loading...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <Table aria-label="Orders Table" className="text-white">
          <TableHeader>
            <TableColumn key="id">Order ID</TableColumn>
            <TableColumn key="name">Customer Name</TableColumn>
            <TableColumn key="email">Email</TableColumn>
            <TableColumn key="address">Address</TableColumn>
            <TableColumn key="products">Products</TableColumn>
            <TableColumn key="date_added">Date Added</TableColumn>
            <TableColumn key="status">Status</TableColumn>
            <TableColumn key="paid">Payment Status</TableColumn>
          </TableHeader>
          <TableBody items={orders} emptyContent={"No Data Found"}>
            {(order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{`${order.first_name} ${order.last_name}`}</TableCell>
                <TableCell>{order.email}</TableCell>
                <TableCell>
                  <Tooltip content={order.address}>
                    <p className="max-w-[200px] overflow-hidden text-ellipsis">
                      {order.address}
                    </p>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  {order.products.map((product) => (
                    <div key={product.id} className="text-sm">
                      <Tooltip content={product.description}>
                        <p className="max-w-[200px] overflow-hidden text-ellipsis">
                          {product.name} (Qty: {product.quantity})
                        </p>
                      </Tooltip>
                    </div>
                  ))}
                </TableCell>
                <TableCell>{order.date_added}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>{order.paid}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export const Route = createFileRoute("/admin/orders")({
  component: Orders,
});
