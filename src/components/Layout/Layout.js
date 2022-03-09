import React from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import "./Layout.css";
import settings from "./Icons/settings.png";
import logout from "./Icons/logout.png";

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
          <Link className="button" to={`${props.url}`}>
            <img src={settings} />
            Dashboard
          </Link>
          <Link className="button" to={`${props.url}/invoices`}>
            <img src={settings} />
            Invoices
          </Link>
          {
            props.role === "freelancer"
              ? <Link className="button" to={`${props.url}/create-invoice`}><img src={settings} />Create Invoice</Link>
              : <></>
          }
          <Link className="button" to={`${props.url}/profile`}>
            <img src={settings} />
            Profile
          </Link>
          <Link className="button" to={`${props.url}/settings`}>
            <img src={settings} />
            Settings
          </Link>
          <button onClick={handleLogout} className="button logout-btn">
            <img src={logout} />
            Logout
          </button>
        </div>
        <main style={{ width: "100%", backgroundColor: "#DBDBDB" }}>{props.children}</main>
      </div>
    </div>
  )
}

export default Layout;