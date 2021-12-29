import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import "./css/DisplayInvoices.css"
import ContractorLayout from "../Contractor/ContractorLayout/ContractorLayout";

const DisplayInvoices = () => {

    const [invoices, setInvoices] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const getInvoices = async () => {
            console.log("Getting Invoices")
            await axios
                .post(
                    `${process.env.REACT_APP_BACKEND_API}/invoice/getInvoices`,
                    {
                        role: "freelancer",
                        email: "tarang.padia2@gmail.com"
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
                                    <th>Business Name</th>
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
                                                <td className="invoices_num">{invoice.invoiceId}</td>
                                                <td>{invoice.businessName}</td>
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
        <ContractorLayout>
            {renderInvoices()}
        </ContractorLayout>
    );
}

export default DisplayInvoices;