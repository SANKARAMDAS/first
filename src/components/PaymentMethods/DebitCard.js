import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Form } from "react-bootstrap";
import "./css/DebitCard.css";
import CardIcon from "./icons/Card.svg";
import AuthModal from "./AuthModal";

axios.defaults.withCredentials = true

const DebitCard = (props) => {

  const { invoiceId } = useParams();
  const [showModal, setShowModal] = useState(false)
  const [debitCard, setDebitCard] = useState({
   number: "4111111111111111",
   year: "2023",
   month: "01",
   cvv: "123"
  });
  const [currency, setCurrency] = useState('USD');
  const [givenName, setGivenName] = useState('Crash');
  const [familyName, setFamilyName] = useState('Bandicoot');
  const [ipAddress, setIpAddress] = useState('1.1.1.3');
  const [phone, setPhone] = useState('1-212-456-7880');
  const [address, setAddress] = useState({
    street1: "14 Fak3 St",
    city: "San huran2",
    state: "CA",
    postalCode: "93985",
    country: "US"
  });

  const handleShowModal = () => {
    setShowModal(true)
  }

  const handleDebitCardChange = (e) => {
    const { name, value } = e.target;
    setDebitCard(debitCard => ({
      ...debitCard,
      [name]: value,
    }));
  }

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress(address => ({
      ...address,
      [name]: value,
    }));
  }

  const handleDebitCardDetailsSubmit = async (e) => {
    e.preventDefault();
    console.log({
      invoiceId,
      debitCard,
      currency,
      givenName,
      familyName,
      ipAddress,
      phone,
      address
    })
    axios.post(`${process.env.REACT_APP_BACKEND_API}/auth/refresh`, {
      withCredentials: true
    }).then(() => {
      axios
      .post(
        `${process.env.REACT_APP_BACKEND_API}/wyre-payment/debitCardQuote`,
        {
          invoiceId,
          debitCard,
          currency,
          givenName,
          familyName,
          ipAddress,
          phone,
          address
        }
      )
      .then((res) => {
        console.log(res);
        axios
        .post(
          `${process.env.REACT_APP_BACKEND_API}/wyre-payment/getAuthorization`,
          {invoiceId}
        )
        .then(res2 => {
          console.log('Invoice ID: ', invoiceId);
          setShowModal(true)
        })
      })
      .catch(err => {
        console.log(err);
      })
    }).catch((error) => {
      console.log(error)
    })    
  }
  
  return(
    <div className="paymentDebitCard">
      <AuthModal onClose={() => setShowModal(false)} show={showModal} invoiceId={invoiceId} />
      <h3 className="pb-3 heading">Payment Methods</h3>
      <div className="tabs">
        <div className="tab active"><img src={CardIcon} /> Card Payment</div>
        {/*
        <Link className="tab" to={`${props.url}/invoices/${invoiceId}/pay/ach-transfer`}>ACH</Link>
        */}
      </div>
      <div className="contentArea">
        <h4 className="sub-heading">Card Details</h4>
        <Form onSubmit={handleDebitCardDetailsSubmit}>
          <Container>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Card Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="number"
                    className="input"
                    value={debitCard.number}
                    placeholder="eg: 0000-0000-0000-0000"
                    onChange={handleDebitCardChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Name on Card</Form.Label>
                  <Form.Control
                    type="text"
                    name="givenName"
                    className="input"
                    value={givenName}
                    placeholder="Name"
                    onChange={(e) => setGivenName(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Valid Till(Year)</Form.Label>
                  <Form.Control
                    type="text"
                    name="year"
                    className="input"
                    value={debitCard.year}
                    placeholder="YY"
                    onChange={handleDebitCardChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Valid Till(Month)</Form.Label>
                  <Form.Control
                    type="text"
                    name="month"
                    className="input"
                    value={debitCard.month}
                    placeholder="MM"
                    onChange={handleDebitCardChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>CVV</Form.Label>
                  <Form.Control
                    type="text"
                    name="cvv"
                    className="input"
                    value={debitCard.cvv}
                    placeholder="CVV Number"
                    onChange={handleDebitCardChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              
            </Row>
            <Row>
              <Col><h6 className="mt-3">Other Details</h6></Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Family Name</Form.Label>
                  <Form.Control
                  type="text"
                  name="familyName"
                  className="input"
                  value={familyName}
                  placeholder="Family Name"
                  onChange={(e) => setFamilyName(e.target.value)}
                />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="phone"
                    className="input"
                    value={phone}
                    placeholder="Phone Number"
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Currency</Form.Label>
                  <Form.Control
                    type="text"
                    name="currency"
                    className="input"
                    value={currency}
                    placeholder="eg: USD"
                    onChange={(e) => setCurrency(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col><h6 className="mt-3">Address</h6></Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Street</Form.Label>
                  <Form.Control
                    type="text"
                    name="street1"
                    value={address.street1}
                    className="input"
                    placeholder="Street"
                    onChange={handleAddressChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    name="city"
                    value={address.city}
                    className="input"
                    placeholder="City"
                    onChange={handleAddressChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    type="text"
                    name="state"
                    value={address.state}
                    className="input"
                    placeholder="State"
                    onChange={handleAddressChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    type="text"
                    name="country"
                    value={address.country}
                    className="input"
                    placeholder="Country"
                    onChange={handleAddressChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Postal Code</Form.Label>
                  <Form.Control
                    type="text"
                    name="postalCode"
                    value={address.postalCode}
                    className="input"
                    placeholder="Postal Code"
                    onChange={handleAddressChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Container>
          <button type="submit">Pay Now</button>
        </Form>
      </div>
    </div>
  )
}

export default DebitCard;