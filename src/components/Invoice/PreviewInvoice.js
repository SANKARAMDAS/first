import React, { useEffect, useState } from "react";
import Invoice from "./Invoice";
import { useLocation } from 'react-router-dom';

const PreviewInvoice = () => {

    const location = useLocation();
    const [invoiceDetails, setInvoiceDetails] = useState({})

    useEffect(() => {
        if (location.state) {
            setInvoiceDetails(location.state.backendObj)
        } else {
            console.log("Forbidden Request")
        }
    }, [location.state])

    const renderInvoice = () => {
        if (Object.keys(invoiceDetails).length === 0) {
            console.log("Loading...")
        } else {
            return (
                <Invoice invoiceDetails={invoiceDetails} />
            )
        }
    }

    return (
        <>
            {renderInvoice()}
        </>
    );
}

export default PreviewInvoice;