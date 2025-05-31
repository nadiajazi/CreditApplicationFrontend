import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTransactionStore } from '../stores/useTransactionStore';
import Navbar from './Layout/Navbar';
import EditMax from './Layout/editMax';
import axios from 'axios';

// Dashboard interfaces
interface UserData {
  name: string;
  balance: string;
  email: string;
}

interface CreditData {
  maxAmount: number;
  currentAmount: number;
  progressPercentage: number;
}

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = () => {
  const navigate = useNavigate();
  const { clientPurchases, fetchClientPurchases } = useTransactionStore();
  const [userData, setUserData] = useState<UserData>({
    name: localStorage.getItem('firstname') || 'User',
    balance: localStorage.getItem('maxAmount') || '0',
    email: localStorage.getItem('email') || 'user@example.com',
  });
  const [creditData, setCreditData] = useState<CreditData>({
    maxAmount: 0,
    currentAmount: 0,
    progressPercentage: 0,
  });
  const [showEditMaxPopup, setShowEditMaxPopup] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch client purchases when component mounts
    fetchClientPurchases();
    fetchCreditData();
  }, [fetchClientPurchases]);

  const fetchCreditData = async () => {
    try {
      setLoading(true);
      const accessToken = localStorage.getItem('accessToken');
      const userId = localStorage.getItem('id');

      if (!accessToken || !userId) {
        console.error('Missing authentication data');
        setLoading(false);
        return;
      }

      // Fetch max amount
      const maxAmountResponse = await axios.get(`http://localhost:8882/api/v1/user/maxAmount/${userId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      // Fetch current amount (montant)
      const currentAmountResponse = await axios.get(`http://localhost:8882/api/v1/user/montant/${userId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const maxAmount = maxAmountResponse.data;
      const currentAmount = currentAmountResponse.data;
      const progressPercentage = maxAmount ? (currentAmount / maxAmount) * 100 : 0;

      setCreditData({
        maxAmount,
        currentAmount,
        progressPercentage,
      });

      // Update localStorage and userData
      localStorage.setItem('maxAmount', maxAmount.toString());
      setUserData(prev => ({
        ...prev,
        balance: maxAmount.toString(),
      }));

    } catch (error) {
      console.error('Error fetching credit data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getProgressColor = () => {
    const { progressPercentage } = creditData;
    if (progressPercentage <= 50) return 'bg-green-500';
    if (progressPercentage <= 85) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getProgressTextColor = () => {
    const { progressPercentage } = creditData;
    if (progressPercentage <= 50) return 'text-green-600';
    if (progressPercentage <= 85) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleEditMaxClose = () => {
    setShowEditMaxPopup(false);
    // Refresh credit data after editing
    fetchCreditData();
  };

  const recentTransactions = clientPurchases?.slice(0, 5) || [];

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-carribean">
            Welcome back, {userData.name}!
          </h1>
          <p className="text-gray-600 mt-2">
            Here's what's happening with your account today.
          </p>
        </div>
      
      {/* Credit Limit Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Credit Limit Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border-t-4 border-moonstone">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-carribean">Credit Limit</h3>
              <button
                onClick={() => setShowEditMaxPopup(true)}
                className="bg-moonstone text-white px-4 py-2 rounded-lg hover:bg-carribean transition-colors duration-300 text-sm"
              >
                Change Limit
              </button>
            </div>

            {loading ? (
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-8 bg-gray-200 rounded mb-4"></div>
                <div className="h-2 bg-gray-200 rounded"></div>
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Current Usage</span>
                    <span className={`text-sm font-semibold ${getProgressTextColor()}`}>
                      {creditData.progressPercentage.toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all duration-500 ${getProgressColor()}`}
                      style={{ width: `${Math.min(creditData.progressPercentage, 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600">Used</p>
                    <p className="text-lg font-bold text-gray-900">${creditData.currentAmount}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Available</p>
                    <p className="text-lg font-bold text-carribean">${creditData.maxAmount}</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-xl shadow-md overflow-hidden border-t-4 border-moonstone hover:shadow-lg transition-all duration-300">
            <div className="p-4">
              <div className="text-center">
                <div className="bg-orange-100 text-orange-800 p-3 rounded-full text-2xl mx-auto w-fit mb-2">
                  ⏱️
                </div>
                <p className="text-gray-500 text-sm">Recent Transactions</p>
                <p className="text-xl font-bold text-carribean mt-1">{recentTransactions.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden border-t-4 border-moonstone hover:shadow-lg transition-all duration-300">
            <div className="p-4">
              <div className="text-center">
                <div className="bg-blue-100 text-blue-800 p-3 rounded-full text-2xl mx-auto w-fit mb-2">
                  🛒
                </div>
                <p className="text-gray-500 text-sm">Total Purchases</p>
                <p className="text-xl font-bold text-carribean mt-1">{clientPurchases?.length || 0}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent Transactions */}
      <div className="mb-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-xl font-bold text-carribean">Recent Transactions</h2>
            <button 
              onClick={() => navigate('/client/dashboard/history')}
              className="text-moonstone hover:text-carribean transition-colors duration-300 text-sm font-medium"
            >
              View All
            </button>
          </div>
          
          <div className="overflow-x-auto">
            {clientPurchases === null ? (
              <div className="p-6 text-center">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                </div>
                <p className="text-gray-500 mt-4">Loading transactions...</p>
              </div>
            ) : recentTransactions.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentTransactions.map((transaction, i) => (
                    <tr key={transaction.id || i} className="hover:bg-blue-50 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(transaction.purchaseDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {transaction.purchaseName || transaction.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${transaction.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {transaction.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Completed
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-6 text-center text-gray-500">
                <div className="text-4xl mb-4">📊</div>
                <p className="text-lg font-medium mb-2">No transactions yet</p>
                <p className="text-sm">Your recent transactions will appear here once you make a purchase.</p>
                <button
                  onClick={() => navigate('/client/dashboard/payment')}
                  className="mt-4 bg-moonstone text-white px-4 py-2 rounded-lg hover:bg-carribean transition-colors duration-300"
                >
                  Make Your First Purchase
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-bold text-carribean mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <button 
            onClick={() => navigate('/client/dashboard/payment')}
            className="bg-white p-6 rounded-xl shadow-md text-center hover:bg-moonstone hover:text-white transform hover:scale-105 hover:shadow-lg transition-all duration-300"
          >
            <div className="text-3xl mb-2">💳</div>
            <p className="font-medium">Make Payment</p>
          </button>
          
          <button 
            onClick={() => navigate('/client/dashboard/invoices')}
            className="bg-white p-6 rounded-xl shadow-md text-center hover:bg-moonstone hover:text-white transform hover:scale-105 hover:shadow-lg transition-all duration-300"
          >
            <div className="text-3xl mb-2">📄</div>
            <p className="font-medium">View Invoices</p>
          </button>
          
          <button 
            onClick={() => navigate('/client/dashboard/history')}
            className="bg-white p-6 rounded-xl shadow-md text-center hover:bg-moonstone hover:text-white transform hover:scale-105 hover:shadow-lg transition-all duration-300"
          >
            <div className="text-3xl mb-2">📊</div>
            <p className="font-medium">Transaction History</p>
          </button>
          
          <button
            onClick={() => navigate('/client/credit')}
            className="bg-white p-6 rounded-xl shadow-md text-center hover:bg-moonstone hover:text-white transform hover:scale-105 hover:shadow-lg transition-all duration-300"
          >
            <div className="text-3xl mb-2">💳</div>
            <p className="font-medium">Credit Management</p>
          </button>

          <button
            onClick={() => navigate('/client/support')}
            className="bg-white p-6 rounded-xl shadow-md text-center hover:bg-moonstone hover:text-white transform hover:scale-105 hover:shadow-lg transition-all duration-300"
          >
            <div className="text-3xl mb-2">🤝</div>
            <p className="font-medium">Contact Support</p>
          </button>
        </div>
      </div>
    </div>

    {/* Edit Max Amount Modal */}
    {showEditMaxPopup && (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
        <EditMax onClose={handleEditMaxClose} />
      </div>
    )}
    </div>
  );
};

export default Dashboard;
