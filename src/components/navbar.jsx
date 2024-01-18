import React from 'react';
import pic from '../pic.png';
import './navbar.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
function Navbar() {
  return (
    <div className="navbar-container">
      <img src={pic} style={{height:"40px",width:"150px"}} alt="img not found" className="logo" />
      <div className="search-container">
        <span className="search-icon"><FontAwesomeIcon icon={faMagnifyingGlass}/></span>
        <input style={{backgroundColor:"#f4f6f8"}}
          type="text"
          placeholder="Search"
          className="search-input"
        />
      </div>
      <div className="menu-container">
        <span className="menu-item" >About</span>
        <span className="menu-item">Product</span>
        <span className="menu-item">For Teams</span>
      </div>
    </div>
  );
}

export default Navbar;
