import React, { useState } from "react";
import axios from "axios";
import ContractorLayout from "./ContractorLayout/ContractorLayout";
import "./css/ContractorSettings.css";

const ContractorSettings = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if(password === passwordConfirm) {
      axios
      .post(`${process.env.REACT_APP_BACKEND_API}/auth/passwordReset`, {
        email,
        password
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
    } else {
      console.log('Password do not match');
    }
  }

  return(
    <ContractorLayout>
      <h3>Settings</h3>
      <form onSubmit={handleSubmit}>
        <input
          id="email"
          name="email"
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          id="password"
          name="password"
          type="password"
          value={password}
          placeholder="New Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          id="passwordConfirm"
          name="passwordConfirm"
          type="password"
          value={passwordConfirm}
          placeholder="Confirm New Password"
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        <button type="submit">
          Reset Password
        </button>
      </form>
    </ContractorLayout>
  )
}

export default ContractorSettings;