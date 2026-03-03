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

export default ApproveProduct;