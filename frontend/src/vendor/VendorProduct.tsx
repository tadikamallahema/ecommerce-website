import axios from 'axios';
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
