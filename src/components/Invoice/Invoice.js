import React, { useState } from "react";

const Invoice = (props) => {

    const [invoiceDetails] = useState(props.invoiceDetails)

    const renderInvoice = () => {
        console.log(invoiceDetails)
    }

    return (
        <>
            {renderInvoice()}
        </>
    );
}

export default Invoice;