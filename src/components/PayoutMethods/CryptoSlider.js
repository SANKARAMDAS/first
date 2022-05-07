import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { Form, Table, Container, Row, Col } from 'react-bootstrap'
import InputRange from 'react-input-range'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import dateFormat from 'dateformat'
import { useReactToPrint } from 'react-to-print'
import * as htmlToImage from 'html-to-image'
import { jsPDF } from 'jspdf'
import 'react-input-range/lib/css/index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTrash,
  faPlus,
  faPrint,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons'
import './css/CryptoSlider.css'

axios.defaults.withCredentials = true

const CryptoSlider = (props) => {
  const history = useHistory()

  const [mycrypro, setMyCrypto] = useState("");

  const [title, setTitle] = useState('select')
  const [usern, setUsern] = useState('type here...')
  const [wallteid, setWallteid] = useState('type here..')
  
  const handleTitle = (e) => {
    setTitle(e.target.value)
  }

  const handleUserName = (e) => {
    setUsern(e.target.value)
  }

  const handleId = (e) => {
    setWallteid(e.target.value)
  }

  return (
    <div
      className={
        props.show
          ? 'side-drawer open createInvoiceSlider'
          : 'side-drawer createInvoiceSlider'
      }
    >
      <button className="mt-4 mx-4 backButton" onClick={props.onClose}>
        &#60; Back
      </button>
      <Form>
        <Container className="py-4 px-4">
          <Row>
            <Col>
              <h5 className="createInvoiceSlider__heading">
                Add Cryptocurrency
              </h5>
              <p className="createInvoiceSlider__content">
                Save account details for Wire Transfers.
              </p>
            </Col>
          </Row>
          <Row>
            <Col lg="12">
              <Row>
                <Col lg="10" md="6" sm="12">
                  <Form.Group className="mb-3" controlId=" Invoice Title">
                    <Form.Label className="invoice-label">
                      Select Currency: 
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
                  <Form.Label className="invoice-label">Name: </Form.Label>
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
                  <Form.Label className="invoice-label">Wallet ID :</Form.Label>
                  <Form.Control
                    onChange={handleId}
                    className="invoice-input"
                    value={wallteid}
                    maxLength="35"
                  />
                </Form.Group>
              </Col>
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

export default CryptoSlider
