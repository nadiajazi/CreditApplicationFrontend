<<<<<<< HEAD
import React from 'react'

function PaymentPage() {
  return (
    <div>
        {/* UI Elements:
          Form for making online payments.
          Display of the client's current credit.
          Confirmation message after successful payment. */}
    </div>
  )
}

export default PaymentPage
=======
// PaymentPage.jsx

import React from 'react';
import { NavbarWithMegaMenu } from './Layout/NavList';
import { FooterWithLogo } from './Layout/Footer';

const PaymentPage = () => {
  return (
    <div>
      <NavbarWithMegaMenu></NavbarWithMegaMenu>
      <div className='container px-40 py-40 mx-auto'>
      <section className=" max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-orange">Payment Information</h2>

        {/* Credit Card Number */}
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-2">Card Number</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="**** **** **** ****"
          />
        </div>

        {/* Expiration Date */}
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-2">Expiration Date</label>
          <input
            type="text"
            className="w-1/2 p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="MM/YY"
          />
        </div>

        {/* CVV */}
        <div className="mb-6">
          <label className="block text-gray-600 text-sm font-semibold mb-2">CVV</label>
          <input
            type="text"
            className="w-1/4 p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="***"
          />
        </div>

        {/* Submit Button */}
        <button
          className="bg-skyblue text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:shadow-outline-blue"
          type="button"
        >
          Submit Payment
        </button>
      </section>
      </div>

      <FooterWithLogo></FooterWithLogo>
      </div>
  );
};

export default PaymentPage;
>>>>>>> origin/MarwenChebbi
