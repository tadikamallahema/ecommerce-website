import React, { useEffect, useState } from "react";
import axios from "axios";
import VendorDashboard from "./VendorDashboard";

interface Category {
  id: number;
  name: string;
}

interface ProductCreate {
  name: string;
  slug: string;
  sku?: string;
  price: number;
  discount_price?: number | null;
  stock_quantity: number;
  description: string;
  main_image: string;
  category_id: number;
  is_active: number;
}

const CreateProduct = () => {
  const [product, setProduct] = useState<ProductCreate>({
    name: "",
    slug: "",
    sku: "",
    price: 0,
    discount_price: null,
    stock_quantity: 0,
    description: "",
    main_image: "",
    category_id: 0,
    is_active: 1,
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const res = await axios.get(
      "http://localhost:2007/api/admin/getallcategories",
      { withCredentials: true }
    );
    setCategories(res.data.categories);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]:
        ["price", "discount_price", "stock_quantity", "category_id", "is_active"].includes(name)
          ? Number(value)
          : value,
    }));
  };

  const handleImageUpload = async () => {
    if (!file) {
      alert("Select image first");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);
      const res = await axios.post(
        "http://localhost:2007/api/img/upload",
        formData
      );

      setProduct((prev) => ({
        ...prev,
        main_image: res.data.image_url,
      }));

      alert("Image uploaded");
    } catch {
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!product.name || !product.slug || !product.price || !product.category_id) {
      alert("Fill required fields");
      return;
    }

    if (!product.main_image) {
      alert("Upload image first");
      return;
    }

    try {
      await axios.post(
        "http://localhost:2007/api/vendor/createproduct",
        product,
        { withCredentials: true }
      );

      alert("Product created");

      setProduct({
        name: "",
        slug: "",
        sku: "",
        price: 0,
        discount_price: null,
        stock_quantity: 0,
        description: "",
        main_image: "",
        category_id: 0,
        is_active: 1,
      });

      setFile(null);
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed");
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 700 }}>
      <VendorDashboard />
      <h3>Create Product</h3>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name *</label>
          <input
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="e.g. iPhone 15"
          />
        </div>

        <div>
          <label>Slug *</label>
          <input
            name="slug"
            value={product.slug}
            onChange={handleChange}
            placeholder="e.g. iphone-15"
          />
        </div>

        <div>
          <label>SKU</label>
          <input
            name="sku"
            value={product.sku}
            onChange={handleChange}
            placeholder="Stock Keeping Unit"
          />
        </div>

        <div>
          <label>Price (₹) *</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Discount Price</label>
          <input
            type="number"
            name="discount_price"
            value={product.discount_price ?? ""}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Stock Quantity *</label>
          <input
            type="number"
            name="stock_quantity"
            value={product.stock_quantity}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Description *</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            rows={4}
          />
        </div>

        <div>
          <label>Product Image *</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />

          <button
            type="button"
            onClick={handleImageUpload}
            disabled={uploading}
            style={{ marginTop: 8 }}
          >
            {uploading ? "Uploading..." : "Upload Image"}
          </button>

          {product.main_image && (
            <div style={{ marginTop: 10 }}>
              <img src={product.main_image} width={120} alt="Preview" />
            </div>
          )}
        </div>

        <div>
          <label>Category *</label>
          <select  name="category_id"  value={product.category_id}  onChange={handleChange}>
            <option value={0}>Select Category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>))}
          </select>
        </div>

        <div>
          <label>Status</label>
          <select  name="is_active"  value={product.is_active} onChange={handleChange}>
            <option value={1}>Active</option>
            <option value={0}>Inactive</option>
          </select>
        </div>

        <button type="submit" style={{ marginTop: 20 }}>
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;