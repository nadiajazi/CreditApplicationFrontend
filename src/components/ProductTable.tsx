
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { FaPlus, FaMinus, FaSearch, FaFilter, FaSort } from 'react-icons/fa';
import { useProductStore, Product } from '../stores/useProductStore';
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Input } from '../design-system';


interface ProductTableProps {
    products: Product[];
    onEditClick :(id: number) => void;
    onAddClick : () => void;
  }


  const ProductTable: React.FC<ProductTableProps> = ({onEditClick, onAddClick })  => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>('');
    const [sortField, setSortField] = useState<'name' | 'price' | 'quantity'>('name');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [priceFilter, setPriceFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all');
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const products = useProductStore ((state) => state.products);

    // Debounce search query for better performance
    useEffect(() => {
      setIsSearching(true);
      const timer = setTimeout(() => {
        setDebouncedSearchQuery(searchQuery);
        setIsSearching(false);
      }, 300);

      return () => clearTimeout(timer);
    }, [searchQuery]);
  

      

  // Enhanced filtering and sorting with memoization for better performance
  const filteredAndSortedProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Enhanced search filter - search in name, id, and price
        const searchTerm = debouncedSearchQuery.toLowerCase();
        const matchesSearch = searchTerm === '' ||
          product.name.toLowerCase().includes(searchTerm) ||
          product.id.toString().includes(searchTerm) ||
          product.price.toString().includes(searchTerm);

        // Price filter
        let matchesPrice = true;
        if (priceFilter !== 'all') {
          const price = product.price;
          switch (priceFilter) {
            case 'low':
              matchesPrice = price < 50;
              break;
            case 'medium':
              matchesPrice = price >= 50 && price < 200;
              break;
            case 'high':
              matchesPrice = price >= 200;
              break;
          }
        }

        return matchesSearch && matchesPrice;
      })
      .sort((a, b) => {
        let aValue: string | number;
        let bValue: string | number;

        switch (sortField) {
          case 'name':
            aValue = a.name.toLowerCase();
            bValue = b.name.toLowerCase();
            break;
          case 'price':
            aValue = a.price;
            bValue = b.price;
            break;
          case 'quantity':
            aValue = a.quantity || 0;
            bValue = b.quantity || 0;
            break;
          default:
            return 0;
        }

        if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
  }, [products, debouncedSearchQuery, priceFilter, sortField, sortDirection]);

  const handleSort = (field: 'name' | 'price' | 'quantity') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
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

  // Function to highlight search terms
  const highlightSearchTerm = useCallback((text: string, searchTerm: string) => {
    if (!searchTerm || !text) return text;

    const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 text-yellow-900 px-1 rounded">
          {part}
        </mark>
      ) : part
    );
  }, []);

    return (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-moonstone to-carribean p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-white">Product Management</h2>
                <p className="text-blue-100">Manage your product inventory</p>
              </div>

              <button
                onClick={() => onAddClick()}
                className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 backdrop-blur-sm"
              >
                <PlusIcon className="w-5 h-5" />
                Add Product
              </button>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Enhanced Search Input */}
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search by name, ID, or price..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  leftIcon={<FaSearch className="w-4 h-4" />}
                  rightIcon={isSearching ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-moonstone"></div>
                  ) : null}
                  fullWidth
                  variant="outlined"
                />
              </div>

              {/* Price Filter */}
              <div className="relative">
                <select
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value as 'all' | 'low' | 'medium' | 'high')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-moonstone focus:border-transparent transition-all duration-300 appearance-none bg-white"
                >
                  <option value="all">All Prices</option>
                  <option value="low">Under $50</option>
                  <option value="medium">$50 - $200</option>
                  <option value="high">Over $200</option>
                </select>
                <FaFilter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>

              {/* Results Count */}
              <div className="flex items-center justify-center lg:justify-end">
                <span className="text-sm text-gray-600 bg-white px-4 py-3 rounded-xl border">
                  {filteredAndSortedProducts.length} of {products.length} products
                </span>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Image
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center gap-2">
                      Product Name
                      <FaSort className={`w-3 h-3 ${sortField === 'name' ? 'text-moonstone' : 'text-gray-400'}`} />
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort('quantity')}
                  >
                    <div className="flex items-center gap-2">
                      Quantity
                      <FaSort className={`w-3 h-3 ${sortField === 'quantity' ? 'text-moonstone' : 'text-gray-400'}`} />
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort('price')}
                  >
                    <div className="flex items-center gap-2">
                      Price
                      <FaSort className={`w-3 h-3 ${sortField === 'price' ? 'text-moonstone' : 'text-gray-400'}`} />
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAndSortedProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex-shrink-0 h-16 w-16">
                        <img
                          src={product.images}
                          className="h-16 w-16 rounded-xl object-cover shadow-sm border border-gray-200"
                          alt={product.name}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {highlightSearchTerm(product.name, debouncedSearchQuery)}
                      </div>
                      <div className="text-sm text-gray-500">Product ID: {product.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button
                          className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                          type="button"
                          onClick={() => decrementQuantity(product.id)}
                        >
                          <FaMinus className="w-3 h-3" />
                        </button>

                        <input
                          id={`product_${product.id}`}
                          className="w-16 px-2 py-1 text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-moonstone focus:border-transparent transition-all duration-200"
                          value={product.quantity || 0}
                          onChange={(e) => onHandle(product.id, parseInt(e.target.value, 10) || 0)}
                          type="number"
                          min="0"
                        />

                        <button
                          className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                          type="button"
                          onClick={() => incrementQuantity(product.id)}
                        >
                          <FaPlus className="w-3 h-3" />
                        </button>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">${product.price}</div>
                      <div className="text-xs text-gray-500">Per unit</div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button
                          className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors duration-200"
                          onClick={() => onEditClick(product.id)}
                          title="Edit Product"
                        >
                          <PencilIcon className="w-4 h-4" />
                        </button>

                        <button
                          className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors duration-200"
                          onClick={() => handleDelete(product.id)}
                          title="Delete Product"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                </tr>
              ))}
            </tbody>
            </table>
          </div>
        </div>
      );
    };
    
    export default ProductTable;
