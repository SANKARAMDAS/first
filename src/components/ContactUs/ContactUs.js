import React, { useState } from "react";
import axios from "axios";
import { Form } from "react-bootstrap";
import Header from "../Header/Header";

const ContactUs = () => {

  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [questions, setQuestions] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_API}/contact`,
        {
          firstName,
          middleName,
          lastName,
          email,
          questions
        }
      )
      .then(res => {
        console.log(res);
        alert('Contact Form Submitted Successfully!');
        setFirstName('');
        setMiddleName('');
        setLastName('');
        setEmail('');
        setQuestions('');
      })
      .catch(err => {
        console.log(err);
        alert('Error! Pls Try Again Later!!');
      })
  }

  return(
    <div className="page">
      <Header />
      <h3>Contact Us</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Control
          type="text"
          name="firstName"
          value={firstName}
          required
          placeholder="First Name"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <Form.Control
          type="text"
          name="middleName"
          value={middleName}
          placeholder="Middle Name (optional)"
          onChange={(e) => setMiddleName(e.target.value)}
        />
        <Form.Control
          type="text"
          name="lastName"
          value={lastName}
          required
          placeholder="Last Name"
          onChange={(e) => setLastName(e.target.value)}
        />
        <Form.Control
          type="email"
          name="email"
          value={email}
          required
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Form.Control
          as="textarea"
          rows={3}
          name="questions"
          value={questions}
          required
          placeholder="Message"
          onChange={(e) => setQuestions(e.target.value)}
        />
        <br />
        <button type="submit">Send</button>
      </Form>
    </div>
  )
}

export default ContactUs;