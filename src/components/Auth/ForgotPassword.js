import React, { useState } from "react";
import axios from "axios";
import Header from "../Header";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_BACKEND_API}/auth/forgotpassword`, { user_email: email })
      .then((res) => {
        console.log(res);
        alert('Password Reset Link has been sent successfully to your email!');
      })
  }

  return(
    <div className="page">
      <Header />
      <div className="auth-page">
        <div className="box">
        <h1 className="box__heading">Forgot Password</h1>
          <form onSubmit={handleSubmit}>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              className="box__input"
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button className="box__button" type="submit">Send Reset Password Link</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword;