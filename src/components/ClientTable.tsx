import React, { useState } from 'react';
import { FaTrash} from 'react-icons/fa';
import {Client, useClientStore} from '../stores/useClientStore';
import FormTransaction from "../components/FormTransaction"

interface ClientTableProps {
  clients: Client[];
  
}

const ClientTable: React.FC<ClientTableProps> = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const clients = useClientStore ((state) => state.clients);
  console.log(clients);
  const filteredClients = clients.filter((client) =>
  client.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const [showPopup, setShowPopup] = useState(false);
  const handleRowClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };
  

  const removeClient = useClientStore((state) => state.removeClient);
    
  const handleDelete = (clientId: number) => {
      removeClient(clientId);
  };
  return (
    
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
            placeholder="Search for clients"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead>
          <tr >
            <th scope="col" className="px-16 py-3">
              <span className="sr-only">Image</span>
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Address
            </th>
            <th scope="col" className="px-6 py-3">
              Total amount
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredClients.map((client) => (
                <tr
                onClick={handleRowClick}
                key={client.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900"
                >   
                <td className="p-4">
                  <img src={client.image} className="w-16 md:w-32 max-w-full max-h-full" alt={client.name} />
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {client.name}
                </td>
                <td className="px-6 py-4">{client.email}</td>
                <td className="px-6 py-4">{client.totalAmount}</td>
                <td className="px-6 py-4">
                <button
                  className="text-red-500 hover:text-red-700 mr-2"
                  onClick={() => handleDelete(client.id)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showPopup && <FormTransaction onClose={handleClosePopup} />}
    </div>
  );
};

export default ClientTable;


