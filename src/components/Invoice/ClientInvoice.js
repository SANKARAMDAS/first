import axios from "axios";
import React, { useEffect } from "react";

const ClientInvoice = () => {
    useEffect(() => {
        const getInvoiceDetails = async () => {
            await axios.post(`${process.env.REACT_APP_BACKEND_API}/invoice/getInvoiceInfo`, { requestId: window.localStorage.getItem("transactionId") })
                .then((res) => {
                    console.log(res)
                })
                .catch((err) => {
                    console.log(err)
                })
            console.log("Collecting client invoice....")
        }
        getInvoiceDetails()
    }, [])
    return (
        <div>
            <h1>Your Invoice</h1>
        </div>
    );
}

export default ClientInvoice;