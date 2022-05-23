import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Form, Table, Container, Row, Col } from "react-bootstrap";
import InputRange from "react-input-range";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dateFormat from "dateformat";
import { useReactToPrint } from "react-to-print";
import * as htmlToImage from "html-to-image";
import { jsPDF } from "jspdf";
import "react-input-range/lib/css/index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faTrash,
	faPlus,
	faPrint,
	faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import "./css/CreateInvoiceSlider.css";

axios.defaults.withCredentials = true

const CreateInvoiceSlider = (props) => {

  const history = useHistory();

  const [title, setTitle] = useState("");

  //State Variables And Handler Variables for CLIENT DETAILS

  const [clientValues, setClientValues] = useState({
    name: "",
    email: "",
    company: "",
  });

  const [freelancerValues, setFreelancerValues] = useState({
    name: '',
    email: props.email,
    address1: '',
    address2: '',
    address3: ''
  });

  let clientValuesHandler = {};

  //State Variables And Handler Variables for PRODUCT/SERVICE DETAILS

  const [items, setItems] = useState([]);
  const [base64, setBase64] = useState("");

  const [itemDetails, setItemDetails] = useState({
    name: "",
    price: "",
    quantity: 1,
  });

  let itemDetailsHandler = {};
  let tempItems = [];

  //State Variables And Handler Variables for PAYMENT DETAILS
  const [threeSliderValue, setThreeSliderValue] = useState({
    value: { min: 33, max: 66 },
  });

  const [twoSliderValue, setTwoSliderValue] = useState(50);

  const [selected, setSelected] = useState(1);

  const [proportionValues, setProportionValues] = useState({
    FIAT: { selected: true, proportion: 100 },
    BTC: { selected: false, proportion: 0 },
    ETH: { selected: false, proportion: 0 },
  });

  const [invoiceId, setInvoiceId] = useState("");

	const [dueDate, setDueDate] = useState(new Date());
	const [intro, setIntro] = useState(``);

  let selectionHandler = {};

  const componentRef = useRef();

  useEffect(() => {
    setInvoiceId(`${parseInt(Date.now() / 1000)}`);
    axios
      .post(`${process.env.REACT_APP_BACKEND_API}/auth/getUserProfile`, {
        email: props.email
      })
      .then((res) => {
        setFreelancerValues({
          name: res.data.data.name,
          email: props.email,
          address1: res.data.data.address,
          address2: res.data.data.city + ' ' + res.data.data.state,
          address3: res.data.data.country + ' ' + res.data.data.zipCode
        })
        setIntro(`Dear Client Name,
Please find below a cost-breakdown for the recent work completed. Please make payment before or on the given due date, and do not hesitate to contact me with any questions.
      
Many Thanks,\n`
          + `${res.data.data.name}`
        )
      })
  }, []);

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  /* CLIENT DETAILS' METHODS */

	//Handler Method
	const handleClientDetails = (selectedInput) => (e) => {
		clientValuesHandler = { ...clientValues };
		clientValuesHandler[selectedInput] = e.target.value;
		setClientValues({ ...clientValuesHandler });
	};

	/* PRODUCT/ITEM DETAILS' METHODS */

	//Handler Method
	const handleItemDetails = (selectedInput) => (e) => {
		itemDetailsHandler = { ...itemDetails };
		itemDetailsHandler[selectedInput] = e.target.value;
		setItemDetails({ ...itemDetailsHandler });
	};

	//Add Item
	const addItem = () => {
		setItems([...items, itemDetails]);
		clearItemDetails();
	};

	//Delete Item
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

	/* PAYMENT DETAILS' METHODS */

	//Handler Methods

	//Currency Selection Handler
	const handleSelection = (e) => {
		if (e.target.checked === true) {
			setSelected(selected + 1);
			selectionHandler = { ...proportionValues };
			selectionHandler[e.target.name].selected = true;
			setProportionValues({ ...selectionHandler });
			reset(selected + 1);
		} else {
			if (selected - 1 === 0) {
				e.target.checked = true;
			} else {
				setSelected(selected - 1);
				selectionHandler = { ...proportionValues };
				selectionHandler[e.target.name].selected = false;
				setProportionValues({ ...selectionHandler });
				reset(selected - 1);
			}
		}
	};

	//Proportion Slider Handler for 2 SELECTED CURRENCIES
	const handleTwoSlider = (value) => {
		setTwoSliderValue(value);
		let flag = 0;
		selectionHandler = { ...proportionValues };
		for (const select in selectionHandler) {
			if (selectionHandler[select].selected === true && flag === 0) {
				selectionHandler[select].proportion = value;
				flag = 1;
			} else if (selectionHandler[select].selected === true && flag === 1) {
				selectionHandler[select].proportion = 100 - value;
			} else {
				selectionHandler[select].proportion = 0;
			}
		}
		setProportionValues({ ...selectionHandler });
	};

	//Proportion Slider Handler for 3 SELECTED CURRENCIES
	const handleThreeSlider = (value) => {
		setThreeSliderValue({ value });
		setProportionValues({
			FIAT: { selected: true, proportion: value["min"] },
			BTC: { selected: true, proportion: value["max"] - value["min"] },
			ETH: { selected: true, proportion: 100 - value["max"] },
		});
	};

	//Due Date Handler
	const handleDueDateChange = (date) => {
		setDueDate(date);
	};

	//Intro Handler
	const handleIntroInput = (e) => {
		setIntro(e.target.value);
	};

  //Proportion Slider Render Methods
  const renderTwoSliderLabels = () => {
    let objArray = [];
    selectionHandler = { ...proportionValues };
    for (const select in selectionHandler) {
      if (selectionHandler[select].selected === true) {
        objArray.push({
          name: select,
          proportion: selectionHandler[select].proportion,
        });
      } else {
        continue;
      }
    }
    return (
      <div style={{ marginBottom: "-30px" }} className="row text-center">
        <div className="col-6">
          {`${objArray[0].name}: ${objArray[0].proportion}%`}
        </div>
        <div className="col-6">
          {`${objArray[1].name}: ${objArray[1].proportion}%`}
        </div>
      </div>
    );
  };

  const renderThreeSliderLabels = () => {
    return (
      <div style={{ marginBottom: "-30px" }} className="row text-center">
        <div className="col-4">
          FIAT: {`${proportionValues.FIAT.proportion}%`}
        </div>
        <div className="col-4">
          BTC: {`${proportionValues.BTC.proportion}%`}
        </div>
        <div className="col-4">
          ETH: {`${proportionValues.ETH.proportion}%`}
        </div>
      </div>
    );
  };

  const renderSlider = () => {
    switch (selected) {
      case 2:
        return (
          <>
            <Form.Label className="invoice-label" style={{ marginTop: "20px" }}>
              Select Proportion:
            </Form.Label>
            {renderTwoSliderLabels()}
            <div className="col-12 invoice-range">
              <InputRange
                maxValue={99}
                minValue={1}
                onChange={(value) => {
                  handleTwoSlider(value);
                }}
                value={twoSliderValue}
              />
            </div>
          </>
        );
      case 3:
        return (
          <>
            <Form.Label style={{ marginTop: "20px" }}>
              Select Proportion:
            </Form.Label>
            {renderThreeSliderLabels()}
            <div className="col-12 invoice-range">
              <InputRange
                maxValue={99}
                minValue={1}
                onChange={(value) => {
                  handleThreeSlider(value);
                }}
                value={threeSliderValue.value}
              />
            </div>
          </>
        );
      default:
        return <></>;
    }
  };

  //Proportion Slider Reset Method
  const reset = (selectedValue) => {
    switch (selectedValue) {
      case 3: {
        setThreeSliderValue({ value: { min: 34, max: 67 } });
        setProportionValues({
          FIAT: { selected: true, proportion: 34 },
          BTC: { selected: true, proportion: 33 },
          ETH: { selected: true, proportion: 33 },
        });
        break;
      }
      case 2: {
        setTwoSliderValue(50);
        selectionHandler = { ...proportionValues };
        for (const select in selectionHandler) {
          if (selectionHandler[select].selected === true) {
            selectionHandler[select].proportion = 50;
          } else {
            selectionHandler[select].proportion = 0;
          }
        }
        setProportionValues({ ...selectionHandler });
        break;
      }
      default: {
        selectionHandler = { ...proportionValues };
        for (const select in selectionHandler) {
          if (selectionHandler[select].selected === true) {
            selectionHandler[select].proportion = 100;
          } else {
            selectionHandler[select].proportion = 0;
          }
        }
        setProportionValues({ ...selectionHandler });
      }
    }
  };

  //Handle Submission To Preview Invoice
  const handleSendInvoice = async (e) => {
    e.preventDefault();
    const backendObj = {
      invoiceTitle: title,
      freelancerEmail: freelancerValues.email,
      businessEmail: clientValues.email,
      freelancerName: freelancerValues.name,
      businessName: clientValues.name,
      ETH: proportionValues.ETH.proportion,
      BTC: proportionValues.BTC.proportion,
      FIAT: proportionValues.FIAT.proportion,
      memo: intro,
      item: items,
      dueDate: dateFormat(dueDate, "dd/mm/yyyy"),
      creationDate: dateFormat(Date.now(), "dd/mm/yyyy"),
      pdfFile: "",
      invoiceId: invoiceId,
    };

    console.log('Backendobj: ');
    console.log(backendObj);

    axios.post(`${process.env.REACT_APP_BACKEND_API}/auth/refresh`, {
      withCredentials: true
    }).then(() => {
      if(items.length === 0) {
        alert("Add product service details to proceed!");
      } else {
        axios
        .post(
          `${process.env.REACT_APP_BACKEND_API}/invoice/invoiceCreation`,
          backendObj
        )
        .then((response) => {
          console.log(response);
          alert('The invoice has been sent to the client');
          history.push('/contractor');
        })
        .catch((err) => {
          console.log('Error: ',err);
          alert('Please fill the details correctly!');
        });
      }
    }).catch((error) => {
      console.log(error)
    })
  };
  
  return(
    <div className={props.show ? "side-drawer open createInvoiceSlider" : "side-drawer createInvoiceSlider"}>
      <button className="mt-4 mx-4 backButton" onClick={props.onClose}>&#60; Back</button>
      <Form>
      <Container className="py-4 px-4">
        <Row>
          <Col>
            <h5 className="createInvoiceSlider__heading">Create a New Invoice</h5>
            <p className="createInvoiceSlider__content">Ut bibendum mauris sit amet suscipit tempor.</p>
          </Col>
        </Row>
        <Row>
          <Col lg="12">
            <Row>
              <Col lg="6" md="6" sm="12">
                <Form.Group className="mb-3" controlId=" Invoice Title">
                  <Form.Label className="invoice-label">Invoice Title: </Form.Label>
                  <Form.Control
                    onChange={handleTitle}
                    className="invoice-input"
                    value={title}
                    maxLength="25"
                    placeholder="Invoice Title"
                    required
                  />
                </Form.Group>
              </Col>
              <Col lg="6" md="6" sm="12">
                <Form.Group className="mb-3" controlId="formBasicDate">
                  <Form.Label className="invoice-label">Invoice Due Date: </Form.Label>
                  <DatePicker
                    value={dueDate}
                    selected={dueDate}
                    onChange={(date) => handleDueDateChange(date)}
                    placeholderText="DD/MM/YY"
                    dateFormat="dd/MM/yyyy"
                    className="invoice-input"
                  />
                </Form.Group>
              </Col>
            </Row>
            <h6 className="createInvoiceSlider__subheading">Client Details</h6>
            <Row>
              <Col lg="6" md="6" sm="12">
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label className="invoice-label">Name: </Form.Label>
                  <Form.Control
                    onChange={handleClientDetails("name")}
                    value={clientValues["name"]}
                    className="invoice-input"
                    maxLength=" 30"
                    placeholder="Client Name"
                    required
                  />
                </Form.Group>
              </Col>
              <Col lg="6" md="6" sm="12">
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label className="invoice-label">Company Name: </Form.Label>
                  <Form.Control
                    onChange={handleClientDetails("company")}
                    value={clientValues["company"]}
                    className="invoice-input"
                    maxLength="25"
                    placeholder="Company Name"
                    required
                  />
                </Form.Group>
              </Col>
              <Col lg="6" md="6" sm="12">
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label className="invoice-label">Company Email: </Form.Label>
                  <Form.Control
                    onChange={handleClientDetails("email")}
                    className="invoice-input"
                    value={clientValues["email"]}
                    maxLength="35"
                    placeholder="Company Email"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <h6 className="createInvoiceSlider__subheading">Payment Details</h6>
            <Form.Label className="invoice-label">Select Currencies: </Form.Label>
            <Row className="row createInvoiceSlider__checkboxes">
              <Col lg="4" md="4" sm="12">
                <Form.Check
                  checked={proportionValues["FIAT"].selected}
                  onChange={handleSelection}
                  type="checkbox"
                  name="FIAT"
                  label="FIAT"
                />
              </Col>
              <Col lg="4" md="4" sm="12">
                <Form.Check
                  checked={proportionValues["BTC"].selected}
                  onChange={handleSelection}
                  type="checkbox"
                  name="BTC"
                  label="BTC"
                />
              </Col>
              <Col lg="4" md="4" sm="12">
                <Form.Check
                  checked={proportionValues["ETH"].selected}
                  onChange={handleSelection}
                  type="checkbox"
                  name="ETH"
                  label="ETH"
                />
              </Col>
            </Row>
            {renderSlider()}
          </Col>
          <Col lg="12">
            <h6 className="createInvoiceSlider__subheading mt-4">Product Service Details</h6>
            <Table className="invoice-table">
              <thead className="invoice-table-head">
                <tr>
                  <th>SNo.</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
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
              </tbody>
            </Table>
          </Col>
          <Col lg="12">
            <Row>
              <Col lg="12" md="12" sm="12">
                <Form.Group className="mb-3" controlId="intro">
                  <Form.Label className="invoice-label">Memo: </Form.Label>
                  <Form.Control
                    className="intro-textarea"
                    value={intro}
                    onChange={handleIntroInput}
                    as="textarea"
                  />
                </Form.Group>
              </Col>
            </Row>
          </Col>
          <Col>
            <button
              className="invoice-button"
              onClick={handleSendInvoice}
              type="submit"
            >
              Send Invoice
            </button>
          </Col>
        </Row>
      </Container>
      </Form>
    </div>
  )
}

export default CreateInvoiceSlider;