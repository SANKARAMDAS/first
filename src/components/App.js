import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Home/Home';
import Auth from './Auth/Auth';
import ForgotPassword from './Auth/ForgotPassword';
import CreateInvoice from './Invoice/CreateInvoice';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route path="/create-invoice" element={<CreateInvoice />} />
      </Routes>
    </Router>
  );
}

export default App;
