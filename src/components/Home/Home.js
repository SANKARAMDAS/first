import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Metamask from '../Metamask/Metamask';
import axios from "axios";

import Cookies from "universal-cookie";

const cookies = new Cookies();

axios.defaults.withCredentials = true

const Home = () => {

  const [userAuth, setUserAuth] = useState({})

  const authToken = cookies.get('refreshToken')

  useEffect(() => {
    const checkAuthentication = async () => {
      axios.post(`${process.env.REACT_APP_BACKEND_API}/auth/refresh`, {
        withCredentials: true
      }).then((res) => {
        setUserAuth(res.data)
        console.log(userAuth)
      }).catch((error) => {
        console.log(error)
      })
    }
    checkAuthentication()
  }, []);

  const handleSendInvoice = async (e) => {
    e.preventDefault();
    axios
    .post(
      `${process.env.REACT_APP_BACKEND_API}/invoice/invoiceCreation`,
      {
        invoiceTitle: 'Invoice Tittle',
        businessEmail: 'unnat@octaloop.com',
        freelancerEmail: 'unnat2904@gmail.com',
        freelancerName: 'unnat',
        businessName: 'Unnat Kumar',
        ETH: '25',
        BTC: '25',
        FIAT: '50',
        item: [
          {
            description: "designing work",
            quantity: "1",
            price: "5000"
          }
        ],
        memo: "invoice memo 123",
        creationDate: "16/03/2022",
        dueDate: "19/03/2022",
        pdfFile: "",
        invoiceId: "123"
      },
      {
        headers: {
          'user': authToken
        }
      }
    )
    .then((response) => {
      console.log('Success!!');
      console.log(response);
    })
    .catch((err) => {
      console.log('Error: ',err);
    });
  }

  return (
    <div className="page">
      <Header />
      <h1>Homepage</h1>
      <button onClick={handleSendInvoice}>
        Create Invoice
      </button>
      <Metamask />
    </div>
  );
}
 
export default Home;