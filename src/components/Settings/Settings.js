import React, { useState, useEffect } from 'react'
import { sha256 } from 'js-sha256'
import axios from 'axios'
import { Container, Row, Col, Form } from 'react-bootstrap'
import './Settings.css'
import { Modal, ModalHeader } from 'reactstrap'
import OtpInput from 'react-otp-input'
import QRCode from 'qrcode'

const Settings = (props) => {
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [modal, setModal] = useState(false)
  const [modal2, setModal2] = useState(false)
  const [otp, setOtp] = useState('')
  const [temp, setTemp] = useState('')
  const [qrcode, setQrCode] = useState('')
  const [src, setSrc] = useState('')

  const handleChange = (otp) => setOtp(otp)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password === passwordConfirm) {
      const hashedPassword = sha256(password)

      axios
        .post(`${process.env.REACT_APP_BACKEND_API}/auth/passwordReset`, {
          email: props.email,
          password: hashedPassword,
        })
        .then((res) => {
          console.log(res.data)
          alert(res.data.msg)
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      console.log('Password do not match')
    }
  }

  const handleConfirm = async (e) => {
    e.preventDefault()
    const backendObj = {
      token: otp,
    }
    console.log('Backendobj: ')
    console.log(backendObj)

    axios
      .post(`${process.env.REACT_APP_BACKEND_API}/auth/refresh`, {
        withCredentials: true,
      })
      .then(() => {
        axios
          .post(
            `${process.env.REACT_APP_BACKEND_API}/payoutAuth/verify`,
            backendObj,
          )
          .then((response) => {
            console.log(response)
            alert('Verification Successfull')
          })
          .catch((err) => {
            console.log('Error: ', err)
          })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  // useEffect(() => {
  //   QRCode.toDataURL(text).then(setSrc);
  // }, []);

  // const handleEnable = async (e) => {
  //   e.preventDefault()
  //   axios
  //     .post(`${process.env.REACT_APP_BACKEND_API}/auth/refresh`, {
  //       withCredentials: true,
  //     })
  //     .then(() => {
  //       axios
  //         .post(
  //           `${process.env.REACT_APP_BACKEND_API}/payoutAuth/enable`,
  //           backendObj,
  //         )
  //         .then((response) => {
  //           console.log(response)
  //           // temp: temp_secret.base32,
  //           data_url: qrcode,  //link   iframe link pass 
  //         })
  //         .catch((err) => {
  //           console.log('Error: ', err)
  //         })
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //     })
  // }

  return (
    <Container className="settings">
      <h3 className="settings__heading">Settings</h3>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col lg="8">
                <div className="settings__box">
                  <h6 className="settings__boxHeading">Change Password</h6>
                  <Form.Group controlId="password">
                    <Form.Label className="settings__label">
                      New Password
                    </Form.Label>
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
                    <Form.Label className="settings__label mt-4">
                      Confirm New Password
                    </Form.Label>
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
                  <button className="settings__button" type="submit">
                    Reset Password
                  </button>
                </div>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col>
          <Col lg="7">
            <div className="settings__box">
              <h6 className="settings__boxHeading">
                Enable 2-step verification
              </h6>
              <button
                className="settings__button"
                type="submit"
                onClick={() => {
                  setModal(true)
                }}
              >
                Enable
              </button>
            </div>
          </Col>
        </Col>
      </Row>
      <Modal size="lg" isOpen={modal} toggle={() => setModal(!modal)}>
        <h1 className="hooding">QR Code</h1>
        <div ><img src={src}/></div>
        <button
          className="btnenb"
          type="submit"
          onClick={() => {
            setModal2(true)
            // handleEnable()
          }}
        >
          Enable
        </button>
      </Modal>
      <Modal size="lg" isOpen={modal2} toggle={() => setModal2(!modal2)}>
        <h1 className="hooding">Verification</h1>
        <h3 className="hooding">
          Enable the 2-step verification code from your authenticator app
        </h3>
        <div className="modalClass">
          <OtpInput
            value={otp}
            // justifyContent= "center"
            // className="otp-input bg-white mx-2 text-lg focus:outline-none focus:shadow-outline border-gray-300 rounded-lg  block w-full appearance-none leading-normal"
            onChange={handleChange}
            numInputs={6}
            separator={<span></span>}
            inputStyle={{
              width: '3rem',
              height: '3rem',
              margin: '0 1rem',
              fontSize: '2rem',
              borderRadius: 4,
              border: '1px solid rgba(0,0,0,0.3)',
            }}
          />
        </div>

        <Col className="buttn">
          <button className="inv-button" onClick={handleConfirm} type="submit">
            Confirm
          </button>
          <button className="i-btn" onClick={props.onClose} type="submit">
            Cancel
          </button>
        </Col>
      </Modal>
    </Container>
  )
}

export default Settings
