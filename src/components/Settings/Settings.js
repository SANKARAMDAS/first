import React, { useState } from "react";
import { sha256 } from "js-sha256";
import axios from "axios";
import { Container, Row, Col, Form } from "react-bootstrap";
import "./Settings.css";

const Settings = (props) => {

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === passwordConfirm) {

      const hashedPassword = sha256(password);

      axios
        .post(`${process.env.REACT_APP_BACKEND_API}/auth/passwordReset`, {
            email: props.email,
            password: hashedPassword
        })
        .then((res) => {
            console.log(res.data);
            alert(res.data.msg);
        })
        .catch((err) => {
            console.log(err);
        })
    } else {
      console.log('Password do not match');
    }
  }

  return (
    <Container className="settings">
      <h3 className="settings__heading">Settings</h3>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col lg="4">
            <div className="settings__box">
              <h6 className="settings__boxHeading">Change Password</h6>
              <Form.Group controlId="password">
                <Form.Label className="settings__label">New Password</Form.Label>
                <Form.Control
                  name="password"
                  type="text"
                  className="settings__inputBox"
                  value={password}
                  placeholder="New Password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="password2">
                <Form.Label className="settings__label mt-4">Confirm New Password</Form.Label>
                <Form.Control
                  name="password2"
                  type="text"
                  className="settings__inputBox"
                  value={passwordConfirm}
                  placeholder="Confirm Password"
                  required
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                />
              </Form.Group>
              <button className="settings__button" type="submit">Reset Password</button>
            </div>
          </Col>
        </Row>
      </Form>
    </Container>
  )
}

export default Settings;