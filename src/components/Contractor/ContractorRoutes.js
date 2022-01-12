import React from 'react';
import ContractorProfile from './ContractorProfile'
import ContractorSettings from './ContractorSettings'
import DisplayInvoices from '../Invoice/DisplayInvoices'
import CreateInvoice from '../Invoice/CreateInvoice'
import { Route, useRouteMatch } from 'react-router-dom';

const ContractorRoutes = () => {

    let { path } = useRouteMatch()

    return (
        <>
            <Route path={path} exact >
                <ContractorProfile />
            </Route>
            <Route path={`${path}/create-invoice`} exact >
                <CreateInvoice />
            </Route>
            <Route path={`${path}/settings`} exact >
                <ContractorSettings />
            </Route>
            <Route path={`${path}/invoices`} exact >
                <DisplayInvoices />
            </Route>
        </>
    );
}

export default ContractorRoutes;