import React, { useState,useEffect } from "react";
import AdminSideBar from "../components/AdminSideBar";
import ProductTable from "../components/ProductTable";
import { useProductStore } from "../stores/useProductStore";
import EditProduct from "../components/EditProduct";



const ProductManagement: React.FC = () => {
  
  const [open, setOpen] = useState(true);
  const [isEditPopupOpen, setEditPopupOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number>(0);
  const { products, isLoading, fetchData } = useProductStore()

  useEffect(() => { fetchData() }, [fetchData])
  const handleEditClick = (productId:number) => {
    setSelectedProductId(productId);
    setEditPopupOpen(true);
  };

  const handleEditPopupClose = () => {
    setEditPopupOpen(false);
    setSelectedProductId(0);
  };

  return (
    <section className="flex gap-6">
      <AdminSideBar open={open} toggleSidebar={() => setOpen(!open)} />
      <div className="m-3 text-xl text-gray-900 font-semibold">
      <div className="App p-8">
        <h1 className="text-2xl font-bold mb-4">Product Dashboard</h1>
        {isLoading 
        ? <div className='text-center text-lg'>Loading...</div> 
          : 
          <ProductTable products={products} onEditClick={handleEditClick} />

          }          
          </div>
          </div>
          {isEditPopupOpen && (
        <EditProduct
          onClose={handleEditPopupClose}
          id={selectedProductId}          
        />
      )}
    </section>
  );
};

export default ProductManagement;

