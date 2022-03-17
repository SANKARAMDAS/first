import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Form } from "react-bootstrap";
import "./Profile.css";

const Profile = (props) => {

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");
  const [taxId, setTaxId] = useState("");

  useEffect(() => {
    const getProfile = async () => {
      axios
        .post(`${process.env.REACT_APP_BACKEND_API}/auth/getUserProfile`, {
            email: props.email
        })
        .then((res) => {
          console.log(res.data)
          setAddress(res.data.data.address)
          setCity(res.data.data.city)
          setState(res.data.data.state)
          setZipCode(res.data.data.zipCode)
          setCountry(res.data.data.country)
          setTaxId(res.data.data.taxId)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    getProfile()
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_BACKEND_API}/auth/updateProfile`, {
        email: props.email,
        address,
        city,
        state,
        zipCode,
        country,
        taxId
      })
      .then((res) => {
        console.log(res.data);
        alert(res.data.msg);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
      <Container className="profile">
        <h3 className="profile__heading">Profile</h3>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col lg="4">
              <div className="profile__box">
                <h6 className="profile__boxHeading">Address</h6>
                <Form.Group controlId="address">
                  <Form.Label className="profile__label">House Number</Form.Label>
                  <Form.Control
                    name="address"
                    type="text"
                    className="profile__inputBox"
                    value={address}
                    placeholder="House Number"
                    required
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="city">
                  <Form.Label className="profile__label">City</Form.Label>
                  <Form.Control
                    name="city"
                    type="text"
                    className="profile__inputBox"
                    value={city}
                    placeholder="City"
                    required
                    onChange={(e) => setCity(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="state">
                  <Form.Label className="profile__label">State</Form.Label>
                  <Form.Control
                    name="state"
                    type="text"
                    className="profile__inputBox"
                    value={state}
                    placeholder="State"
                    required
                    onChange={(e) => setState(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="zipCode">
                  <Form.Label className="profile__label">Zip Code</Form.Label>
                  <Form.Control
                    name="zipCode"
                    type="text"
                    className="profile__inputBox"
                    value={zipCode}
                    placeholder="Zip Code"
                    required
                    onChange={(e) => setZipCode(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="country">
                  <Form.Label className="profile__label">Country</Form.Label>
                  <Form.Control
                    name="country"
                    type="text"
                    className="profile__inputBox"
                    value={country}
                    placeholder="Country"
                    required
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </Form.Group>
              </div>
            </Col>
            <Col lg="4">
              <div className="profile__box">
                <h6 className="profile__boxHeading">Company Details</h6>
                <Form.Group controlId="taxId">
                  <Form.Label className="profile__label">Tax Id</Form.Label>
                  <Form.Control
                    name="taxId"
                    type="text"
                    className="profile__inputBox"
                    value={taxId}
                    placeholder="Tax ID"
                    required
                    onChange={(e) => setTaxId(e.target.value)}
                  />
                </Form.Group>
              </div>
            </Col>
            <Col lg="4">
              <div className="profile__box">
                <h6 className="profile__boxHeading">Profile</h6>
                <div className="mt-3">
                  <p className="profile__label">Email</p>
                  <p>{props.email}</p>
                </div>
                <div>
                  <p className="profile__label">Role</p>
                  <p>{props.role}</p>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <button className="profile__button" type="submit">Save Changes</button>
            </Col>
          </Row>
        </Form>
      </Container>
  )
}

export default Profile;