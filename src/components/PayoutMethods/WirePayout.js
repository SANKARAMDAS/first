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
import {Modal, ModalHeader } from "reactstrap";
import OtpInput from "react-otp-input";

const WirePayout = (props) => {
 
  const [sliderOpen, setSliderOpen] = useState(false)
  
  var $overlay = $('<div class="overlay"></div>')

  const [bitcoin, setBitcoin] = useState('');
  const [ethereum, setEthereum] = useState('');
  const [bitcoinbalance, setBitcoinbalance] = useState('');
  const [ethereumbalance, setEthereumbalance] = useState('')
  const [modal, setModal] = useState(false)
  const [otp, setOtp] = useState("");
  const [selectcurrency, setSelectcurrency] = useState("")
  let b = 'ETH'
  let a = 'BTC'

  const sliderToggle = () => {
    setSliderOpen(!sliderOpen)
  }

  const handleChange = (otp) => setOtp(otp);

  useEffect(() => {
    const getProfiledata = () => {
    axios.post(`${process.env.REACT_APP_BACKEND_API}/auth/refresh`, {
      withCredentials: true
    }).then(() => {
      axios.post(`${process.env.REACT_APP_BACKEND_API}/auth/getUserProfile`, {
        email: props.email
      })
      .then(res => {
        setBitcoin(res.data.data.bitcoin)
        setEthereum(res.data.data.ethereum)
        console.log(res);
        // if() {
        //   setBitcoinbalance("0")
        // }
        
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

  useEffect(() => {
    const getEtheradd = () => {
    axios.post(`${process.env.REACT_APP_BACKEND_API}/auth/refresh`, {
      withCredentials: true
    }).then(() => {
      axios.get(`${process.env.REACT_APP_BACKEND_API}/wyre-general/getWallet`)
      .then(res => {
        setBitcoinbalance(res.data.availableBalances["BTC"]);
        setEthereumbalance(res.data.availableBalances["ETH"]);
        console.log(res);
        if(!res.data.availableBalances["BTC"]) {
          setBitcoinbalance("0")
        }
        if(!res.data.availableBalances["ETH"]){
          setEthereumbalance("0")
        }
        
      })
      .catch(err => {
        console.log(err);
      })
      // setIsLoading(false)
    }).catch((error) => {
      console.log(error)
    })
    }
    getEtheradd()
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const backendObj = {
      token: otp,
      currency: selectcurrency,
    };
    console.log('Backendobj: ');
    console.log(backendObj);

    axios.post(`${process.env.REACT_APP_BACKEND_API}/auth/refresh`, {
      withCredentials: true
    }).then(() => {
      axios
      .post(
        `${process.env.REACT_APP_BACKEND_API}/wyre-transfer/transferInitiate`,
        backendObj,
      )
      .then((response) => {
        console.log(response);
        alert('User details update successfully');
      })
      .catch((err) => {
        console.log('Error: ',err);
      });
    }).catch((error) => {
      console.log(error)
    })
  };



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
                    <h3>Available : {bitcoinbalance} BTC</h3>
                    <h3>Wallet Address: {bitcoin}</h3>
                    <button className="btn btn-sm btn-def" onClick={() => {setModal(true); setSelectcurrency(a) }}
                type="submit">
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
                    <h3>Available : {ethereumbalance} ETH</h3>
                    <h3>Wallet Address: {ethereum}</h3>
                    <button className="btn btn-sm btn-def" onClick={() => {setModal(true); setSelectcurrency(b)}}
                type="submit">
                      Withdraw
                      <i class="fa-solid fa-arrow-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <Modal size= 'lg' isOpen={modal} toggle={() => setModal(!modal)}>
             <h1 className="hooding">Verification OTP</h1>
              <div className='modalClass'>

<OtpInput 
                value={otp}
                // justifyContent= "center"
                // className="otp-input bg-white mx-2 text-lg focus:outline-none focus:shadow-outline border-gray-300 rounded-lg  block w-full appearance-none leading-normal"
                onChange={handleChange}
                numInputs={4}
                separator={<span></span>}
                inputStyle={{
                  width: "3rem",
                  height: "3rem",
                  margin: "0 1rem",
                  fontSize: "2rem",
                  borderRadius: 4,
                  border: "1px solid rgba(0,0,0,0.3)"
                }}
              />

</div>

             <button className="btncls"
                type="submit"
                onClick={handleSubmit}
              >
                Verify
              </button>
            </Modal>
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
            <img src={bitcoin} alt="" /> Crypto Payout
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
