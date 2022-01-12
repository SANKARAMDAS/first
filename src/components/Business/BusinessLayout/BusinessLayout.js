import React from "react";
import { Link } from "react-router-dom";
import "./BusinessLayout.css";

const BusinessLayout = ({ children }) => {
  return (
    <div className="BusinessLayout">
      <div className="Dashboard">
        <div className="Sidebar">
          <Link className="button" to="/business/invoices">Invoices</Link>
          <Link className="button" to="/business">Profile</Link>
          <Link className="button" to="/business/settings">Settings</Link>
        </div>
        <main style={{ width: "100%" }}>{children}</main>
      </div>
    </div>
  )
}

export default BusinessLayout;