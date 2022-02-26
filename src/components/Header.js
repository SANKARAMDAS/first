import React, { useEffect, useState } from "react";
import isAuthenticated from '../assets/js/auth'
import { Link } from "react-router-dom";

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
    <div className="header">
      <h3>Polaris</h3>
      <Link to="/">Home</Link>
      <Link to="/contact-us">Contact Us</Link>
      {renderLink()}
    </div>
  )
}

export default Header;