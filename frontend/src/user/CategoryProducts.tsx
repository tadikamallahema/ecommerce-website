/* import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserDashboard from "./UserDashboard";

interface Product {
  id: number;
  name: string;
  price: number;                 
  discount_price?: number | null; 
  main_image?: string;
}

const CategoryProducts = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);

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

  const addToCart = async (product: Product) => {
    try {
      await axios.post(
        "http://localhost:2007/api/cart/add",
        {
          productId: product.id,
          quantity: 1,
          price: getFinalPrice(product), 
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
        style={{  display: "grid",gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",  gap: "20px",}}>
        {products.map((p) => (
          <div
            key={p.id}
            style={{border: "1px solid #ddd",borderRadius: "12px",  padding: "12px",}}>
            <img
              src={p.main_image}
              alt={p.name}
              style={{
                width: "100%",
                height: "160px",
                objectFit: "cover",
                borderRadius: "8px",}}/>

            <h4>{p.name}</h4>

            {p.discount_price && p.discount_price < p.price ? (
              <div>
                <p
                  style={{
                    textDecoration: "line-through",
                    color: "#888",
                    margin: 0,}}>
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

export default CategoryProducts; */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import UserDashboard from "./UserDashboard";

interface Product {
  id: number;
  name: string;
  price: number;
  discount_price?: number | null;
  main_image?: string;
  stock_quantity:number;
}

const CategoryProducts = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // reset page when category changes
  useEffect(() => {
    setPage(1);
  }, [id]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const result = await axios.get(
          `http://localhost:2007/api/user/productsByCategory/${id}?page=${page}&limit=2`,
          { withCredentials: true }
        );

        setProducts(result.data.products);
        setTotalPages(result.data.totalPages);

      } catch (err: any) {
        alert(err.response?.data?.message || "Error fetching products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id, page]);

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

  const addToCart = async (product: Product) => {
    if(product.stock_quantity === 0){
      alert("Product is out of stock");
      return;
    }
    try {
      await axios.post(
        "http://localhost:2007/api/cart/add",
        {
          productId: product.id,
          quantity: 1,
          price: getFinalPrice(product),
        },
        { withCredentials: true }
      );

      alert("Added to cart");
      navigate("/user/cart");

    } catch (err: any) {
      const message = err.response?.data?.message;

    if(message){
      alert(message);
      return;
    }
      alert("Please login first");
      navigate("/login");
    }
  };

  return (
    <div style={{ padding: "40px", background: "#f8f8f8", minHeight: "100vh" }}>
      <UserDashboard />

      <h2 style={{ textAlign: "center", marginTop: "20px" }}>
        Category Products
      </h2>

      {loading ? (
        <p style={{ textAlign: "center", marginTop: "30px" }}>
          Loading products...
        </p>
      ) : products.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: "30px" }}>
          No products found
        </p>
      ) : (
        <>
          {/* Products Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "30px",
              marginTop: "40px",
            }}
          >
            {products.map((p) => (
              <div
                key={p.id}
                style={{
                  borderRadius: "16px",
                  overflow: "hidden",
                  background: "#fff",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                  transition: "0.3s",
                  cursor: "pointer",
                }}
              >
                {/* Image Section */}
                <div
                  style={{
                    position: "relative",
                    overflow: "hidden",
                    height: "220px",
                  }}
                >
                  <Link to={`/product/${p.id}`}>
                    <img
                      src={
                        p.main_image ||
                        "https://via.placeholder.com/400x300?text=No+Image"
                      }
                      alt={p.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "0.4s ease",
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.transform = "scale(1.1)")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.transform = "scale(1)")
                      }
                    />
                  </Link>

                  {p.discount_price && p.discount_price < p.price && (
                    <div
                      style={{
                        position: "absolute",
                        top: "12px",
                        left: "12px",
                        background: "#ff4d4d",
                        color: "#fff",
                        padding: "5px 10px",
                        fontSize: "12px",
                        borderRadius: "6px",
                        fontWeight: "bold",
                      }}
                    >
                      SALE
                    </div>
                  )}
                </div>

                {/* Details */}
                <div style={{ padding: "18px" }}>
                  <h4 style={{ margin: "0 0 12px 0" }}>{p.name}</h4>

                  {p.discount_price && p.discount_price < p.price ? (
                    <div>
                      <span
                        style={{
                          textDecoration: "line-through",
                          color: "#888",
                          marginRight: "8px",
                        }}
                      >
                        ₹{p.price}
                      </span>

                      <span
                        style={{
                          fontWeight: "bold",
                          color: "green",
                          fontSize: "18px",
                        }}
                      >
                        ₹{p.discount_price}
                      </span>
                    </div>
                  ) : (
                    <p style={{ fontWeight: "bold", fontSize: "18px" }}>
                      ₹{p.price}
                    </p>
                  )}

                  <button
                    onClick={() => addToCart(p)}
                    style={{
                      marginTop: "18px",
                      width: "100%",
                      padding: "12px",
                      borderRadius: "8px",
                      border: "none",
                      background:
                        "linear-gradient(135deg, #ff6a5e, #ff3d3d)",
                      color: "#fff",
                      fontWeight: "bold",
                      cursor: "pointer",
                      transition: "0.3s",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.transform = "scale(1.05)")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div
            style={{
              marginTop: "40px",
              display: "flex",
              justifyContent: "center",
              gap: "15px",
              alignItems: "center",
            }}
          >
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              style={{ padding: "8px 15px" }}
            >
              Prev
            </button>

            <span>
              Page {page} of {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              style={{ padding: "8px 15px" }}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryProducts;