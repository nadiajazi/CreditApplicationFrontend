import React, { useEffect } from 'react';
import { useTransactionStore, Transaction } from '../stores/useTransactionStore';
import { FaTrash } from 'react-icons/fa';

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
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {adminPurchases?.map((transaction) => (
            <tr
              key={transaction.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {transaction.purchaseName}
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
              {transaction.product.purchaseDate.toString() }
              </td> 
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                ${transaction.amount}
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {transaction.quantity}
              </td>
              <td className="px-6 py-4">
                <button>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;