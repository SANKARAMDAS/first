import React from "react";
import {Link} from "react-router-dom";

const Header = () => {
  return(
    <div className="header">
      <h3>Polaris</h3>
      <Link to="/">Home</Link>
      <Link to="/create-invoice">Create Invoice</Link>
      <Link to="/auth">Sign In/Sign Up</Link>
      <Link to="/auth/forgot-password">Forgot Password</Link>
    </div>
  )
}

export default Header;