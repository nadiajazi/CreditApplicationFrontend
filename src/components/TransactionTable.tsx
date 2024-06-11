import React, { useEffect , useState} from 'react';
import { useTransactionStore, PurchaseResponse} from '../stores/useTransactionStore';

interface TransactionTableProps {
  transactions: PurchaseResponse[];
  label: string;
  options: { id: string; label: string; checked?: boolean }[];
}



const TransactionTable: React.FC<TransactionTableProps> = ({ label, options }) => {
  const [searchDate, setSearchDate] = useState('');
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

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchDate(event.target.value);
  };

  const filteredTransactions = adminPurchases?.filter(transaction =>
    transaction.createdDate.includes(searchDate)
  );

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="mb-4 flex items-center justify-between">
        <input
          type="date"
          value={searchDate}
          onChange={handleSearch}
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Amount
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Phone
            </th>
            <th scope="col" className="px-6 py-3">
              Creation Date
            </th>
            <th scope="col" className="px-6 py-3">
              Products
            </th>
          </tr>
        </thead>
        <tbody>
        {filteredTransactions?.map((transaction) => (
            <tr
              key={transaction.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {transaction.id}
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {transaction.amount} TND
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {transaction.userResponse?.name} 
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {transaction.userResponse?.phone} 
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {formatDate(new Date(transaction.createdDate))}
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900">
                  <ul>
                    {transaction.products.map((product) => (
                      <li key={product.name}>
                        {product.name}
                      </li>
                    ))}
                  </ul>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
