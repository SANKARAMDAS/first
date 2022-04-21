import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form } from "react-bootstrap";
import "./css/DisplayInvoices.css"
import Filter from "./images/Filter.svg";
import Flag from "./images/Flag.svg";
import PreviewInvoiceModal from "./PreviewInvoiceModal";
import CreateInvoiceSlider from "./CreateInvoiceSlider";
import Backdrop from "./Backdrop";

const DisplayInvoices = (props) => {

  const [invoices, setInvoices] = useState([])
  const [filteredInvoices, setFilteredInvoices] = useState([])
  const [filterKeyword, setFilteredKeyword] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [modalInvoice, setModalInvoice] = useState({})
  const [sliderOpen, setSliderOpen] = useState(false)

  const current = new Date();
  let month = "";
  if (current.getMonth()+1 <= 9) {
    const currMonth = current.getMonth()+1;
    month = '0'+currMonth;
  } else {
    month = current.getMonth()+1;
  }
  const date = `${current.getDate()}/${month}/${current.getFullYear()}`;

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

  const handleShowModal = (invoice) => {
    setModalInvoice(invoice)
    setShowModal(true)
  }

  const sliderToggle = () => {
    setSliderOpen(!sliderOpen)
  }

  const backdropClickHandler = () => {
    setSliderOpen(false)
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
          <PreviewInvoiceModal onClose={() => setShowModal("")} show={showModal} invoice={modalInvoice} role={props.role} />
          <CreateInvoiceSlider onClose={() => setSliderOpen(false)} show={sliderOpen} email={props.email} />
          {sliderOpen ? <Backdrop close={backdropClickHandler} /> : <></>}
          <Row className="justify-content-center mb-5">
            <Col lg="11" md="12" sm="12" xs="12" className="displayInvoices__topSection">
              <Form.Label>Filter by Keyword</Form.Label>
              <Form onSubmit={handleFilter}>
                <Container className="p-0">
                <Row>
                  <Col lg="8" md="10" sm="12" xs="12">
                    <Form.Control
                      type="text"
                      value={filterKeyword}
                      placeholder="Type filter keyword..."
                      className="input mt-3"
                      onChange={(e) => setFilteredKeyword(e.target.value)}
                    />
                  </Col>
                  <Col lg="2" md="2" sm="4" xs="6">
                    <button type="submit" className="mt-3"><img src={Filter} /> Filter</button>
                  </Col>
                  <Col lg="2" md="4" sm="4" xs="6">
                    {props.role === "freelancer" ?
                      <button className="displayInvoices__createNew mt-3" onClick={() => sliderToggle()}><span className="plus">+</span> Create New</button>
                      : <></>
                    }
                  </Col>
                </Row>
                </Container>
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
                        {props.role === "freelancer" ? <th>Invoice ID</th> : <></>}
                        <th>{props.role === "freelancer" ? "Business" : "Freelancer"}</th>
                        {props.role === "freelancer" ? <></> : <th>Due Date</th>}
                        <th>Email ID</th>
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
                              {props.role === "freelancer" ? <td><button className="modalButton" onClick={() => handleShowModal(invoice)}>{invoice.invoiceId}</button></td> : <></>}
                              <td>
                                <button className="modalButton business" onClick={() => handleShowModal(invoice)}>
                                  <div className="circle"></div>
                                  <div>
                                    {invoice.creationDate === date && props.url === "business" ? 
                                      <div className="newInvoice">
                                        <img src={Flag} /> New Invoice
                                      </div> 
                                      : <></> 
                                    }
                                    <div className="name">{props.role === "freelancer" ? invoice.businessName : invoice.freelancerName}</div>
                                    <span className="details">
                                      {props.role === "freelancer" ? <></> : <>#{invoice.invoiceId}<br /></>}
                                      Generated at : {invoice.creationDate}
                                    </span>
                                  </div>
                                </button>
                              </td>
                              {props.role === "freelancer" ? <></> : <td>{invoice.dueDate}</td>}
                              <td>{invoice.businessEmail}</td>
                              <td>${invoice.totalAmount}</td>
                              <td>
                                <span className="cancel">{invoice.status === "cancel" ? "Cancel" : ""}</span>
                                <span className="resolved">{invoice.status === "resolved" ? "Resolved" : ""}</span>
                                <span className="pending">{invoice.status === "pending" ? "Pending" : ""}</span>
                                {props.role === "freelancer" ? <><br />Invoice due on {invoice.dueDate}</> : <></>}
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