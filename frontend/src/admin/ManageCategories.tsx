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

  // 🔹 Fetch categories
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        "http://localhost:2007/api/admin/getallcategories",
        { withCredentials: true }
      );
      setCategories(res.data.categories);
    } catch (err: any) {
      console.error("Failed to fetch categories", err.message);
    }
  };

  // 🔹 Delete category
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
        `http://localhost:2007/api/admin/category/${id}`,
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
                      <button
                        onClick={() => updateCategory(cat.id)}
                        style={{ marginRight: "8px" }}
                      >
                        ✅
                      </button>
                      <button onClick={() => setEditingId(null)}>❌</button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setEditingId(cat.id);
                          setUpdatedName(cat.name);
                        }}
                        style={{ marginRight: "8px" }}
                      >
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

export default ManageCategories;