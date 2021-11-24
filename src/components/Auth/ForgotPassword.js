import React, { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_BACKEND_API}/auth/forgotpassword`, { email })
      .then((res) => {
        console.log(res);
      })
  }

  return(
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
  )
}

export default ForgotPassword;