import React from 'react';
import '../Styles/Navbar.css';

const Navbar = () => {
  return (
    <nav>
<div class="logo">
  Dollar ERP
</div>

<ul className="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#Profile">Profile</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
