import axios from "axios";
import React, { useEffect, useState } from "react";

interface CartItem {
  product_id: number;
  name: string;
  main_image?: string;
  price_at_time: number;
  quantity: number;
}

const Cart = () => {
  const [items, setItems] = useState<CartItem[]>([]);

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
    </div>
  );
};

export default Cart;