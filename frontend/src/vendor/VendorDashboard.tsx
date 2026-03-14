import React, { useState } from "react";
import { Link } from "react-router-dom";

const VendorDashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div>
      <nav>

        {/* Menu button */}
        <button 
          style={{fontSize:"22px", margin:"10px"}}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* Navbar */}
        <ul className={menuOpen ? "open" : ""}>
          <li><Link to="/vendor/analytics">Vendor Analysis</Link></li>
          <li><Link to="/vendor/register">Vendor Registration</Link></li>
          <li><Link to="/vendor/login">Vendor Login</Link></li>
          <li><Link to="/vendor/products">Products</Link></li>
          <li><Link to="/vendor/createproduct">Create Product</Link></li>
          <li><Link to="/vendor/manageprod">Manage Product</Link></li>
        </ul>

      </nav>
    </div>
  );
};

export default VendorDashboard;