import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Form } from "react-bootstrap";
import axios from "axios";

const ACHTransfer = (props) => {

  const { invoiceId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState('');
  const [paymentMethods, setPaymentMethods] = useState('');
  const [paymentMethodId, setPaymentMethodId] = useState('');
  const [file, setFile] = useState(null);

  // Individual Account
  const [InFirstName, setInFirstName] = useState('');
  const [InLastName, setInLastName] = useState('');
  const [InAddress, setInAddress] = useState('');
  const [InAddress2, setInAddress2] = useState('');
  const [InCity, setInCity] = useState('');
  const [InPostal, setInPostal] = useState('');
  const [InPhone, setInPhone] = useState('');
  const [InState, setInState] = useState('');
  const [InDay, setInDay] = useState('');
  const [InMonth, setInMonth] = useState('');
  const [InYear, setInYear] = useState('');
  const [InAccountNumber, setInAccountNumber] = useState('');
  const [InAccountType, setInAccountType] = useState('');
  const [InRoutingNumber, setInRoutingNumber] = useState('');

  //Corporate Account
  const [CoCompany, setCoCompany] = useState('');
  const [CoEmail, setCoEmail] = useState('');
  const [CoEinTin, setCoEinTin] = useState('');
  const [CoAccountNumber, setCoAccountNumber] = useState('');
  const [CoAccountType, setCoAccountType] = useState('');
  const [CoRoutingNumber, setCoRoutingNumber] = useState('');

  useEffect(() => {
    const getPaymentMethods = () => {
      axios.get(`${process.env.REACT_APP_BACKEND_API}/wyre-payment/paymentMethods`)
      .then(res => {
        console.log(res);
        setPaymentMethods(res.data);
      })
      .catch(err => {
        console.log(err);
      })
      setIsLoading(false)
    }
    getPaymentMethods()
  },[])

  const handleCreateIndividualPaymentMethod = (e) => {
    e.preventDefault();
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_API}/wyre-payment/createPaymentMethodIN`,
        {
          firstName: InFirstName,
          lastName: InLastName,
          address: InAddress,
          address2: InAddress2,
          city: InCity,
          postal: InPostal,
          phone: InPhone,
          state: InState,
          day: InDay,
          month: InMonth,
          year: InYear,
          accountNumber: InAccountNumber,
          accountType: InAccountType,
          routingNumber: InRoutingNumber
        }
      )
      .then(res => {
        console.log(res);
        setPaymentMethodId(res.data.paymentMethodId);
        setView('upload-bank-document');
      })
      .catch(err => {
        console.log(err);
        alert('Error! Pls Try Again Later');
      })
  }

  const handleUploadBankDocument = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('File', file);

    axios
      .post(
        `${process.env.REACT_APP_BACKEND_API}/wyre-payment/uploadBankDocument`,
        {
          paymentMethodId,
          formData
        }
      )
      .then(res => {
        console.log(res);
        alert('Payment Method Created Successfully!');
      })
      .catch(err => {
        console.log(err);
      })
  }

  const handleCreateCorporatePaymentMethod = (e) => {
    e.preventDefault();
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_API}/wyre-payment/createPaymentMethodCO`,
        {
          company: CoCompany,
          email: CoEmail,
          einTin: CoEinTin,
          accountNumber: CoAccountNumber,
          accountType: CoAccountType,
          routingNumber: CoRoutingNumber
        }
      )
      .then(res => {
        console.log(res);
        setPaymentMethodId(res.data.paymentMethodId);
        setView('upload-bank-document');
      })
      .catch(err => {
        console.log(err);
        alert('Error! Pls try again later');
      })
  }

  const renderView = () => {
    if(isLoading) {
      return(
        <>Loading...</>
      )
    } else {
      switch(view){
        case 'create-payment-methods': {
          return(
            <>
              <h5 className="mt-3">Create Payment Methods</h5>
              <button onClick={() => setView('create-individual-payment-method')}>Individual Account</button>
              <br />
              <button onClick={() => setView('create-corporate-payment-method')}>Corporate Account</button>
            </>
          )
        }
        case 'create-individual-payment-method': {
          return(
            <>
              <h5>Individual Account Payment Method</h5>
              <Form onSubmit={handleCreateIndividualPaymentMethod}>
                <Container>
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="InFirstName"
                          className="input"
                          value={InFirstName}
                          placeholder="First Name"
                          onChange={(e) => setInFirstName(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="InLastName"
                          className="input"
                          value={InLastName}
                          placeholder="Last Name"
                          onChange={(e) => setInLastName(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                          type="text"
                          name="number"
                          className="input"
                          value={InAddress}
                          placeholder="Address Line 1"
                          onChange={(e) => setInAddress(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Control
                          type="text"
                          name="InAddress2"
                          className="input"
                          value={InAddress2}
                          placeholder="Address Line 2"
                          onChange={(e) => setInAddress2(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Control
                          type="text"
                          name="InCity"
                          className="input"
                          value={InCity}
                          placeholder="City"
                          onChange={(e) => setInCity(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Control
                          type="text"
                          name="InState"
                          className="input"
                          value={InState}
                          placeholder="State"
                          onChange={(e) => setInState(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Control
                          type="text"
                          name="InPostal"
                          className="input"
                          value={InPostal}
                          placeholder="Postal Code"
                          onChange={(e) => setInPostal(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Control
                          type="text"
                          name="InPhone"
                          className="input"
                          value={InPhone}
                          placeholder="Phone Number"
                          onChange={(e) => setInPhone(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Form.Label>Date of Birth</Form.Label>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Control
                          type="text"
                          name="InDay"
                          className="input"
                          value={InDay}
                          placeholder="Day"
                          onChange={(e) => setInDay(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Control
                          type="text"
                          name="InMonth"
                          className="input"
                          value={InMonth}
                          placeholder="Month"
                          onChange={(e) => setInMonth(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Control
                          type="text"
                          name="InYear"
                          className="input"
                          value={InYear}
                          placeholder="Year"
                          onChange={(e) => setInYear(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Form.Label>Account Details</Form.Label>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Control
                        type="text"
                        name="InAccountNumber"
                        className="input"
                        value={InAccountNumber}
                        placeholder="Account Number"
                        onChange={(e) => setInAccountNumber(e.target.value)}
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        type="text"
                        name="InAccountType"
                        className="input"
                        value={InAccountType}
                        placeholder="Account Type"
                        onChange={(e) => setInAccountType(e.target.value)}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Control
                        type="text"
                        name="InRoutingNumber"
                        className="input"
                        value={InRoutingNumber}
                        placeholder="Routing Number"
                        onChange={(e) => setInRoutingNumber(e.target.value)}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <button type="submit">Next</button>
                    </Col>
                  </Row>
                </Container>
              </Form>
            </>
          )
        }
        case 'create-corporate-payment-method': {
          return(
            <>
              <h5>Corporate Account Payment Method</h5>
              <Form onSubmit={handleCreateCorporatePaymentMethod}>
                <Container>
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Label>Company Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="CoCompany"
                          className="input"
                          value={CoCompany}
                          placeholder="Company Name"
                          onChange={(e) => setCoCompany(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="text"
                          name="CoEmail"
                          className="input"
                          value={CoEmail}
                          placeholder="Email"
                          onChange={(e) => setCoEmail(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Label>Ein Tin</Form.Label>
                        <Form.Control
                          type="text"
                          name="CoEinTin"
                          className="input"
                          value={CoEinTin}
                          placeholder="Ein Tin"
                          onChange={(e) => setCoEinTin(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Account Number</Form.Label>
                        <Form.Control
                          type="text"
                          name="CoAccountNumber"
                          className="input"
                          value={CoAccountNumber}
                          placeholder="Account Number"
                          onChange={(e) => setCoAccountNumber(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Label>Account Type</Form.Label>
                        <Form.Control
                          type="text"
                          name="CoAccountType"
                          className="input"
                          value={CoAccountType}
                          placeholder="Account Type"
                          onChange={(e) => setCoAccountType(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Routing Number</Form.Label>
                        <Form.Control
                          type="text"
                          name="CoRoutingNumber"
                          className="input"
                          value={CoRoutingNumber}
                          placeholder="Routing Number"
                          onChange={(e) => setCoRoutingNumber(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Container>
                <button type="submit">Next</button>
              </Form>
            </>
          )
        }
        case 'upload-bank-document': {
          return(
            <>
              <h5>Upload bank document</h5>
              <Form onSubmit={handleUploadBankDocument}>
                <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                <br /><br />
                <button type="submit">Create</button>
              </Form>
            </>
          )
        }
        default: {
          return(
            <>
              <button onClick={() => setView('create-payment-methods')}>Create Payment Method</button>
              {paymentMethods}
            </>
          )
        }
      }
    }

  }

  return(
    <>
      <div className="paymentDebitCard">
        <h3 className="pb-3 heading">Payment Methods</h3>
        <div className="tabs">
          <Link className="tab" to={`${props.url}/invoices/${invoiceId}/pay/debit-card`}>Card Payment</Link>
          <div className="tab active">ACH</div>
        </div>
        <div className="contentArea">
          <h4 className="sub-heading">ACH Transfer</h4>
          {renderView()}
        </div>
      </div>
    </>
  )
}

export default ACHTransfer;