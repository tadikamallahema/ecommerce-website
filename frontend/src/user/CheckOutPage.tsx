import axios from "axios";
import React, { useEffect, useState } from "react";

interface CheckoutItem {
  product_id: number;
  name: string;
  quantity: number;
  price_at_time: number;
}

const CheckOutPage = () => {
  const [items, setItems] = useState<CheckoutItem[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchCheckout();
  }, []);

  const fetchCheckout = async () => {
    const res = await axios.get(
      "http://localhost:2007/api/cart/checkout",
      { withCredentials: true }
    );

    setItems(res.data.items);
    setTotal(res.data.total);
  };

  const handlePay = () => {
    alert(`Proceeding to pay ₹${total}`);
    // next step → payment gateway
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Checkout</h2>

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

      <button onClick={handlePay}>
        Pay ₹{total}
      </button>
    </div>
  );
};

export default CheckOutPage;