import React, { useState } from "react";
import axios from "axios";

interface CategoryCreate {
  name: string;
  description?: string;
  slug?: string;
  image_url?: string;
  parent_id?: number | null;
  is_active: number;     // 1 or 0
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!category.name) {
      alert("Category name is required");
      return;
    }

    try {
      await axios.post(
        "http://localhost:2007/api/admin/createcategory",
        category,
        { withCredentials: true }
      );

      alert("Category created successfully");

      setCategory({
        name: "",
        description: "",
        slug: "",
        image_url: "",
        parent_id: null,
        is_active: 1,
        sort_order: 0,
      });
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to create category");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px" }}>
      <h2>Create Category</h2>

      <form onSubmit={handleSubmit}>
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

        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={category.description}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Slug</label>
          <input
            type="text"
            name="slug"
            value={category.slug}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Image URL</label>
          <input
            type="text"
            name="image_url"
            value={category.image_url}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Parent Category ID</label>
          <input
            type="number"
            name="parent_id"
            value={category.parent_id ?? ""}
            onChange={handleChange}
          />
        </div>

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