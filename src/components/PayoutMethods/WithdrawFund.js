import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { Form, Table, Container, Row, Col } from 'react-bootstrap'
import 'react-datepicker/dist/react-datepicker.css'
import 'react-input-range/lib/css/index.css'
import './css/WithdrawFund.css'

axios.defaults.withCredentials = true

const WithdrawFund = (props) => {
  const history = useHistory()

  const [title, setTitle] = useState('select')
  const [usern, setUsern] = useState('type here...')
  const [wallteid, setWallteid] = useState('type here..')
  const [ifscCode, setIfscCode] = useState('type here....')

  const handleTitle = (e) => {
    setTitle(e.target.value)
  }

  const handleUserName = (e) => {
    setUsern(e.target.value)
  }

  const handleId = (e) => {
    setWallteid(e.target.value)
  }

  const handleIFscNm = (e) => {
    setIfscCode(e.target.value)
  }

  return (
    <div
      className={
        props.show
          ? 'side-drawerrr open createInvoiceSliderrr'
          : 'side-drawerrr createInvoiceSliderrr'
      }
    >
      <button className="mt-4 mx-4 backButton" onClick={props.onClose}>
        &#60; Back
      </button>
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
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Col lg="12" md="6" sm="12">
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label className="invoice-label">
                    Enter Amount{' '}
                  </Form.Label>
                  <Row >
                      <Col display="flex">
                    <Form.Control
                      onChange={handleUserName}
                      value={usern}
                      className="invoice-input"
                      maxLength=" 30"
                    />
                    </Col>
                    <Col display="flex">
                    <button
                className="i-button"
                onClick={props.onClose}
                type="submit"
              >
                Cancel
              </button>
                    </Col>
                  </Row>
                </Form.Group>
              </Col>
            </Col>

           
            <Col>
              <button
                className="invoice-button"
                // onClick={handleSendInvoice}
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
          </Row>
        </Container>
      </Form>
    </div>
  )
}

export default WithdrawFund
