import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form } from "react-bootstrap";
import "./css/DisplayInvoices.css"
import Filter from "./images/Filter.svg";

const DisplayInvoices = (props) => {

  const [invoices, setInvoices] = useState([])
  const [filteredInvoices, setFilteredInvoices] = useState([])
  const [filterKeyword, setFilteredKeyword] = useState("")
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
            setInvoices(response.data.data.reverse())
            setFilteredInvoices(response.data.data.reverse())
            console.log(response.data)
          })
          .catch((err) => {
            console.log(err);
          });
        setIsLoading(false)
    }

  getInvoices()
  }, [])

  const handleFilter = (e) => {
    e.preventDefault();
    const f = invoices.filter(invoice => {
      if(props.role === "freelancer") {
        return invoice.businessName.toLowerCase().includes(filterKeyword) ||
        invoice.businessEmail.toLowerCase().includes(filterKeyword) ||
        invoice.invoiceId.toLowerCase().includes(filterKeyword) ||
        invoice.status.toLowerCase().includes(filterKeyword) ||
        invoice.dueDate.toLowerCase().includes(filterKeyword)
      } else {
        return invoice.freelancerName.toLowerCase().includes(filterKeyword) ||
        invoice.freelancerEmail.toLowerCase().includes(filterKeyword) ||
        invoice.invoiceId.toLowerCase().includes(filterKeyword) ||
        invoice.status.toLowerCase().includes(filterKeyword) ||
        invoice.dueDate.toLowerCase().includes(filterKeyword)
      }
    })
    setFilteredInvoices(f)
  }

  const renderInvoices = () => {
    if (isLoading) {
      return (
        <div>
          Loading...
        </div>
      )
    } else {
      return (
        <Container fluid className="displayInvoices">
          <h3 className="displayInvoices__heading">Invoices List</h3>
          <Row className="justify-content-center">
            <Col lg="11" className="displayInvoices__topSection">
              <Form.Label>Search by Keyword</Form.Label>
              <Form onSubmit={handleFilter}>
                <Form.Control
                  type="text"
                  value={filterKeyword}
                  placeholder="Type search keyword..."
                  className="input"
                  onChange={(e) => setFilteredKeyword(e.target.value)}
                />
                <button type="submit"><img src={Filter} /> Filter</button>
              </Form>
            </Col>
            <Col lg="11" className="mt-3">
              {filteredInvoices.length === 0 ? (
                <>
                  <p>0 records found</p>
                </>
              ) : (
                <>
                  <table className="displayInvoices__table mt-2">
                    <thead>
                      <tr>
                        <th>{props.role === "freelancer" ? "Business" : "Freelancer"}</th>
                        <th>Due Date</th>
                        <th>Total Amount</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoices.length === 0 ? (
                          <></>
                      ) : (
                        filteredInvoices.map(invoice => {
                          return (
                            <tr key={invoice.invoiceId}>
                              <td>
                                <Link className="button" to={`${props.url}/invoices/${invoice.invoiceId}`}>
                                  <b>{props.role === "freelancer" ? invoice.businessName : invoice.freelancerName}</b>
                                  <br />
                                  <span className="details">
                                    {props.role === "freelancer" ? invoice.businessEmail : invoice.freelancerEmail}
                                    <br />
                                    #{invoice.invoiceId}
                                    <br />
                                    Generated at : {invoice.creationDate}
                                  </span>
                                </Link>
                              </td>
                              <td>{invoice.dueDate}</td>
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