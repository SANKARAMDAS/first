import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "./css/FreelancerDashboard.css";
import RightArrow from "./images/arrow.svg";
import WalletIcon from "./images/wallet-outline.svg";
import BTCIcon from "./images/Icon-BTC.svg";
import ETHIcon from "./images/Icon-ETH.svg";

const FreelancerDashboard = (props) => {

  const [isLoading, setIsLoading] = useState(true);
  const [invoices, setInvoices] = useState([]);
  //const [wyreBalance, setWyreBalance] = useState(0.00);
  //const [BTCBalance, setBTCBalance] = useState(0.00);
  //const [ETHBalance, setETHBalance] = useState(0.00);
  const [businesses, setBusinesses] = useState();

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
        const set = new Set(response.data.data.reverse().map(invoice => invoice.businessName))
        setBusinesses(Array.from(set))
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
        <Container fluid className="FreelancerDashboard mb-5">
          <h4 className="page-heading">Dashboard</h4>
          <Row className="justify-content-center">
            <Col className="px-2" lg="8" md="8" sm="12" xs="12">
              <div className="FreelancerDashboard__recentInvoices">
                <h5 className="FreelancerDashboard__recentInvoices-heading">Recent Invoices</h5>
                {invoices.length === 0 ? (
                  <>
                    <p>0 records found</p>
                  </>
                ) : (
                  <>
                    <table className="FreelancerDashboard__table mt-2">
                      <tbody>
                        {invoices.length === 0 ? (
                            <></>
                        ) : (
                          invoices.slice(0,3).map(invoice => {
                            return (
                              <tr key={invoice.invoiceId}>
                                <td>
                                  <Link className="button" to={`/contractor/invoices/${invoice.invoiceId}`}>
                                    <p className="name">{invoice.invoiceTitle}</p>
                                    <p className="details">
                                      Invoice ID : {invoice.invoiceId}
                                      <br />
                                      Status : <span className="cancel">{invoice.status === "cancel" ? "Cancel" : ""}</span>
                                        <span className="resolved">{invoice.status === "resolved" ? "Resolved" : ""}</span>
                                        <span className="pending">{invoice.status === "pending" ? "Pending" : ""}</span>
                                    </p>
                                  </Link>
                                </td>
                                <td>
                                  <p className="name">{invoice.businessName}</p>
                                  <p className="details">
                                    Email ID : {invoice.businessEmail}
                                  </p>
                                </td>
                                <td className="status">${invoice.totalAmount}</td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </>
                )}
                <Link to="/contractor/invoices" className="SmallButton ShowAllButton">Show All <img src={RightArrow} /></Link>
              </div>
              <div className="FreelancerDashboard__recentInvoices my-4">
                <h5 className="FreelancerDashboard__recentInvoices-heading">Clients</h5>
                <p className="FreelancerDashboard__recentInvoices-subHeading">Lorem Ipsum</p>
                <div className="mt-2">
                  <Row className="FreelancerDashboard__freelancersList">
                    {businesses.length === 0 ? (
                        <p>0 records found</p>
                    ) : (
                      businesses.map(business => {
                        return (
                          <Col lg="4" md="6" sm="12" key={business}>
                            <div className="FreelancerDashboard__recentInvoices-client">
                              <div className="circle"></div>
                              {business}
                            </div>
                          </Col>
                        );
                      })
                    )}
                  </Row>
                </div>
              </div>
            </Col>
            <Col className="px-3" lg="4" md="4" sm="12" xs="12">
              <div className="FreelancerDashboard__recentInvoices">
                <h5 className="FreelancerDashboard__recentInvoices-heading">Binamite Wallet</h5>
                <div className="FreelancerDashboard__wallet mt-3">
                  <div className="FreelancerDashboard__availableBalance">
                    <p className="tagline">Available Balance in USD</p>
                    <h6 className="amount">0.00</h6>
                  </div>
                </div>
                <div>
                  <div className="FreelancerDashboard__wallet-balance my-3">
                    <img className="icon" src={WalletIcon} />
                    <div className="mx-2">
                      <p className="tagline">Binamite Wallet Balance</p>
                      <h6 className="amount">USD 0.00</h6>
                    </div>
                  </div>
                  <div className="FreelancerDashboard__wallet-balance my-3">
                    <img className="icon" src={BTCIcon} />
                    <div className="mx-2">
                      <p className="tagline">BTC Balance</p>
                      <h6 className="amount">0.00</h6>
                    </div>
                  </div>
                  <div className="FreelancerDashboard__wallet-balance my-3">
                    <img className="icon" src={ETHIcon} />
                    <div className="mx-2">
                      <p className="tagline">ETH Balance</p>
                      <h6 className="amount">0.00</h6>
                    </div>
                  </div>
                </div>
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

export default FreelancerDashboard;