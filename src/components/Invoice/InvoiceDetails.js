import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Table } from "react-bootstrap";
import "./css/InvoiceDetails.css";

const InvoiceDetails = (props) => {

    const { invoiceId } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [invoiceInfo, setInvoiceInfo] = useState({});

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
            .then((res) => {
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
                        <div>Status: Cancelled</div>
                    </>
                )
            }
            case "resolved": {
                if (props.role === "freelancer") {
                    return (
                        <>
                            <div>Status: Pending</div>
                        </>
                    )
                } else {
                    return (
                        <>
                            <button>Pay Now</button>
                        </>
                    )
                }
            }
            default: {
                if (props.role === "freelancer") {
                    return (
                        <>
                            <button>Edit</button>
                        </>
                    )
                } else {
                    return (
                        <>
                            <button onClick={handleCancelInvoice}>Cancel</button>
                            <button onClick={handleResolveInvoice}>Resolve</button>
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
                <div className="d-flex justify-content-center align-items-center">
                    <div className="col-lg-7 col-md-7 col-sm-7">
                        <div className="invoice-form-wrapper">
                            <div style={{ padding: "40px" }}>
                                <div className="col-12 text-center invoice-title">
                                    {invoiceInfo.invoiceTitle}
                                </div>
                                <div>Invoice ID: {invoiceId}</div>
                                <div className="row details-wrapper">
                                    <div className="col-6">
                                        <div className="col-12">
                                            <div className="freelancer-details">
                                                <h5>{invoiceInfo.freelancerName}</h5>
                                                <p className="freelancer-email">{invoiceInfo.freelancerEmail}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="col-12">
                                            <div className="client-details client-name">
                                                {invoiceInfo.businessName}
                                            </div>
                                            <div className="client-details client-email">
                                                {invoiceInfo.businessEmail}
                                            </div>
                                            <br />
                                            <p className="client-invoice-details">
                                                Date: {invoiceInfo.creationDate}
                                            </p>
                                            <p className="client-invoice-details">Invoice #{invoiceInfo.invoiceId}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="intro-textarea">
                                            <div style={{ whiteSpace: "pre-wrap" }}>{invoiceInfo.memo}</div>
                                        </div>
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
                                                </tr>
                                            </thead>
                                            <tbody>
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
                                            </tbody>
                                        </Table>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 payment-proportions">
                                        The payment will be processed in the following proportions:
                                        <div className="row">
                                            { invoiceInfo.proportions.length === 0 ? (
                                                <></>
                                            ) : (
                                                invoiceInfo.proportions.map((item, index) => {
                                                    return(
                                                        <div className="col-4" key={item.currency}>
                                                            {item.percentage}% {item.currency}
                                                        </div>
                                                    )
                                                })
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        {renderOptions()}
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