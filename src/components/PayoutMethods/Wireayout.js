import React, { useState, useEffect } from 'react'
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

  const [owner, setOwner] = useState("");
  const [name, setName] = useState("");
  const [currency, setCurrency] = useState("")

  const sliderToggle = () => {
    setsliderOpenn(!sliderOpenn)
  }

  const sliderToggle1 = () => {
    setsliderOpennWith(!sliderOpennwith)
  }

  useEffect(() => {
    const getProfiledata = () => {
    // const backendObj = {
    //   bitcoin:  bitocin,
    //   ethereum: ethereum,
    // };

    // console.log('Backendobj: ');
    // console.log(backendObj);

    axios.post(`${process.env.REACT_APP_BACKEND_API}/auth/refresh`, {
      withCredentials: true
    }).then(() => {
      axios.get(`${process.env.REACT_APP_BACKEND_API}/wyre-payment/paymentMethods`)   //payment method
      .then(res => {
        console.log(res);
        setOwner(res.data[0].status);
        setName(res.data[0].name);
        setCurrency(res.data[0].defaultCurrency);
      })
      .catch(err => {
        console.log(err);
      })
      // setIsLoading(false)
    }).catch((error) => {
      console.log(error)
    })
    }
    getProfiledata()
  },[])
  const renderView = () => {
    return (
      <>
        <div className="boxx">
          <Row>
            <Col>
              <div className="box-1">
                <div className="row">
                  <div className="col-sm-8">
                    <h3>Owner Name : {owner}</h3>
                    <h3>Account Number : {name}</h3>
                    <h3>SWIFT Code : {currency}</h3>
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
    <div className="payoutWire">
      <h3 className="pb-3 heading">Payout Methods</h3>
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
