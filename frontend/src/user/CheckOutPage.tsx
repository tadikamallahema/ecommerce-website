import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserDashboard from "./UserDashboard";

interface CheckoutItem {
  product_id: number;
  name: string;
  quantity: number;
  price_at_time: number;
}

interface Address {
  id: number;
  full_name: string;
  phone: string;
  address_line: string;
  city: string;
  state: string;
  pincode: string;
}

const CheckOutPage = () => {
  const [items, setItems] = useState<CheckoutItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [addresses,setAddresses] = useState<Address[]>([]);
  const [selectedAddress,setSelectedAddress] = useState<number | null>(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchCheckout();
    fetchAddresses();
  }, []);
  const fetchAddresses = async () => {
  try {
    const res = await axios.get(
      "http://localhost:2007/api/address/my",
      { withCredentials: true }
    );

    setAddresses(res.data.address);

    if (res.data.address.length > 0) {
      setSelectedAddress(res.data.address[0].id);
    }

  } catch (err) {
    console.log(err);
  }
};

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
      {address_id: selectedAddress},
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
  <div>
    <UserDashboard/>
    <div
    style={{
      padding: "40px",
      background: "#f5f5f5",
     /*  minHeight: "calc(100vh - 80px)", */
    }}
  >
    <h2 style={{ marginBottom: "30px" }}>🧾 Checkout</h2>

    {items.length === 0 ? (
      <div
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
        }}
      >
        <p>Your cart is empty.</p>
      </div>
    ) : (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "30px",
          alignItems: "start",
        }}
      >
        {/* LEFT SIDE - ITEMS */}
        <div
          style={{
            background: "#fff",
            padding: "25px",
            borderRadius: "12px",
            boxShadow: "0 5px 20px rgba(0,0,0,0.05)",
          }}
        >
          <h3 style={{ marginBottom: "20px" }}>Order Items</h3>

          {items.map((item) => (
            <div
              key={item.product_id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "15px 0",
                borderBottom: "1px solid #eee",
              }}
            >
              <div>
                <p style={{ margin: 0, fontWeight: "500" }}>
                  {item.name}
                </p>
                <small style={{ color: "#777" }}>
                  Qty: {item.quantity}
                </small>
              </div>

              <p style={{ fontWeight: "bold", margin: 0 }}>
                ₹{item.price_at_time * item.quantity}
              </p>
            </div>
          ))}
        </div>

        {/* RIGHT SIDE - SUMMARY */}
        <div
          style={{
            background: "#fff",
            padding: "25px",
            borderRadius: "12px",
            boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
            height: "fit-content",
          }}
        >
          <h3>Payment Summary</h3>
          <hr />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "20px",
            }}
          >
            <span>Items Total</span>
            <span>₹{total}</span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            <span>Delivery</span>
            <span style={{ color: "green" }}>Free</span>
          </div>

          <hr style={{ margin: "20px 0" }} />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            <span>Total Payable</span>
            <span>₹{total}</span>
          </div>

          <button
            onClick={handlePay}
            disabled={total <= 0}
            style={{
              marginTop: "25px",
              width: "100%",
              padding: "14px",
              borderRadius: "8px",
              border: "none",
              background:
                total <= 0
                  ? "#ccc"
                  : "linear-gradient(135deg,#ff6a5e,#ff3d3d)",
              color: "#fff",
              fontWeight: "bold",
              cursor: total <= 0 ? "not-allowed" : "pointer",
              transition: "0.3s",
            }}
            onMouseOver={(e) => {
              if (total > 0)
                e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            Pay ₹{total}
          </button>
        </div>
      </div>
    )}
    {/* ADDRESS SECTION */}

<div
  style={{
    background:"#fff",
    padding:"25px",
    borderRadius:"12px",
    boxShadow:"0 5px 20px rgba(0,0,0,0.05)",
    marginBottom:"20px"
  }}
>
  <h3>Select Delivery Address</h3>

  {addresses.length === 0 && (
    <p>No address found</p>
  )}

  {addresses.map(addr => (

    <div
      key={addr.id}
      onClick={()=>setSelectedAddress(addr.id)}
      style={{
        border:selectedAddress===addr.id
          ? "2px solid red"
          : "1px solid #ddd",
        borderRadius:"8px",
        padding:"12px",
        marginTop:"10px",
        cursor:"pointer"
      }}
    >
      <p style={{margin:0,fontWeight:"bold"}}>
        {addr.full_name} ({addr.phone})
      </p>

      <p style={{margin:0}}>
        {addr.address_line}, {addr.city}, {addr.state} - {addr.pincode}
      </p>

    </div>

  ))}

  <button
    style={{
      marginTop:"10px",
      padding:"8px 14px",
      borderRadius:"6px",
      border:"none",
      background:"#333",
      color:"#fff",
      cursor:"pointer"
    }}
    onClick={()=>navigate("/user/addaddress")}
  >
    + Add Address
  </button>
</div>
  </div>
  </div>
);
};

export default CheckOutPage;