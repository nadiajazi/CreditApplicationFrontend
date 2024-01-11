import React, {useState} from 'react';
import { useTransactionStore, Transaction} from '../stores/useTransactionStore';
import { FaTrash } from 'react-icons/fa';

interface TransactionTableProps {
    transactions: Transaction[];
    label: string;
    options: { id: string; label: string; checked?: boolean }[];
}

const TransactionTable: React.FC<TransactionTableProps> = ({ label, options }) => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedOption, setSelectedOption] = useState(options.find((opt) => opt.checked) || options[0]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const transactions = useTransactionStore((state) => state.transactions);
    const removeTransaction = useTransactionStore((state) => state.removeTransaction);
    const filteredTransactions = transactions.filter((transaction) =>
    transaction.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
    };
    
    const handleOptionChange = (option: { id: string; label: string }) => {
        setSelectedOption(option);
        setIsDropdownOpen(false);
    };
    

    const handleDelete = (transactionId: string) => {
        removeTransaction(transactionId);
    };

    return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <div className="flex items-center space-x-20">
    <div className="relative inline-block text-left">
      <button
        id="dropdownRadioButton"
        data-dropdown-toggle="dropdownRadio"
        className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        type="button"
        onClick={toggleDropdown}
      >
        <svg
          className="w-3 h-3 text-gray-500 dark:text-gray-400 me-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z"
          />
        </svg>
        {selectedOption.label}
        <svg
          className="w-2.5 h-2.5 ms-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
        </svg>
      </button>
      {/* Dropdown menu */}
      <div
        id="dropdownRadio"
        className={`${
          isDropdownOpen ? 'block' : 'hidden'
        } z-10 absolute w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
        data-popper-reference-hidden=""
        data-popper-escaped=""
        data-popper-placement="top"
      >
        <ul className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownRadioButton">
          {options.map((option) => (
            <li key={option.id}>
              <div
                className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600"
                onClick={() => handleOptionChange(option)}
              >
                <input
                  id={`filter-radio-${option.id}`}
                  type="radio"
                  value=""
                  name="filter-radio"
                  checked={selectedOption.id === option.id}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor={`filter-radio-${option.id}`}
                  className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                >
                  {option.label}
                </label>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
        <div className="pb-4 bg-white">
            <label htmlFor="table-search" className="sr-only">
            Search
            </label>
          <div className="relative mt-1">
            <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="table-search"
            className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for items"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      </div>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                Client Name
                </th>
                <th scope="col" className="px-6 py-3">
                Date
                </th>
                <th scope="col" className="px-6 py-3">
                Price
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
            {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {transaction.title}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {transaction.date.toISOString()}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    ${transaction.price}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {transaction.quantity}
                    </td>
                  <td className="px-6 py-4">
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(transaction.id)}
                    >
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
