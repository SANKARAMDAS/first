import React from "react";
import {Link} from "react-router-dom";
import Header from "../../Header";
import "./ContractorLayout.css";

const ContractorLayout = ({children}) => {
  return(
    <div className="ContractorLayout">
      <Header />
      <div className="Dashboard">
        <div className="Sidebar">
          <Link className="button" to="/">Invoices</Link>
          <Link className="button" to="/">Payment Methods</Link>
          <Link className="button" to="/contractor-profile">Profile</Link>
          <Link className="button" to="/">Settings</Link>
        </div>
        <main>{children}</main>
      </div>
    </div>
  )
}

export default ContractorLayout;