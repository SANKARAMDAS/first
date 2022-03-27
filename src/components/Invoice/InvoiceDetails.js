import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import dateFormat from "dateformat";
import { Table, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPlus
} from "@fortawesome/free-solid-svg-icons";
import "./css/InvoiceDetails.css";

const InvoiceDetails = (props) => {

  const history = useHistory();

  const { invoiceId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [editable, setEditable] = useState(false)
  const [invoiceInfo, setInvoiceInfo] = useState({});
  const [title, setTitle] = useState("Invoice Title");
  const [clientValues, setClientValues] = useState({
    name: "",
    email: "",
    company: "Client Company",
  });
  let clientValuesHandler = {};

  const [intro, setIntro] = useState(``);

  const [items, setItems] = useState([]);

  const [itemDetails, setItemDetails] = useState({
    name: "",
    price: "",
    quantity: 1,
  });
  let itemDetailsHandler = {};
  let tempItems = [];

  const getInvoiceDetails = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_BACKEND_API}/invoice/getInvoiceInfo`,
        { invoiceId: invoiceId }
      )
      .then((res) => {
        setInvoiceInfo(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
    setIsLoading(false)
  }

  useEffect(() => {
    getInvoiceDetails()
  }, [getInvoiceDetails])

  const handleEdit = () => {
    setTitle(invoiceInfo.invoiceTitle)
    setClientValues({
      name: invoiceInfo.businessName,
      email: invoiceInfo.businessEmail,
      company: "Client Company",
    })
    setIntro(invoiceInfo.memo)
    setItems([...invoiceInfo.item])
    setEditable(true)
  }

  const handleTitle = (e) => {
    setTitle(e.target.val);
  };

  const handleOnCheck = () => {
    setIsChecked(!isChecked);
  };

  const handleClientDetails = (selectedInput) => (e) => {
    clientValuesHandler = { ...clientValues };
    clientValuesHandler[selectedInput] = e.target.value;
    setClientValues({ ...clientValuesHandler });
  };

  const handleIntroInput = (e) => {
    setIntro(e.target.value);
  };

  const handleItemDetails = (selectedInput) => (e) => {
    itemDetailsHandler = { ...itemDetails };
    itemDetailsHandler[selectedInput] = e.target.value;
    setItemDetails({ ...itemDetailsHandler });
  };

  const addItem = () => {
    setItems([...items, itemDetails]);
    clearItemDetails();
  };

  const deleteItem = (index) => {
    tempItems = [...items];
    tempItems.splice(index, 1);
    setItems([...tempItems]);
  };

  const clearItemDetails = () => {
    setItemDetails({
      name: "",
      price: "",
      quantity: 1,
    });
  };

  const handleBack = () => {
    setEditable(false)
  }

  const handleEditedInvoice = () => {
    //Backend route is not present
    console.log("Send the edited invoice")
  }

  const handleCancelInvoice = () => {
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_API}/invoice/updateInvoiceStatus`,
        {
          email: invoiceInfo.freelancerEmail,
          name: invoiceInfo.freelancerName,
          status: "cancel",
          invoiceId: invoiceInfo.invoiceId
        }
      )
      .then(() => {
        getInvoiceDetails()
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
          email: invoiceInfo.freelancerEmail,
          name: invoiceInfo.freelancerName,
          status: "resolved",
          invoiceId: invoiceInfo.invoiceId
        }
      )
      .then((res) => {
        getInvoiceDetails()
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const renderOptions = () => {
    switch (invoiceInfo.status) {
      case "cancel": {
        return (
          <>
            <div className="mt-2">
              <p className="label">Status</p>
              <p className="value">Cancelled</p>
            </div>
          </>
        )
      }
      case "resolved": {
        if (props.role === "freelancer") {
          if (editable) {
            return (
              <>
                {/*
                <button onClick={handleEditedInvoice}>Send Edited Invoice</button>
                <button onClick={handleBack}>Back</button>
                */}
              </>
            )
          } else {
            return (
              <>
                {/*
                <button onClick={handleEdit}>Edit</button>
                */}
              </>
            )
          }
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
                /> I accept the <a className="text-black" href="https://www.sendwyre.com/user-agreement/" target="_blank">Wyre User agreement</a>.
              </div>
              <button onClick={() => { history.push(`${props.url}/invoices/${invoiceInfo.invoiceId}/pay/debit-card`) }} disabled={!isChecked}>Pay Now</button>
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
            </>
          )
        } else {
          return (
            <>
              <button onClick={handleResolveInvoice}>Resolve</button>
              <button onClick={handleCancelInvoice}>Cancel</button>
            </>
          )
        }
      }
    }
  }

  const renderInvoice = () => {
    if (isLoading) {
      return (
        <div>
          Loading...
        </div>
      )
    } else {
      return (
        <div className="d-flex justify-content-center align-items-center invoiceDetails">
          <div className="col-lg-7 col-md-7 col-12">
            <div className="invoiceWrap">
              <div>
                {editable === true
                  ? <>
                    <div className="col-12 invoiceTitle">
                      <Form.Control
                        onChange={handleTitle}
                        className="invoice-title"
                        value={title}
                        maxLength="25"
                      />
                    </div>
                  </>
                  : <>
                    <div className="col-12 invoiceTitle">
                      {invoiceInfo.invoiceTitle}
                    </div>
                  </>
                }
                <div className="invoiceDetailWrapper">
                  <div>
                    <p className="label">Invoice ID</p>
                    <p className="value">{invoiceId}</p>
                  </div>
                  <div className="row details-wrapper">
                    <div className="col-lg-6 col-md-6 col-12">
                      <div className="col-12">
                        <div>
                          <p className="label">Bill From</p>
                          <p className="value">{invoiceInfo.freelancerName}</p>
                          <p className="value">{invoiceInfo.freelancerEmail}</p>
                        </div>
                        <br />
                        <div>
                          <p className="label">Invoice Creation Date</p>
                          <p className="value">{invoiceInfo.creationDate}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-12">
                      <div className="col-12">
                        {
                          editable === true
                            ? 
                            <>
                              <Form.Control
                                onChange={handleClientDetails("name")}
                                value={clientValues["name"]}
                                className="client-details client-name"
                                maxLength="30"
                              />
                              <p className="client-invoice-details">
                                Date: {dateFormat(Date.now(), "dd/mm/yyyy")}
                              </p>
                              <p className="client-invoice-details">Invoice #{invoiceId}</p>
                              <br />
                              <Form.Control
                                onChange={handleClientDetails("company")}
                                value={clientValues["company"]}
                                className="client-details client-company"
                                maxLength="25"
                              />
                              <Form.Control
                                onChange={handleClientDetails("email")}
                                className="client-details client-email"
                                value={clientValues["email"]}
                                maxLength="35"
                              />
                            </>
                            : 
                            <>
                              <div className="text-end">
                                <p className="label">Bill To</p>
                                <p className="value">{invoiceInfo.businessName}</p>
                                <p className="value">{invoiceInfo.businessEmail}</p>
                              </div>
                              <br />
                              <div className="text-end">
                                <p className="label">Invoice Due Date</p>
                                <p className="value">{invoiceInfo.dueDate}</p>
                              </div>
                            </>
                        }
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      {
                        editable === true
                        ? <>
                          <div className="col-12">
                            <Form.Control
                                className="intro-textarea"
                                value={intro}
                                onChange={handleIntroInput}
                                as="textarea"
                            />
                          </div>
                        </>
                        : <>
                          <div>
                            <p style={{ whiteSpace: "pre-wrap" }}>{invoiceInfo.memo}</p>
                          </div>
                        </>
                      }
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <Table className="invoiceTable">
                        <thead className="invoice-table-head">
                          <tr>
                              <th>SNo.</th>
                              <th>Name</th>
                              <th>Price</th>
                              <th>Quantity</th>
                              <th>Price</th>
                          </tr>
                        </thead>
                              <tbody>
                                  {
                                      editable === true
                                          ? <>
                                              {items.length === 0 ? (
                                                  <></>
                                              ) : (
                                                  items.map((item, index) => {
                                                      return (
                                                          <tr key={index}>
                                                              <td>{index + 1}</td>
                                                              <td>{item.name}</td>
                                                              <td>{item.price}</td>
                                                              <td>{item.quantity}</td>
                                                              <td>
                                                                  {parseInt(item.price) * parseInt(item.quantity)}
                                                              </td>
                                                              <td>
                                                                  <FontAwesomeIcon
                                                                      onClick={() => {
                                                                          deleteItem(index);
                                                                      }}
                                                                      className="remove-item-btn"
                                                                      icon={faTrash}
                                                                  />
                                                              </td>
                                                          </tr>
                                                      );
                                                  })
                                              )}
                                              <tr>
                                                  <td style={{ paddingTop: "9px", paddingLeft: "10px" }}>
                                                      Auto
                                                  </td>
                                                  <td>
                                                      <Form.Control
                                                          value={itemDetails["name"]}
                                                          className="product-input"
                                                          onChange={handleItemDetails("name")}
                                                          placeholder="Enter Name"
                                                      />
                                                  </td>
                                                  <td>
                                                      <Form.Control
                                                          value={itemDetails["price"]}
                                                          className="product-input"
                                                          onChange={handleItemDetails("price")}
                                                          placeholder="Enter Price"
                                                      />
                                                  </td>
                                                  <td>
                                                      <Form.Control
                                                          value={itemDetails["quantity"]}
                                                          className="product-input quantity"
                                                          onChange={handleItemDetails("quantity")}
                                                          placeholder="Enter Quantity"
                                                          type="number"
                                                          min="1"
                                                          step="1"
                                                      />
                                                  </td>
                                                  <td style={{ paddingTop: "8px" }}>Auto</td>
                                                  <td style={{ paddingTop: "10px" }}>
                                                      <FontAwesomeIcon
                                                          onClick={addItem}
                                                          className="add-item-btn"
                                                          icon={faPlus}
                                                      />
                                                  </td>
                                              </tr>
                                          </>
                                          : <>
                                              {invoiceInfo.item.length === 0 ? (
                                                  <></>
                                              ) : (
                                                  invoiceInfo.item.map((item, index) => {
                                                      return (
                                                          <tr key={index}>
                                                              <td>{index + 1}</td>
                                                              <td>{item.name}</td>
                                                              <td>{item.price}</td>
                                                              <td>{item.quantity}</td>
                                                              <td>
                                                                  {parseInt(item.price) * parseInt(item.quantity)}
                                                              </td>
                                                          </tr>
                                                      );
                                                  })
                                              )}
                                          </>
                                  }

                              </tbody>
                      </Table>
                    </div>
                  </div>
                  <div className="row">
                    <div>
                      The payment will be processed in the following proportions:
                      <div>
                        <div className="invoiceProportion">
                          {invoiceInfo.BTC}% BTC
                        </div>
                        <div className="invoiceProportion">
                          {invoiceInfo.ETH}% ETH
                        </div>
                        <div className="invoiceProportion">
                          {invoiceInfo.FIAT}% FIAT
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                      <div className="invoiceButtons">
                          {renderOptions()}
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }

  return (
      <>
          {renderInvoice()}
      </>
  );

}

export default InvoiceDetails;