import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { Form, Table, Container, Row, Col } from 'react-bootstrap'
import 'react-datepicker/dist/react-datepicker.css'
import 'react-input-range/lib/css/index.css'
import {Modal, ModalHeader } from "reactstrap";
import './css/WithdrawFund.css'
import OtpInput from "react-otp-input";
// import OTPInput, { ResendOTP } from "otp-input-react";

axios.defaults.withCredentials = true

const WithdrawFund = (props) => {
  const history = useHistory()

  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [modal, setModal] = useState(false)
  const [otp, setOtp] = useState('')
  const [otp2, setOtp2] = useState('')
  const [modal2, setModal2] = useState(false)
  const [paymentMethodId, setPaymentMethodId] = useState('')

  const handleTitle = (e) => {
    setTitle(e.target.value)
  }
  const handleChange = (otp) => setOtp(otp)
  const handleChange2 = (otp2) => setOtp2(otp2)

  const handleAmount = (e) => {
    setAmount(e.target.value)
  }

  const [state, setState] = useState({
    otp: ""
  });

  const handleVerify = async (e) => {
    e.preventDefault()
    const backendObj = {
      token: otp,
      currency: amount,
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
            `${process.env.REACT_APP_BACKEND_API}/wyre-transfer/transferInitiate`,
            backendObj,
          )
          .then((response) => {
            console.log(response)
            setPaymentMethodId(response.data.paymentMethodId);
            alert('OPT send to your email')
          })
          .catch((err) => {
            console.log('Error: ', err)
          })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const backendObj = {
      otp: otp2,
      currency: amount,
      paymentMethodId: paymentMethodId,
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
            `${process.env.REACT_APP_BACKEND_API}/wyre-transfer/wireTransfer`,
            backendObj,
          )
          .then((response) => {
            console.log(response)
            alert('Withdraw Successful')
          })
          .catch((err) => {
            console.log('Error: ', err)
          })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const setValue = (fieldName) => (evt) =>
    setState({ [fieldName]: evt.target.value });

  return (
    <div
      className={
        props.show
          ? 'side-drawerrr open createInvoiceSliderrr'
          : 'side-drawerrr createInvoiceSliderrr'
      }
    >
      <Form>
        <Container className="py-4 px-4">
          <Row>
            <Col>
              <h5 className="createInvoiceSliderrr__heading">Withdraw Funds</h5>
              <p className="createInvoiceSliderrr__content">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s,
              </p>
            </Col>
          </Row>
          <Row>
            <Col lg="12">
              <Row>
                <Col lg="10" md="6" sm="12">
                  <Form.Group className="mb-3" controlId=" Invoice Title">
                    <Form.Label className="invoice-label">
                      Enter Amount:
                    </Form.Label>
                    <Form.Control
                      onChange={handleTitle}
                      className="invoice-input"
                      value={title}
                      maxLength="25"
                      placeholder="type here.."
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Col lg="12" md="6" sm="12">
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label className="invoice-label">
                    Enter Amount{''}
                  </Form.Label>
                  <Row >
                      <Col display="flex">
                    <Form.Control
                      onChange={handleAmount}
                      value={amount}
                      className="invoice-input"
                      maxLength=" 30"
                      placeholder="type amount"
                    />
                    </Col>
                    <Col display="flex">
                    {/* <button
                className="i-butt"
                // onClick={props.onClose}
                type="submit"
              >
                Max Amt.
              </button> */}
                    </Col>
                  </Row>
                </Form.Group>
              </Col>
            </Col>
          </Row>
        </Container>
      </Form>
      <Col className="wire-withdraw-btn">
              <button
                className="invoice-button"
                onClick={() => setModal(true)}
                type="submit"
              >
                Withdraw to Bank
                <i class="fa-solid fa-arrow-right"></i>
                
              </button>
              <button
                className="i-button"
                onClick={props.onClose}
                type="submit"
              >
                Cancel
              </button>
            </Col>
            <Modal size= 'lg' isOpen={modal} toggle={() => setModal(!modal)}>
             <h1 className="hoding">Verification OTP</h1>
              <div className='modalClass'>

              <OtpInput 
                value={otp}
                // justify-content= "center"
                // className="otp-input bg-white mx-2 text-lg justify-content:center focus:outline-none focus:shadow-outline border-gray-300 rounded-lg  block w-full appearance-none leading-normal"
                onChange={handleChange}
                numInputs={6}
                separator={<span></span>}
                inputStyle={{
                  width: "3rem",
                  height: "3rem",
                  margin: "0 1rem",
                  fontSize: "2rem",
                  borderRadius: 4,
                  border: "1px solid rgba(0,0,0,0.3)",
                  display: "flex",
                  justifycontent: "center",
                  
                }}
              />

              </div>

             <button className='buttnClass'
                type="submit"
                onClick={(e) => {
                  setModal2(true);
                  handleVerify(e);
                }} 
                >
                Verify
              </button>
            </Modal>
            <Modal size="lg" isOpen={modal2} toggle={() => setModal2(!modal2)}>
        <h1 className="hooding">Verification</h1>
        <h3 className="hooding">
          Enable the 2-step verification code from your authenticator app
        </h3>
        <div className="modalClass">
          <OtpInput
            value={otp2}
            // justifyContent= "center"
            // className="otp-input bg-white mx-2 text-lg focus:outline-none focus:shadow-outline border-gray-300 rounded-lg  block w-full appearance-none leading-normal"
            onChange={handleChange2}
            numInputs={4}
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
          <button className="inv-button" onClick={handleSubmit} type="submit">
            Confirm
          </button>
          {/* <button className="i-btn" onClick={props.onClose} type="submit">
            Cancel
          </button> */}
        </Col>
      </Modal>
    </div>
  )
}

export default WithdrawFund
