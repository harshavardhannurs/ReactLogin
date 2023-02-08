import React from "react";
import "./Navbar.css";

const Navbar = (props) => {

  function handleClick(){
    props.logout();
  }

  return (
    <div className="navbar">
      <div className="brand-name">ReactLogin</div>
      {props.isLoggedIn && <a href="#" className="logout-btn" onClick={handleClick}>Logout</a>}
    </div>
  );
};

export default Navbar;
