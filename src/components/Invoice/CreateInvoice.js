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

    const [threeSliderValue, setThreeSliderValue] = useState({
        value: { min: 33, max: 66 },
    })

    const [twoSliderValue, setTwoSliderValue] = useState(50)

    const [selected, setSelected] = useState(1)

    const [proportionValues, setProportionValues] = useState({
        FIAT: { selected: true, proportion: 100 },
        BTC: { selected: false, proportion: 0 },
        ETH: { selected: false, proportion: 0 }
    })

    let selectionHandler = {}

    const handleSelection = (e) => {
        if (e.target.checked === true) {
            setSelected(selected + 1)
            selectionHandler = { ...proportionValues }
            selectionHandler[e.target.name].selected = true
            setProportionValues({ ...selectionHandler })
            reset(selected + 1)
        } else {
            if (selected - 1 === 0) {
                e.target.checked = true
            } else {
                setSelected(selected - 1)
                selectionHandler = { ...proportionValues }
                selectionHandler[e.target.name].selected = false
                setProportionValues({ ...selectionHandler })
                reset(selected - 1)
            }
        }
    }

    const reset = (selectedValue) => {
        switch (selectedValue) {
            case 3: {
                setThreeSliderValue({ value: { min: 34, max: 67 } })
                setProportionValues({
                    FIAT: { selected: true, proportion: 34 },
                    BTC: { selected: true, proportion: 33 },
                    ETH: { selected: true, proportion: 33 }
                })
                break;
            }
            case 2: {
                setTwoSliderValue(50)
                selectionHandler = { ...proportionValues }
                for (const select in selectionHandler) {
                    if (selectionHandler[select].selected === true) {
                        selectionHandler[select].proportion = 50
                    } else {
                        selectionHandler[select].proportion = 0
                    }
                }
                setProportionValues({ ...selectionHandler })
                break;
            }
            default: {
                selectionHandler = { ...proportionValues }
                for (const select in selectionHandler) {
                    if (selectionHandler[select].selected === true) {
                        selectionHandler[select].proportion = 100
                    } else {
                        selectionHandler[select].proportion = 0
                    }
                }
                setProportionValues({ ...selectionHandler })
            }
        }
    }

    const handleTwoSlider = (value) => {
        setTwoSliderValue(value)
        let flag = 0
        selectionHandler = { ...proportionValues }
        for (const select in selectionHandler) {
            if (selectionHandler[select].selected === true && flag === 0) {
                selectionHandler[select].proportion = value
                flag = 1
            }
            else if (selectionHandler[select].selected === true && flag === 1) {
                selectionHandler[select].proportion = 100 - value
            }
            else {
                selectionHandler[select].proportion = 0
            }
        }
        setProportionValues({ ...selectionHandler })

    }

    const renderTwoSliderLabels = () => {
        let objArray = []
        selectionHandler = { ...proportionValues }
        for (const select in selectionHandler) {
            if (selectionHandler[select].selected === true) {
                objArray.push({ name: select, proportion: selectionHandler[select].proportion })
            }
            else {
                continue
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
        )
    }

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
        )
    }

    const handleThreeSlider = (value) => {
        setThreeSliderValue({ value })
        setProportionValues({
            FIAT: { selected: true, proportion: value['min'] },
            BTC: { selected: true, proportion: value['max'] - value['min'] },
            ETH: { selected: true, proportion: 100 - value['max'] }
        })
    }

    const handlePreviewInvoice = (e) => {
        e.preventDefault()
        console.log(selected)
        console.log(proportionValues)
    }

    const renderSlider = () => {
        switch (selected) {
            case 2:
                return (
                    <>
                        <Form.Label style={{ marginTop: "40px" }}>Select Proportion:</Form.Label>
                        {renderTwoSliderLabels()}
                        <div className="col-12">
                            <InputRange
                                maxValue={99}
                                minValue={1}
                                onChange={value => {
                                    handleTwoSlider(value)
                                }}
                                value={twoSliderValue}
                            />
                        </div>
                    </>
                )
            case 3:
                return (
                    <>
                        <Form.Label style={{ marginTop: "40px" }}>Select Proportion:</Form.Label>
                        {renderThreeSliderLabels()}
                        <div className="col-12">
                            <InputRange
                                maxValue={99}
                                minValue={1}
                                onChange={value => {
                                    handleThreeSlider(value)
                                }}
                                value={threeSliderValue.value}
                            />
                        </div>
                    </>
                )
            default:
                return (<></>)
        }
    }

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
                        <div className="row">
                            <Form.Label>Select Currencies:</Form.Label>
                            <div className="col-lg-4 col-md-4 col-sm-12">
                                <Form.Check defaultChecked={true} onChange={handleSelection} type="checkbox" name="FIAT" label="FIAT" />
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-12">
                                <Form.Check onChange={handleSelection} type="checkbox" name="BTC" label="BTC" />
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-12">
                                <Form.Check onChange={handleSelection} type="checkbox" name="ETH" label="ETH" />
                            </div>
                            {renderSlider()}
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
                        <button onClick={handlePreviewInvoice} className="me-btn inner-text" type="submit">
                            Preview Your Invoice
                        </button>

                    </Form>
                </div>
            </div>
        </>
    );
}

export default CreateInvoice;