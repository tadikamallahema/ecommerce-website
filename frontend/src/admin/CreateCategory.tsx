import React, { useState } from "react";
import axios from "axios";
import AdminDashboard from "./AdminDashboard";

interface CategoryCreate {
  name: string;
  description?: string;
  slug?: string;
  image_url?: string;
  parent_id?: number | null;
  is_active: number;
  sort_order: number;
}

const CreateCategory = () => {

  const [category, setCategory] = useState<CategoryCreate>({
    name: "",
    description: "",
    slug: "",
    image_url: "",
    parent_id: null,
    is_active: 1,
    sort_order: 0,
  });

  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  // ---------- INPUT CHANGE ----------
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setCategory((prev) => ({
      ...prev,
      [name]:
        name === "parent_id"
          ? value === "" ? null : Number(value)
          : name === "is_active" || name === "sort_order"
          ? Number(value)
          : value,
    }));
  };

  // ---------- IMAGE UPLOAD ----------
  const handleImageUpload = async () => {
    if (!file) {
      alert("Select an image first");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);

      const res = await axios.post(
        "http://localhost:2007/api/img/upload", // your endpoint
        formData
      );

      const imageUrl = res.data.image_url || res.data.imageUrl;

      // Save URL to state
      setCategory((prev) => ({
        ...prev,
        image_url: imageUrl,
      }));

      alert("Image uploaded successfully");

    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  // ---------- SUBMIT CATEGORY ----------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!category.name) {
      alert("Category name is required");
      return;
    }

    // Optional but recommended
    if (!category.image_url) {
      alert("Upload category image first");
      return;
    }

    try {
      await axios.post(
        "http://localhost:2007/api/admin/createcategory",
        category,
        { withCredentials: true }
      );

      alert("Category created successfully");

      // Reset form
      setCategory({
        name: "",
        description: "",
        slug: "",
        image_url: "",
        parent_id: null,
        is_active: 1,
        sort_order: 0,
      });

      setFile(null);

    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to create category");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px" }}>
      <AdminDashboard/>
      <h2>Create Category</h2>

      <form onSubmit={handleSubmit}>

        {/* NAME */}
        <div>
          <label>Name *</label>
          <input
            type="text"
            name="name"
            value={category.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={category.description}
            onChange={handleChange}
          />
        </div>

        {/* SLUG */}
        <div>
          <label>Slug</label>
          <input
            type="text"
            name="slug"
            value={category.slug}
            onChange={handleChange}
          />
        </div>

        {/* 🔥 IMAGE UPLOAD SECTION */}
        <div>
          <label>Category Image</label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setFile(e.target.files?.[0] || null)
            }
          />

          <button
            type="button"
            onClick={handleImageUpload}
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Upload Image"}
          </button>

          {/* ✅ SHOW URL + PREVIEW */}
          {category.image_url && (
            <div style={{ marginTop: "10px" }}>

              <p><strong>Image URL:</strong></p>

              <input
                type="text"
                value={category.image_url}
                readOnly
                style={{ width: "100%" }}
              />

              <button
                type="button"
                onClick={() =>
                  navigator.clipboard.writeText(category.image_url!)
                }
                style={{ marginTop: "5px" }}
              >
                Copy URL
              </button>

              <div style={{ marginTop: "10px" }}>
                <img
                  src={category.image_url}
                  width="150"
                  alt="Preview"
                />
              </div>

            </div>
          )}
        </div>

        {/* PARENT ID */}
        <div>
          <label>Parent Category ID</label>
          <input
            type="number"
            name="parent_id"
            value={category.parent_id ?? ""}
            onChange={handleChange}
          />
        </div>

        {/* STATUS */}
        <div>
          <label>Status</label>
          <select
            name="is_active"
            value={category.is_active}
            onChange={handleChange}
          >
            <option value={1}>Active</option>
            <option value={0}>Inactive</option>
          </select>
        </div>

        {/* SORT ORDER */}
        <div>
          <label>Sort Order</label>
          <input
            type="number"
            name="sort_order"
            value={category.sort_order}
            onChange={handleChange}
          />
        </div>

        <button type="submit" style={{ marginTop: "10px" }}>
          Create Category
        </button>

      </form>
    </div>
  );
};

export default CreateCategory;