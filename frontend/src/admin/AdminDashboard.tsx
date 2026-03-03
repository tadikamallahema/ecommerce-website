import React from 'react'
import { Link } from 'react-router-dom'

const AdminDashboard = () => {
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
        
        </ul>
      </nav>
    </div>
  )
}

export default AdminDashboard
