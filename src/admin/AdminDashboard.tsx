import React, { useState, useEffect } from "react";
import AdminSideBar from "../components/AdminSideBar";
import { useClientStore } from "../stores/useClientStore";
import { useProductStore } from "../stores/useProductStore";
import {useNavigate} from "react-router-dom"

const AdminDashboard: React.FC = () => {
  const [open, setOpen] = useState(true);
  const { fetchData: fetchProducts, totalProducts } = useProductStore();
  const { fetchData: fetchClients, totalClients } = useClientStore();

  useEffect(() => {
    fetchProducts();
    fetchClients();
  }, [fetchProducts, fetchClients]);
  const navigate = useNavigate();

  const handleProduct = () => {
    navigate(`/admin/products`);

  };
  
  const handleClient = () => {
    navigate(`/admin/clients`);
  };

  return (
    
    <div className="flex gap-2">
      <AdminSideBar open={open} toggleSidebar={() => setOpen(!open)} />
      <div className="m-3 text-xl text-gray-900 font-semibold flex flex-row">
        <div className="bg-white border border-gray-200 p-4 rounded-md my-1 shadow-md flex-1 flex-shrink-0">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Total Clients</h2>
            <div className="bg-blue-500 text-white p-2 rounded-md">
              <span className="font-bold text-lg">{totalClients}</span>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            <p>View and manage all clients in the system.</p>
          </div>
          <div className="mt-4 flex justify-end">
            <button className="text-blue-500 hover:underline" onClick={handleClient}>View Details</button>
          </div>
        </div>
        <div className="bg-white border border-gray-200 p-4 my-1 rounded-md shadow-md flex-1 flex-shrink-0">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Total Products</h2>
            <div className="bg-blue-500 text-white p-2 rounded-md">
              <span className="font-bold text-lg">{totalProducts}</span>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            <p>View and manage all the products in the system.</p>
          </div>
          <div className="mt-4 flex justify-end">
            <button className="text-blue-500 hover:underline"
             onClick={handleProduct}
             >View Details</button>
          </div>
        </div>
        
      </div>
    </div>
  
  );
};

export default AdminDashboard;
