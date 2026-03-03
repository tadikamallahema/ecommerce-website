import React from 'react'
import { Link } from 'react-router-dom'
import './navcss.css'
const Navbar = () => {
  
  return (
    <div className='navbar'>
      {/* <h1>Navbar</h1> */}
      <nav >
        <ul>
        <h3>E-commerce </h3>
            <li><Link to='/register'>Signup</Link></li>
            <li><Link to='/login'>Login</Link></li>
            <input type='text' placeholder='Search bar'/>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
