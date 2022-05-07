import React, { useState } from "react";
import axios from "axios";
import { Form } from "react-bootstrap";
import "./css/AuthModal.css";

const AuthModal = (props) => {

  const [otp, setOtp] = useState("");
  const [authCode, setAuthCode] = useState("");

  if(!props.show) {
    return null
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(
      `${process.env.REACT_APP_BACKEND_API}/wyre-payment/submitAuthorization`,
      {
        invoiceId: props.invoiceId,
        otp,
        authCode
      }
    )
    .then((res) => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    })
  }

  return(
    <div className="AuthModal" onClick={props.onClose}>
      <div className="AuthModalContent" onClick={e => e.stopPropagation()}>
        <div className="AuthModalHeading">OTP Shared</div>
        <p className="AuthModalTagline">We have sent an OTP</p>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label className="label">Enter OTP Code</Form.Label>
            <Form.Control
              type="text"
              name="otp"
              className="input"
              value={otp}
              placeholder="Eg: 2543"
              onChange={(e) => setOtp(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="label">Enter 2-Factor Authentication Code (if enabled)</Form.Label>
            <Form.Control
              type="text"
              name="authCode"
              className="input"
              value={authCode}
              placeholder="Eg: 254 712"
              onChange={(e) => setAuthCode(e.target.value)}
            />
          </Form.Group>
          <button type="submit">Confirm</button>
        </Form>
      </div>
    </div>
  )
}

export default AuthModal;