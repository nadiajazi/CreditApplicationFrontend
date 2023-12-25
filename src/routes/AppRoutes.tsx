import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from '../landing/LandingPage';
<<<<<<< HEAD
=======
import Dachboard from "../client/Dachboard";
import InvoicesPage from '../client/InvoicesPage';
import PaymentPage from "../client/PaymentPage";
import TransictionHistory from "../client/TransictionHistory";
>>>>>>> origin/MarwenChebbi
// import LoginPage from '../components/Authentication/LoginPage';
// import SignUpPage from '../components/Authentication/SignUpPage';
// import EmailVerificationPage from '../auth/EmailVerificationPage';
// import Dashboard from '../client/Dashboard';
// import TransactionHistory from '../client/TransactionHistory';
// import PaymentPage from '../client/PaymentPage';
// import InvoicesPage from '../client/InvoicesPage';
<<<<<<< HEAD
import AdminDashboard from '../admin/AdminDashboard';
import AdminClientManagement from '../admin/AdminClientManagement';
import ProductManagement from '../admin/ProductManagement';
import AdminTransaction from '../admin/AdminTransaction';
import FormTransaction from "../components/FormTransaction";
=======
// import AdminDashboard from '../admin/AdminDashboard';
// import AdminClientManagement from '../admin/AdminClientManagement';
// import ProductManagement from '../admin/ProductManagement';
>>>>>>> origin/MarwenChebbi

const AppRoutes: React.FC = () => {
    return (
      <Router>
        <Routes>
        <Route path="/" element={<LandingPage />} />
<<<<<<< HEAD
        <Route path="/admin" element={<AdminDashboard />} />
=======
        <Route path="/client/dashboard" element={<Dachboard />} />
        <Route path="/client/dashboard/invoices" element={<InvoicesPage />} />
        <Route path="/client/dashboard/payment" element={<PaymentPage />} />
        <Route path="/client/dashboard/history" element={<TransictionHistory />} />

>>>>>>> origin/MarwenChebbi
        {/* <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/verify-email" element={<EmailVerificationPage />} />
        <Route path="/client" element={<Dashboard />} />
        <Route path="/client/transactions" element={<TransactionHistory />} />
        <Route path="/client/payment" element={<PaymentPage />} />
        <Route path="/client/invoices" element={<InvoicesPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
<<<<<<< HEAD
        */}
        <Route path="/admin/clients" element={<AdminClientManagement />} />
        <Route path="/admin/transaction" element={<AdminTransaction />} /> 
        <Route path="/admin/products" element={<ProductManagement />} />
        <Route
          path="/admin/clients/form/:clientId"
          element={<FormTransaction onClose={() => {}} clientId={0} handleTransactionSubmit={() => {}} />}
        />        
=======
        <Route path="/admin/clients" element={<AdminClientManagement />} />
        <Route path="/admin/products" element={<ProductManagement />} /> */}
>>>>>>> origin/MarwenChebbi
        </Routes>
      </Router>
    );
  };
  
  export default AppRoutes;