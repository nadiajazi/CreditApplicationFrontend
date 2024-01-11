import React, { useState} from "react";
import AdminSideBar from "../components/AdminSideBar";
import TransactionTable from "../components/TransactionTable";
import { useTransactionStore } from "../stores/useTransactionStore";


const AdminTransaction: React.FC = () => {
  const [open, setOpen] = useState(true);
  const { transactions } = useTransactionStore()
  const dateOptions = [
    { id: '1', label: 'Last day' },
    { id: '2', label: 'Last 7 days' },
    { id: '3', label: 'Last 30 days' },
    { id: '4', label: 'Last month' },
    { id: '5', label: 'Last year' },
  ];
  

  

  return (
    <section className="flex gap-6">
      <AdminSideBar open={open} toggleSidebar={() => setOpen(!open)} />
      <div className="m-3 text-xl text-gray-900 font-semibold">
      <div className="App p-8">
        <h1 className="text-2xl font-bold mb-4">Transaction Dashboard</h1>
          <TransactionTable transactions= {transactions} label="Your Label" options={dateOptions} />          
          </div>
      </div>
    </section>
  );
};

export default AdminTransaction;