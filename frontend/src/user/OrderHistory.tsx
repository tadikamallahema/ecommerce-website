import axios from "axios";
import React, { useEffect, useState } from "react";
import UserDashboard from "./UserDashboard";

interface Order {
  id: number;
  total_amount: number;
  status: string;
  created_at: string;
}

const OrderHistory = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrderHistory();
  }, []);

  const fetchOrderHistory = async () => {
    try {
      const res = await axios.get(
        "http://localhost:2007/api/orders/getbyidhis",
        { withCredentials: true }
      );
      console.log(res.data.orders)
      setOrders(res.data.orders);
    } catch (err: any) {
      console.error("Failed to fetch order history", err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading order history...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <UserDashboard/>
      <h2>Order History</h2>

      {orders.length === 0 ? (
        <p>No successful orders yet</p>
      ) : (
        <table width="100%" style={{ marginTop: "20px" }}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>₹{order.total_amount}</td>
                <td style={{ color: "green" }}>{order.status}</td>
                <td>{new Date(order.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderHistory;