import React from "react";
import CreateInvoice from "./CreateInvoice";
import PreviewInvoice from "./PreviewInvoice";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useRouteMatch,
} from "react-router-dom";

const InvoiceRoutes = () => {

    let { path } = useRouteMatch();

    return (
        <Router>
            <Switch>
                <Route path={path} exact>
                    <CreateInvoice path={path} />
                </Route>
                <Route path={`${path}/preview-invoice`} exact>
                    <PreviewInvoice />
                </Route>
            </Switch>
        </Router>
    );
}

export default InvoiceRoutes;