import React, {useEffect} from 'react';
import { NavbarWithMegaMenu } from './Layout/NavList';
import error_image from '../assets/404.png'
import { useTransactionStore } from '../stores/useTransactionStore';




const TransactionHistory = () => {
  const { clientPurchases, fetchClientPurchases } = useTransactionStore();

  useEffect(() => {
    const iduser = localStorage.getItem('id')
    console.log(iduser)
    fetchClientPurchases(Number(iduser));
  }, [fetchClientPurchases]);
  const formatDate = (date: Date): string => {
    return date.toISOString().slice(0, 16).replace('T', ' ');
  };

  return (
    <div>
      <NavbarWithMegaMenu></NavbarWithMegaMenu>
      <div className="container px-40 py-40 mx-auto">
      {clientPurchases && clientPurchases.length > 0 ? (
        <table className="min-w-full bg-white border rounded-lg overflow-hidden">
          <thead className="bg-[#94CCF9] text-white">
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Quantity</th>
              <th className="py-2 px-4 border-b">Amount</th>
              <th className="py-2 px-4 border-b">Date</th>
            </tr>
          </thead>
          <tbody>
            {clientPurchases?.map((transaction, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="py-2 px-4 border-b">{transaction.purchaseName}</td>
                <td className="py-2 px-4 border-b">{transaction.quantity}</td>
                <td className="py-2 px-4 border-b">{transaction.amount}</td>
                <td className="py-2 px-4 border-b">{formatDate(new Date(transaction.purchaseDate))}</td>
              </tr>
            ))}
          </tbody>
        </table>
        ) : (
          <div className="flex flex-col items-center justify-center">
            {/* Illustration */}
            <img
              src={error_image}  
              alt="No purchases illustration"
              className="w-1/2 h-1/2 object-cover"
            />
            {/* Message */}
            <p className="mt-4 text-5xl text-blue-600 font-serif font-semibold">You have no purchases yet!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;