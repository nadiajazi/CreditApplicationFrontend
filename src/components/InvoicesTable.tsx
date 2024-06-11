import React, { useEffect , useState} from 'react';
import { usePaymentStore, Payment} from '../stores/usePaymentStore';

interface InvoicesTableProps {
  invoices: Payment[];
  
}



const InvoicesTable: React.FC<InvoicesTableProps> = () => {
  const [searchDate, setSearchDate] = useState('');
  const {
    adminInvoices,
    fetchAdminInvoices,
  } = usePaymentStore((state) => ({
    adminInvoices: state.adminInvoices,
    fetchAdminInvoices: state.fetchAdminInvoices,
  }));

  useEffect(() => {
    fetchAdminInvoices();
  }, [adminInvoices]);

  const formatDate = (date: Date): string => {
    return date.toISOString().slice(0, 16).replace('T', ' ');
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchDate(event.target.value);
  };

  const filteredInvoices = adminInvoices?.filter(payment =>
    payment.createdDate.includes(searchDate)
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
              Customer Name
            </th>
            <th scope="col" className="px-6 py-3">
              Customer phone
            </th>
            <th scope="col" className="px-6 py-3">
              Payment Method
            </th>
            <th scope="col" className="px-6 py-3">
            Creation Date
            </th>
          </tr>
        </thead>
        <tbody>
        {filteredInvoices?.map((payment) => (
            <tr
            key={payment.id}
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {payment.id}
            </td>
            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {payment.amount} TND
            </td>
            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {payment.customer.firstname} {payment.customer.lastname}
            </td>
            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {payment.customer.phone}
            </td>
            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {payment.paymentMethod}
            </td>
            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {formatDate(new Date(payment.createdDate))}
            </td>
            
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoicesTable;
