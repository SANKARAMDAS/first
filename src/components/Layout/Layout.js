import React from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import "./Layout.css";

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
                    <Link className="button" to={`${props.url}/invoices`}>Invoices</Link>
                    {
                        props.role === "freelancer"
                            ? <Link className="button" to={`${props.url}/create-invoice`}>Create Invoice</Link>
                            : <></>
                    }
                    <Link className="button" to={`${props.url}`}>Profile</Link>
                    <Link className="button" to={`${props.url}/settings`}>Settings</Link>
                    <button onClick={handleLogout} className="button logout-btn">Logout</button>
                </div>
                <main style={{ width: "100%" }}>{props.children}</main>
            </div>
        </div>
    )
}

export default Layout;