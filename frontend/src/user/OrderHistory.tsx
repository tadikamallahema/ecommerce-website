/* import axios from "axios";
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

export default OrderHistory; */

import axios from "axios";
import  { useEffect, useState } from "react";
import UserDashboard from "./UserDashboard";

interface OrderItem {
  product_name: string;
  image: string;
  quantity: number;
  price_at_time: number;
}

interface Order {
  id: number;
  total_amount: number;
  status: string;
  created_at: string;
  items: OrderItem[];
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

      setOrders(res.data.orders);

    } catch (err:any) {

      console.error(err.message);

    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading order history...</p>;

  return (
    <div style={{ padding: "40px", background:"#f5f5f5", minHeight:"100vh" }}>

      <UserDashboard/>

      <h2 style={{marginTop:"20px"}}>My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (

        <div style={{marginTop:"30px"}}>

          {orders.map(order => (

            <div
              key={order.id}
              style={{
                background:"#fff",
                padding:"25px",
                borderRadius:"12px",
                marginBottom:"30px",
                boxShadow:"0 5px 15px rgba(0,0,0,0.08)"
              }}
            >

              {/* Order header */}

              <div style={{
                display:"flex",
                justifyContent:"space-between",
                marginBottom:"15px"
              }}>
                <strong>Order #{order.id}</strong>

                <span style={{color:"green",fontWeight:"bold"}}>
                  {order.status}
                </span>
              </div>

              <p style={{color:"#777"}}>
                {new Date(order.created_at).toLocaleDateString()}
              </p>

              <hr style={{margin:"15px 0"}}/>

              {/* Order items */}

              {order.items.map((item,i)=>(
                <div
                  key={i}
                  style={{
                    display:"flex",
                    gap:"20px",
                    marginBottom:"15px"
                  }}
                >

                  <img
                    src={item.image}
                    alt={item.product_name}
                    style={{
                      width:"80px",
                      height:"80px",
                      objectFit:"cover",
                      borderRadius:"8px"
                    }}
                  />

                  <div>

                    <p style={{margin:0,fontWeight:"bold"}}>
                      {item.product_name}
                    </p>

                    <p style={{margin:0,color:"#777"}}>
                      Qty: {item.quantity}
                    </p>

                    <p style={{margin:0}}>
                      ₹{item.price_at_time}
                    </p>

                  </div>

                </div>
              ))}

              <hr/>

              <div style={{
                display:"flex",
                justifyContent:"space-between",
                fontWeight:"bold"
              }}>
                <span>Total</span>
                <span>₹{order.total_amount}</span>
              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
};

export default OrderHistory;