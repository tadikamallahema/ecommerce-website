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
/* 
  const handlePay = async () => {
    try {
    const res = await axios.post(
      "http://localhost:2007/api/orders/placeorder",
      {},
      { withCredentials: true }
    );

    const orderId = res.data.orderId;

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
  }; */
  const handlePay = async () => {
  try {
    // 1️⃣ Place Order (status should remain pending)
    const orderRes = await axios.post(
      "http://localhost:2007/api/orders/placeorder",
      {},
      { withCredentials: true }
    );

    const orderId = orderRes.data.orderId;

    // 2️⃣ Create Razorpay Order
    const paymentRes = await axios.post(
      "http://localhost:2007/api/pay/createPayment",
      { orderId },
      { withCredentials: true }
    );

    const razorpayOrder = paymentRes.data.razorpayOrder;

    // 3️⃣ Open Razorpay Checkout
    const options = {
      key: "rzp_test_SMpYPnNodatL0t",
      amount: razorpayOrder.amount,
      currency: "INR",
      order_id: razorpayOrder.id,

      handler: async function (response: any) {
        // 4️⃣ Verify Payment
        await axios.post(
          "http://localhost:2007/api/payments/verify",
          {
            order_id: orderId,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            razorpay_order_id: razorpayOrder.id,
          },
          { withCredentials: true }
        );

        alert("Payment Successful!");
        navigate("/user/history");
      },

      modal: {
        ondismiss: async function () {
          await axios.post(
            "http://localhost:2007/api/payments/failure",
            {
              order_id: orderId,
              reason: "User closed payment popup",
            },
            { withCredentials: true }
          );
        },
      },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();

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