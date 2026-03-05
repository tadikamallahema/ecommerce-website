import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './navcss.css'
import axios from 'axios';


interface Product{
  id:number;
  name:string;
  price:number;
  stock_quantity:number;
  category_id:number;
  is_active:number;
  is_admin_verified:number;
}
const Navbar = () => {
    const [product,setproduct]=useState<Product[]>([]);
    const [input,setInput]=useState("");
    const [showres,setShowres]=useState(false);

    const fetchData=async()=>{
      if(!input){
      setproduct([]);
      return;
    }
      try{
        const products=await axios.get("http://localhost:2007/api/search?keyword="+input);
        setproduct(products.data.products);
      }catch(err:any){
        alert(err.message);
      }

     }  
  useEffect(()=>{
    const timer=setTimeout(()=>{
      fetchData();
    },300);
    return ()=>{clearTimeout(timer)}; 
  },[input]);
  return (
    <div className='navbar'>
      {/* <h1>Navbar</h1> */}
      <nav >
        <ul>
        <h3>E-commerce </h3>
            <li><Link to='/register'>Signup</Link></li>
            <li><Link to='/login'>Login</Link></li>
            </ul>
            <div>
            <input type='text' value={input}
            onChange={(e)=>setInput(e.target.value)}
            placeholder='Search bar'
            onFocus={()=>setShowres(true)}/>
            {showres && (
              <div>
                {product.map((p)=>
                <span key={p.id}>{p.name}</span>)}
                </div>
            )}
            </div>
        
      </nav>
    </div>
  )
}

export default Navbar
