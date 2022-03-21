import React, { useEffect, useState } from "react";
import isAuthenticated from '../../assets/js/auth';
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {

  const [userAuth, setUserAuth] = useState({})

  useEffect(() => {
    const checkAuthentication = async () => {
      setUserAuth(await isAuthenticated())
    }
    checkAuthentication()

  }, [])

  const renderLink = () => {
    console.log(userAuth)
    if (Object.keys(userAuth) !== 0 && userAuth.authenticated) {
      if (userAuth.role === "freelancer") {
        return <Link to="/contractor">Dashboard</Link>
      } else {
        return <Link to="/business">Dashboard</Link>
      }
    } else {
      return <Link to="/auth">Sign In/Sign Up</Link>
    }
  }

  return (
    <div className="Header">
      <Link to="/"><h4>Binamite</h4></Link>
      <div className="menu">
        <Link to="/">Apps</Link>
        <Link to="/contact-us">Contact Us</Link>
      </div>
      <div className="auth">
        {renderLink()}
      </div>
    </div>
  )
}

export default Header;