import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Container, Row, Col, Form } from 'react-bootstrap'
import axios from 'axios'
import bankicon from './Icons/bank-outline.svg'
import bitcoin from './Icons/logo-bitcoin.svg'
import bitcoinimg from './Icons/Icon-BTC.svg'
import ethcoinimg from './Icons/Icon-ETH.svg'
import './WirePayout.css'
import $ from 'jquery'
import 'jquery-ui-dist/jquery-ui'
import CryptoSlider from './CryptoSlider'

const WirePayout = (props) => {
 
  const [sliderOpen, setSliderOpen] = useState(false)
  
  var $overlay = $('<div class="overlay"></div>')

 
  const sliderToggle = () => {
    setSliderOpen(!sliderOpen)
  }


  const renderView = () => {
    return (
      <>
        <div className="boxxx">
          <Row>
            <Col>
              <div className="box-1">
                <div className="row">
                  <div className="tab active">
                    <img src={bitcoinimg} alt="bit-coin-img" /> Bitcoin
                  </div>
                  <div className="col-sm-8">
                    <h3>Available : 2.000005 BTC {}</h3>
                    <h3>Wallet Address: XXXXXXXXXXXXX{}</h3>
                    <button className="btn btn-sm btn-def" >
                      Withdraw
                      <span className="fa-solid fa-arrow-right">
                      </span>
                      {/* <i class="fa-solid fa-arrow-right"></i> */}
                    </button>
                    {/* <div className="col-sm-6 d-flex justify-content-end align-items-center">
                      <a id="open-profile" href="#">
                        <i class="fa-solid fa-pen-to-square"></i>Manage
                      </a>
                    </div> */}
                  </div>
                </div>
              </div>
            </Col>
            <Col>
              <div className="box-1">
                <div className="row">
                  <div className="tab active">
                    <img src={ethcoinimg} alt="eth-coin-img" /> Ethereum
                  </div>
                  <div className="col-sm-8">
                    <h3>Available : 0.4447 ETH</h3>
                    <h3>Wallet Address: XXXXXXXXXX</h3>
                    <button className="btn btn-sm btn-def" >
                      Withdraw
                      <i class="fa-solid fa-arrow-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        {/* <button onClick={() => setView('create-payment-methods')}>Create Payout Method</button>
        {paymentMethods} */}
      </>
    )
  }

  return (
    <>
      <div className="payoutCrypto">
        <h3 className="pb-3 heading">Payout Methods</h3>
        <CryptoSlider onClose={() => setSliderOpen(false)} show={sliderOpen} email={props.email} />
        <div className="tabs">
          <Link
            className="tab"
            to={`${props.url}/Wireayout`}

          >
            <img src={bankicon} alt="bank-icon" /> Wire Payout
          </Link>
          <div className="tab active">
            <img src={bitcoin} alt="bit-coin" /> Crypto Payout
          </div>
        </div>
        <div className="contentArea">
          <h4 className="sub-heading">Crypto Payout</h4>
          {renderView()}
          <br />
          <h4 className="sub-heading">Add Cryptocurrency</h4>
          <button type="add" className="button" onClick={() => sliderToggle()}>
            + Add New
          </button>
        </div>
      </div>
    </>
  )
}

export default WirePayout
