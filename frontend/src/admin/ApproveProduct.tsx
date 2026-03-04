/* import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminDashboard from "./AdminDashboard";

interface Product {
  id: number;
  name: string;
  price: number;
  stock_quantity: number;
  vendor_id: number;
  is_admin_verified: boolean;
}

const ApproveProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchPendingProducts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:2007/api/admin/pendingproducts",
          { withCredentials: true }
        );
        setProducts(res.data.products);
      } catch (err: any) {
        alert(err.message);
      }
    };
    fetchPendingProducts();
  }, []);

  const approveProduct = async (productId: number) => {
    try {
      await axios.post(
        `http://localhost:2007/api/admin/verifyprod/${productId}`,
        { approve: true },
        { withCredentials: true }
      );

      setProducts((prev) => prev.filter((p) => p.id !== productId));
    } catch {
      alert("Failed to approve product");
    }
  };

  const rejectProduct = async (productId: number) => {
    try {
      await axios.post(
        `http://localhost:2007/api/admin/verifyprod/${productId}`,
        { approve: false },
        { withCredentials: true }
      );

      setProducts((prev) => prev.filter((p) => p.id !== productId));
    } catch {
      alert("Failed to reject product");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <AdminDashboard/>
      <h1>Product Approval</h1>

      {products.length === 0 ? (
        <p>No products pending approval</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Vendor</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.stock_quantity}</td>
                <td>{product.vendor_id}</td>
                <td>
                  <button
                    onClick={() => approveProduct(product.id)}
                    style={{ marginRight: "10px" }}
                  >
                    Approve
                  </button>

                  <button onClick={() => rejectProduct(product.id)}>
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ApproveProduct; */

import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminDashboard from "./AdminDashboard";

interface Product {
  id: number;
  name: string;
  price: number;
  stock_quantity: number;
  vendor_id: number;
  is_admin_verified: boolean;
}

const ApproveProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchPendingProducts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:2007/api/admin/pendingproducts",
          { withCredentials: true }
        );
        setProducts(res.data.products);
      } catch (err: any) {
        alert(err.message);
      }
    };

    fetchPendingProducts();
  }, []);

  const approveProduct = async (productId: number) => {
    try {
      await axios.post(
        `http://localhost:2007/api/admin/verifyprod/${productId}`,
        { approve: true },
        { withCredentials: true }
      );

      setProducts((prev) => prev.filter((p) => p.id !== productId));
    } catch {
      alert("Failed to approve product");
    }
  };

  const rejectProduct = async (productId: number) => {
    try {
      await axios.post(
        `http://localhost:2007/api/admin/verifyprod/${productId}`,
        { approve: false },
        { withCredentials: true }
      );

      setProducts((prev) => prev.filter((p) => p.id !== productId));
    } catch {
      alert("Failed to reject product");
    }
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial, sans-serif" }}>
      <AdminDashboard />

      <h2 style={{ textAlign: "center", marginBottom: "25px" }}>
        Product Approval
      </h2>

      {products.length === 0 ? (
        <p style={{ textAlign: "center" }}>No products pending approval</p>
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <table
            style={{
              width: "85%",
              maxWidth: "900px",
              borderCollapse: "collapse",
              boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
              background: "#fff"
            }}
          >
            <thead>
              <tr style={{ background: "#acacae", color: "white" }}>
                <th style={headerStyle}>Name</th>
                <th style={headerStyle}>Price</th>
                <th style={headerStyle}>Stock</th>
                <th style={headerStyle}>Vendor</th>
                <th style={headerStyle}>Action</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  style={{ borderBottom: "1px solid #ddd", textAlign: "center" }}
                >
                  <td style={cellStyle}>{product.name}</td>
                  <td style={cellStyle}>₹{product.price}</td>
                  <td style={cellStyle}>{product.stock_quantity}</td>
                  <td style={cellStyle}>{product.vendor_id}</td>

                  <td style={cellStyle}>
                    <button
                      onClick={() => approveProduct(product.id)}
                      style={{
                        padding: "6px 12px",
                        marginRight: "10px",
                        background: "#2ecc71",
                        border: "none",
                        color: "white",
                        borderRadius: "4px",
                        cursor: "pointer"
                      }}
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => rejectProduct(product.id)}
                      style={{
                        padding: "6px 12px",
                        background: "#e74c3c",
                        border: "none",
                        color: "white",
                        borderRadius: "4px",
                        cursor: "pointer"
                      }}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const headerStyle = {
  padding: "12px",
  border: "1px solid #ddd"
};

const cellStyle = {
  padding: "10px",
  border: "1px solid #ddd"
};

export default ApproveProduct;