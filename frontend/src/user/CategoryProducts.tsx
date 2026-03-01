import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  price: number;
  image_url?: string;
}

const CategoryProducts = () => {
  const { id } = useParams();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await axios.get(
          `http://localhost:2007/api/user/productsByCategory/${id}`
        );
        console.log(result.data.products);

        setProducts(result.data.products);
      } catch (err: any) {
        alert(err.message);
      }
    };

    fetchProducts();
  }, [id]);

  return (
    <div style={{ padding: "20px" }}>
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
              style={{ width: "100%", height: "160px", objectFit: "cover" }}
            />

            <h4>{p.name}</h4>
            <p>₹{p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryProducts;