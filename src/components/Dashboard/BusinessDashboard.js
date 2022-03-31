import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form } from "react-bootstrap";
import "./css/BusinessDashboard.css";

const BusinessDashboard = (props) => {

  const [isLoading, setIsLoading] = useState(true);
  const [invoices, setInvoices] = useState([]);
  const [freelancers, setFreelancers] = useState([]);

  useEffect(() => {
    const getData = async () => {
      console.log("Getting Invoices")
      await axios.post(
        `${process.env.REACT_APP_BACKEND_API}/invoice/getInvoices`,
        {
          role: props.role,
          email: props.email
        }
      )
      .then((response) => {
        setInvoices(response.data.data.reverse())
        console.log(response.data)
      })
      .catch((err) => {
        console.log(err);
      });
      setIsLoading(false)
    }
    getData()
  }, [])

  const renderTemplate = () => {
    if (isLoading) {
      return (
        <div>
          Loading...
        </div>
      )
    } else {
      return(
        <Container fluid className="Dashboard">
          <h4 className="page-heading">Dashboard</h4>
          <Row className="justify-content-between">
            <Col lg="8" md="8" sm="12" xs="12">
              <h5 className="Dashboard__recentInvoices">Recent Invoices</h5>
              {invoices.length === 0 ? (
                <>
                  <p>0 records found</p>
                </>
              ) : (
                <>
                  <table className="Dashboard__table mt-2">
                    <thead>
                      <tr>
                        <th>User Details</th>
                        <th>Amount</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoices.length === 0 ? (
                          <></>
                      ) : (
                        invoices.map(invoice => {
                          return (
                            <tr key={invoice.invoiceId}>
                              <td>
                                <Link className="button" to={`${props.url}/invoices/${invoice.invoiceId}`}>
                                  <b className="name">{invoice.freelancerName}</b>
                                  <br />
                                  <p className="details">
                                    Generated at : {invoice.creationDate}
                                  </p>
                                </Link>
                              </td>
                              <td className="status">{invoice.totalAmount}</td>
                              <td>
                                <span className="cancel status">{invoice.status === "cancel" ? "Cancel" : ""}</span>
                                <span className="resolved status">{invoice.status === "resolved" ? "Resolved" : ""}</span>
                                <span className="pending status">{invoice.status === "pending" ? "Pending" : ""}</span>
                                <div className="status">Invoice due on <span className="cancel">{invoice.dueDate}</span></div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </>
              )}
            </Col>
            <Col className="px-3" lg="4" md="4" sm="12" xs="12">
              <div className="Dashboard__freelancersTeam">
                <h5 className="freelancersTeamHeading">Freelancers Team</h5>
                <p className="freelancersTeamTagline">People who shared invoices.</p>
                {freelancers.length === 0 ? (
                  <></>
                ) : (
                  freelancers.map(freelancer => {
                    return(
                      <div key={freelancer}>
                        {freelancer}
                      </div>
                    )
                  })
                )}
              </div>
            </Col>
          </Row>
        </Container>
      )
    }
  }

  return(
    <>
      {renderTemplate()}
    </>
  )
}

export default BusinessDashboard;