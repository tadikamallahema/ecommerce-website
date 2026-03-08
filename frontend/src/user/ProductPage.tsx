import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  discount_price?: number | null;
  main_image?: string;
}

const ProductPage = () => {

 const { productId } = useParams();
 const navigate = useNavigate();

 const [product, setProduct] = useState<Product | null>(null);

 useEffect(()=>{
   axios.get(`http://localhost:2007/api/product/${productId}`)
   .then(res=>setProduct(res.data.product));
 },[productId]);

 if(!product) return <p>Loading...</p>;

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

 const addToCart = async () => {

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

    } catch (err:any) {

      alert("Please login first");
      navigate("/login");

    }

 };

 return (

<div
 style={{
  display:"flex",
  gap:"40px",
  padding:"40px",
  maxWidth:"1200px",
  margin:"auto"
 }}
>

 {/* LEFT SIDE IMAGE */}

 <div
  style={{
   flex:1,
   background:"#fff",
   padding:"20px",
   borderRadius:"16px",
   boxShadow:"0 10px 25px rgba(0,0,0,0.08)"
  }}
 >
   <img
     src={product.main_image || "https://via.placeholder.com/400x300"}
     alt={product.name}
     style={{
       width:"100%",
       borderRadius:"12px",
       objectFit:"cover"
     }}
   />
 </div>


 {/* RIGHT SIDE PRODUCT INFO */}

 <div
  style={{
   flex:1,
   display:"flex",
   flexDirection:"column",
   justifyContent:"center"
  }}
 >

   <h2 style={{fontSize:"28px"}}>{product.name}</h2>


   {product.discount_price && product.discount_price < product.price ? (

    <div style={{marginTop:"20px"}}>

      <span
       style={{
        textDecoration:"line-through",
        color:"#888",
        fontSize:"18px",
        marginRight:"10px"
       }}
      >
       ₹{product.price}
      </span>

      <span
       style={{
        color:"green",
        fontSize:"24px",
        fontWeight:"bold"
       }}
      >
       ₹{product.discount_price}
      </span>

    </div>

   ) : (

    <p style={{fontSize:"24px",fontWeight:"bold"}}>
      ₹{product.price}
    </p>

   )}


   <button
     onClick={addToCart}
     style={{
       marginTop:"30px",
       padding:"14px",
       borderRadius:"10px",
       border:"none",
       background:"linear-gradient(135deg,#ff6a5e,#ff3d3d)",
       color:"#fff",
       fontWeight:"bold",
       cursor:"pointer",
       fontSize:"16px",
       width:"220px"
     }}
   >
     Add to Cart
   </button>

 </div>

</div>

 )
}

export default ProductPage;