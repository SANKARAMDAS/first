import React, { useState } from "react";
import { Form } from 'react-bootstrap';
import InputRange from 'react-input-range';
import "react-input-range/lib/css/index.css"
import "./css/CreateInvoice.css"

const CreateInvoice = () => {

    const [clientValues, setClientValues] = useState({
        clientName: "",
        clientEmail: ""
    })

    const [sliderValue, setSliderValue] = useState({
        value: { min: 33, max: 66 },
    })

    const [proportionValues, setProportionValues] = useState({
        FIAT: 100,
        BTC: 0,
        ETH: 0
    })

    return (
        <>
            <div style={{ marginTop: "70px", marginBottom: "70px" }} className="d-flex justify-content-center align-items-center">
                <div className="col-lg-6 col-md-6 col-sm-6">
                    <h3 style={{ marginBottom: "20px" }}>Client Details</h3>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicNumber">
                            <Form.Label>Name:</Form.Label>
                            <Form.Control placeholder="Enter Client Name" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicNumber">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control placeholder="Enter Client Email" />
                        </Form.Group>
                        <h3 style={{ marginBottom: "20px" }}>Product Details</h3>
                        {/* Product */}
                        <div className="row">
                            <div className="col-lg-5 col-md-5 col-sm-12">
                                <Form.Group className="mb-3" controlId="formBasicNumber">
                                    <Form.Label>Name:</Form.Label>
                                    <Form.Control placeholder="Enter Product Name" />
                                </Form.Group>
                            </div>
                            <div className="col-lg-5 col-md-5 col-sm-6">
                                <Form.Group className="mb-3" controlId="formBasicNumber">
                                    <Form.Label>Price:</Form.Label>
                                    <Form.Control placeholder="Enter Product Price" />
                                </Form.Group>
                            </div>
                            <div className="col-lg-2 col-md-2 col-sm-6">
                                <Form.Group className="mb-3" controlId="formBasicNumber">
                                    <Form.Label>Quantity:</Form.Label>
                                    <Form.Control type="number" min="1" step="1" />
                                </Form.Group>
                            </div>
                        </div>
                        <h3 style={{ marginBottom: "20px" }}>Payment Details</h3>
                        {/* Proportion */}
                        <div className="row">
                            <Form.Label>Select Currencies:</Form.Label>
                            <div className="col-lg-4 col-md-4 col-sm-12">
                                <Form.Check checked={true} type="checkbox" label="FIAT" />
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-12">
                                <Form.Check type="checkbox" label="BTC" />
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-12">
                                <Form.Check type="checkbox" label="ETH" />
                            </div>
                            <Form.Label style={{ marginTop: "40px" }}>Select Proportion:</Form.Label>
                            <div className="col-12">
                                <InputRange
                                    draggableTrack
                                    maxValue={100}
                                    minValue={0}
                                    onChange={value => {
                                        setSliderValue({ value })
                                    }}
                                    value={sliderValue.value}
                                />
                            </div>
                            <div className="col-lg-12">
                                <Form.Group className="mb-3" controlId="formBasicCVV">
                                    <Form.Label>Invoice Due Date:</Form.Label>
                                    {/* <DatePicker
                                    selected={expiryDate}
                                    onChange={(date) => handleExpiryChange(date)}
                                    onFocus={handleFocus("expiry")}
                                    placeholderText="MM/YY"
                                    dateFormat="MM/yy"
                                    showMonthYearPicker
                                /> */}
                                </Form.Group>
                            </div>
                        </div>
                        <button className="me-btn inner-text" type="submit">
                            Create Invoice
                        </button>

                    </Form>
                </div>
            </div>
        </>
    );
}

export default CreateInvoice;