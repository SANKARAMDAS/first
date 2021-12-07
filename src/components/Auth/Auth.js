import React, { useState, useEffect } from "react";
import { sha256 } from "js-sha256";
import { GoogleLogin } from "react-google-login";
import axios from "axios";
import './Auth.css';
import Header from '../Header';

const Auth = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [otp, setOtp] = useState("");
  const [hash, setHash] = useState("");

  const [renderForm, setRenderForm] = useState("login");

  const handleSignUpSubmit = (e) => {
    e.preventDefault();

    const hashedPassword = sha256(password);

    axios
      .post(`${process.env.REACT_APP_BACKEND_API}/auth/emailverification`, {
        name,
        email,
        password: hashedPassword
      })
      .then((res) => {
        console.log(res);
        setHash(res.data.hash);
      })
  }

  useEffect(() => {
    if (hash !== "") {
      setRenderForm("otp");
    }
  }, [hash]);

  const handleOtpSubmit = (e) => {
    e.preventDefault();

    const hashedPassword = sha256(password);

    axios
      .post(`${process.env.REACT_APP_BACKEND_API}/auth/signup`, { name, email, password: hashedPassword, otp, hash })
      .then((res) => {
        console.log(res);
        window.location.href = '/'
      })
  }

  const handleLogInSubmit = async (e) => {
    e.preventDefault();
    const hashedPassword = sha256(password);
    axios
      .post(`${process.env.REACT_APP_BACKEND_API}/auth/signin`, {
        email,
        password: hashedPassword
      })
      .then((res) => {
        console.log(res);
      }).catch((error) => {
        console.log(error.response.data)
      })
  }

  const googleSuccess = async (res) => {
    const tokenId = res.tokenId;
    axios
      .post(`${process.env.REACT_APP_BACKEND_API}/google-api/googleLogin`, { tokenId })
      .then((response) => {
        console.log(response);
      })
  }
  const googleFailure = (error) => {
    console.log(error);
    console.log('Google sign in was unsuccessful! Pls try again later');
  }

  const handleAuth = () => {
    switch (renderForm) {
      case "login": {
        return (
          <>
            <form onSubmit={handleLogInSubmit}>
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
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                className="box__input"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <GoogleLogin
                clientId="365821624725-ke89ac5mckkrpg3nu76cein2vrss33tg.apps.googleusercontent.com"
                render={(renderProps) => (
                  <button className="box__googleButton" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                    <svg viewBox="0 0 22 22">
                      <path
                        fill="currentColor"
                        d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z"
                      />
                    </svg>
                    <span>Log In With Google</span>
                  </button>
                )}
                onSuccess={googleSuccess}
                onFailure={googleFailure}
                cookiePolicy={'single_host_origin'}
              />
              <button className="box__button" type="submit">Log In</button>
              <button className="box__toggle" onClick={() => setRenderForm("signup")}>Don't have an account? Sign Up.</button>
            </form>
          </>
        )
      }
      case "signup": {
        return (
          <>
            <form onSubmit={handleSignUpSubmit}>
              <input
                id="name"
                name="name"
                type="text"
                value={name}
                className="box__input"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                required
              />
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
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                className="box__input"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input
                id="password2"
                name="password2"
                type="password"
                value={password2}
                className="box__input"
                placeholder="Re-type Password"
                onChange={(e) => setPassword2(e.target.value)}
                required
              />
              <GoogleLogin
                clientId="365821624725-ke89ac5mckkrpg3nu76cein2vrss33tg.apps.googleusercontent.com"
                render={(renderProps) => (
                  <button className="box__googleButton" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                    <svg viewBox="0 0 22 22">
                      <path
                        fill="currentColor"
                        d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z"
                      />
                    </svg>
                    <span>Sign Up With Google</span>
                  </button>
                )}
                onSuccess={googleSuccess}
                onFailure={googleFailure}
                cookiePolicy='single_host_origin'
              />
              <button className="box__button" type="submit" onClick={handleSignUpSubmit}>Send OTP</button>
              <button className="box__toggle" onClick={() => setRenderForm("login")}>Already have an account? Log In.</button>
            </form>
          </>
        )
      }
      case "otp": {
        return (
          <>
            <form onSubmit={handleOtpSubmit}>
              <input
                id="name"
                name="name"
                type="text"
                value={name}
                className="box__input"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                required
              />
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
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                className="box__input"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input
                id="otp"
                name="otp"
                type="number"
                value={otp}
                className="box__input"
                placeholder="OTP"
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              <GoogleLogin
                clientId="365821624725-ke89ac5mckkrpg3nu76cein2vrss33tg.apps.googleusercontent.com"
                render={(renderProps) => (
                  <button className="box__googleButton" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                    <svg viewBox="0 0 22 22">
                      <path
                        fill="currentColor"
                        d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z"
                      />
                    </svg>
                    <span>Sign Up With Google</span>
                  </button>
                )}
                onSuccess={googleSuccess}
                onFailure={googleFailure}
                cookiePolicy='single_host_origin'
              />
              <button className="box__button" type="submit" onClick={handleOtpSubmit}>Create Account</button>
            </form>
          </>
        )
      }
      default: {
        return (
          <></>
        )
      }
    }
  }

  return (
    <div className="page">
      <Header />
      <div className="auth-page">
        <div className="box">
          {renderForm === "login"
            ? <h1 className="box__heading">Log In</h1>
            : <h1 className="box__heading">Sign Up</h1>
          }
          {handleAuth()}
        </div>
      </div>
    </div>
  );
}

export default Auth;