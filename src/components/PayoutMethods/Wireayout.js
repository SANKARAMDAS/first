import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { Container, Row, Col, Form } from 'react-bootstrap'
import './css/Wireayout.css'
import bankicon from './Icons/bank-outline.svg'
import bitcoin from './Icons/logo-bitcoin.svg'
import WireSlider from './WireSlider'
import WithdrawFund from './WithdrawFund'

const Wireayout = (props) => {
  const [sliderOpenn, setsliderOpenn] = useState(false)
  const [sliderOpennwith, setsliderOpennWith] = useState(false)

  const sliderToggle = () => {
    setsliderOpenn(!sliderOpenn)
  }

  const sliderToggle1 = () => {
    setsliderOpennWith(!sliderOpennwith)
  }

  const renderView = () => {
    return (
      <>
        <div className="boxx">
          <Row>
            <Col>
              <div className="box-1">
                <div className="row">
                  <div className="col-sm-8">
                    <h3>Account Name : Abcde {}</h3>
                    <h3>Bank Name : SBI {}</h3>
                    <h3>Account Number : 00030321545787 {}</h3>
                    <h3>SWIFT Code : SBIN07070{}</h3>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </>
    )
  }

  return (
    <div className="paymentDebitCard">
      <h3 className="pb-3 heading">Payment Methods</h3>
      <WireSlider
        onClose={() => setsliderOpenn(false)}
        show={sliderOpenn}
        email={props.email}
      />
      <div className="tabs">
        <div className="tab active">
          <img src={bankicon} alt="bank-icon" /> Wire Payout{' '}
        </div>
        <Link className="tab" to={`${props.url}/payout`}>
          <img src={bitcoin} alt="bit-coin" /> Crypto Payout
        </Link>
      </div>
      <WithdrawFund
        onClose={() => setsliderOpennWith(false)}
        show={sliderOpennwith}
        email={props.email}
      />
      <div className="contentArea">
        <h4 className="sub-heading">Your Account</h4>
        {renderView()}
        <h4 className="text">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s,
        </h4>
        <hr  style={{
    color: '#000000',
    backgroundColor: '#000000',
    height: .5,
    borderColor : '#000000'
}}/>
        <h4 className="sub-heading">Your Account</h4>
        <button type="add" className="button" onClick={() => sliderToggle()}>
          + Add Bank Account
        </button>
        <hr  style={{
    color: '#000000',
    backgroundColor: '#000000',
    height: 1,
    borderColor : '#000000'
}}/>
        <h4 className="sub-heading">Wallet Balance</h4>
        <Row> 
          <Col>
          <h6>$ 20.0045 </h6>
          </Col>
          <Col>
          <button className="btn1 btn-sm btn-def" onClick={() => sliderToggle1()}>
          Withdraw Funds
          <span className="fa-solid fa-arrow-right"></span>
          {/* <i class="fa-solid fa-arrow-right"></i> */}
        </button>
          </Col>
        </Row>
        
      </div>
    </div>
  )
}

export default Wireayout
