import React from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import "./Layout.css";
//import dashboard from "./Icons/dashboard.svg";
import invoice from "./Icons/invoice.svg";
import profile from "./Icons/profile.svg";
import settings from "./Icons/settings.svg";
import logout from "./Icons/logout.svg";

const Layout = (props) => {

  const history = useHistory()

  const handleLogout = async () => {
    axios.defaults.withCredentials = true
    await axios.post(`${process.env.REACT_APP_BACKEND_API}/auth/logout`, {
        withCredentials: true
    }).then((res) => {
        console.log(res.data)
        history.push("/")
    }).catch((err) => {
        console.log(err)
    })
  }

  return (
    <div className="layout">
      <div className="dashboard">
        <div className="sidebar">
          {/*
          <Link className="button" to={`${props.url}`}>
            <img src={dashboard} />
            Dashboard
          </Link>
          */}
          <Link className="button" to={`${props.url}/invoices`}>
            <img src={invoice} alt="invoice" />
            Invoices
          </Link>
          {
            props.role === "freelancer"
              ? <Link className="button" to={`${props.url}/create-invoice`}><img src={settings} alt="create-invoice" />Create Invoice</Link>
              : <></>
          }
          <Link className="button" to={`${props.url}/profile`}>
            <img src={profile} alt="profile" />
            Profile
          </Link>
          <Link className="button" to={`${props.url}/settings`}>
            <img src={settings} alt="settings" />
            Settings
          </Link>
          <button onClick={handleLogout} className="button logout-btn">
            <img src={logout} alt="logout" />
            Logout
          </button>
        </div>
        <main className="main" style={{ width: "100%", backgroundColor: "#DBDBDB" }}>{props.children}</main>
      </div>
    </div>
  )
}

export default Layout;