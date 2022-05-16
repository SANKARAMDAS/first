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
  const [OTP, setOTP] = useState("");

  const handleTitle = (e) => {
    setTitle(e.target.value)
  }

  const handleAmount = (e) => {
    setAmount(e.target.value)
  }

  const [state, setState] = useState({
    otp: ""
  });

  const setValue = (fieldName) => (evt) =>
    setState({ [fieldName]: evt.target.value });

  const handleChange = (otp) => setState({ otp });

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
                    <button
                className="i-butt"
                // onClick={props.onClose}
                type="submit"
              >
                Max Amt.
              </button>
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
             {/* <OtpInput
                separator={
                  <span>
                    <strong>.</strong>
                  </span>
                }
                inputStyle={{
                  width: "3rem",
                  height: "3rem",
                  margin: "0 1rem",
                  fontSize: "2rem",
                  borderRadius: 4,
                  border: "1px solid rgba(0,0,0,0.3)"
                }}
              /> */}
              <div className='modalClass'>

              <OtpInput 
                value={state.otp}
                // justify-content= "center"
                // className="otp-input bg-white mx-2 text-lg justify-content:center focus:outline-none focus:shadow-outline border-gray-300 rounded-lg  block w-full appearance-none leading-normal"
                onChange={handleChange}
                numInputs={4}
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
              >
                Verify
              </button>
            </Modal>
    </div>
  )
}

export default WithdrawFund
