import React, { useEffect } from 'react';
import { useTransactionStore, Transaction } from '../stores/useTransactionStore';


interface TransactionTableProps {
  transactions: Transaction[];
  label: string;
  options: { id: string; label: string; checked?: boolean }[];
}

const TransactionTable: React.FC<TransactionTableProps> = ({ label, options }) => {
  const {
    adminPurchases,
    fetchAdminPurchases,
  } = useTransactionStore((state) => ({
    adminPurchases: state.adminPurchases,
    fetchAdminPurchases: state.fetchAdminPurchases,
  }));

  useEffect(() => {
    fetchAdminPurchases();
  }, [fetchAdminPurchases]);


  const formatDate = (date: Date): string => {
    return date.toISOString().slice(0, 16).replace('T', ' ');
  };
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Date
            </th> 
            <th scope="col" className="px-6 py-3">
              Amount
            </th>
            <th scope="col" className="px-6 py-3">
              Quantity
            </th>
          </tr>
        </thead>
        <tbody>
          {adminPurchases?.map((transaction) => (
            <tr
              key={transaction.userId}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {transaction.purchaseName}
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
              {formatDate(new Date(transaction.purchaseDate))}
              </td> 
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                ${transaction.amount}
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {transaction.quantity}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;