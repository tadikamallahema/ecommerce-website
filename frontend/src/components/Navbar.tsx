import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div >
      <h1>Navbar</h1>
      <nav >
        <ul>
            <li><Link to='/register'>Signup</Link></li>
            <li><Link to='/login'>Login</Link></li>
            <li><Link to='/cart'>Cart</Link></li>
            <input type='text' placeholder='Search bar'/>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
