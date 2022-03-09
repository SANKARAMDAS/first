import React from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Header from "../Header/Header";
import mrstyle from './ManageRole.css';

const ManageRole = () => {

  const history = useHistory();

  const { confirmationCode } = useParams();
  const tokenId = ""

  const handleRoleChoice = (role) => {
    if (tokenId === "") {
      axios
        .post(`${process.env.REACT_APP_BACKEND_API}/auth/verifyEmail`, { confirmationCode, role })
        .then((res) => {
          console.log('Role: '+ role);
          console.log(res);
          alert("Account Created Successfully!")
          history.push('/auth')
        })
        .catch(err => {
          console.log(err);
          alert("Error!");
        })
    } else {
      axios
        .post(`${process.env.REACT_APP_BACKEND_API}/google-api/googleSignup`, { confirmationCode, role })
        .then((res) => {
          console.log(res);
          alert("Account Created Successfully!")

        })
    }
  }
  
  return(
    <div className={mrstyle}>
      <Header />
      <Row className="justify-content-center my-5 roleChoice py-5 px-2">
        <h2 className="roleChoice__heading">Manage Roles</h2>
        <p className="roleChoice__tagline">Integer accumsan enim cursus, auctor leo quis, sollicitudin tellus.</p>
        <Row className="justify-content-center pt-3">
          <Col lg="3" md="5" sm="6" xs="10">
            <button className="role__button" onClick={(e) => {
                e.preventDefault()
                handleRoleChoice("Freelancer")
              }
            }>
              <div className="circle circle-freelancer"></div>
              <h6>Are you a Freelancer?</h6>
              <p>Do you want to send invoices?</p>
            </button>
          </Col>
          <Col lg="3" md="5" sm="6" xs="10">
          <button className="role__button" onClick={(e) => {
              e.preventDefault()
              handleRoleChoice("Business")
            }
          }>
            <div className="circle circle-business"></div>
            <h6>Are you a Business?</h6>
            <p>Do you wants to pay to contractors very easily?</p>
          </button>
          </Col>
        </Row>
      </Row>
    </div>
  )
}

export default ManageRole;