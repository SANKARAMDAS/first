import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "./css/DisplayInvoices.css"

const DisplayInvoices = (props) => {

  const [invoices, setInvoices] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getInvoices = async () => {
        console.log("Getting Invoices")
        console.log(props)
        await axios
          .post(
            `${process.env.REACT_APP_BACKEND_API}/invoice/getInvoices`,
            {
                role: props.role,
                email: props.email
            }
          )
          .then((response) => {
            setInvoices(response.data.data)
            console.log(response.data)
          })
          .catch((err) => {
            console.log(err);
          });
        setIsLoading(false)
    }

  getInvoices()
  }, [])

  const renderInvoices = () => {
    if (isLoading) {
      return (
        <div>
          Loading...
        </div>
      )
    } else {
      return (
        <Container className="displayInvoices">
          <h3 className="displayInvoices__heading">Invoices List</h3>
          <Row>
            <Col>
              {invoices.length === 0 ? (
                <>
                  <p>0 records found</p>
                </>
              ) : (
                <>
                  <table className="displayInvoices__table mt-2">
                    <thead>
                      <tr>
                        <th>Invoice No.</th>
                        <th>{props.role === "freelancer" ? "Business Name" : "Freelancer Name"}</th>
                        <th>Total Amount</th>
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
                              <td><Link className="button" to={`${props.url}/invoices/${invoice.invoiceId}`}>{invoice.invoiceId}</Link></td>
                              <td>{props.role === "freelancer" ? invoice.businessName : invoice.freelancerName}</td>
                              <td>{invoice.totalAmount}</td>
                              <td>
                                <span className="cancel">{invoice.status === "cancel" ? "Cancel" : ""}</span>
                                <span className="resolved">{invoice.status === "resolved" ? "Resolved" : ""}</span>
                                <span className="pending">{invoice.status === "pending" ? "Pending" : ""}</span>
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
          </Row>
        </Container>
      )
    }
  }

  return (
    <>
      {renderInvoices()}
    </>
  );
}

export default DisplayInvoices;