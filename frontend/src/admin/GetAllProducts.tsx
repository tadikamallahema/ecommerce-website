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
    <div>
      <AdminDashboard/>
      <h4>Get all products page </h4>
      {product.length===0 ?(<p>No products found</p>):
        (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Category</th>
                <th>Active</th>
                <th>Approved</th>
              </tr>
            </thead>
            <tbody>
              {product.map((p)=>(
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.name}</td>
                  <td>{p.price}</td>
                  <td>{p.stock_quantity}</td>
                  <td>{p.category_id}</td>
                  <td>{p.is_active ? "Yes" : "No"}</td>
                  <td>{p.is_admin_verified ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      }
    </div>
  )
}

export default GetAllProducts;
