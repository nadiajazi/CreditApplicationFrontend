import React, { useState } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useProductStore, Product } from '../stores/useProductStore';

interface ProductTableProps {
  products: Product[];
}

const ProductTable: React.FC<ProductTableProps> = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const products = useProductStore((state) => state.products);
  const { deleteProduct, updateProduct, addProduct } = useProductStore();

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

 ;

  const handleDelete = (productId: number) => {
    deleteProduct(productId);
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
            className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for items"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Link to="/addproduct" className="bg-blue-500 text-white p-2 rounded-md ml-2">
          Add Product
        </Link>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-16 py-3">
              <span className="sr-only">Image</span>
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
            <tr
              key={product.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="p-4">
                <img src={product.images[0]} className="w-16 md:w-32 max-w-full max-h-full" alt={product.title} />
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{product.title}</td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div>
                    <input
                      type="number"
                      id={`product_${product.id}`}
                      className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="1"
                      value={product.quantity || 0}
                      required
                    />
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">${product.price}</td>
              <td className="px-6 py-4">
              <button className="text-blue-500 hover:text-blue-700 mr-2">
                  <FaEdit />
                </button>
                <button className="text-red-500 hover:text-red-700" onClick={() => handleDelete(product.id)}>
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

export default ProductTable;
