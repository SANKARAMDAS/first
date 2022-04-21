import React, { useEffect, useState } from "react";
import isAuthenticated from '../../assets/js/auth';
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
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
    <Container fluid>
      <Row className="Header justify-content-between">
        <Col lg="2" md="3" sm="6" xs="6">
          <Link to="/"><h4>Binamite</h4></Link>
        </Col>
        {/*
        <Col className="center" lg="8">
          <div className="menu">
            <Link to="/">Apps</Link>
            <Link to="/contact-us">Contact Us</Link>
          </div>
        </Col>
        */}
        <Col className="right" lg="2" md="3" sm="6" xs="6">
          <div className="auth">
            {renderLink()}
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Header;