import React, { useState } from "react";
import { sha256 } from "js-sha256";
import { GoogleLogin } from "react-google-login";
import axios from "axios";
import './Auth.css';
import Header from '../Header';
import { useHistory } from "react-router-dom";

const Auth = (props) => {

  const history = useHistory()

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tokenId, setTokenId] = useState("")
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
        console.log(res.data.data.otp);
        setHash(res.data.data.hash);
        setRenderForm("otp");
      }).catch((err) => {
        console.log(err)
      })
  }

  const handleOtpSubmit = (e) => {
    e.preventDefault();

    const hashedPassword = sha256(password);

    axios
      .post(`${process.env.REACT_APP_BACKEND_API}/auth/verifyOtp`, { name, email, password: hashedPassword, otp, hash })
      .then((res) => {
        console.log(res);
        setRenderForm("roleChoice")
      }).catch((err) => {
        console.log(err.data)
      })
  }

  const handleRoleChoice = (role) => {
    const hashedPassword = sha256(password);
    console.log({
      name, email, password: hashedPassword, role
    })
    if (tokenId === "") {
      axios
        .post(`${process.env.REACT_APP_BACKEND_API}/auth/signup`, { name, email, password: hashedPassword, role })
        .then((res) => {
          console.log(res);
          setRenderForm("login")
          alert("Account Created Successfully!")
          setEmail("")
          setPassword("")
        })
    } else {
      axios
        .post(`${process.env.REACT_APP_BACKEND_API}/google-api/googleSignup`, { name, email, role })
        .then((res) => {
          console.log(res);
          setRenderForm("login")
          alert("Account Created Successfully!")
          setEmail("")
          setPassword("")
        })
    }
  }

  const handleLogInSubmit = async (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    const hashedPassword = sha256(password);
    axios
      .post(`${process.env.REACT_APP_BACKEND_API}/auth/signin`, {
        email,
        password: hashedPassword
      })
      .then((res) => {
        console.log(res);
        if (res.data.role === "freelancer") {
          history.push('/contractor')
        } else {
          history.push('/business')
        }
      }).catch((error) => {
        console.log(error.response.data)
      })
  }

  const googleSuccessRegister = async (res) => {
    const tokenIdLocal = res.tokenId;
    axios
      .post(`${process.env.REACT_APP_BACKEND_API}/google-api/verifyEmailGoogleAuth`, { tokenId: tokenIdLocal })
      .then((response) => {
        //To store tokenId in state
        //Change state to role choice
        console.log(response);
        setTokenId(tokenIdLocal)
        setEmail(response.data.data.email)
        setName(response.data.data.name)
        setRenderForm("roleChoice")
      }).catch((err) => {
        console.log(err)
      })
  }

  const googleSuccess = async (res) => {
    const tokenIdLocal = res.tokenId;
    axios.defaults.withCredentials = true;
    axios
      .post(`${process.env.REACT_APP_BACKEND_API}/google-api/googleLogin`, { tokenId: tokenIdLocal })
      .then((response) => {
        console.log(response);
      }).catch((err) => {
        console.log(err)
      })
  }
  const googleFailure = (error) => {
    console.log(error);
    console.log('Google sign in was unsuccessful! Pls try again later');
  }

  const handleAuth = () => {
    switch (renderForm) {
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
                onSuccess={googleSuccessRegister}
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
                id="otp"
                name="otp"
                type="number"
                value={otp}
                className="box__input"
                placeholder="OTP"
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              <button className="box__button" type="submit" onClick={handleOtpSubmit}>Create Account</button>
            </form>
          </>
        )
      }
      case "roleChoice": {
        return (
          <>
            <button className="role__button" onClick={(e) => {
              e.preventDefault()
              handleRoleChoice("freelancer")
            }
            }>Are you a contractor wanting to send invoice?</button>
            <button className="role__button" style={{ marginTop: "50px" }} onClick={(e) => {
              e.preventDefault()
              handleRoleChoice("business")
            }
            }>Are you a business wanting to pay contractor very easily?</button>
          </>
        )
      }
      default: {
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
                className="box__input password_box"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <a className="forgot_password" href={`${props.url}/forgot-password`} >Forgot Password?</a>
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
    }
  }

  return (
    <div className="page">
      <Header />
      <div className="auth-page">
        <div className="box">
          {renderForm === "login"
            ? <h1 className="box__heading">Log In</h1>
            : (
              renderForm === "roleChoice"
                ? <></>
                : <h1 className="box__heading">Sign Up</h1>
            )
          }
          {handleAuth()}
        </div>
      </div>
    </div>
  );
}

export default Auth;