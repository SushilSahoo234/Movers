import React from 'react'
import { Link } from 'react-router-dom'
import logo from"../../assets/images/movers.png"
import "./Navbar.css"

const Navbar = () => {
  return (
    <nav className='container'>
        <div className='left-side-logo'>
        <a href="/"><img src={logo} alt="Company logo" /></a>
        </div>
        <div className='middle-text'>
            <Link to="/enterprise">For Enterprise</Link>
            <a href="/delivery">Delivery Partners</a>
        </div>
        <div className='right-spacer '></div>
        <div className='right-text'>
            <a href="/support">Support</a>
        </div>
    </nav>
  )
}

export default Navbar
