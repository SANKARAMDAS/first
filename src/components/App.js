import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './Home/Home';
import ContractorRoutes from './Contractor/ContractorRoutes'
import BusinessRoutes from './Business/BusinessRoutes';
import AuthRoutes from './Auth/AuthRoutes';
import ManageRole from './ManageRole/ManageRole';
import ResetPassword from './Auth/ResetPassword';
import ContactUs from './ContactUs/ContactUs';
import Test from './Test';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/auth">
          <AuthRoutes />
        </Route>
        <Route path={`/confirm/:confirmationCode`}>
          <ManageRole />
        </Route>
        <Route path="/passwordreset/:token/:id">
          <ResetPassword />
        </Route>
        <Route path="/contractor">
          <ContractorRoutes />
        </Route>
        <Route path="/business">
          <BusinessRoutes />
        </Route>
        <Route path="/contact-us">
          <ContactUs />
        </Route>
        <Route path="/test">
          <Test />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
