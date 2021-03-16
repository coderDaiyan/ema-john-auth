import React from "react";
import "./header.css";
import Logo from "../../images/logo.png";

const Header = () => {
  return (
    <div className="header">
      <img className="logo" src={Logo} alt="" />
      <nav>
        <a href="/shop">Shop</a>
        <a href="/review">Order Review</a>
        <a href="/inventory">Manage Inventory</a>
      </nav>
    </div>
  );
};

export default Header;
