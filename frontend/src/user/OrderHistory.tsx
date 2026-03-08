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
import { useEffect, useState } from "react";
import UserDashboard from "./UserDashboard";
import { useNavigate } from "react-router-dom";

interface OrderItem {
  product_id: number;
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

  const navigate = useNavigate();

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
<div>
  
      <UserDashboard/>
      <div style={{ padding: "40px", background:"#f5f5f5", minHeight:"100vh" }}>


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

              {/* Order Header */}

              <div style={{
                display:"flex",
                justifyContent:"space-between",
                marginBottom:"15px"
              }}>

                <strong>Order #{order.id}</strong>

                <span style={{
                  color: order.status === "paid" ? "green" : "orange",
                  fontWeight:"bold"
                }}>
                  {order.status}
                </span>

              </div>

              <p style={{color:"#777"}}>
                {new Date(order.created_at).toLocaleDateString()}
              </p>

              <hr style={{margin:"15px 0"}}/>

              {/* Order Items */}

              {order.items?.map((item,i)=>(
                <div
                  key={i}
                  style={{
                    display:"flex",
                    justifyContent:"space-between",
                    alignItems:"center",
                    gap:"20px",
                    marginBottom:"15px"
                  }}
                >

                  <div style={{display:"flex",gap:"20px",alignItems:"center"}}>

                    <img
                      src={item.image || "https://via.placeholder.com/80"}
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

                  {/* Review Button */}

                  {order.status === "paid" && (

                    <button
                      onClick={()=>navigate(`/product/${item.product_id}/reviews`)}
                      style={{
                        padding:"8px 16px",
                        borderRadius:"6px",
                        border:"none",
                        background:"linear-gradient(135deg,#ff6a5e,#ff3d3d)",
                        color:"#fff",
                        fontWeight:"bold",
                        cursor:"pointer",
                        transition:"0.2s"
                      }}
                      onMouseOver={(e)=>{
                        e.currentTarget.style.transform = "scale(1.05)";
                      }}
                      onMouseOut={(e)=>{
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                    >
                      Write Review
                    </button>

                  )}

                </div>
              ))}

              <hr/>

              {/* Total */}

              <div style={{
                display:"flex",
                justifyContent:"space-between",
                fontWeight:"bold",
                fontSize:"16px"
              }}>
                <span>Total</span>
                <span>₹{order.total_amount}</span>
              </div>

            </div>

          ))}

        </div>

      )}

    </div>
</div>
  );
};

export default OrderHistory;