/* import axios from 'axios';
import React, { useEffect, useState } from 'react'
import VendorDashboard from './VendorDashboard';

interface Products{
  id:number;
  name:string;
  price:number;
  stock_quantity:number;
  category_id:number;
  is_active:number;
  is_admin_verified:number;
}
const VendorProduct = () => {
  const [product,setProduct]=useState<Products[]>([]);
    useEffect(()=>{
      const fetchProducts=async()=>{
        try{
          const result=await axios.get("http://localhost:2007/api/vendor/prodbyvendor",
        {withCredentials:true});
        console.log(result.data.product);
        setProduct(result.data.product??[]);
        }catch(err:any){
          alert(err.message);
        }
      }
      fetchProducts();
    },[]);

  return (
    <div>
       <VendorDashboard/>
      <h3> Products by each vendor</h3>
      {product.length===0 ? (<p>No product is found</p>):
      (<table>
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

      </table>)
      }
    </div>
  )
}

export default VendorProduct
 */

import axios from "axios";
import React, { useEffect, useState } from "react";
import VendorDashboard from "./VendorDashboard";

interface Products {
  id: number;
  name: string;
  price: number;
  stock_quantity: number;
  category_id: number;
  is_active: number;
  is_admin_verified: number;
}

const VendorProduct = () => {

  const [product, setProduct] = useState<Products[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await axios.get(
          "http://localhost:2007/api/vendor/prodbyvendor",
          { withCredentials: true }
        );

        setProduct(result.data.product ?? []);
      } catch (err: any) {
        alert(err.message);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <VendorDashboard />

      <h2 style={{ marginBottom: "20px" }}>Products by each vendor</h2>

      {product.length === 0 ? (
        <p>No product is found</p>
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          
          <table
            style={{
              width: "90%",
              maxWidth: "900px",
              borderCollapse: "collapse",
              background: "white",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              borderRadius: "6px",
              overflow: "hidden"
            }}
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
              {product.map((p) => (
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
      )}
    </div>
  );
};

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

export default VendorProduct;