import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './Home/Home';
import Auth from './Auth/Auth';
import ForgotPassword from './Auth/ForgotPassword';
import InvoiceRoutes from './Invoice/InvoiceRoutes';
import ClientInvoice from './Invoice/ClientInvoice';

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
        <Route path="/create-invoice">
          <InvoiceRoutes />
        </Route> {/* after authentication */}
        <Route exact path="/pay-invoice">
          <ClientInvoice />
        </Route> {/* public */}
      </Switch>
    </Router>
  );
}

export default App;
