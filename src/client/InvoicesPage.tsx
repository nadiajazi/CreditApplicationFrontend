import React, { useEffect } from 'react';
import { NavbarWithMegaMenu } from './Layout/NavList';
import { usePaymentStore } from '../stores/usePaymentStore';

const InvoicesPage: React.FC = () => {
  const { clientInvoices, fetchClientInvoices } = usePaymentStore((state) => ({
    clientInvoices: state.clientInvoices,
    fetchClientInvoices: state.fetchClientInvoices,
  }));

  useEffect(() => {
    fetchClientInvoices();
  }, [fetchClientInvoices]);

  const formatDate = (date: Date): string => {
    return date.toISOString().slice(0, 16).replace('T', ' ');
  };

  return (
    <div>
      <NavbarWithMegaMenu />
      <div className="container px-40 py-40 mx-auto">
        <h2 className='text-2xl font-bold mb-6'>Payment History: </h2>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-700 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className='border border-gray-200 px-6 py-3 shadow-md '>ID</th>
                <th className='border border-gray-200 px-6 py-3 shadow-md '>Amount</th>
                <th className='border border-gray-200 px-6 py-3 shadow-md '>Method</th>
                <th className='border border-gray-200 px-6 py-3 shadow-md '>Date</th>
              </tr>
            </thead>
            <tbody>
              {clientInvoices?.map((payment) => (
                <tr key={payment.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <td className='border px-6 py-4 '>{payment.id}</td>
                  <td className='border px-6 py-4 '>{payment.amount} TND</td>
                  <td className='border px-6 py-4 '>{payment.paymentMethod}</td>
                  <td className='border px-6 py-4 '>{formatDate(new Date(payment.createdDate))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InvoicesPage;
