import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import "./css/PreviewInvoiceModal.css";

const PreviewInvoiceModal = (props) => {

  const history = useHistory();
  const [isChecked, setIsChecked] = useState(false);

  const handleOnCheck = () => {
    setIsChecked(!isChecked);
  };

  if(!props.show) {
    return null
  }

  const handleCancelInvoice = () => {
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_API}/invoice/updateInvoiceStatus`,
        {
          email: props.invoice.freelancerEmail,
          name: props.invoice.freelancerName,
          status: "cancel",
          invoiceId: props.invoice.invoiceId
        }
      )
      .then(() => {
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const handleResolveInvoice = () => {
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_API}/invoice/updateInvoiceStatus`,
        {
          email: props.invoice.freelancerEmail,
          name: props.invoice.freelancerName,
          status: "resolved",
          invoiceId: props.invoice.invoiceId
        }
      )
      .then(() => {
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const renderButtons = () => {
    switch(props.invoice.status) {
      case "cancel": {
        return (
          <>
            <div className="mt-2">
              <p className="label">Status</p>
              <p className="detail">Cancelled</p>
            </div>
            <button className="back" onClick={props.onClose}>Back</button>
          </>
        )
      }
      case "resolved": {
        if (props.role === "freelancer") {
          return(
            <button className="back" onClick={props.onClose}>Back</button>
          )
        } else {
          return (
            <div className="my-3">
              <div className="my-2">
                <input
                  type="checkbox"
                  id="wyre-agreement"
                  name="wyre-agreement"
                  checked={isChecked}
                  onChange={handleOnCheck}
                /> <span className="checkBoxText">I accept the <a className="text-black" href="https://www.sendwyre.com/user-agreement/" target="_blank">Wyre User agreement</a>.</span>
              </div>
              <button onClick={() => { history.push(`/business/invoices/${props.invoice.invoiceId}/pay/debit-card`) }} disabled={!isChecked}>Pay Now</button>
              <button className="back" onClick={props.onClose}>Back</button>
              {/*<p className="mt-2 note">Note: Payment option is unavailable in Beta version</p>*/}
            </div>
          )
        }
      }
      default: {
        if (props.role === "freelancer") {
          return (
            <>
              <div className="mt-2">
                <p className="label">Status</p>
                <p className="value">Pending</p>
              </div>
              <button className="back" onClick={props.onClose}>Back</button>
            </>
          )
        } else {
          return (
            <>
              <div className="mt-2">
                <p className="label">Status</p>
                <p className="value">Pending</p>
              </div>
              <button onClick={handleResolveInvoice}>Resolve</button>
              <button onClick={handleCancelInvoice}>Cancel</button>
              <button className="back" onClick={props.onClose}>Back</button>
            </>
          )
        }
      }
    }
  }

  return(
    <div className="Modal" onClick={props.onClose}>
      <div className="ModalContent" onClick={e => e.stopPropagation()}>
        <div className="ModalHeader">
          <h4 className="ModalTitle">Invoice</h4>
        </div>
        <Container className="ModalBody py-4">
          <Row className="justify-content-between">
            <Col lg="6" md="6" sm="12">
              <p className="label">Bill from:</p>
              <p className="detail">
                {props.invoice.freelancerName}<br />
                {props.invoice.freelancerEmail}
              </p>
            </Col>
            <Col lg="6" md="6" sm="12">
              <p className="label">Bill to:</p>
              <p className="detail">
                {props.invoice.businessName}<br />
                {props.invoice.businessEmail}
              </p>
            </Col>
          </Row>
          <Row className="justify-content-between">
            <Col lg="6" md="6" sm="12">
              <p className="label">Invoice ID:</p>
              <p className="detail">#{props.invoice.invoiceId}</p>
            </Col>
            <Col lg="6" md="6" sm="12">
              <p className="label">Invoice Due Date:</p>
              <p className="detail">{props.invoice.dueDate}</p>
            </Col>
          </Row>
          <Row className="justify-content-between ModalTable">
            <Col className="ModalTable-header" lg="12">Product Service Details</Col>
            <Col lg="12">
              <table>
                <thead>
                  <th>S.No.</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </thead>
                <tbody>
                  {props.invoice.item.map((value, index) => {
                    return(
                      <tr key={index}>
                        <td>{index+1}</td>
                        <td>{value.quantity}</td>
                        <td>${value.price}</td>
                      </tr>
                    )
                  })}
                  <tr>
                    <td><b>Total</b></td>
                    <td></td>
                    <td><b>${props.invoice.totalAmount}</b></td>
                  </tr>
                </tbody>
              </table>
            </Col>
          </Row>
          <Row className="ModalPaymentDetails">
            <Col lg="12" md="12" sm="12">
              <div className="heading">Payment Details</div>
              {props.invoice.proportions.map((item, index) => {
                return(
                  <div key={index} className={` currency ${item.currency}`}>
                    {item.percentage}% {item.currency}
                  </div>
                )
              })}
            </Col>
          </Row>
          <Row>
            <Col className="ModalButtons">
              {renderButtons()}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  )
}

export default PreviewInvoiceModal;