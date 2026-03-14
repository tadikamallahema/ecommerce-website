import axios from "axios";
import React, { useEffect, useState } from "react";
import VendorDashboard from "./VendorDashboard";

const VendorAnalytics = () => {

  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [topProducts, setTopProducts] = useState<any[]>([]);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {

      const prod = await axios.get(
        "http://localhost:2007/api/vendor/gettprods",
        { withCredentials: true }
      );

      const orders = await axios.get(
        "http://localhost:2007/api/vendor/getorderv",
        { withCredentials: true }
      );

      const sales = await axios.get(
        "http://localhost:2007/api/vendor/gettsales",
        { withCredentials: true }
      );

      const pending = await axios.get(
        "http://localhost:2007/api/vendor/pendingprod",
        { withCredentials: true }
      );

      const top = await axios.get(
        "http://localhost:2007/api/vendor/toppro",
        { withCredentials: true }
      );

      setTotalProducts(prod.data.products?.total_products || 0);
        setTotalOrders(orders.data.orders?.length || 0);
        setTotalSales(sales.data.sales?.total_Sales || 0);
        setPendingOrders(pending.data.pending?.pending_orders || 0);
        setTopProducts(top.data.products || []);

    } catch (err) {
      console.error("Analytics fetch error", err);
    }
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <VendorDashboard />

      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
        Vendor Analytics
      </h2>

      <div style={gridStyle}>

        <div style={cardStyle}>
          <h3>Total Products</h3>
          <p style={numberStyle}>{totalProducts}</p>
        </div>

        <div style={cardStyle}>
          <h3>Total Orders</h3>
          <p style={numberStyle}>{totalOrders}</p>
        </div>

        <div style={cardStyle}>
          <h3>Total Sales</h3>
          <p style={numberStyle}>₹{totalSales}</p>
        </div>

        <div style={cardStyle}>
          <h3>Pending Orders</h3>
          <p style={numberStyle}>{pendingOrders}</p>
        </div>

      </div>

      <h3 style={{ marginTop: "40px", textAlign: "center" }}>
        Top Selling Products
      </h3>

      <div style={{ overflowX: "auto", display: "flex", justifyContent: "center" }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={th}>Product</th>
              <th style={th}>Sold Quantity</th>
            </tr>
          </thead>

          <tbody>
            {topProducts.map((p) => (
              <tr key={p.id}>
                <td style={td}>{p.name}</td>
                <td style={td}>{p.total_sold}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "20px"
};

const cardStyle = {
  background: "#4f6bed",
  color: "white",
  padding: "20px",
  borderRadius: "10px",
  textAlign: "center" as const,
  boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
  minHeight: "120px"
};

const numberStyle = {
  fontSize: "28px",
  fontWeight: "bold"
};

const tableStyle = {
  width: "100%",
  maxWidth: "600px",
  borderCollapse: "collapse" as const,
  marginTop: "20px"
};

const th = {
  border: "1px solid #ddd",
  padding: "10px",
  background: "#4f6bed",
  color: "white"
};

const td = {
  border: "1px solid #ddd",
  padding: "10px",
  textAlign: "center" as const
};

export default VendorAnalytics;