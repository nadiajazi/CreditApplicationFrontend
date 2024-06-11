import React, { useState, useEffect } from "react";
import AdminSideBar from "../components/AdminSideBar";
import { useClientStore } from "../stores/useClientStore";
import { useProductStore } from "../stores/useProductStore";
import { useTransactionStore } from "../stores/useTransactionStore";
import { useNavigate } from "react-router-dom";

const AdminDashboard: React.FC = () => {
  const [open, setOpen] = useState(true);
  const { fetchData: fetchProducts, totalProducts } = useProductStore();
  const { fetchData: fetchClients, totalClients } = useClientStore();
  const { fetchAdminPurchases, fetchClientPurchases, getTotalTransactions } = useTransactionStore();
  const totalTransactions = getTotalTransactions();

  useEffect(() => {
    fetchProducts();
    fetchClients();
    fetchAdminPurchases();
  
  }, [fetchProducts, fetchClients, fetchAdminPurchases, fetchClientPurchases]);

  const navigate = useNavigate();

  const handleProduct = () => {
    navigate(`/admin/products`);
  };

  const handleClient = () => {
    navigate(`/admin/clients`);
  };
  const handleTransaction = () => {
    navigate(`/admin/transaction`);
  };

  return (
    <div className="flex gap-4">
      <AdminSideBar open={open} toggleSidebar={() => setOpen(!open)} />
      <div className="m-4 flex-grow">
        <div className="flex gap-6 flex-wrap justify-center">
          <div className="bg-gradient-to-r from-blue-400 to-blue-500 text-white p-6 rounded-lg shadow-lg flex-1 min-w-[250px] max-w-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">Total Clients</h2>
              <div className="bg-white text-blue-700 p-3 rounded-full">
                <span className="font-bold text-lg">{totalClients}</span>
              </div>
            </div>
            <p className="text-gray-200 mb-4">
              View and manage all clients in the system.
            </p>
            <div className="flex justify-end">
              <button
                className="bg-white text-blue-600 px-4 py-2 rounded-full hover:bg-gray-100 transition"
                onClick={handleClient}
              >
                View Details
              </button>
            </div>
          </div>
          <div className="bg-gradient-to-r from-blue-400 to-blue-500 text-white p-6 rounded-lg shadow-lg flex-1 min-w-[250px] max-w-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">Total Products</h2>
              <div className="bg-white text-blue-700 p-3 rounded-full">
                <span className="font-bold text-lg">{totalProducts}</span>
              </div>
            </div>
            <p className="text-gray-200 mb-4">
              View and manage all the products in the system.
            </p>
            <div className="flex justify-end">
              <button
                className="bg-white text-blue-700 px-4 py-2 rounded-full hover:bg-gray-100 transition"
                onClick={handleProduct}
              >
                View Details
              </button>
            </div>
          </div>
          <div className="bg-gradient-to-r from-blue-400 to-blue-500 text-white p-6 rounded-lg shadow-lg flex-1 min-w-[250px] max-w-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">Total Transactions</h2>
              <div className="bg-white text-blue-700 p-3 rounded-full">
                <span className="font-bold text-lg">{totalTransactions}</span>
              </div>
            </div>
            <p className="text-gray-200 mb-4">
              View and manage all transactions in the system.
            </p>
            <div className="flex justify-end">
              <button
                className="bg-white text-blue-700 px-4 py-2 rounded-full hover:bg-gray-100 transition"
                onClick={handleTransaction}
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
