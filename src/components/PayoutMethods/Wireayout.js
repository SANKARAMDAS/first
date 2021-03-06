import React, { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { Container, Row, Col, Form } from 'react-bootstrap'
import './css/Wireayout.css'
import bankicon from './Icons/bank-outline.svg'
import bitcoin from './Icons/logo-bitcoin.svg'
import WireSlider from './WireSlider'
import WithdrawFund from './WithdrawFund'
import { useDetectOutsideClick } from "./useDetectOutsideClick"
import Notification from "./Icons/notifications-outline.svg"
import Swipe from './Icons/swap-horizontal-outline.svg'

const Wireayout = (props) => {
  const [sliderOpenn, setsliderOpenn] = useState(false)
  const [sliderOpennwith, setsliderOpennWith] = useState(false)

  const [owner, setOwner] = useState('')
  const [name, setName] = useState('')
  const [currency, setCurrency] = useState('')
  const [usdbal, setUsdBal] = useState('')
  const onClick = () => setIsActive(!isActive);
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const [name1, setName1] = useState('')

  const sliderToggle = () => {
    setsliderOpenn(!sliderOpenn)
  }

  const sliderToggle1 = () => {
    setsliderOpennWith(!sliderOpennwith)
  }

  useEffect(() => {
    const getBal = () => {
      axios
        .post(`${process.env.REACT_APP_BACKEND_API}/auth/refresh`, {
          withCredentials: true,
        })
        .then(() => {
          axios
            .get(`${process.env.REACT_APP_BACKEND_API}/wyre-general/getWallet`)
            .then((res) => {
              setUsdBal(res.data.availableBalances['USD'])
              console.log(res)
              if (!res.data.availableBalances['USD']) {
                setUsdBal('0')
              }
            })
            .catch((err) => {
              console.log(err)
            })
          // setIsLoading(false)
        })
        .catch((error) => {
          console.log(error)
        })
    }
    getBal()
  }, [])

  useEffect(() => {
    const getProfiledata = () => {
      axios
        .post(`${process.env.REACT_APP_BACKEND_API}/auth/refresh`, {
          withCredentials: true,
        })
        .then(() => {
          axios
            .get(
              `${process.env.REACT_APP_BACKEND_API}/wyre-payment/paymentMethods`,
            ) //payment method
            .then((res) => {
              console.log(res)
              setOwner(res.data[0].status)
              setName(res.data[0].name)
              setCurrency(res.data[0].defaultCurrency)
            })
            .catch((err) => {
              console.log(err)
            })
          // setIsLoading(false)
        })
        .catch((error) => {
          console.log(error)
        })
    }
    getProfiledata()
  }, [])

  useEffect(() => {
    const getProfiledata = () => {
      axios
        .post(`${process.env.REACT_APP_BACKEND_API}/auth/refresh`, {
          withCredentials: true,
        })
        .then(() => {
          axios
            .post(`${process.env.REACT_APP_BACKEND_API}/auth/getUserProfile`, {
              email: props.email,
            })
            .then((res) => {
              setName1(res.data.data.name)
              console.log(res)
              // if() {
              //   setBitcoinbalance("0")
              // }
            })
            .catch((err) => {
              console.log(err)
            })
          // setIsLoading(false)
        })
        .catch((error) => {
          console.log(error)
        })
    }
    getProfiledata()
  }, [])

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
     <div className="topbarWrapper">
        <div className="topLeft">
          <h4 className="logo">Payout Methods</h4>
        </div>
        <div className="topRight">
          <div className="notifimenu">
            <div className="notifi-container">
            <img src={Notification} alt="" className="topAvatar" />
            </div>
          </div>
          &nbsp;
          &nbsp;
          <div className="notifimenu">
            <div className="notifi-container">
            <img src={Swipe} alt="" className="topAvatar" />
            </div>
          </div>
          <div className="container">
      <div className="menu-container">
        <button onClick={onClick} className="menu-trigger">
          <span> {name1}</span>
          <img
            src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/df/df7789f313571604c0e4fb82154f7ee93d9989c6.jpg"
            alt="User avatar"
          />
        </button>
        <nav
          ref={dropdownRef}
          className={`menu ${isActive ? "active" : "inactive"}`}
        >
          <ul>
            <li>
              <a href={`${props.url}/profile`}>Profile</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href={`${props.url}/settings`}>Settings</a>
            </li>
            <li>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  
        </div>
      
      
      
      </div>
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
        { name.length === 0 ? 
        ( <>
        </>) :
         (<>
          <h4 className="sub-heading">Your Account</h4>
        {renderView()}
        <h4 className="text">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s,
        </h4>
        <hr
          style={{
            color: '#000000',
            backgroundColor: '#000000',
            height: 0.5,
            borderColor: '#000000',
          }}
          />
        </>) 
        }
      
        <h4 className="sub-heading">Your Account</h4>
        <button type="add" className="button" onClick={() => sliderToggle()}>
          + Add Bank Account
        </button>
        <hr
          style={{
            color: '#000000',
            backgroundColor: '#000000',
            height: 1,
            borderColor: '#000000',
          }}
        />
        <h4 className="sub-heading">Wallet Balance</h4>
        <Row>
          <Col>
            <h6>$ {usdbal} </h6>
          </Col>
          <Col>
            <button
              className="btn1 btn-sm btn-def"
              onClick={() => sliderToggle1()}
            >
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
