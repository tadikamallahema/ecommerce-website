import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AdminDashboard from './AdminDashboard';

interface Product{
  id:number;
  name:string;
  price:number;
  stock_quantity:number;
  category_id:number;
  is_active:number;
  is_admin_verified:number;
}
const GetAllProducts = () => {
  const [product,setProducts]=useState<Product[]>([]);
  useEffect(()=>{
    const productsbyV=async()=>{
    try{
      const result=await axios.get("http://localhost:2007/api/admin/getAllproducts",
        {withCredentials:true}
      );
      setProducts(result.data.products);
    }catch(err:any){
      alert(err.message);
    }
  }
  productsbyV();
},[]);

  return (
    <div style={{ textAlign: "center" }}>
      <AdminDashboard/>
      <h4 style={{ marginBottom: "20px" }}>Get all products page </h4>
      {product.length===0 ?(<p>No products found</p>):
        (
          <div style={{ display: "flex", justifyContent: "center" }}>
          <table 
          style={{
              width: "90%",maxWidth: "900px",borderCollapse: "collapse",
              background: "white",boxShadow: "0 4px 10px rgba(0,0,0,0.1)", borderRadius: "6px",  overflow: "hidden"}}
          >
            <thead>
              <tr style={{ background: "#4f6bed", color: "white" }}>
                <th style={headerStyle}>ID</th>
                <th style={headerStyle}>Name</th>
                <th style={headerStyle}>Price</th>
                <th style={headerStyle}>Stock</th>
                <th style={headerStyle}>Category</th>
                <th style={headerStyle}>Active</th>
                <th style={headerStyle}>Approved</th>
              </tr>
            </thead>
            <tbody>
              {product.map((p)=>(
                <tr key={p.id} style={{ borderBottom: "1px solid #ddd" }}>
                  <td style={cellStyle}>{p.id}</td>
                  <td style={{ ...cellStyle, textAlign: "left" }}>{p.name}</td>
                  <td style={cellStyle}>{p.price}</td>
                  <td style={cellStyle}>{p.stock_quantity}</td>
                  <td style={cellStyle}>{p.category_id}</td>
                  <td style={cellStyle}>{p.is_active ? "Yes" : "No"}</td>
                  <td style={cellStyle}>{p.is_admin_verified ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        )
      }
    </div>
  )
}
const headerStyle = {
  padding: "12px",
  border: "1px solid #ddd",
  textAlign: "center" as const
};

const cellStyle = {
  padding: "10px",
  border: "1px solid #ddd",
  textAlign: "center" as const
};


export default GetAllProducts;
