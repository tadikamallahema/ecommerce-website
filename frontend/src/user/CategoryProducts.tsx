import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserDashboard from "./UserDashboard";

interface Product {
  id: number;
  name: string;
  price: number;                 // original price
  discount_price?: number | null; // discounted price
  image_url?: string;
}

const CategoryProducts = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);

  // ---------- FETCH PRODUCTS ----------
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await axios.get(
          `http://localhost:2007/api/user/productsByCategory/${id}`,
          { withCredentials: true }
        );

        setProducts(result.data.products);
      } catch (err: any) {
        alert(err.message);
      }
    };

    fetchProducts();
  }, [id]);

  // ---------- FINAL PRICE LOGIC ----------
  const getFinalPrice = (product: Product) => {
    if (
      product.discount_price &&
      product.discount_price > 0 &&
      product.discount_price < product.price
    ) {
      return product.discount_price;
    }
    return product.price;
  };

  // ---------- ADD TO CART ----------
  const addToCart = async (product: Product) => {
    try {
      await axios.post(
        "http://localhost:2007/api/cart/add",
        {
          productId: product.id,
          quantity: 1,
          price: getFinalPrice(product), // ✅ discount-aware price
        },
        { withCredentials: true }
      );

      alert("Added to cart");
      navigate("/user/cart");
    } catch (err: any) {
      alert("Please login first");
      navigate("/login");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <UserDashboard/>
      <h2>Products</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "20px",
        }}
      >
        {products.map((p) => (
          <div
            key={p.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "12px",
              padding: "12px",
            }}
          >
            <img
              src={p.image_url}
              alt={p.name}
              style={{
                width: "100%",
                height: "160px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />

            <h4>{p.name}</h4>

            {/* ---------- PRICE DISPLAY ---------- */}
            {p.discount_price && p.discount_price < p.price ? (
              <div>
                <p
                  style={{
                    textDecoration: "line-through",
                    color: "#888",
                    margin: 0,
                  }}
                >
                  ₹{p.price}
                </p>
                <p
                  style={{
                    fontWeight: "bold",
                    color: "green",
                    margin: 0,
                  }}
                >
                  ₹{p.discount_price}
                </p>
              </div>
            ) : (
              <p style={{ fontWeight: "bold" }}>₹{p.price}</p>
            )}

            <button
              style={{
                marginTop: "10px",
                width: "100%",
                padding: "8px",
                borderRadius: "6px",
                cursor: "pointer",
              }}
              onClick={() => addToCart(p)}
            >
              Add to cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryProducts;