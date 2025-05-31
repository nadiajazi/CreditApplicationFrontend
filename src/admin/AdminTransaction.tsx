import React, { useState, useEffect, useMemo } from "react";
import AdminSideBar from "../components/AdminSideBar";
import TransactionTable from "../components/TransactionTable";
import { useTransactionStore } from "../stores/useTransactionStore";
import { useProductStore } from "../stores/useProductStore";
import { Input, Button, Card } from "../design-system";
import {
  MagnifyingGlassIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  ShoppingBagIcon,
  ArrowTrendingUpIcon,
  FunnelIcon,
  ArrowDownTrayIcon
} from "@heroicons/react/24/outline";


const AdminTransaction: React.FC = () => {
  const [open, setOpen] = useState(true);
  const [globalSearchQuery, setGlobalSearchQuery] = useState<string>('');
  const [debouncedGlobalSearch, setDebouncedGlobalSearch] = useState<string>('');
  const [viewMode, setViewMode] = useState<'transactions' | 'products' | 'combined'>('transactions');
  const [isSearching, setIsSearching] = useState<boolean>(false);

  // Transaction store
  const adminPurchases = useTransactionStore((state) => state.adminPurchases);
  const fetchAdminPurchases = useTransactionStore((state) => state.fetchAdminPurchases);

  // Product store
  const { products, fetchData: fetchProducts } = useProductStore();

  useEffect(() => {
    fetchAdminPurchases();
    fetchProducts();
  }, [fetchAdminPurchases, fetchProducts]);

  // Debounce global search
  useEffect(() => {
    setIsSearching(true);
    const timer = setTimeout(() => {
      setDebouncedGlobalSearch(globalSearchQuery);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [globalSearchQuery]);

  // Filter products based on search
  const filteredProducts = useMemo(() => {
    if (!debouncedGlobalSearch || !products) return [];

    const searchTerm = debouncedGlobalSearch.toLowerCase();
    return products.filter(product =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.id.toString().includes(searchTerm) ||
      product.price.toString().includes(searchTerm)
    );
  }, [products, debouncedGlobalSearch]);

  // Calculate statistics
  const statistics = useMemo(() => {
    const totalTransactions = adminPurchases?.length || 0;
    const totalRevenue = adminPurchases?.reduce((sum, transaction) => sum + transaction.amount, 0) || 0;
    const totalProducts = products?.length || 0;
    const avgTransactionValue = totalTransactions > 0 ? totalRevenue / totalTransactions : 0;

    return {
      totalTransactions,
      totalRevenue,
      totalProducts,
      avgTransactionValue,
    };
  }, [adminPurchases, products]);

  const dateOptions = [
    { id: '1', label: 'Last day' },
    { id: '2', label: 'Last 7 days' },
    { id: '3', label: 'Last 30 days' },
    { id: '4', label: 'Last month' },
    { id: '5', label: 'Last year' },
  ];

  return (
    <section className="flex gap-6 min-h-screen bg-gray-50">
      <AdminSideBar open={open} toggleSidebar={() => setOpen(!open)} />
      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Page Header */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Transaction Dashboard</h1>
                <p className="text-gray-600">Monitor and manage all transaction activities across your platform</p>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-2 bg-white rounded-xl p-1 shadow-sm">
                <button
                  onClick={() => setViewMode('transactions')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    viewMode === 'transactions'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Transactions
                </button>
                <button
                  onClick={() => setViewMode('products')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    viewMode === 'products'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Products
                </button>
                <button
                  onClick={() => setViewMode('combined')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    viewMode === 'combined'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Combined
                </button>
              </div>
            </div>
          </div>

          {/* Global Search Bar */}
          <div className="mb-8">
            <Card className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Search transactions, products, amounts..."
                    value={globalSearchQuery}
                    onChange={(e) => setGlobalSearchQuery(e.target.value)}
                    leftIcon={<MagnifyingGlassIcon className="w-5 h-5" />}
                    rightIcon={isSearching ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    ) : null}
                    fullWidth
                    variant="outlined"
                  />
                </div>
                <Button
                  variant="outline"
                  leftIcon={<FunnelIcon className="w-4 h-4" />}
                >
                  Advanced Filters
                </Button>
                <Button
                  variant="primary"
                  leftIcon={<ArrowDownTrayIcon className="w-4 h-4" />}
                >
                  Export Data
                </Button>
              </div>
            </Card>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 mr-4">
                  <ChartBarIcon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Transactions</p>
                  <p className="text-2xl font-bold text-gray-900">{statistics.totalTransactions}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 mr-4">
                  <CurrencyDollarIcon className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${statistics.totalRevenue.toLocaleString()}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-purple-100 mr-4">
                  <ShoppingBagIcon className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Products</p>
                  <p className="text-2xl font-bold text-gray-900">{statistics.totalProducts}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-orange-100 mr-4">
                  <ArrowTrendingUpIcon className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Transaction</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${statistics.avgTransactionValue.toFixed(2)}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Content Display Based on View Mode */}
          {viewMode === 'transactions' && (
            <div>
              {adminPurchases ? (
                <TransactionTable transactions={adminPurchases} label="Your Label" options={dateOptions} />
              ) : (
                <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-lg text-gray-600">Loading transaction data...</p>
                </div>
              )}
            </div>
          )}

          {viewMode === 'products' && (
            <div>
              {debouncedGlobalSearch ? (
                <Card className="p-6">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Search Results for "{debouncedGlobalSearch}"
                    </h3>
                    <p className="text-sm text-gray-600">
                      Found {filteredProducts.length} product(s) matching your search
                    </p>
                  </div>

                  {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredProducts.map((product) => (
                        <Card key={product.id} className="p-4 hover:shadow-lg transition-shadow duration-300">
                          <div className="flex items-center space-x-4">
                            <img
                              src={product.images}
                              alt={product.name}
                              className="w-16 h-16 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900">{product.name}</h4>
                              <p className="text-sm text-gray-500">ID: {product.id}</p>
                              <p className="text-lg font-bold text-green-600">${product.price}</p>
                              <p className="text-sm text-gray-600">Qty: {product.quantity}</p>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <ShoppingBagIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">No products found matching your search</p>
                    </div>
                  )}
                </Card>
              ) : (
                <Card className="p-12 text-center">
                  <MagnifyingGlassIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Search for Products</h3>
                  <p className="text-gray-600">Use the search bar above to find specific products</p>
                </Card>
              )}
            </div>
          )}

          {viewMode === 'combined' && (
            <div className="space-y-8">
              {/* Products Section */}
              {debouncedGlobalSearch && filteredProducts.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Products ({filteredProducts.length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {filteredProducts.slice(0, 4).map((product) => (
                      <Card key={product.id} className="p-4 hover:shadow-lg transition-shadow duration-300">
                        <div className="text-center">
                          <img
                            src={product.images}
                            alt={product.name}
                            className="w-12 h-12 rounded-lg object-cover mx-auto mb-2"
                          />
                          <h4 className="font-medium text-gray-900 text-sm">{product.name}</h4>
                          <p className="text-green-600 font-bold">${product.price}</p>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Transactions Section */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Transactions</h3>
                {adminPurchases ? (
                  <TransactionTable transactions={adminPurchases} label="Your Label" options={dateOptions} />
                ) : (
                  <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-lg text-gray-600">Loading transaction data...</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AdminTransaction;