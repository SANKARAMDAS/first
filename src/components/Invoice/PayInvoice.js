import React from "react";
import { Link, useParams } from "react-router-dom";

const PayInvoice = (props) => {

  const { invoiceId } = useParams();

  return(
    <>
      <h3>Payment Methods</h3>
      <Link className="button" to={`${props.url}/invoices/${invoiceId}/pay/debit-card`}>Pay using Debit Card</Link>
      <br /><br />
      <Link className="button" to={`${props.url}/invoices/${invoiceId}/pay/ach-transfer`}>ACH Transfer</Link>
    </>
  )
}

export default PayInvoice;