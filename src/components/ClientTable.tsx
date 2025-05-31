import React, { useState } from 'react';
import { FaTrash} from 'react-icons/fa';
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { Client , useClientStore} from '../stores/useClientStore';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



const ClientTable  = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { clients, selectClient } = useClientStore();
  const filteredClients = clients.filter((client) =>
  client.firstName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const navigate = useNavigate();

  const handleSelectClient = (client: Client) => {
    selectClient(client);
    navigate('/admin/clients/form'); 
    console.log(client.id)
     localStorage.setItem('id2',String(client.id))
  };

  
  

  const removeClient = useClientStore((state) => state.removeClient);

    
  const handleDelete = (clientId: number, event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
      removeClient(clientId);
  };
  return (
    
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="pb-4 bg-white mb-5" >
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
            className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:placeholder-gray-700 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for clients"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-black dark:text-black">
      <thead>
          <tr >
            <th scope="col" className="px-6 py-3">
              Firstname
            </th>
            <th scope="col" className="px-6 py-3">
              Lastname
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Montant
            </th>
            
            <th scope="col" className="px-6 py-3">
              Max Amount
            </th>
           
            <th scope="col" className="px-6 py-3">
              Role
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredClients.map((client) => (  
                <tr
                onClick={() => handleSelectClient(client)}
                key={client.id}
                className="bg-white border-b  dark:border-gray-700 cursor-pointer  "
                >   
                <td className="px-6 py-4 font-medium text-black whitespace-nowrap ">
                  {client.firstName}
                </td>
                <td className="px-6 py-4">{client.lastName}</td>
                <td className="px-6 py-4">{client.email}</td>
                <td className="px-6 py-4">{client.montant.toFixed(3) } TND</td>
                <td className="px-6 py-4">{client.maxAmount.toFixed(3) } TND</td>
                <td className="px-6 py-4">{client.role}</td>
                <td className="px-6 py-4 flex-direction-row">
                      <div className="flex items-center">
                        <Link to={`/admin/clients/form/${client.id}`}>
                        <FaMoneyBillTransfer style={{ fontSize: '1.5rem', marginRight: '4px' }} />
                        </Link>

                        <button
                            className="text-red-500 hover:text-red-700 ml-5"
                            onClick={(event) => handleDelete(client.id, event)}
                        >
                            <FaTrash />
                    </button>                      
                    </div>
                </td>
                </tr>
              ))}
        </tbody>
      </table>
      
    </div>
  );
};

export default ClientTable;