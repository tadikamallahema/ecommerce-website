import axios from "axios";
import React, { useEffect, useState } from "react";
import VendorDashboard from "./VendorDashboard";
interface Product {
  id: number;
  name: string;
  slug: string;
  sku: string;
  price: number;
  discount_price: number | null;
  stock_quantity: number;
  description: string;
  main_image: string;
  category_id: number;
  is_active: number;
}

const ManageProducts = () => {

  const [products, setProducts] = useState<Product[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [updatedProduct, setUpdatedProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {

      const res = await axios.get(
        "http://localhost:2007/api/vendor/prodbyvendor",
        { withCredentials: true }
      );

      setProducts(res.data.products);

    } catch (err: any) {
      console.log(err.message);
    }
  };


  const deleteProduct = async (id: number) => {
    //console.log(id);
    if (!window.confirm("Delete this product?")) return;

    try {

      await axios.delete(
        ///deleteproduct/:productId
        `http://localhost:2007/api/vendor/deleteproduct/${id}`,
        { withCredentials: true }
      );

      setProducts(prev => prev.filter(p => p.id !== id));

    } catch {
      alert("Delete failed");
    }

  };

  // ---------------- UPDATE PRODUCT ----------------

  const updateProduct = async (id: number) => {

    if (!updatedProduct) return;

    try {

      await axios.put(
        `http://localhost:2007/api/vendor/updateprod/${id}`,
        updatedProduct,
        { withCredentials: true }
      );

      setProducts(prev =>
        prev.map(p => (p.id === id ? updatedProduct : p))
      );

      setEditingId(null);
      setUpdatedProduct(null);

    } catch {
      alert("Update failed");
    }

  };

  // ---------------- ENABLE / DISABLE ----------------

/*   const toggleStatus = async (product: Product) => {

    const newStatus = product.is_active === 1 ? 0 : 1;

    try {

      await axios.put(
        `http://localhost:2007/api/vendor/updateprodstatus/${product.id}`,
        { ...product, is_active: newStatus },
        { withCredentials: true }
      );

      setProducts(prev =>
        prev.map(p =>
          p.id === product.id ? { ...p, is_active: newStatus } : p
        )
      );

    } catch {
      alert("Failed to update status");
    }

  }; */

  // ---------------- HANDLE INPUT CHANGE ----------------

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const { name, value } = e.target;

    setUpdatedProduct(prev => ({
      ...prev!,
      [name]: value
    }));

  };

  return (

    <div style={{ padding: "30px" }}>
        <VendorDashboard/>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Manage Products
      </h2>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>

        <thead>
          <tr style={{ background: "#4f6bed", color: "white" }}>
            <th style={headerStyle}>Image</th>
            <th style={headerStyle}>Name</th>
            <th style={headerStyle}>Price</th>
            <th style={headerStyle}>Discount</th>
            <th style={headerStyle}>Stock</th>
           {/*  <th style={headerStyle}>Active</th> */}
            <th style={headerStyle}>Actions</th>
          </tr>
        </thead>

        <tbody>

          {products.map((p) => (

            <tr key={p.id}>

              {/* IMAGE */}
              <td style={cellStyle}>
                <img src={p.main_image} width="60" />
              </td>

              {/* NAME */}
              <td style={cellStyle}>
                {editingId === p.id ? (
                  <input name="name" value={updatedProduct?.name || ""} onChange={handleChange}/>
                ) : (
                  p.name
                )}
              </td>

              {/* PRICE */}
              <td style={cellStyle}>
                {editingId === p.id ? (
                  <input name="price" value={updatedProduct?.price || 0} onChange={handleChange}/>
                ) : (
                  p.price
                )}
              </td>

              {/* DISCOUNT */}
              <td style={cellStyle}>
                {editingId === p.id ? (
                  <input name="discount_price" value={updatedProduct?.discount_price || 0} onChange={handleChange}/>
                ) : (
                  p.discount_price
                )}
              </td>

              {/* STOCK */}
              <td style={cellStyle}>
                {editingId === p.id ? (
                  <input name="stock_quantity" value={updatedProduct?.stock_quantity || 0} onChange={handleChange}/>
                ) : (
                  p.stock_quantity
                )}
              </td>

              {/* STATUS */}
              {/* <td style={cellStyle}>
                <button
                  style={{
                    background: p.is_active ? "#2ecc71" : "#e74c3c",
                    color: "white",
                    border: "none",
                    padding: "6px 10px",
                    cursor: "pointer"
                  }}
                  onClick={() => toggleStatus(p)}
                >
                  {p.is_active ? "Enabled" : "Disabled"}
                </button>
              </td> */}

              {/* ACTIONS */}
              <td style={cellStyle}>

                {editingId === p.id ? (
                  <>
                    <button style={saveButton} onClick={() => updateProduct(p.id)}>
                      Save
                    </button>

                    <button style={cancelButton} onClick={() => setEditingId(null)}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      style={editButton}
                      onClick={() => {
                        setEditingId(p.id);
                        setUpdatedProduct(p);
                      }}
                    >
                      Edit
                    </button>

                    <button
                      style={deleteButton}
                      onClick={() => deleteProduct(p.id)}
                    >
                      Delete
                    </button>
                  </>
                )}

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};

const headerStyle = {
  padding: "10px",
  border: "1px solid #ddd"
};

const cellStyle = {
  padding: "8px",
  border: "1px solid #ddd",
  textAlign: "center" as const
};

const editButton = {
  padding: "6px 12px",
  marginRight: "8px",
  background: "#3498db",
  color: "white",
  border: "none",
  cursor: "pointer"
};

const deleteButton = {
  padding: "6px 12px",
  background: "#e74c3c",
  color: "white",
  border: "none",
  cursor: "pointer"
};

const saveButton = {
  padding: "6px 12px",
  marginRight: "8px",
  background: "#2ecc71",
  color: "white",
  border: "none",
  cursor: "pointer"
};

const cancelButton = {
  padding: "6px 12px",
  background: "#7f8c8d",
  color: "white",
  border: "none",
  cursor: "pointer"
};

export default ManageProducts;