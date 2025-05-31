import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from '../landing/LandingPage';

import Dashboard from "../client/Dashboard";
import InvoicesPage from '../client/InvoicesPage';
import PaymentPage from "../client/PaymentPage";
import TransictionHistory from "../client/TransictionHistory";
import LoginPage from "../components/Authentification/LoginPage";
import SignUp from "../components/Authentification/SignUp";
import EmailVerification from '../components/Authentification/EmailVerification';
import AdminDashboard from '../admin/AdminDashboard';
import AdminClientManagement from '../admin/AdminClientManagement';
import ProductManagement from '../admin/ProductManagement';
import TransactionManagement from '../admin/AdminTransaction';
import FormTransaction from "../components/FormTransaction";
import AddProducts from "../components/AddProducts";
import CreditAppPage from "../client/Layout/CreditAppPage";
const AppRoutes: React.FC = () => {
    return (
      <Router>
        <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage  />} />
        <Route path="/emailVerification" element={<EmailVerification  />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/client/dashboard" element={<Dashboard />} />
        <Route path="/client/dashboard/invoices" element={<InvoicesPage />} />
        <Route path="/client/dashboard/payment" element={<PaymentPage />} />
        <Route path="/client/dashboard/history" element={<TransictionHistory />} />
        <Route path="/client/credit" element={<CreditAppPage />} />
        <Route path="/admin/clients" element={<AdminClientManagement />} />
        <Route path="/admin/transaction" element={<TransactionManagement />} /> 
        <Route path="/admin/products" element={<ProductManagement />} />
        
        <Route
          path="/admin/clients/form"
          element={<FormTransaction clientId={0}  />}
        />        
        </Routes>
      </Router>
    );
  };
  
  export default AppRoutes;