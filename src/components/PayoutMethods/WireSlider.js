import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { Form, Table, Container, Row, Col } from 'react-bootstrap'
import 'react-datepicker/dist/react-datepicker.css'
import 'react-input-range/lib/css/index.css'
import './css/WireSlider.css'

axios.defaults.withCredentials = true

const WireSlider = (props) => {
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
          ? 'side-drawerr open createInvoiceSliderr'
          : 'side-drawerr createInvoiceSliderr'
      }
    >
      <button className="mt-4 mx-4 backButton" onClick={props.onClose}>
        &#60; Back
      </button>
      <Form>
        <Container className="py-4 px-4">
          <Row>
            <Col>
              <h5 className="createInvoiceSliderr__heading">Add Account</h5>
              <p className="createInvoiceSliderr__content">
                Save Account details for Wire Transfers.
              </p>
            </Col>
          </Row>
          <Row>
            <Col lg="12">
              <Row>
                <Col lg="10" md="6" sm="12">
                  <Form.Group className="mb-3" controlId=" Invoice Title">
                    <Form.Label className="invoice-label">
                      Bank Name:
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

              <Col lg="10" md="6" sm="12">
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label className="invoice-label">
                    Account Number{' '}
                  </Form.Label>
                  <Form.Control
                    onChange={handleUserName}
                    value={usern}
                    className="invoice-input"
                    maxLength=" 30"
                  />
                </Form.Group>
              </Col>

              <Col lg="10" md="6" sm="12">
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label className="invoice-label">
                    Swift Code :
                  </Form.Label>
                  <Form.Control
                    onChange={handleId}
                    className="invoice-input"
                    value={wallteid}
                    maxLength="35"
                  />
                </Form.Group>
              </Col>
              <p className="createInvoiceSliderr__content">
                Required for International Transfers
              </p>

              <Col lg="10" md="6" sm="12">
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label className="invoice-label">IFSC Code :</Form.Label>
                  <Form.Control
                    onChange={handleIFscNm}
                    className="invoice-input"
                    value={ifscCode}
                    maxLength="35"
                  />
                </Form.Group>
              </Col>
              <p className="createInvoiceSliderr__content">
                Required for Wire Transfers in India
              </p>
            </Col>

            <Col>
              <button
                className="invoice-button"
                // onClick={handleSendInvoice}
                type="submit"
              >
                Save
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

export default WireSlider
