import React, { useState, useEffect} from "react";
import AdminSideBar from "../components/AdminSideBar";
import InvoicesTable from "../components/InvoicesTable";
import { usePaymentStore } from "../stores/usePaymentStore";


const InvoicesManagement: React.FC = () => {
  const [open, setOpen] = useState(true);
  const adminInvoices = usePaymentStore((state) => state.adminInvoices);
  const fetchAdminInvoices = usePaymentStore((state) => state.fetchAdminInvoices);

  useEffect(() => {
    fetchAdminInvoices();
  }, [fetchAdminInvoices]);

 
  

  

  return (
    <section className="flex gap-6">
      <AdminSideBar open={open} toggleSidebar={() => setOpen(!open)} />
      <div className="m-3 text-xl text-gray-900 font-semibold">
      <div className="App p-8">
        <h1 className="text-2xl font-bold mb-4">Transaction Dashboard</h1>
        {adminInvoices ? (<InvoicesTable invoices={adminInvoices}  />
    ) : (
      <p>Loading admin purchases...</p>
    )}          
          </div>
      </div>
    </section>
  );
};


export default InvoicesManagement;