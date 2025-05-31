
import React, { useEffect, useState, useMemo } from 'react';
import { useTransactionStore, Transaction } from '../stores/useTransactionStore';
import { useClientStore } from '../stores/useClientStore';
import { Table, Column, Input, Button } from '../design-system';
import {
  CalendarDaysIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  ArrowDownTrayIcon,
  UserIcon
} from '@heroicons/react/24/outline';
import { FaSearch } from 'react-icons/fa';

interface TransactionTableProps {
  transactions?: Transaction[];
  label?: string;
  options?: { id: string; label: string; checked?: boolean }[];
}

const TransactionTable: React.FC<TransactionTableProps> = () => {
  const {
    adminPurchases,
    fetchAdminPurchases,
  } = useTransactionStore((state) => ({
    adminPurchases: state.adminPurchases,
    fetchAdminPurchases: state.fetchAdminPurchases,
  }));

  // Client store for user information
  const { clients, fetchData: fetchClients } = useClientStore();

  // State for search and filtering
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>('');
  const [dateFilter, setDateFilter] = useState<'all' | 'today' | 'week' | 'month' | 'year'>('all');
  const [amountFilter, setAmountFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all');
  const [isSearching, setIsSearching] = useState<boolean>(false);

  useEffect(() => {
    fetchAdminPurchases();
    fetchClients();
  }, [fetchAdminPurchases, fetchClients]);

  // Debounce search query
  useEffect(() => {
    setIsSearching(true);
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Create user mapping for quick lookup
  const userMap = useMemo(() => {
    const map = new Map();
    clients.forEach(client => {
      map.set(client.id, `${client.firstName} ${client.lastName}`);
    });
    return map;
  }, [clients]);

  // Helper function to get user name
  const getUserName = (userId: number): string => {
    return userMap.get(userId) || 'Unknown User';
  };

  // Enhanced filtering with multiple criteria
  const filteredAndSortedTransactions = useMemo(() => {
    if (!adminPurchases) return [];

    return adminPurchases
      .filter((transaction) => {
        // Enhanced search filter - now includes user names
        const searchTerm = debouncedSearchQuery.toLowerCase();
        const userName = getUserName(transaction.userId).toLowerCase();
        const matchesSearch = searchTerm === '' ||
          transaction.purchaseName.toLowerCase().includes(searchTerm) ||
          transaction.amount.toString().includes(searchTerm) ||
          transaction.quantity.toString().includes(searchTerm) ||
          userName.includes(searchTerm);

        // Date filter
        let matchesDate = true;
        if (dateFilter !== 'all') {
          const transactionDate = new Date(transaction.purchaseDate);
          const now = new Date();

          switch (dateFilter) {
            case 'today':
              matchesDate = transactionDate.toDateString() === now.toDateString();
              break;
            case 'week':
              const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
              matchesDate = transactionDate >= weekAgo;
              break;
            case 'month':
              const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
              matchesDate = transactionDate >= monthAgo;
              break;
            case 'year':
              const yearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
              matchesDate = transactionDate >= yearAgo;
              break;
          }
        }

        // Amount filter
        let matchesAmount = true;
        if (amountFilter !== 'all') {
          const amount = transaction.amount;
          switch (amountFilter) {
            case 'low':
              matchesAmount = amount < 100;
              break;
            case 'medium':
              matchesAmount = amount >= 100 && amount < 500;
              break;
            case 'high':
              matchesAmount = amount >= 500;
              break;
          }
        }

        return matchesSearch && matchesDate && matchesAmount;
      });
  }, [adminPurchases, debouncedSearchQuery, dateFilter, amountFilter, userMap, getUserName]);



  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getTotalAmount = () => {
    return filteredAndSortedTransactions.reduce((total, transaction) => total + transaction.amount, 0);
  };

  const columns: Column<Transaction>[] = [
    {
      key: 'purchaseName',
      title: 'Product Name',
      dataIndex: 'purchaseName',
      sortable: true,
      render: (value: string, record: Transaction) => (
        <div className="flex items-center">
          <div>
            <div className="font-medium text-gray-900">{value}</div>
            <div className="text-sm text-gray-500">ID: {record.id}</div>
          </div>
        </div>
      )
    },
    {
      key: 'userId',
      title: 'Customer',
      dataIndex: 'userId',
      sortable: true,
      render: (value: number) => (
        <div className="flex items-center">
          <div className="p-2 bg-blue-100 rounded-full mr-3">
            <UserIcon className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <div className="font-medium text-gray-900">{getUserName(value)}</div>
            <div className="text-sm text-gray-500">User ID: {value}</div>
          </div>
        </div>
      )
    },
    {
      key: 'purchaseDate',
      title: 'Date & Time',
      dataIndex: 'purchaseDate',
      sortable: true,
      render: (value: string) => (
        <div>
          <div className="text-sm font-medium text-gray-900">{formatDate(new Date(value))}</div>
          <div className="text-xs text-gray-500">
            {new Date(value).toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
        </div>
      )
    },
    {
      key: 'amount',
      title: 'Amount',
      dataIndex: 'amount',
      sortable: true,
      align: 'right',
      render: (value: number) => (
        <div className="text-right">
          <div className="font-semibold text-lg text-green-600">{formatCurrency(value)}</div>
          <div className="text-xs text-gray-500">USD</div>
        </div>
      )
    },
    {
      key: 'quantity',
      title: 'Quantity',
      dataIndex: 'quantity',
      sortable: true,
      align: 'center',
      render: (value: number) => (
        <div className="flex justify-center">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            {value} {value === 1 ? 'item' : 'items'}
          </span>
        </div>
      )
    },
    {
      key: 'status',
      title: 'Status',
      dataIndex: 'status',
      align: 'center',
      render: () => (
        <div className="flex justify-center">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5"></div>
            Completed
          </span>
        </div>
      )
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Enhanced Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Transaction Management</h2>
            <p className="text-blue-100">Monitor and analyze all transaction activities</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
              <div className="flex items-center gap-2">
                <ChartBarIcon className="w-5 h-5 text-white" />
                <div className="text-white">
                  <div className="text-sm font-medium">Total Amount</div>
                  <div className="text-lg font-bold">{formatCurrency(getTotalAmount())}</div>
                </div>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="bg-white/20 border-white/30 text-white hover:bg-white/30"
              leftIcon={<ArrowDownTrayIcon className="w-4 h-4" />}
            >
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced Filters and Search */}
      <div className="p-6 border-b border-gray-200 bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Enhanced Search Input */}
          <div className="relative">
            <Input
              type="text"
              placeholder="Search by product, customer, amount..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<FaSearch className="w-4 h-4" />}
              rightIcon={isSearching ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              ) : null}
              fullWidth
              variant="outlined"
            />
          </div>

          {/* Date Filter */}
          <div className="relative">
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value as 'all' | 'today' | 'week' | 'month' | 'year')}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 appearance-none bg-white"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
              <option value="year">Last Year</option>
            </select>
            <CalendarDaysIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none w-5 h-5" />
          </div>

          {/* Amount Filter */}
          <div className="relative">
            <select
              value={amountFilter}
              onChange={(e) => setAmountFilter(e.target.value as 'all' | 'low' | 'medium' | 'high')}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 appearance-none bg-white"
            >
              <option value="all">All Amounts</option>
              <option value="low">Under $100</option>
              <option value="medium">$100 - $500</option>
              <option value="high">Over $500</option>
            </select>
            <CurrencyDollarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none w-5 h-5" />
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-center lg:justify-end">
            <span className="text-sm text-gray-600 bg-white px-4 py-3 rounded-xl border">
              {filteredAndSortedTransactions.length} of {adminPurchases?.length || 0} transactions
            </span>
          </div>
        </div>
      </div>

      <Table
        columns={columns}
        data={filteredAndSortedTransactions}
        pagination={true}
        pageSize={10}
        striped={true}
        hoverable={true}
        size="md"
        emptyText="No transactions found"
      />
    </div>
  );
};

export default TransactionTable;
