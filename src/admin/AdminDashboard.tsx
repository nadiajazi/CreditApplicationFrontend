import React, { useState } from "react";
import AdminSideBar from "../components/AdminSideBar";

const AdminDashboard: React.FC = () => {
  const [open, setOpen] = useState(true);

  return (
    <section className="flex gap-6">
      <AdminSideBar open={open} toggleSidebar={() => setOpen(!open)} />
      <div className="m-3 text-xl text-gray-900 font-semibold">
        <div className="bg-white border border-gray-200 p-4 rounded-md my-1 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Total Clients</h2>
            <div className="bg-blue-500 text-white p-2 rounded-md">
              <span className="font-bold text-lg">42</span>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            <p>View and manage all clients in the system.</p>
          </div>
          <div className="mt-4 flex justify-end">
            <button className="text-blue-500 hover:underline">View Details</button>
          </div>
        </div>
        <div className="bg-white border border-gray-200 p-4 my-1 rounded-md shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Total Products</h2>
            <div className="bg-blue-500 text-white p-2 rounded-md">
              <span className="font-bold text-lg">500</span>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            <p>View and manage all the products in the system.</p>
          </div>
          <div className="mt-4 flex justify-end">
            <button className="text-blue-500 hover:underline">View Details</button>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 p-4 rounded-md shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Maximum amount</h2>
            <div className="bg-blue-500 text-white p-2 rounded-md">
              <span className="font-bold text-lg">2 000DT</span>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            <p>Manage your maximum amo.</p>
          </div>
          <div className="mt-4 flex justify-end">
            <button className="text-blue-500 hover:underline">Modifier</button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AdminDashboard;



