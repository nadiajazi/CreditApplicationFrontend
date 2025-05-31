import React, { useState, useEffect } from "react";
import AdminSideBar from "../components/AdminSideBar";
import { useClientStore } from "../stores/useClientStore";
import { useProductStore } from "../stores/useProductStore";
import { useTransactionStore } from "../stores/useTransactionStore";
import { useNavigate } from "react-router-dom";

// Dashboard interfaces
interface StatCard {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change: number;
  color: string;
}

const AdminDashboard: React.FC = () => {
  const [open, setOpen] = useState(true);
  const { fetchData: fetchProducts, totalProducts } = useProductStore();
  const { fetchData: fetchClients, totalClients } = useClientStore();
  const { adminPurchases, fetchAdminPurchases } = useTransactionStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    fetchClients();
    fetchAdminPurchases();
  }, [fetchProducts, fetchClients, fetchAdminPurchases]);

  const handleProduct = () => {
    navigate(`/admin/products`);
  };

  const handleClient = () => {
    navigate(`/admin/clients`);
  };

  const handleTransaction = () => {
    navigate(`/admin/transaction`);
  };

  // Calculate total revenue from transactions
  const totalRevenue = adminPurchases?.reduce((sum, purchase) => sum + purchase.amount, 0) || 0;
  const totalTransactions = adminPurchases?.length || 0;

  // Stats data
  const stats: StatCard[] = [
    {
      title: "Total Clients",
      value: totalClients,
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-2.239" />
        </svg>
      ),
      change: 12,
      color: "blue"
    },
    {
      title: "Total Products",
      value: totalProducts,
      icon: (
        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      change: 8,
      color: "green"
    },
    {
      title: "Total Transactions",
      value: totalTransactions,
      icon: (
        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      change: 15,
      color: "purple"
    },
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toFixed(2)}`,
      icon: (
        <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      ),
      change: 23,
      color: "yellow"
    }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <AdminSideBar open={open} toggleSidebar={() => setOpen(!open)} />

      {/* Main content */}
      <div className="flex-1 overflow-auto p-8 animate-fade-in">
        <h1 className="text-3xl font-bold text-carribean mb-6 border-b pb-4 transition-all duration-300 hover:text-moonstone">
          Admin Dashboard
        </h1>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px] border-l-4 border-moonstone cursor-pointer"
              onClick={() => {
                if (stat.title === "Total Clients") handleClient();
                else if (stat.title === "Total Products") handleProduct();
                else if (stat.title === "Total Transactions") handleTransaction();
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-carribean">{stat.value}</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-full">
                  {stat.icon}
                </div>
              </div>
              <p className={`text-sm mt-4 ${stat.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {stat.change > 0 ? '↑' : '↓'} {Math.abs(stat.change)}% from last month
              </p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <button
            onClick={handleClient}
            className="bg-white p-6 rounded-xl shadow-md text-center hover:bg-moonstone hover:text-white transform hover:scale-105 hover:shadow-lg transition-all duration-300"
          >
            <div className="text-3xl mb-2">👥</div>
            <p className="font-medium">Manage Clients</p>
          </button>

          <button
            onClick={handleProduct}
            className="bg-white p-6 rounded-xl shadow-md text-center hover:bg-moonstone hover:text-white transform hover:scale-105 hover:shadow-lg transition-all duration-300"
          >
            <div className="text-3xl mb-2">📦</div>
            <p className="font-medium">Manage Products</p>
          </button>

          <button
            onClick={handleTransaction}
            className="bg-white p-6 rounded-xl shadow-md text-center hover:bg-moonstone hover:text-white transform hover:scale-105 hover:shadow-lg transition-all duration-300"
          >
            <div className="text-3xl mb-2">💳</div>
            <p className="font-medium">View Transactions</p>
          </button>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-xl shadow-md p-6 animate-slide-up">
          <h2 className="text-xl font-bold mb-4 text-carribean">Recent Transactions</h2>
          <div className="overflow-x-auto">
            {adminPurchases && adminPurchases.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {adminPurchases.slice(0, 5).map((transaction, i) => (
                    <tr key={i} className="hover:bg-blue-50 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(transaction.purchaseDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {transaction.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${transaction.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {transaction.quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-6 text-center text-gray-500">
                No recent transactions found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;


