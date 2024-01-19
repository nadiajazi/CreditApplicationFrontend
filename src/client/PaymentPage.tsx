import React from 'react';
import { NavbarWithMegaMenu } from './Layout/NavList';
import payment_image from '../assets/pay.jpg'


const PaymentPage = () => {
  return (
    <div>
      <NavbarWithMegaMenu></NavbarWithMegaMenu>
      <div className='container px-40 py-40 mx-auto flex justify-center items-center'>


        
        <div className="w-1/2 pr-8">
            {/* Illustration */}
            <img
              src={payment_image}  
              alt="No purchases illustration"
              className="w-full h-full object-cover"
            />
          </div>
        <section className="w-1/2 max-w-xl mx-auto p-6 bg-white rounded-md shadow-md">
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
          className="bg-[#7C9EB9] text-white py-2 px-4 rounded-md hover:bg-[#F0BFA5] focus:outline-none focus:shadow-outline-blue"
          type="button"
        >
          Submit Payment
        </button>
      </section>
      </div>
      </div>
  );
};

export default PaymentPage;