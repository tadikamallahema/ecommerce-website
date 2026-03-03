import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface CheckoutItem {
  product_id: number;
  name: string;
  quantity: number;
  price_at_time: number;
}

const CheckOutPage = () => {
  const [items, setItems] = useState<CheckoutItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchCheckout();
  }, []);

  const fetchCheckout = async () => {
    try {
      const res = await axios.get(
        "http://localhost:2007/api/cart/checkout",
        { withCredentials: true }
      );

      const checkoutItems = res.data.items || [];

      // ✅ frontend total calculation (safe)
      const calculatedTotal = checkoutItems.reduce(
        (sum: number, item: CheckoutItem) =>
          sum + item.price_at_time * item.quantity,
        0
      );

      setItems(checkoutItems);
      setTotal(calculatedTotal);
    } catch (err: any) {
      setError("Failed to load checkout data");
    } finally {
      setLoading(false);
    }
  };

  const handlePay = async () => {
    try {
    // 1️⃣ Place order
    const res = await axios.post(
      "http://localhost:2007/api/orders/placeorder",
      {},
      { withCredentials: true }
    );

    const orderId = res.data.orderId;

    // 2️⃣ Update status (frontend-triggered)
    await axios.put(
      `http://localhost:2007/api/orders/${orderId}/status`,
      { status: "paid" },
      { withCredentials: true }
    );

    alert("Order placed successfully!");
    navigate("user/history");

  } catch (err: any) {
    alert(err.response?.data?.message || "Payment failed");
  }
  };

  if (loading) return <p>Loading checkout...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Checkout</h2>

      {items.length === 0 && (
        <p>Your cart is empty. Go back to cart.</p>
      )}

      {items.map(item => (
        <div key={item.product_id}>
          <p>
            {item.name} × {item.quantity} = ₹
            {item.price_at_time * item.quantity}
          </p>
        </div>
      ))}

      <hr />

      <h3>Total Payable: ₹{total}</h3>

      <button
        onClick={handlePay}
        disabled={total <= 0}
      >
        Pay ₹{total}
      </button>
    </div>
  );
};

export default CheckOutPage;