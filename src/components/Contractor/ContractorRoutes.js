import React, { useState, useEffect } from 'react'
import isAuthenticated from '../../assets/js/auth'
import FreelancerDashboard from '../Dashboard/FreelancerDashboard'
import Profile from '../Profile/Profile'
import Settings from '../Settings/Settings'
import InvoiceDetails from '../Invoice/InvoiceDetails'
import DisplayInvoices from '../Invoice/DisplayInvoices'
import CreateInvoice from '../Invoice/CreateInvoice'
import Layout from '../Layout/Layout'
import { Route, useRouteMatch } from 'react-router-dom'
import WirePayout from '../PayoutMethods/WirePayout'
import Wireayout from '../PayoutMethods/Wireayout'
import BusinessWalletPayment from '../BusinessPaymentMethod/BusinessWalletPayment'

const ContractorRoutes = () => {
  let { path, url } = useRouteMatch()
  const [userAuth, setUserAuth] = useState({})

  useEffect(() => {
    const checkAuthentication = async () => {
      setUserAuth(await isAuthenticated())
    }
    checkAuthentication()
  }, [])

  const renderContractorDashboard = () => {
    if (Object.keys(userAuth) === 0) {
      return (
        <div>
          <h4>Loading...</h4>
        </div>
      )
    } else if (userAuth.authenticated) {
      return (
        <Layout url={url} role="freelancer">
          <Route path={path} exact>
            <FreelancerDashboard
              email={userAuth.email}
              role={userAuth.role}
              url={url}
            />
          </Route>
          <Route path={`${path}/create-invoice`} exact>
            <CreateInvoice email={userAuth.email} />
          </Route>
          <Route path={`${path}/payment`} exact>
            <BusinessWalletPayment
              email={userAuth.email}
              role={userAuth.role}
              url={url}
            />
          </Route>
          <Route path={`${path}/payout`} exact>
            <WirePayout email={userAuth.email} role={userAuth.role} url={url} />
          </Route>
          <Route path={`${path}/wireayout`} exact>
            <Wireayout email={userAuth.email} role={userAuth.role} url={url} />
          </Route>
          <Route path={`${path}/profile`} exact>
            <Profile email={userAuth.email} role={userAuth.role} />
          </Route>
          <Route path={`${path}/settings`} exact>
            <Settings email={userAuth.email} />
          </Route>
          <Route path={`${path}/invoices`} exact>
            <DisplayInvoices
              email={userAuth.email}
              role={userAuth.role}
              url={url}
            />
          </Route>
          <Route path={`${path}/invoices/:invoiceId`}>
            <InvoiceDetails role={userAuth.role} url={url} />
          </Route>
        </Layout>
      )
    } else {
      return (
        <>
          <>Forbidden Error - 403</>
        </>
      )
    }
  }

  return <>{renderContractorDashboard()}</>
}

export default ContractorRoutes
