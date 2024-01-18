import React from 'react';
import { useState } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { useProductStore, Product } from '../stores/useProductStore';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


interface ProductTableProps {
    products: Product[];
  }


  const ProductTable: React.FC<ProductTableProps> = ()  => {
    const [searchQuery, setSearchQuery] = useState<string>('');
      const products = useProductStore ((state) => state.products);
      const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      const navigate = useNavigate();
      const handleGetAddClick = () => {
        navigate('/admin/Allproduct');
      };
       
        const onHandle = (productId: number, newQuantity: number) => {
          if (newQuantity > 0) {
            incrementQuantity(productId);
          } else {
            decrementQuantity(productId);
          }
        };

        const removeProduct = useProductStore((state) => state.removeProduct);
        const { incrementQuantity, decrementQuantity } = useProductStore();
        const handleDelete = (productId: number) => {
          removeProduct(productId);
        };

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <div className="pb-4 bg-white">
            <label htmlFor="table-search" className="sr-only">
            Search
            </label>
            <div className="grid grid-cols-2 gap-4">
  {/* Search Input */}
  <div className="relative mt-1 col-span-2 sm:col-span-1">
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
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
        />
      </svg>
    </div>
    <input
      type="text"
      id="table-search"
      className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-full sm:w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="Search for items"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  </div>

  {/* Add Product Button */}
  <div className="col-span-2 sm:col-span-1">
    <button
      className="bg-[#82c0cc] text-white p-2 rounded-md w-full"
      onClick={handleGetAddClick}
    >
      Add Product
    </button>
  </div>
</div>

     
     
      </div>
      
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-16 py-3">
                  <span className="sr-only">Images</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
            {filteredProducts.map((product) => (
                <tr key={product.id} className="bg-white border-b dark:bg-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="p-4">
                  <img src={product.images} className="w-16 md:w-32 max-w-full max-h-full" alt="" />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-black">
                    {product.name}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <button
                        className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        type="button"
                        onClick={() => decrementQuantity(product.id)}
                      >
                        <span className="sr-only">Quantity button</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                        </svg>
                      </button>
                      <div>
                        <input
                          id={`product_${product.id}`}
                          className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="1"
                          value={product.quantity || 0}
                          onChange={(e) => onHandle(product.id, parseInt(e.target.value, 10))}
                          required
                        />
                      </div>
                      <button
                        className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        type="button"
                        onClick={() =>incrementQuantity(product.id) }
                      >
                        <span className="sr-only">Quantity button</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    ${product.price}
                  </td>
                  <td className="px-6 py-4 flex-direction-column">
  <div className="flex">
    {/* Delete Button */}
    <button
      className="text-red-500 hover:text-red-700 flex items-center mr-2"
      onClick={() => handleDelete(product.id)}
    >
      <FaTrash />
    </button>

    {/* Edit Button */}
    <button>
      <Link
        className="btn btn-outline-primary"
        to={`/admin/EditProduct/${product.id}`}
      >
        <FaEdit />
      </Link>
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
    
    export default ProductTable;