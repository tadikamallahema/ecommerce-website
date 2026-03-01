import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  price: number;
  image_url?: string;
}

const CategoryProducts = () => {
  const { id } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const navigate=useNavigate();

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

  const addToCart=async(productId:number,price:number)=>{
    try{
      
      const result=await axios.post("http://localhost:2007/api/cart/add",
        {productId,quantity:1,price},
        {withCredentials:true}
      )
      console.log(result.data);
      alert("Added to cart");
    }catch(err:any){
      alert(err.message);
      navigate('/login')
    }
      navigate('/cart');
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Products</h2>

      <div style={{display: "grid",gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",gap: "20px",}}>
        {products.map((p) => (
          <div
            key={p.id}
            style={{
              border: "1px solid #ddd",borderRadius: "12px",padding: "12px",}}>
            <img src={p.image_url} alt={p.name} style={{ width: "100%", height: "160px", objectFit: "cover" }}/>
            <h4>{p.name}</h4>
            <p>₹{p.price}</p>
            <button onClick={()=>addToCart(p.id,p.price)} > Add to cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryProducts;