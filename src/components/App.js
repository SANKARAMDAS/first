import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './Home/Home';
import Auth from './Auth/Auth';
import ForgotPassword from './Auth/ForgotPassword';
import CreateInvoice from './Invoice/CreateInvoice';
import ResetPassword from './Auth/ResetPassword';
import DisplayInvoices from './Invoice/DisplayInvoices';
import ContractorProfile from './Contractor/ContractorProfile';
import ContractorSettings from './Contractor/ContractorSettings';
import BusinessInvoices from './Business/BusinessInvoices';
import BusinessProfile from './Business/BusinessProfile';
import BusinessSettings from './Business/BusinessSettings';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route> {/* public */}
        <Route path="/auth" exact>
          <Auth />
        </Route> {/* public */}
        <Route path="/auth/forgot-password" >
          <ForgotPassword />
        </Route> {/* public */}
        <Route path="/auth/reset-password">
          <ResetPassword />
        </Route>
        <Route path="/create-invoice">
          <CreateInvoice />
        </Route> {/* after authentication */}
        <Route exact path="/contractor-profile">
          <ContractorProfile />
        </Route> {/* public */}
        <Route exact path="/contractor-settings">
          <ContractorSettings />
        </Route> {/* public */}
        <Route exact path="/invoices">
          <DisplayInvoices />
        </Route> {/* public */}
        <Route exact path="/business-invoices">
          <BusinessInvoices />
        </Route> {/* public */}
        <Route exact path="/business-profile">
          <BusinessProfile />
        </Route> {/* public */}
        <Route exact path="/business-settings">
          <BusinessSettings />
        </Route> {/* public */}
      </Switch>
    </Router>
  );
}

export default App;
