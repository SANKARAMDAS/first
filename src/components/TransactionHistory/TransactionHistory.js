import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import "./css/DisplayInvoices.css"

const TransactionHistory = (props) => {

    const [transactions, setTransactions] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const getTransactions = async () => {
            console.log("Getting Transactions")
            console.log(props)
            await axios
                .post(
                    `${process.env.REACT_APP_BACKEND_API}/transaction/getTransactions`,
                    {
                        user: {
                            email: props.email,
                            role: props.role
                        }
                    }
                )
                .then((response) => {
                    setTransactions(response.data.data)
                    console.log(response.data)
                })
                .catch((err) => {
                    console.log(err);
                });
            setIsLoading(false)
        }

        getTransactions()
    }, [])

    const renderTransactions = () => {
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
                                    <th>Transaction ID</th>
                                    <th>Type</th>
                                    <th>Total Amount</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.length === 0 ? (
                                    <></>
                                ) : (
                                    transactions.map(transaction => {
                                        return (
                                            <tr key={transaction.transactionId}>
                                                <td className="invoices_num"><Link className="button" to={``}>{transaction.transactionId}</Link></td>
                                                <td>{transaction.type}</td>
                                                <td>{transaction.totalAmount}</td>
                                                <td>{transaction.status}</td>
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
            {renderTransactions()}
        </>
    );
}

export default TransactionHistory;