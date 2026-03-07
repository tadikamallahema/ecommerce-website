import axios from 'axios';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const VendorDashboard = () => {
  const navigate=useNavigate();
  const handleLogout = async () => {
    try {

      await axios.post(
        "http://localhost:2007/api/logout",
        {},
        { withCredentials: true }
      );

      navigate("/vendor/login");

    } catch (err) {

      console.log("Logout failed", err);

    }
  };
  return (
    <div>
      {/* <h3> Vendor Dashboard page </h3> */}
      <nav>
        <ul>
          <li><Link to="/vendor/register">Vendor Registration</Link></li>
          <li><Link to="/vendor/login">Vendor Login </Link></li>
          <li><Link to="/vendor/products">Products</Link></li>
          <li><Link to="/vendor/createproduct">Create Product</Link></li>
          <button onClick={handleLogout}>Logout</button>
        </ul>
      </nav>
    </div>
  )
}

export default VendorDashboard;
