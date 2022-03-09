import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './Home/Home';
import ContractorRoutes from './Contractor/ContractorRoutes'
import BusinessRoutes from './Business/BusinessRoutes';
import AuthRoutes from './Auth/AuthRoutes';
import ManageRole from './ManageRole/ManageRole';
import ContactUs from './ContactUs/ContactUs';

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
        <Route path="/contractor">
          <ContractorRoutes />
        </Route>
        <Route path="/business">
          <BusinessRoutes />
        </Route>
        <Route path="/contact-us">
          <ContactUs />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
