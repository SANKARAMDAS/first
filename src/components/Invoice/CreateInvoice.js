import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Form, Table } from "react-bootstrap";
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
import "./css/CreateInvoice.css";

axios.defaults.withCredentials = true

const CreateInvoice = (props) => {

	const history = useHistory();

	const [step, setStep] = useState(1);

	const [title, setTitle] = useState("Invoice Title");

	//State Variables And Handler Variables for CLIENT DETAILS

	const [clientValues, setClientValues] = useState({
		name: "Client Name",
		email: "clientname@example.com",
		company: "Client Company Name",
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
		setTitle(e.target.val);
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
						<Form.Label style={{ marginTop: "20px" }}>
							Select Proportion:
						</Form.Label>
						{renderTwoSliderLabels()}
						<div className="col-12">
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
						<div className="col-12">
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

	const getBase64 = async (file) => {
		let reader = new FileReader();
		await reader.readAsDataURL(file);

		reader.onload = () => {
			console.log('Reader: '+reader.result.split(",")[1]);
			setBase64(reader.result.split(",")[1]);
		};
		reader.onerror = function (error) {
			console.log("Error: ", error);
		};
	};

	//Handle Submission To Preview Invoice
	const handleSendInvoice = async (e) => {
		e.preventDefault();
		htmlToImage
			.toPng(componentRef.current, { quality: 1 })
			.then(async function (dataUrl) {
				const pdf = new jsPDF();
				pdf.addImage(dataUrl, "PNG", 0, 0);
				var out = pdf.output("blob");

				await getBase64(out);

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
					pdfFile: base64,
					invoiceId: invoiceId,
				};

				console.log('Backendobj: ');
				console.log(backendObj);

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
					});
			});
	};

	const handleGoToStep2 = (e) => {
		e.preventDefault();
		setStep(2);
	};

	const handleBack = () => {
		setStep(1);
	};

	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	});

	const renderCreateInvoice = () => {
		if (step === 1) {
			return (
				<>
					<div style={{ marginBottom: "20px" }} className="col-12 text-center">
						<div className="invoice-title">Payment Details</div>
					</div>
					<div style={{ marginBottom: "30px" }} className="row">
						<Form.Label>Select Currencies: </Form.Label>
						<div style={{ marginBottom: "20px" }} className="row">
							<div className="col-lg-4 col-md-4 col-sm-12">
								<Form.Check
									checked={proportionValues["FIAT"].selected}
									onChange={handleSelection}
									type="checkbox"
									name="FIAT"
									label="FIAT"
								/>
							</div>
							<div className="col-lg-4 col-md-4 col-sm-12">
								<Form.Check
									checked={proportionValues["BTC"].selected}
									onChange={handleSelection}
									type="checkbox"
									name="BTC"
									label="BTC"
								/>
							</div>
							<div className="col-lg-4 col-md-4 col-sm-12">
								<Form.Check
									checked={proportionValues["ETH"].selected}
									onChange={handleSelection}
									type="checkbox"
									name="ETH"
									label="ETH"
								/>
							</div>
						</div>
						{renderSlider()}
						<div className="col-lg-12">
							<Form.Group className="mb-3" controlId="formBasicDate">
								<Form.Label>Invoice Due Date: </Form.Label>
								<DatePicker
									value={dueDate}
									selected={dueDate}
									onChange={(date) => handleDueDateChange(date)}
									placeholderText="DD/MM/YY"
									dateFormat="dd/MM/yyyy"
								/>
							</Form.Group>
						</div>
					</div>
				</>
			);
		} else {
			console.log('Component Ref: '+componentRef.current);
			return (
				<>
					<div ref={componentRef} style={{ padding: "40px" }}>
						<div
							className="col-12 text-center"
						>
							<Form.Control
								onChange={handleTitle}
								className="invoice-title"
								value={title}
								maxLength="25"
							/>
						</div>
						<div className="row details-wrapper">
							<div className="col-6">
								<div className="col-12">
									<div className="freelancer-details">
										<h5>{freelancerValues.name}</h5>
										<p className="freelancer-address">{freelancerValues['address1']}</p>
										<p className="freelancer-address">{freelancerValues['address2']}</p>
										<p className="freelancer-address">{freelancerValues['address3']}</p>
										<p className="freelancer-email">{freelancerValues['email']}</p>
									</div>
								</div>
							</div>
							<div className="col-6">
								<div className="col-12">
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
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-12">
								<Form.Control
									className="intro-textarea"
									value={intro}
									onChange={handleIntroInput}
									as="textarea"
								/>
							</div>
						</div>
						<div className="row">
							<div className="col-12">
								<Table className="invoice-table" striped>
									<thead className="invoice-table-head">
										<tr>
											<th>Sr No.</th>
											<th>Name</th>
											<th>Price</th>
											<th>Qty</th>
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
							</div>
						</div>
						<div className="row">
							<div className="col-12 payment-proportions">
								<Form.Label>
									Your payment will be processed in the following proportions:{" "}
								</Form.Label>
								<div className="row">
									{proportionValues["FIAT"].selected ? (
										<div className="col-4">
											{proportionValues["FIAT"].proportion}% FIAT
										</div>
									) : (
										<></>
									)}
									{proportionValues["BTC"].selected ? (
										<div className="col-4">
											{proportionValues["BTC"].proportion}% BTC
										</div>
									) : (
										<></>
									)}
									{proportionValues["ETH"].selected ? (
										<div className="col-4">
											{proportionValues["ETH"].proportion}% ETH
										</div>
									) : (
										<></>
									)}
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-12 payment-duedate">
								<strong>Due Date: {dateFormat(dueDate, "dd/mm/yyyy")}</strong>
							</div>
						</div>
					</div>
				</>
			);
		}
	};

	return (
		<>
			<div className="d-flex justify-content-center align-items-center">
				<div className="col-lg-7 col-md-7 col-sm-7">
					<div className="invoice-form-wrapper">
						{step === 1 ? (
							<></>
						) : (
							<div className="row">
								<div className="col-6">
									<FontAwesomeIcon
										onClick={handleBack}
										className="back-button"
										icon={faArrowLeft}
									/>
								</div>
								<div className="col-6">
									<FontAwesomeIcon
										onClick={handlePrint}
										className="print-button"
										icon={faPrint}
									/>
								</div>
							</div>
						)}

						<Form>
							{renderCreateInvoice()}
							{step === 1 ? (
								<div className="col-12 text-center">
									<button
										className="btn btn-primary"
										onClick={handleGoToStep2}
										type="submit"
									>
										Next
									</button>
								</div>
							) : (
								<div className="col-12 text-center">
									<button
										className="btn btn-primary"
										onClick={handleSendInvoice}
										type="submit"
									>
										Send Invoice
									</button>
								</div>
							)}
						</Form>
					</div>
				</div>
			</div>
		</>
	);
};

export default CreateInvoice;
