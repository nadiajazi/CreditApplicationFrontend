import React, { useState } from "react";
import AdminSideBar from "../components/AdminSideBar";

const AdminTransaction: React.FC = () => {
  const [open, setOpen] = useState(true);

  return (
    <section className="flex gap-6">
      <AdminSideBar open={open} toggleSidebar={() => setOpen(!open)} />
      <div className="m-3 text-xl text-gray-900 font-semibold">
        
      </div>
    </section>
  );
};

export default AdminTransaction;