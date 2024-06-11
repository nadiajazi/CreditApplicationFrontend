import React, { useState } from 'react';
import { NavbarWithMegaMenu } from './Layout/NavList';
import payment_image from '../assets/pay.jpg';
import axios from 'axios';



const PaymentMethod = {
  PAYPAL: 'PAYPAL',
  CREDIT_CARD: 'CREDIT_CARD',
  VISA: 'VISA',
  MASTER_CARD: 'MASTER_CARD',
  BITCOIN: 'BITCOIN'
};

const PaymentPage: React.FC = () => {
  const [amount, setAmount] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleAmountChange = (event:any) => {
    setAmount(event.target.value);
  };

  const handlePaymentMethodChange = (event:any) => {
    setPaymentMethod(event.target.value);
  };


  const handleSubmit = async () => {

    const token = localStorage.getItem('accessToken');
      if (!token) {
        console.error('Authentication token not found in local storage');
        return;
      }

    const paymentRequest = {
      amount,
      paymentMethod,
      customer: {
        firstName,
        lastName,
        email,
      },
    };

    try {
      const response = await axios.post(
        'http://localhost:8090/api/v1/payment/makepayment',
        paymentRequest,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage(`Payment created successfully with ID: ${response.data}`);
    } catch (error) {
      setMessage(`Error creating payment: ${(error as any).response.data.message}`);
    }
  };

  return (
    <div>
      <NavbarWithMegaMenu />
      <div className="container px-40 py-40 mx-auto flex justify-center items-center">
        <div className="w-1/2 pr-8">
          {/* Illustration */}
          <img
            src={payment_image}
            alt="Payment illustration"
            className="w-full h-full object-cover"
          />
        </div>
        <section className="w-1/2 max-w-xl mx-auto p-6 bg-white rounded-md shadow-md">
          <h2 className="text-2xl font-semibold mb-6 text-orange">Payment Information</h2>

         {/* Amount */}
         <div className="mb-4">
            <label className="block text-gray-600 text-sm font-semibold mb-2">Amount</label>
            <input
              type="text"
              value={amount}
              onChange={handleAmountChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter amount (TND)"
            />
          </div>

          {/* Payment Method */}
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-semibold mb-2">Payment Method</label>
            <select
              value={paymentMethod}
              onChange={handlePaymentMethodChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            >
              {Object.values(PaymentMethod).map((method) => (
                <option key={method} value={method}>{method}</option>
              ))}
            </select>
          </div>

          {/* First Name */}
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-semibold mb-2">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Last Name */}
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-semibold mb-2">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="bg-[#7C9EB9] text-white py-2 px-4 rounded-md hover:bg-[#F0BFA5] focus:outline-none focus:shadow-outline-blue"
            type="button"
          >
            Submit Payment
          </button>

          {message && <p className="mt-4 text-red-500">{message}</p>}
        </section>
      </div>
    </div>
  );
};

export default PaymentPage;
