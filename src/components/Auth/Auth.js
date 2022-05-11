import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form } from "react-bootstrap";
import { sha256 } from "js-sha256";
import { GoogleLogin } from "react-google-login";
import axios from "axios";
import './Auth.css';
import Header from '../Header/Header';
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
      .post(`${process.env.REACT_APP_BACKEND_API}/auth/signup`, {
        name,
        email,
        password: hashedPassword
      })
      .then((res) => {
        console.log(res.data);
        setRenderForm("confirmation");
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
        .post(`${process.env.REACT_APP_BACKEND_API}/google-api/googleSignup`,
        {
          role,
          name,
          email
        })
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

  const googleSignUp = async (res) => {
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

  const googleSignIn = async (res) => {
    const tokenIdLocal = res.tokenId;
    axios.defaults.withCredentials = true;
    axios
      .post(`${process.env.REACT_APP_BACKEND_API}/google-api/googleLogin`, { tokenId: tokenIdLocal })
      .then((response) => {
        console.log(response);
        if (response.data.role === "freelancer") {
          history.push('/contractor')
        } else {
          history.push('/business')
        }
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
            <Form onSubmit={handleSignUpSubmit}>
              <span className="box__toggle">Already have an account? </span>
              <a className="box__toggle-link" onClick={() => setRenderForm("login")}>Log in</a>
              <Form.Group className="box__form-group" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={name}
                  className="box__input"
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Full Name"
                />
              </Form.Group>
              <Form.Group className="box__form-group" controlId="email">
                <Form.Label>Email id</Form.Label>
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
              <Form.Group className="box__form-group" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={password}
                  className="box__input"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Password"
                />
              </Form.Group>
              <Form.Group className="box__form-group" controlId="password2">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password2"
                  value={password2}
                  className="box__input"
                  onChange={(e) => setPassword2(e.target.value)}
                  required
                  placeholder="Confirm Password"
                />
              </Form.Group>
              <button className="box__button" type="submit">Create an account</button>
              <GoogleLogin
                clientId="110514586311-8ad5oqee3o0ef3lchqi7004jag9husjj.apps.googleusercontent.com"
                render={(renderProps) => (
                  <button className="box__googleButton" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                    <svg viewBox="0 0 22 22">
                      <path
                        fill="currentColor"
                        d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z"
                      />
                    </svg>
                    <span>Sign up with Google</span>
                  </button>
                )}
                onSuccess={googleSignUp}
                onFailure={googleFailure}
                cookiePolicy={'single_host_origin'}
              />
            </Form>
          </>
        )
      }
      case "confirmation": {
        return(
          <>
            <p>Confimation link has been sent to your email. Pls confirm your email by clicking on the link.</p>
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
              <button className="box__button" type="submit" onClick={handleOtpSubmit}>Next</button>
            </form>
          </>
        )
      }
      case "roleChoice": {
        return (
          <>
            <Row className="justify-content-center my-5 roleChoice py-5 px-2">
              <h2 className="roleChoice__heading">Manage Roles</h2>
              <p className="roleChoice__tagline">Integer accumsan enim cursus, auctor leo quis, sollicitudin tellus.</p>
              <Row className="justify-content-center pt-3">
                <Col lg="3" md="5" sm="6" xs="10">
                  <button className="role__button" onClick={(e) => {
                      e.preventDefault()
                      handleRoleChoice("freelancer")
                    }
                  }>
                    <div className="circle circle-freelancer"></div>
                    <h6>Are you a Freelancer?</h6>
                    <p>Do you want to send invoices?</p>
                  </button>
                </Col>
                <Col lg="3" md="5" sm="6" xs="10">
                <button className="role__button" onClick={(e) => {
                    e.preventDefault()
                    handleRoleChoice("business")
                  }
                }>
                  <div className="circle circle-business"></div>
                  <h6>Are you a Business?</h6>
                  <p>Do you wants to pay to contractors very easily?</p>
                </button>
                </Col>
              </Row>
            </Row>
          </>
        )
      }
      default: {
        return (
          <>
            <Form onSubmit={handleLogInSubmit}>
              <span className="box__toggle">Don't have an account? </span>
              <a className="box__toggle-link" onClick={() => setRenderForm("signup")}>Sign Up</a>
              <Form.Group className="box__form-group" controlId="email">
                <Form.Label>Email id</Form.Label>
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
              <Form.Group className="box__form-group" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={password}
                  className="box__input"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="password"
                />
              </Form.Group>
              <Link className="box__forgot-password" to={`${props.url}/forgot-password`} >Forgot Password?</Link>
              <button className="box__button" type="submit">Log in</button>
              <GoogleLogin
                clientId="110514586311-8ad5oqee3o0ef3lchqi7004jag9husjj.apps.googleusercontent.com"
                render={(renderProps) => (
                  <button className="box__googleButton" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                    <svg viewBox="0 0 22 22">
                      <path
                        fill="currentColor"
                        d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z"
                      />
                    </svg>
                    <span>Log in with Google</span>
                  </button>
                )}
                onSuccess={googleSignIn}
                onFailure={googleFailure}
                cookiePolicy={'single_host_origin'}
              />
            </Form>
          </>
        )
      }
    }
  }

  return (
    <div className="page">
      <Header />
      <Container>
        {renderForm === "login"
          ?
          <>
            <Row className="justify-content-center my-5">
              <Col lg="4" md="3"></Col>
              <Col lg="4" md="5" sm="10" xs="10">
                <div className="box">
                  <h6 className="box__tagline">Type something here</h6>
                  <h1 className="box__heading">Sign in with<br />Binamite</h1>
                  {handleAuth()}
                </div>
              </Col>
            </Row>
          </>
          : (
            renderForm === "roleChoice"
              ? 
              <>
                {handleAuth()}
              </>
              :
              <>
                <Row className="justify-content-center my-5">
                  <Col lg="4" md="3"></Col>
                  <Col lg="4" md="5" sm="10" xs="10">
                    <div className="box">
                      <h6 className="box__tagline">Type something here</h6>
                      <h1 className="box__heading">Sign up with<br />Binamite</h1>
                      {handleAuth()}
                    </div>
                  </Col>
                </Row>
              </>
          )
        }
      </Container>
    </div>
  );
}

export default Auth;