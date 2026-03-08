import axios from 'axios';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const UserDashboard = () => {
  const navigate=useNavigate();
  const handleLogout = async () => {
    try {

      await axios.post(
        "http://localhost:2007/api/logout",
        {},
        { withCredentials: true }
      );

      navigate("/login");

    } catch (err) {

      console.log("Logout failed", err);

    }
  };

  return (
    <div>
      {/* <h3> User Dashboard page </h3> */}
      <nav>
        <ul>
            <li><Link to="/user/profile">User Profile</Link></li>
            <li><Link to="/user/categories">Categories List</Link></li>
            <li><Link to="/user/cart">Cart By User</Link></li>
            <li><Link to="/user/history">Order History</Link></li>
            <button onClick={handleLogout}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "red")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#444")}
            style={{
              backgroundColor: "#444",
              color: "white",
              padding: "6px 14px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              marginLeft: "10px"
            }}>Logout</button>

        </ul>
      </nav>
    </div>
  )
}

export default UserDashboard
