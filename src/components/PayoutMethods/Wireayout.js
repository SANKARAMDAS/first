import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Form } from "react-bootstrap";
import "./css/Wireayout.css";

const WirePayout = (props) => {

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
        alert('Invoice paid successfully!');
      })
      .catch(err => {
        console.log(err);
      })
  }
  
  return(
    <div className="paymentDebitCard">
      <h3 className="pb-3 heading">Payment Methods</h3>
      <div className="tabs">
        <div className="tab active">Card Payment</div>
        <Link className="tab" to={`${props.url}/invoices/${invoiceId}/pay/ach-transfer`}>ACH</Link>
      </div>
      <div className="contentArea">
        <h4 className="sub-heading">Debit Card</h4>
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
                    name="street"
                    value={address.street}
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

export default WirePayout;