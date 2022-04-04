import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "./css/BusinessDashboard.css";
import WalletIcon from "./images/wallet-outline.svg";
import BTCIcon from "./images/Icon-BTC.svg";
import ETHIcon from "./images/Icon-ETH.svg";

const BusinessDashboard = (props) => {

  const [isLoading, setIsLoading] = useState(true);
  const [invoices, setInvoices] = useState([]);
  //const [wyreBalance, setWyreBalance] = useState(0.00);
  //const [BTCBalance, setBTCBalance] = useState(0.00);
  //const [ETHBalance, setETHBalance] = useState(0.00);
  const [freelancers, setFreelancers] = useState([]);

  useEffect(() => {
    const getData = async () => {
      console.log("Getting Invoices")
      await axios.post(
        `${process.env.REACT_APP_BACKEND_API}/invoice/getInvoices`,
        {
          role: props.role,
          email: props.email
        }
      )
      .then((response) => {
        setInvoices(response.data.data.reverse())
        const set = new Set(response.data.data.reverse().map(invoice => invoice.freelancerName))
        setFreelancers(Array.from(set))
        console.log(response.data)
      })
      .catch((err) => {
        console.log(err);
      });
      await axios.post(
        `${process.env.REACT_APP_BACKEND_API}/auth/refresh`, {
          withCredentials: true
        }).then(() => {
          axios.get(`${process.env.REACT_APP_BACKEND_API}/wyre-general/getWallet`)
          .then((res) => {
            console.log(res);
          })
        })
      setIsLoading(false)
    }
    getData()
  }, [])

  const renderTemplate = () => {
    if (isLoading) {
      return (
        <div>
          Loading...
        </div>
      )
    } else {
      return(
        <Container fluid className="BusinessDashboard mb-5">
          <h4 className="page-heading">Dashboard</h4>
          <Row className="BusinessDashboard__walletBalance my-4 mx-1 justify-content-center">
            <Col className="BusinessDashboard__walletBalance-section" lg="4" md="6" xs="10">
              <img className="BusinessDashboard__walletBalance-icon" src={WalletIcon} />
              <div className="mx-2">
                <p className="BusinessDashboard__walletBalance-tagline">Wyre Wallet Balance</p>
                <h6 className="BusinessDashboard__walletBalance-balance">USD 0.00</h6>
              </div>
            </Col>
            <Col className="BusinessDashboard__walletBalance-section" lg="4" md="6" xs="10">
              <img className="BusinessDashboard__walletBalance-icon" src={BTCIcon} />
              <div className="mx-2">
                <p className="BusinessDashboard__walletBalance-tagline">BTC Balance</p>
                <h6 className="BusinessDashboard__walletBalance-balance">USD 0.00</h6>
              </div>
            </Col>
            <Col className="BusinessDashboard__walletBalance-section" lg="4" md="6" xs="10">
              <img className="BusinessDashboard__walletBalance-icon" src={ETHIcon} />
              <div className="mx-2">
                <p className="BusinessDashboard__walletBalance-tagline">ETH Balance</p>
                <h6 className="BusinessDashboard__walletBalance-balance">USD 0.00</h6>
              </div>
            </Col>
          </Row>
          <Row className="justify-content-between">
            <Col lg="8" md="8" sm="12" xs="12">
              <h5 className="BusinessDashboard__recentInvoices">Recent Invoices</h5>
              {invoices.length === 0 ? (
                <>
                  <p>0 records found</p>
                </>
              ) : (
                <>
                  <table className="BusinessDashboard__table mt-2">
                    <thead>
                      <tr>
                        <th>User Details</th>
                        <th>Amount</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoices.length === 0 ? (
                          <></>
                      ) : (
                        invoices.map(invoice => {
                          return (
                            <tr key={invoice.invoiceId}>
                              <td>
                                <Link className="button" to={`${props.url}/invoices/${invoice.invoiceId}`}>
                                  <p className="name"><b>{invoice.freelancerName}</b> sent an invoice {invoice.invoiceId}</p>
                                  <p className="details">
                                    Generated at : {invoice.creationDate}
                                  </p>
                                </Link>
                              </td>
                              <td className="status">${invoice.totalAmount}</td>
                              <td>
                                <span className="cancel status">{invoice.status === "cancel" ? "Cancel" : ""}</span>
                                <span className="resolved status">{invoice.status === "resolved" ? "Resolved" : ""}</span>
                                <span className="pending status">{invoice.status === "pending" ? "Pending" : ""}</span>
                                <div className="status">Invoice due on <span className="pending">{invoice.dueDate}</span></div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </>
              )}
              <Link to="/business/invoices" className="SmallButton ViewAllButton">View All</Link>
            </Col>
            <Col className="px-3 my-3" lg="4" md="4" sm="12" xs="12">
              <div className="BusinessDashboard__freelancersTeam">
                <h5 className="freelancersTeamHeading">Freelancers Team</h5>
                <p className="freelancersTeamTagline">People who shared invoices.</p>
                {freelancers.length === 0 ? (
                  <>0 records found</>
                ) : (
                  freelancers.map(freelancer => {
                    return(
                      <div key={freelancer}>
                        <div className="BusinessDashboard-freelancer">
                          <div className="circle"></div>
                          <div className="name">{freelancer}</div>
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
            </Col>
          </Row>
        </Container>
      )
    }
  }

  return(
    <>
      {renderTemplate()}
    </>
  )
}

export default BusinessDashboard;