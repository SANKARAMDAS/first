import React, { useState } from "react";
import { sha256 } from "js-sha256";
import { useParams, useHistory } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import Header from "../Header/Header";

const ResetPassword = () => {

  const history = useHistory();

  const { token, id } = useParams();

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === password2) {
      const hashedPassword = sha256(password);
      axios
      .post(
        `${process.env.REACT_APP_BACKEND_API}/auth/passwordreset`,
        {
          token,
          id,
          password: hashedPassword
        }
      )
      .then((res) => {
        console.log(res);
        alert("Password reset complete!");
        history.push('/auth');
      })
      .catch((error) => {
        console.log(error.response.data);
        alert("Could not reset your password. Pls try again later!");
      })
    }
    else {
      alert("Passwords do not match!!");
    }
  }

  return(
    <div className="page">
      <Header />
      <Container>
        <Row>
          <Col lg="4" md="6" sm="10" xs="12">
            <div className="auth-page mt-5">
              <div className="box">
              <h1 className="box__heading">Reset Password</h1>
                <form onSubmit={handleSubmit}>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    className="box__input"
                    placeholder="Enter New Password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <input
                    id="password2"
                    name="password2"
                    type="password"
                    value={password2}
                    className="box__input mt-3"
                    placeholder="Confirm New Password"
                    onChange={(e) => setPassword2(e.target.value)}
                    required
                  />
                  <button className="box__button" type="submit">Reset Password</button>
                </form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default ResetPassword;