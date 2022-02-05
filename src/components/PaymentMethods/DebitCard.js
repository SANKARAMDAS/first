import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Form } from "react-bootstrap";

const DebitCard = () => {

  const { invoiceId } = useParams();
  const [debitCard, setDebitCard] = useState({
   number: "",
   year: "",
   month: "",
   cvv: ""
  });
  const [currency, setCurrency] = useState('');
  const [givenName, setGivenName] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [ipAddress, setIpAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: ""
   });

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

    //const ip = await axios.get('https://geolocation-db.com/json/');
    setIpAddress('127.0.0.1');

    axios
      .post(
        `${process.env.REACT_APP_BACKEND_API}/debitCardQuote`,
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
        alert('Invoice paid successfully!');
      })
      .catch(err => {
        console.log(err);
      })
  }
  
  return(
    <>
      <h3 className="pb-3">Pay using Debit Card</h3>
      <Form onSubmit={handleDebitCardDetailsSubmit}>
        <h5>Enter Debit Card Details</h5>
        <Container>
          <Row>
            <Col>
              <Form.Control
                type="text"
                name="number"
                value={debitCard.number}
                placeholder="Debit Card Number"
                onChange={handleDebitCardChange}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Control
                type="text"
                name="year"
                value={debitCard.year}
                placeholder="Year of Expiry"
                onChange={handleDebitCardChange}
              />
            </Col>
            <Col>
              <Form.Control
                type="text"
                name="month"
                value={debitCard.month}
                placeholder="Month of Expiry"
                onChange={handleDebitCardChange}
              />
            </Col>
            <Col>
              <Form.Control
                type="text"
                name="cvv"
                value={debitCard.cvv}
                placeholder="CVV Number"
                onChange={handleDebitCardChange}
              />
            </Col>
          </Row>
          <Row>
            <Col><h5>Other Details</h5></Col>
          </Row>
          <Row>
            <Col>
              <Form.Control
                type="text"
                name="currency"
                value={currency}
                placeholder="Currency"
                onChange={(e) => setCurrency(e.target.value)}
              />
            </Col>
            <Col>
              <Form.Control
                type="text"
                name="givenName"
                value={givenName}
                placeholder="Name"
                onChange={(e) => setGivenName(e.target.value)}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Control
                type="text"
                name="familyName"
                value={familyName}
                placeholder="Family Name"
                onChange={(e) => setFamilyName(e.target.value)}
              />
            </Col>
            <Col>
              <Form.Control
                type="text"
                name="phone"
                value={phone}
                placeholder="Phone Number"
                onChange={(e) => setPhone(e.target.value)}
              />
            </Col>
          </Row>
          <Row>
            <Col><h5>Address</h5></Col>
          </Row>
          <Row>
            <Col>
              <Form.Control
                type="text"
                name="street"
                value={address.street}
                placeholder="Street"
                onChange={handleAddressChange}
              />
            </Col>
            <Col>
              <Form.Control
                type="text"
                name="city"
                value={address.city}
                placeholder="City"
                onChange={handleAddressChange}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Control
                type="text"
                name="state"
                value={address.state}
                placeholder="State"
                onChange={handleAddressChange}
              />
            </Col>
            <Col>
              <Form.Control
                type="text"
                name="postalCode"
                value={address.postalCode}
                placeholder="Postal Code"
                onChange={handleAddressChange}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Control
                type="text"
                name="country"
                value={address.country}
                placeholder="Country"
                onChange={handleAddressChange}
              />
            </Col>
          </Row>
        </Container>
        <button type="submit">Pay Now</button>
      </Form>
    </>
  )
}

export default DebitCard;