/* import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserDashboard from "./UserDashboard";

interface CartItem {
  product_id: number;
  name: string;
  main_image?: string;
  price_at_time: number;
  quantity: number;
}

const Cart = () => {
  const [items, setItems] = useState<CartItem[]>([]);

  const navigate=useNavigate();
  const fetchCart = async () => {
    const res = await axios.get(
      "http://localhost:2007/api/cart/getcart",
      { withCredentials: true }
    );
    setItems(res.data.items);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQty = async (productId: number, action: "increase" | "decrease") => {
    await axios.put(
      "http://localhost:2007/api/cart/update",
      { productId, action },
      { withCredentials: true }
    );
    fetchCart();
  };

  const removeItem = async (productId: number) => {
    await axios.delete(
      `http://localhost:2007/api/cart/item/${productId}`,
      { withCredentials: true }
    );
    fetchCart();
  };

  const total = items.reduce(
    (sum, item) => sum + item.price_at_time * item.quantity,
    0
  );

  return (
    <div style={{ padding: 20 }}>
      <UserDashboard/>
      <h2>Your Cart</h2>

      {items.length === 0 && <p>Cart is empty</p>}

      {items.map(item => (
        <div key={item.product_id} style={{ display: "flex", gap: 16 }}>
          <img src={item.main_image} width={80} />
          <div>
            <h4>{item.name}</h4>
            <p>₹{item.price_at_time}</p>

            <button onClick={() => updateQty(item.product_id, "decrease")}>−</button>
            <span style={{ margin: "0 10px" }}>{item.quantity}</span>
            <button onClick={() => updateQty(item.product_id, "increase")}>+</button>
          </div>

          <button onClick={() => removeItem(item.product_id)}>Remove</button>
        </div>
      ))}

      <hr />
      <h3>Total: ₹{total.toFixed(2)}</h3>
      <button onClick={()=>navigate('/user/checkout')}>Proceed To Pay</button>
    </div>
  );
};

export default Cart; */



import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserDashboard from "./UserDashboard";

interface CartItem {
  product_id: number;
  name: string;
  main_image?: string;
  price_at_time: number;
  quantity: number;
}

const Cart = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const navigate = useNavigate();

  const fetchCart = async () => {
    const res = await axios.get(
      "http://localhost:2007/api/cart/getcart",
      { withCredentials: true }
    );
    setItems(res.data.items);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQty = async (
    productId: number,
    action: "increase" | "decrease"
  ) => {
    await axios.put(
      "http://localhost:2007/api/cart/update",
      { productId, action },
      { withCredentials: true }
    );
    fetchCart();
  };

  const removeItem = async (productId: number) => {
    await axios.delete(
      `http://localhost:2007/api/cart/item/${productId}`,
      { withCredentials: true }
    );
    fetchCart();
  };

  const total = items.reduce(
    (sum, item) => sum + item.price_at_time * item.quantity,
    0
  );

  return (
    <div style={{ padding: "40px", background: "#f5f5f5",/*  minHeight: "100vh" */ }}>
      <UserDashboard />

      <h2 style={{ marginBottom: "30px" }}>🛒 Your Shopping Cart</h2>

      {items.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "30px",
            
          }}
        >
          {/* Left - Cart Items */}
          <div>
            {items.map((item) => (
              <div
                key={item.product_id}
                style={{
                  display: "flex",
                  gap: "20px",
                  background: "#fff",
                  padding: "20px",
                  borderRadius: "12px",
                  marginBottom: "20px",
                  boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
                  alignItems: "center",
                }}
              >
                <img
                  src={
                    item.main_image ||
                    "https://via.placeholder.com/100"
                  }
                  alt={item.name}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />

                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: "0 0 10px 0" }}>
                    {item.name}
                  </h4>
                  <p style={{ fontWeight: "bold" }}>
                    ₹{item.price_at_time}
                  </p>

                  {/* Quantity Controls */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "10px",
                    }}
                  >
                    <button
                      onClick={() =>
                        updateQty(item.product_id, "decrease")
                      }
                      style={{
                        color:"black",
                        padding: "5px 10px",
                        borderRadius: "6px",
                        border: "1px solid #ccc",
                        background: "#fff",
                        cursor: "pointer",
                      }}
                    >
                      −
                    </button>

                    <span
                      style={{
                        margin: "0 15px",
                        fontWeight: "bold",
                      }}
                    >
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        updateQty(item.product_id, "increase")
                      }
                      style={{
                        color:"black",
                        padding: "5px 10px",
                        borderRadius: "6px",
                        border: "1px solid #ccc",
                        background: "#fff",
                        cursor: "pointer",
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() =>
                    removeItem(item.product_id)
                  }
                  style={{
                    background: "none",
                    border: "none",
                    color: "red",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Right - Summary Box */}
            <div
              style={{
                marginTop: "30px",
                padding: "20px",
                background: "#fff",
                borderRadius: "10px",
                boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h3 style={{ margin: 0 }}>
                Total: ₹{total.toFixed(2)}
              </h3>

              <button
                onClick={() => navigate("/user/checkout")}
                disabled={items.length === 0}
                style={{
                  padding: "12px 25px",
                  borderRadius: "8px",
                  border: "none",
                  background:
                    items.length === 0
                      ? "#ccc"
                      : "linear-gradient(135deg,#ff6a5e,#ff3d3d)",
                  color: "#fff",
                  fontWeight: "bold",
                  cursor: items.length === 0 ? "not-allowed" : "pointer",
                }}
              >
                Proceed to Checkout
              </button>
            </div>
        </div>
      )}
    </div>
  );
};

export default Cart;