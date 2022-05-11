import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { Form, Table, Container, Row, Col } from 'react-bootstrap'
import 'react-datepicker/dist/react-datepicker.css'
import 'react-input-range/lib/css/index.css'
import './css/WireSlider.css'

axios.defaults.withCredentials = true

const WireSlider = (props) => {


  const [usrname, setUserName] = useState('');
  const [accname, setAccname] = useState('');
  const [swiftcode, setSwiftCode] = useState('');
  // const [ifscCode, setIfscCode] = useState('');
  const [message, setMessage] = useState("");

  const handleUsrnm = (e) => {
    setUserName(e.target.value)
  };

  const handleAccName = (e) => {
    setAccname(e.target.value)
  };

  const handleSwiftcode = (e) => {
    setSwiftCode(e.target.value)
  };

  // const handleIFscCode = (e) => {
  //   setIfscCode(e.target.value)
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(text)

    const backendObj = {
      name: usrname,
      accountNumber: accname,
      swiftBic: swiftcode,
    };

    console.log('Backendobj: ');
    console.log(backendObj);

    axios.post(`${process.env.REACT_APP_BACKEND_API}/auth/refresh`, {
      withCredentials: true
    }).then(() => {
      axios
      .post(
        `${process.env.REACT_APP_BACKEND_API}/wyre-payment/createSwiftPaymentMethod`,
        backendObj
      )
      .then((response) => {
        console.log(response);
        alert('User details update successfully');
      })
      .catch((err) => {
        console.log('Error: ',err);
      });
    }).catch((error) => {
      console.log(error)
    })
  };

  return (
    <div
      className={
        props.show
          ? 'side-drawerr open createInvoiceSliderr'
          : 'side-drawerr createInvoiceSliderr'
      }
    >
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
                      Owner Name:
                    </Form.Label>
                    <Form.Control
                      onChange={handleUsrnm}
                      className="invoice-input"
                      value={usrname}
                      maxLength="25"
                      placeholder="type here"
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
                    onChange={handleAccName}
                    value={accname}
                    className="invoice-input"
                    maxLength=" 30"
                    placeholder="type here.."
                  />
                </Form.Group>
              </Col>

              <Col lg="10" md="6" sm="12">
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label className="invoice-label">
                    Swift Code :
                  </Form.Label>
                  <Form.Control
                    onChange={handleSwiftcode}
                    className="invoice-input"
                    value={swiftcode}
                    maxLength="35"
                    placeholder="type here.."
                  />
                </Form.Group>
              </Col>
              <p className="createInvoiceSliderr__content">
                Required for International Transfers
              </p>

              {/* <Col lg="10" md="6" sm="12">
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label className="invoice-label">IFSC Code :</Form.Label>
                  <Form.Control
                    onChange={handleIFscCode}
                    className="invoice-input"
                    value={ifscCode}
                    maxLength="35"
                    placeholder="type here.."
                  />
                </Form.Group>
              </Col> */}
              {/* <p className="createInvoiceSliderr__content">
                Required for Wire Transfers in India
              </p> */}
            </Col>
            <hr  style={{
    color: '#000000',
    backgroundColor: '#000000',
    height: .5,
    borderColor : '#000000'
}}/>
          </Row>
        </Container>
      </Form>
      <Col className="butt">
              <button
                className="invoice-button"
                onClick={handleSubmit}
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
            {/* <div className="message">{message ? <p>{message}</p> : null}</div> */}
    </div>
  )
}

export default WireSlider
