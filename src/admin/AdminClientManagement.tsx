import React, { useState, useEffect } from "react";
import AdminSideBar from "../components/AdminSideBar";
import ClientTable from "../components/ClientTable";
import { useClientStore } from "../stores/useClientStore";


const AdminClientManagement: React.FC = () => {
  const [open, setOpen] = useState(true);
  const { clients, isLoading, fetchData } = useClientStore()

  useEffect(() => { fetchData() }, [fetchData])
  return (

    <section className="flex gap-6">
      <AdminSideBar open={open} toggleSidebar={() => setOpen(!open)} />
      <div className="m-3 text-xl text-gray-900 font-semibold">
          <div className="App p-8">
              <h1 className="text-2xl font-bold mb-4">Client Dashboard</h1>
              {isLoading 
                ? <div className='text-center text-lg'>Loading...</div> 
              : <ClientTable clients={clients} />
              }  
          </div>
      </div>
    </section>
  );
};

export default AdminClientManagement;
