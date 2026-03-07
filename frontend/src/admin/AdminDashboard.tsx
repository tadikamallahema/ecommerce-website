import axios from 'axios';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const AdminDashboard = () => {
  const navigate=useNavigate();
  const handleLogout = async () => {
    try {

      await axios.post(
        "http://localhost:2007/api/logout",
        {},
        { withCredentials: true }
      );

      navigate("/admin/login");

    } catch (err) {

      console.log("Logout failed", err);

    }
  };
  return (
    <div>
      <h3> Admin Dashboard</h3>
      <nav>
        <ul>
        <li><Link to="/admin/verifyvendors">Approve Vendor</Link></li>
        <li><Link to="/admin/verifyproducts">Approve Products</Link></li>
        <li><Link to="/admin/createcategory">Create Categories</Link></li>
        <li><Link to="/admin/manageCategories">Manage Categories</Link></li>
        <li><Link to="/admin/products">View all Products</Link></li>
        <button onClick={handleLogout}>Logout</button>
        </ul>
      </nav>
    </div>
  )
}

export default AdminDashboard
