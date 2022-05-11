import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { Form, Table, Container, Row, Col } from 'react-bootstrap'
import InputRange from 'react-input-range'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import dateFormat from 'dateformat'
import { useReactToPrint } from 'react-to-print'
import * as htmlToImage from 'html-to-image'
import { jsPDF } from 'jspdf'
import 'react-input-range/lib/css/index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTrash,
  faPlus,
  faPrint,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons'
import './css/CryptoSlider.css'
import { ConstructorFragment } from 'ethers/lib/utils'

axios.defaults.withCredentials = true

const CryptoSlider = (props) => {

  const [wallteid, setWallteid] = useState('');
  const [crypto, setCrypto] = useState(" "); 

  const handleId = (e) => {
    setWallteid(e.target.value)
  }


  const crypTo = (e) => {
    setCrypto(e.target.value)
  }

const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(text)

    const backendObj = { email: props.email };
    backendObj[crypto] = wallteid;

    if (!crypto.length) {
      alert("select wallet")
      return
    };

    console.log('Backendobj: ');
    console.log(backendObj);

    axios.post(`${process.env.REACT_APP_BACKEND_API}/auth/refresh`, {
      withCredentials: true
    }).then(() => {
      axios
      .post(
        `${process.env.REACT_APP_BACKEND_API}/auth/updateProfile`,
        backendObj
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

  return (
    <div
      className={
        props.show
          ? 'side-drawer open createInvoiceSlider'
          : 'side-drawer createInvoiceSlider'
      }
    >
    
      <Form>
        <Container className="py-4 px-4">
          <Row>
            <Col>
              <h5 className="createInvoiceSlider__heading">
                Add Cryptocurrency
              </h5>
              <p className="createInvoiceSlider__content">
                Save account details for Wire Transfers.
              </p>
            </Col>
          </Row>
          <Row>
            <Col lg="12">
              <Row>
                <Col lg="10" md="6" sm="12">
                <Form.Group className="mb-3" controlId="name">
                <Form.Label className="invoice-label">Select Currency: </Form.Label>
                    {/* <label style={styles.lbl}>Select Currency</label> */}
                    <select className="form-select" placeholder="currency" value={crypto} onChange={crypTo}>
                        <option value=" ">Select</option>
                        <option value= "bitcoin" >BTC</option>
                        <option value= "ethereum" >ETH</option>
                    </select>
                </Form.Group>
                </Col>
              </Row>

              {/* <Col lg="10" md="6" sm="12">
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label className="invoice-label">Username: </Form.Label>
                  <Form.Control
                    onChange={handleUserName}
                    value={usern}
                    className="invoice-input"
                    maxLength=" 30"
                  />
                </Form.Group>
              </Col> */}

              <Col lg="10" md="6" sm="12">
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label className="invoice-label">Wallet ID :</Form.Label>
                  <Form.Control
                    onChange={handleId}
                    className="invoice-input"
                    value={wallteid}
                    placeholder="type here"
                    maxLength="35"
                  />
                </Form.Group>
              </Col>
              <p className="createInvoiceSlider__content">
                Add Some info...
              </p>
            </Col>
          </Row>
          <hr  style={{
    color: '#000000',
    backgroundColor: '#000000',
    height: .5,
    borderColor : '#000000'
}}/>
        </Container>
        
      </Form>
      
      <Col className="but">
              <button
                className="invoice-button"
                onClick={handleSubmit}
                type="submit"
              >
                Save
                <i class="fa-solid fa-arrow-right"></i>
              </button>
              <button
                className="i-button"
                onClick={props.onClose}
                type="submit"
              >
                Cancel
              </button>
            </Col>
      
    </div>
  )
}

export default CryptoSlider;
