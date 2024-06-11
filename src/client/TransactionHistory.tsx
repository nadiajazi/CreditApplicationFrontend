import React, { useEffect, useState } from 'react';
import { NavbarWithMegaMenu } from './Layout/NavList';
import error_image from '../assets/404.png';
import { useTransactionStore } from '../stores/useTransactionStore';

const TransactionHistory = () => {
  const { clientPurchases, fetchClientPurchases } = useTransactionStore();
  const [searchDate, setSearchDate] = useState('');

  useEffect(() => {
    const iduser = localStorage.getItem('id');
    console.log(iduser);
    fetchClientPurchases(Number(iduser));
  }, [fetchClientPurchases]);

  const formatDate = (date: Date): string => {
    return date.toISOString().slice(0, 16).replace('T', ' ');
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchDate(event.target.value);
  };

  const filteredPurchases = clientPurchases?.filter(transaction =>
    transaction.createdDate.includes(searchDate)
  );

  return (
    <div>
      <NavbarWithMegaMenu />
      <div className="container px-40 py-40 mx-auto">
        <h2 className="text-2xl font-bold mb-6">History of your purchases:</h2>
        <div className="mb-4 flex items-center justify-between">
          <input
            type="date"
            value={searchDate}
            onChange={handleSearch}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        {filteredPurchases && filteredPurchases.length > 0 ? (
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">ID</th>
                  <th scope="col" className="px-6 py-3">Amount</th>
                  <th scope="col" className="px-6 py-3">Date</th>
                  <th scope="col" className="px-6 py-3">Products</th>
                </tr>
              </thead>
              <tbody>
                {filteredPurchases.map((transaction, index) => (
                  <tr
                    key={index}
                    className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 ${
                      index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                    }`}
                  >
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{transaction.id}</td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{transaction.amount} TND</td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {formatDate(new Date(transaction.createdDate))}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      <ul>
                        {transaction.products.map((product) => (
                          <li key={product.name}>{product.name}</li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <img
              src={error_image}
              alt="No purchases illustration"
              className="w-1/2 h-1/2 object-cover"
            />
            <p className="mt-4 text-5xl text-blue-600 font-serif font-semibold">
              You have no purchases yet!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;
