import React from 'react'
import { Link } from 'react-router-dom'

const VendorDashboard = () => {
  return (
    <div>
      <h3> Vendor Dashboard page </h3>
      <nav>
        <li><Link to="/vendor/register">Vendor Registration</Link></li>
        <li><Link to="/vendor/login">Vendor Login </Link></li>
        <li><Link to="/vendor/products">Products </Link></li>
        <li><Link to="/"></Link></li>
      </nav>
    </div>
  )
}

export default VendorDashboard
