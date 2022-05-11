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

  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')

  const handleTitle = (e) => {
    setTitle(e.target.value)
  }

  const handleAmount = (e) => {
    setAmount(e.target.value)
  }


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
    </div>
  )
}

export default WithdrawFund
