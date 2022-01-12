import React from "react";
import { Link } from "react-router-dom";
//import Header from "../../Header";
import "./ContractorLayout.css";

const ContractorLayout = ({ children }) => {
  return (
    <div className="ContractorLayout">
      {/* <Header /> */}
      <div className="Dashboard">
        <div className="Sidebar">
          <Link className="button" to="/contractor/invoices">Invoices</Link>
          <Link className="button" to="/contractor/create-invoice">Create Invoice</Link>
          <Link className="button" to="/contractor">Profile</Link>
          <Link className="button" to="/contractor/settings">Settings</Link>
        </div>
        <main style={{ width: "100%" }}>{children}</main>
      </div>
    </div>
  )
}

export default ContractorLayout;