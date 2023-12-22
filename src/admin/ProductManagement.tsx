import React, { useState,useEffect } from "react";
import AdminSideBar from "../components/AdminSideBar";
import ProductTable from "../components/ProductTable";
import { useProductStore } from "../stores/useProductStore";



const ProductManagement: React.FC = () => {
  
  const [open, setOpen] = useState(true);
  const { products, isLoading, fetchData } = useProductStore()

  useEffect(() => { fetchData() }, [fetchData])

  return (
    <section className="flex gap-6">
      <AdminSideBar open={open} toggleSidebar={() => setOpen(!open)} />
      <div className="m-3 text-xl text-gray-900 font-semibold">
      <div className="App p-8">
        <h1 className="text-2xl font-bold mb-4">Product Dashboard</h1>
        {isLoading 
         ? <div className='text-center text-lg'>Loading...</div> 
          : <ProductTable products={products} />
           }          
           </div>
          </div>
    </section>
  );
};

export default ProductManagement;


