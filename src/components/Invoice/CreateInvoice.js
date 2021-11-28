import React, { useState } from "react";
import { Form } from 'react-bootstrap';
import InputRange from 'react-input-range';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dateFormat from "dateformat";
import "react-input-range/lib/css/index.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import "./css/CreateInvoice.css"

const CreateInvoice = () => {

    const [previewObj, setPreviewObj] = useState({})

    //State Variables And Handler Variables for CLIENT DETAILS

    const [clientValues, setClientValues] = useState({
        name: "",
        email: ""
    })

    let clientValuesHandler = {}

    //State Variables And Handler Variables for PRODUCT/SERVICE DETAILS

    const [items, setItems] = useState([])

    const [itemDetails, setItemDetails] = useState({
        name: "",
        price: "",
        quantity: 1
    })

    let itemDetailsHandler = {}
    let tempItems = []

    //State Variables And Handler Variables for PAYMENT DETAILS
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

    const [dueDate, setDueDate] = useState(new Date())
    const [notes, setNotes] = useState("")

    let selectionHandler = {}

    /* CLIENT DETAILS' METHODS */

    //Handler Method
    const handleClientDetails = (selectedInput) => (e) => {
        clientValuesHandler = { ...clientValues }
        clientValuesHandler[selectedInput] = e.target.value
        setClientValues({ ...clientValuesHandler })
    }

    /* PRODUCT/ITEM DETAILS' METHODS */

    //Handler Method
    const handleItemDetails = (selectedInput) => (e) => {
        itemDetailsHandler = { ...itemDetails }
        itemDetailsHandler[selectedInput] = e.target.value
        setItemDetails({ ...itemDetailsHandler })
    }

    //Add Item
    const addItem = () => {
        setItems([...items, itemDetails])
        clearItemDetails()
    }

    //Delete Item
    const deleteItem = (index) => {
        tempItems = [...items]
        tempItems.splice(index, 1)
        setItems([...tempItems])
    }

    const clearItemDetails = () => {
        setItemDetails({
            name: "",
            price: "",
            quantity: 1
        })
    }

    /* PAYMENT DETAILS' METHODS */

    //Handler Methods

    //Currency Selection Handler
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

    //Proportion Slider Handler for 2 SELECTED CURRENCIES
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

    //Proportion Slider Handler for 3 SELECTED CURRENCIES
    const handleThreeSlider = (value) => {
        setThreeSliderValue({ value })
        setProportionValues({
            FIAT: { selected: true, proportion: value['min'] },
            BTC: { selected: true, proportion: value['max'] - value['min'] },
            ETH: { selected: true, proportion: 100 - value['max'] }
        })
    }

    //Due Date Handler
    const handleDueDateChange = (date) => {
        setDueDate(date)
    }

    //Notes Handler
    const handleNotesInput = (e) => {
        setNotes(e.target.value)
    }

    //Proportion Slider Render Methods
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

    const renderSlider = () => {
        switch (selected) {
            case 2:
                return (
                    <>
                        <Form.Label style={{ marginTop: "20px" }}>Select Proportion:</Form.Label>
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
                        <Form.Label style={{ marginTop: "20px" }}>Select Proportion:</Form.Label>
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

    //Proportion Slider Reset Method
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

    //Handle Submission To Preview Invoice
    const handlePreviewInvoice = (e) => {
        e.preventDefault()

        console.log(clientValues)
        console.log(proportionValues)
        console.log(items)
        console.log(dateFormat(dueDate, "dd/mm/yyyy"))
        console.log(notes)
    }

    return (
        <>
            <div style={{ marginTop: "70px", marginBottom: "70px" }} className="d-flex justify-content-center align-items-center">
                <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className="invoice-form-wrapper">
                        <div style={{ marginBottom: "20px" }} className="col-12 text-center">
                            <h2>CREATE YOUR INVOICE</h2>
                        </div>
                        <hr />
                        <h5 style={{ marginTop: "50px", marginBottom: "20px" }}>Client Details</h5>
                        <Form>
                            <div style={{ marginBottom: "20px" }} className="row">
                                <div className="col-12">
                                    <Form.Group onChange={handleClientDetails("name")} value={clientValues['name']} className="mb-3" controlId="formBasicName">
                                        <Form.Label>Name: </Form.Label>
                                        <Form.Control placeholder="Enter Client Name" />
                                    </Form.Group>
                                </div>
                                <div className="col-12">
                                    <Form.Group onChange={handleClientDetails("email")} value={clientValues['email']} className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Email: </Form.Label>
                                        <Form.Control placeholder="Enter Client Email" />
                                    </Form.Group>
                                </div>
                            </div>
                            <h5 style={{ marginBottom: "30px" }}>Product/Service Details</h5>
                            <div style={{ marginBottom: "20px" }} className="row">
                                <div className="col-12">
                                    <div className="table table-responsive">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Price</th>
                                                    <th>Quantity</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    items.length === 0 ? <></> :
                                                        items.map((item, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <td>{item.name}</td>
                                                                    <td>{item.price}</td>
                                                                    <td>{item.quantity}</td>
                                                                    <td><FontAwesomeIcon onClick={() => { deleteItem(index) }} className="remove-item-btn" icon={faTrash} /></td>
                                                                </tr>
                                                            )
                                                        }
                                                        )}
                                                <tr>
                                                    <td>
                                                        <Form.Control value={itemDetails['name']} onChange={handleItemDetails("name")} placeholder="Enter Name" />
                                                    </td>
                                                    <td>
                                                        <Form.Control value={itemDetails['price']} onChange={handleItemDetails("price")} placeholder="Enter Price" />
                                                    </td>
                                                    <td>
                                                        <Form.Control value={itemDetails['quantity']} onChange={handleItemDetails("quantity")} placeholder="Enter Quantity" type="number" min="1" step="1" />
                                                    </td>
                                                    <td><FontAwesomeIcon onClick={addItem} className="add-item-btn" icon={faPlus} /></td>
                                                </tr>

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <h5 style={{ marginBottom: "20px" }}>Payment Details</h5>
                            <div style={{ marginBottom: "30px" }} className="row">
                                <Form.Label>Select Currencies: </Form.Label>
                                <div style={{ marginBottom: "20px" }} className="row">
                                    <div className="col-lg-4 col-md-4 col-sm-12">
                                        <Form.Check defaultChecked={true} onChange={handleSelection} type="checkbox" name="FIAT" label="FIAT" />
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-12">
                                        <Form.Check onChange={handleSelection} type="checkbox" name="BTC" label="BTC" />
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-12">
                                        <Form.Check onChange={handleSelection} type="checkbox" name="ETH" label="ETH" />
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
                                <div className="col-lg-12">
                                    <Form.Group className="mb-3" controlId="formBasicNotes">
                                        <Form.Label>Extra Notes: </Form.Label>
                                        <Form.Control value={notes} onChange={handleNotesInput} as="textarea" />
                                    </Form.Group>
                                </div>
                            </div>
                            <div className="col-12 text-center">
                                <button className="btn btn-primary" onClick={handlePreviewInvoice} type="submit">
                                    Preview Your Invoice
                                </button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreateInvoice;