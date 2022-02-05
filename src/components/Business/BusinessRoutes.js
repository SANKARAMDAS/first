import React, { useState, useEffect } from 'react';
import isAuthenticated from '../../assets/js/auth'
import Profile from '../Profile/Profile';
import Settings from '../Settings/Settings';
import DisplayInvoices from '../Invoice/DisplayInvoices'
import InvoiceDetails from '../Invoice/InvoiceDetails';
import PayInvoice from '../Invoice/PayInvoice';
import DebitCard from '../PaymentMethods/DebitCard';
import ACHTransfer from '../PaymentMethods/ACHTransfer';
import Layout from '../Layout/Layout';
import { Route, useRouteMatch } from 'react-router-dom';

const BusinessRoutes = () => {

    let { path, url } = useRouteMatch()
    const [userAuth, setUserAuth] = useState({})

    useEffect(() => {
        const checkAuthentication = async () => {
            setUserAuth(await isAuthenticated())
        }
        checkAuthentication()
    }, []);

    const renderBusinessDashboard = () => {
        if (Object.keys(userAuth) === 0) {
            return <div><h4>Loading...</h4></div>
        }
        else if (userAuth.authenticated) {
            return (
                <Layout url={url} role="business">
                    <Route path={path} exact >
                        <Profile email={userAuth.email} />
                    </Route>
                    <Route path={`${path}/settings`} exact >
                        <Settings email={userAuth.email} />
                    </Route>
                    <Route path={`${path}/invoices`} exact >
                        <DisplayInvoices email={userAuth.email} role={userAuth.role} url={url} />
                    </Route>
                    <Route path={`${path}/invoices/:invoiceId`} exact >
                        <InvoiceDetails role={userAuth.role} url={url} />
                    </Route>
                    <Route path={`${path}/invoices/:invoiceId/pay`} exact >
                        <PayInvoice url={url} />
                    </Route>
                    <Route path={`${path}/invoices/:invoiceId/pay/debit-card`} exact >
                        <DebitCard />
                    </Route>
                    <Route path={`${path}/invoices/:invoiceId/pay/ach-transfer`} exact >
                        <ACHTransfer />
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

    return (
        <>
            {renderBusinessDashboard()}
        </>
    );
}

export default BusinessRoutes;
