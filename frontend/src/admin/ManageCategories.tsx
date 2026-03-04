/* import axios from "axios";
import React, { useEffect, useState } from "react";
import AdminDashboard from "./AdminDashboard";

interface Category {
  id: number;
  name: string;
}

const ManageCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [updatedName, setUpdatedName] = useState("");

  // 🔹 Fetch categories
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        "http://localhost:2007/api/user/getallcategories",
        { withCredentials: true }
      );
      setCategories(res.data.categories);
    } catch (err: any) {
      console.error("Failed to fetch categories", err.message);
    }
  };

  const deleteCategory = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    try {
      await axios.delete(
        `http://localhost:2007/api/admin/deletecategory/${id}`,
        { withCredentials: true }
      );

      setCategories((prev) => prev.filter((cat) => cat.id !== id));
    } catch (err: any) {
      alert("Failed to delete category");
    }
  };

  // 🔹 Update category
  const updateCategory = async (id: number) => {
    if (!updatedName.trim()) {
      alert("Category name cannot be empty");
      return;
    }

    try {
      await axios.put(
        `http://localhost:2007/api/admin/updatename/${id}`,
        { name: updatedName },
        { withCredentials: true }
      );

      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === id ? { ...cat, name: updatedName } : cat
        )
      );

      setEditingId(null);
      setUpdatedName("");
    } catch (err: any) {
      alert("Failed to update category");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <AdminDashboard/>
      <h3>Update or Delete Category</h3>

      {categories.length === 0 ? (
        <p>No categories available</p>
      ) : (
        <table
          style={{
            width: "100%",
            marginTop: "20px",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th style={{ textAlign: "left" }}>Category Name</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id}>
                <td>
                  {editingId === cat.id ? (
                    <input
                      type="text"
                      value={updatedName}
                      onChange={(e) => setUpdatedName(e.target.value)}
                    />
                  ) : (
                    cat.name
                  )}
                </td>

                <td>
                  {editingId === cat.id ? (
                    <>
                      <button  onClick={() => updateCategory(cat.id)}  style={{ marginRight: "8px" }}>
                        ✅
                      </button>
                      <button onClick={() => setEditingId(null)}>❌</button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {setEditingId(cat.id);setUpdatedName(cat.name);}}
                        style={{ marginRight: "8px" }}>
                        ✏️
                      </button>

                      <button onClick={() => deleteCategory(cat.id)}>🗑️</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageCategories; */

import axios from "axios";
import React, { useEffect, useState } from "react";
import AdminDashboard from "./AdminDashboard";

interface Category {
  id: number;
  name: string;
}

const ManageCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [updatedName, setUpdatedName] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        "http://localhost:2007/api/user/getallcategories",
        { withCredentials: true }
      );
      setCategories(res.data.categories);
    } catch (err: any) {
      console.error("Failed to fetch categories", err.message);
    }
  };

  const deleteCategory = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    try {
      await axios.delete(
        `http://localhost:2007/api/admin/deletecategory/${id}`,
        { withCredentials: true }
      );

      setCategories((prev) => prev.filter((cat) => cat.id !== id));
    } catch {
      alert("Failed to delete category");
    }
  };

  const updateCategory = async (id: number) => {
    if (!updatedName.trim()) {
      alert("Category name cannot be empty");
      return;
    }

    try {
      await axios.put(
        `http://localhost:2007/api/admin/updatename/${id}`,
        { name: updatedName },
        { withCredentials: true }
      );

      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === id ? { ...cat, name: updatedName } : cat
        )
      );

      setEditingId(null);
      setUpdatedName("");
    } catch {
      alert("Failed to update category");
    }
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial, sans-serif" }}>
      <AdminDashboard />

      <h2 style={{ textAlign: "center", marginBottom: "25px" }}>
        Manage Categories
      </h2>

      {categories.length === 0 ? (
        <p style={{ textAlign: "center" }}>No categories available</p>
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <table
            style={{
              width: "70%",
              borderCollapse: "collapse",
              boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
              background: "#fff"
            }}
          >
            <thead>
              <tr style={{ background: "#4f6bed", color: "white" }}>
                <th style={headerStyle}>Category Name</th>
                <th style={headerStyle}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {categories.map((cat) => (
                <tr key={cat.id} style={{ borderBottom: "1px solid #ddd" }}>
                  <td style={cellStyle}>
                    {editingId === cat.id ? (
                      <input
                        type="text"
                        value={updatedName}
                        onChange={(e) => setUpdatedName(e.target.value)}
                        style={{
                          padding: "6px",
                          width: "90%",
                          border: "1px solid #ccc",
                          borderRadius: "4px"
                        }}
                      />
                    ) : (
                      cat.name
                    )}
                  </td>

                  <td style={cellStyle}>
                    {editingId === cat.id ? (
                      <>
                        <button
                          onClick={() => updateCategory(cat.id)}
                          style={saveButton}
                        >
                          Save
                        </button>

                        <button
                          onClick={() => setEditingId(null)}
                          style={cancelButton}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            setEditingId(cat.id);
                            setUpdatedName(cat.name);
                          }}
                          style={editButton}
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => deleteCategory(cat.id)}
                          style={deleteButton}
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
  border: "1px solid #ddd",
  textAlign: "center" as const
};

const editButton = {
  padding: "6px 12px",
  marginRight: "8px",
  background: "#3498db",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer"
};

const deleteButton = {
  padding: "6px 12px",
  background: "#e74c3c",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer"
};

const saveButton = {
  padding: "6px 12px",
  marginRight: "8px",
  background: "#2ecc71",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer"
};

const cancelButton = {
  padding: "6px 12px",
  background: "#7f8c8d",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer"
};

export default ManageCategories;