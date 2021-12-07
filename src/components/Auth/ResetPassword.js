import React, { useState } from "react";
import axios from "axios";
import Header from "../Header";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_BACKEND_API}/auth/resetpassword`, { password, password2 })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error.response.data);
      })
  }

  return(
    <div className="page">
      <Header />
      <div className="auth-page">
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
              className="box__input"
              placeholder="Confirm New Password"
              onChange={(e) => setPassword2(e.target.value)}
              required
            />
            <button className="box__button" type="submit">Reset Password</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword;