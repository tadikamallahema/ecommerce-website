import React from 'react'
import { Link } from 'react-router-dom'

const AdminDashboard = () => {
  return (
    <div>
      <h3> Admin Dashboard</h3>
      <nav>
        <ul>
        <li><Link to="/adminv/verify">Approve Vendor</Link></li>
        <li><Link to="/admin/verifyprod">Approve Products</Link></li>
        <li><Link to="/admin/manageCategories">Manage Categories</Link></li>
        <li><Link to="/admin/getAllProducts">View all Products</Link></li>
        {/* <li><Link></Link></li> */}
        </ul>
      </nav>
    </div>
  )
}

export default AdminDashboard
