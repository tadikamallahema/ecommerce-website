import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import UserDashboard from './UserDashboard';

interface Category{
    id:number;
    name: string;
    description?: string;
    slug?: string;
    image_url?: string;
}
const ViewCategories = () => {
    const [categories,setCategories]=useState<Category[]>([]);
    const navigate=useNavigate();
    useEffect(()=>{
        const fetchCategories=async()=>{
            try{
            const result=await axios.get("http://localhost:2007/api/admin/getallcategories",
            {withCredentials:true});
            setCategories(result.data.categories);
        }catch(err:any){
            alert(err.message);
        }
        }
        fetchCategories();
    },[]);
  return (
    <div style={{ padding: "20px" }}>
      <UserDashboard/>
      <h2>Shop by Category</h2>

      {categories.length === 0 ? (
        <p>No categories found</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "20px",
          }}
        >
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigate(`/category/${cat.id}`)}
              style={{
                border: "1px solid #ddd",
                borderRadius: "12px",
                overflow: "hidden",
                cursor: "pointer",
                transition: "0.2s",
                background: "#fff",
              }}
            >
              <img
                src={
                  cat.image_url ||
                  "https://via.placeholder.com/300x200?text=No+Image"
                }
                alt={cat.name}
                style={{
                  width: "100%",
                  height: "160px",
                  objectFit: "cover",
                }}
              />

              <div style={{ padding: "12px" }}>
                <h4 style={{ margin: 0 }}>{cat.name}</h4>
                <p style={{ fontSize: "14px", color: "#666" }}>
                  {cat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ViewCategories
