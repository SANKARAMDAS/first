import React from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import './Layout.css'
import dashboard from './Icons/dashboard.svg'
import invoice from './Icons/invoice.svg'
import profile from './Icons/profile.svg'
import settings from './Icons/settings.svg'
import logout from './Icons/logout.svg'
import question from './Icons/question-mark.svg'
import payoutmethods from './Icons/Payment-method-outline.svg'

const Layout = (props) => {
  const history = useHistory()

  const handleLogout = async () => {
    axios.defaults.withCredentials = true
    await axios
      .post(`${process.env.REACT_APP_BACKEND_API}/auth/logout`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data)
        history.push('/')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className="layout">
      <div className="dashboard">
        <div className="sidebar">
          <Link className="button" to={`${props.url}`}>
            <img src={dashboard} />
            Dashboard
          </Link>
          <Link className="button" to={`${props.url}/invoices`}>
            <img src={invoice} alt="invoice" />
            Invoices
          </Link>
          {props.role === 'freelancer' ? (
            <Link className="button" to={`${props.url}/payout`}>
              <img src={payoutmethods} alt="payout-method" />
              Payout Methods
            </Link>
          ) : (
            <Link className="button" to={`${props.url}/payment`}>
              <img src={payoutmethods} alt="payout-method" />
              Payment Methods
            </Link>
          )}
          <Link className="button" to={`${props.url}/profile`}>
            <img src={profile} alt="profile" />
            Profile
          </Link>
          <Link className="button" to={`${props.url}/settings`}>
            <img src={settings} alt="settings" />
            Settings
          </Link>
          <button onClick={handleLogout} className="button logout-btn">
            <img src={logout} alt="logout" />
            Logout
          </button>
        </div>
        <main
          className="main"
          style={{ width: '100%', backgroundColor: '#F5F5F5' }}
        >
          <Container fluid className="betaBar">
            This is a beta version of Binamite. If you have some feedback let us
            know here.{' '}
            <span className="tool-tip">
              <img src={question} />{' '}
              <span className="tool-tip-text">
                Binamite is currently in beta version.
              </span>
            </span>
          </Container>
          <Container fluid className="py-4">
            {props.children}
          </Container>
        </main>
      </div>
    </div>
  )
}

export default Layout
