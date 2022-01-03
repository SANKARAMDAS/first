import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import "./css/BusinessInvoices.css"
import BusinessLayout from "./BusinessLayout/BusinessLayout";

const BusinessInvoices = () => {

    const [invoices, setInvoices] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const getInvoices = async () => {
        await axios
            .post(
                `${process.env.REACT_APP_BACKEND_API}/invoice/getInvoices`,
                {
                    role: "business",
                    email: "unnat2904@gmail.com"
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

    useEffect(() => {
        getInvoices()
    }, [])

    const handleCancelInvoice = (invoice) => {
        axios
            .post(
                `${process.env.REACT_APP_BACKEND_API}/invoice/updateInvoiceStatus`,
                {
                    email: invoice.freelancerEmail,
                    name: invoice.freelancerName,
                    status: "cancel",
                    invoiceId: invoice.invoiceId
                }
            )
            .then((res) => {
                getInvoices()
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleResolveInvoice = (invoice) => {
        axios
            .post(
                `${process.env.REACT_APP_BACKEND_API}/invoice/updateInvoiceStatus`,
                {
                    email: invoice.freelancerEmail,
                    name: invoice.freelancerName,
                    status: "resolved",
                    invoiceId: invoice.invoiceId
                }
            )
            .then((res) => {
                getInvoices()
            })
            .catch((err) => {
                console.log(err);
            })
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
                <div className="row">
                    <div className="col-12">
                        <Table className="invoice-table" striped>
                            <thead className="invoice-table-head">
                                <tr>
                                    <th>Invoice No.</th>
                                    <th>Contractor Name</th>
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
                                                <td className="invoices_num"><Link className="button" to={`/business-invoices/${invoice.invoiceId}`}>{invoice.invoiceId}</Link></td>
                                                <td>{invoice.freelancerName}</td>
                                                <td>{invoice.totalAmount}</td>
                                                <td>
                                                    {invoice.status === 'pending' ?
                                                        <>
                                                            <button onClick={() => handleCancelInvoice(invoice)}>Cancel</button>
                                                            <button onClick={() => handleResolveInvoice(invoice)}>Resolve</button>
                                                        </>
                                                        : invoice.status
                                                    }
                                                </td>
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
        <BusinessLayout>
            {renderInvoices()}
        </BusinessLayout>
    );
}

export default BusinessInvoices;