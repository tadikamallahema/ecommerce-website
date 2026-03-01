import React from 'react'
import { Link } from 'react-router-dom'

const UserDashboard = () => {
  return (
    <div>
      <h3> User Dashboard page </h3>
      <nav>
        <ul>
            <li><Link to="/user/profile">User Profile</Link></li>
            <li><Link to="/user/categories">Categories List</Link></li>
            <li><Link to="/category/:id">Products </Link></li>
            <li><Link to="/user/cart">Cart By User</Link></li>
            <li><Link to="/user/history">Order History</Link></li>
        </ul>
      </nav>
    </div>
  )
}

export default UserDashboard
