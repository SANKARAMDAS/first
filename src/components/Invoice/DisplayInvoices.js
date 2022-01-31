import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import "./css/DisplayInvoices.css"

const DisplayInvoices = (props) => {

    const [invoices, setInvoices] = useState([])
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
                    setInvoices(response.data.data)
                })
                .catch((err) => {
                    console.log(err);
                });
            setIsLoading(false)
        }

        getInvoices()
    }, [])

    const renderInvoices = () => {
        if (isLoading) {
            return (
                <div>
                    Loading...
                </div>
            )
        } else {
            return (
                <div className="row">
                    <div className="col-12">
                        <Table className="invoice-table" striped>
                            <thead className="invoice-table-head">
                                <tr>
                                    <th>Invoice No.</th>
                                    <th>{props.role === "freelancer" ? "Business Name" : "Freelancer Name"}</th>
                                    <th>Total Amount</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {invoices.length === 0 ? (
                                    <></>
                                ) : (
                                    invoices.map((invoice, index) => {
                                        return (
                                            <tr key={index}>
                                                <td className="invoices_num"><Link className="button" to={`${props.url}/invoices/${invoice.invoiceId}`}>{invoice.invoiceId}</Link></td>
                                                <td>{props.role === "freelancer" ? invoice.businessName : invoice.freelancerName}</td>
                                                <td>{invoice.totalAmount}</td>
                                                <td>{invoice.status}</td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </Table>
                    </div>
                </div>
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