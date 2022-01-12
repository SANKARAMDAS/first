import React from 'react';
import BusinessProfile from './BusinessProfile'
import BusinessSettings from './BusinessSettings'
import BusinessInvoices from './BusinessInvoices'
import BusinessInvoiceDetails from './BusinessInvoiceDetails'
import { Route, useRouteMatch } from 'react-router-dom';

const BusinessRoutes = () => {

    let { path } = useRouteMatch()

    return (
        <>
            <Route path={path} exact >
                <BusinessProfile />
            </Route>
            <Route path={`${path}/settings`} exact >
                <BusinessSettings />
            </Route>
            <Route path={`${path}/invoices`} exact >
                <BusinessInvoices />
            </Route>
            <Route path={`${path}/invoices/:invoiceId`}>
                <BusinessInvoiceDetails />
            </Route>
        </>
    );
}

export default BusinessRoutes;