import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './Home/Home';
import ContractorRoutes from './Contractor/ContractorRoutes'
import BusinessRoutes from './Business/BusinessRoutes';
import AuthRoutes from './Auth/AuthRoutes';

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
        <Route path="/contractor">
          <ContractorRoutes />
        </Route>
        <Route path="/business">
          <BusinessRoutes />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
