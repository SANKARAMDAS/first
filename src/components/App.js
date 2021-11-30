import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Home/Home';
import Auth from './Auth/Auth';
import ForgotPassword from './Auth/ForgotPassword';
import ResetPassword from './Auth/ResetPassword';
import CreateInvoice from './Invoice/CreateInvoice';
import ClientInvoice from './Invoice/ClientInvoice';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route path="/auth/reset-password" element={<ResetPassword />} />
        <Route path="/create-invoice" element={<CreateInvoice />} />
        <Route exact path="/pay-invoice" element={<ClientInvoice />} />
      </Routes>
    </Router>
  );
}

export default App;
