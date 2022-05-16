import React, { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { Container, Row, Col, Form } from "react-bootstrap";
import Header from "../Header/Header";

const ForgotPassword = () => {

  const history = useHistory();

  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_BACKEND_API}/auth/forgotpassword`, { user_email: email })
      .then((res) => {
        console.log(res);
        alert('Password Reset Link has been sent successfully to your email!');
        history.push('/');
      })
      .catch(err => {
        console.log(err);
        alert('This email does not exist!');
      })
  }

  return(
    <div className="page">
      <Header />
      <Container>
        <Row className="justify-content-center my-5">
          <Col lg="4" md="3"></Col>
          <Col lg="4" md="5" sm="10" xs="10">
            <div className="box">
              <h1 className="box__heading">Forgot Password</h1>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="box__form-group" controlId="email">
                  <Form.Label>Enter Email ID</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={email}
                    className="box__input"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="name@email.com"
                  />
                </Form.Group>
                <button className="box__button" type="submit">Send Reset Password Link</button>
                <Link className="box__forgot-password" to="/auth">Back to Log in page</Link>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default ForgotPassword;