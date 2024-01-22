import React, { useState, useEffect } from 'react';
import { useTransactionStore } from '../stores/useTransactionStore';
import { useNavigate } from 'react-router-dom';
import { fetchPriceFromDatabase } from '../services/FetchPriceFromDataBase';
import { fetchImageFromDatabase } from '../services/FetchImageFromDataBase';




interface TransactionProps {
  clientId: number;
}

const FormTransaction: React.FC<TransactionProps> = ({ clientId }) => {
  const [name, setname] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [purchases, setPurchases] = useState<Array<any>>([]);
  const addPurchase = useTransactionStore((state) => state.addPurchase);
  const fetchAdminPurchases = useTransactionStore((state) => state.fetchAdminPurchases);

  const navigate = useNavigate();

  useEffect(() => {
    fetchAdminPurchases();
  }, [fetchAdminPurchases, clientId]);

  const handleProductNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setname(e.target.value);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(parseInt(e.target.value, 10));
  };

  const handleAddItem = async () => {
    const price = await fetchPriceFromDatabase(name);
    const images = await fetchImageFromDatabase(name)
    const newPurchase = { name, quantity, total: quantity * price, price, images};
    setPurchases([...purchases, newPurchase]);
    setname('');
    setQuantity(1);
    setTotal(0);
  };

  const handleDeleteItem = (index: number) => {
    const updatedPurchases = [...purchases];
    const deletedItem = updatedPurchases.splice(index, 1)[0];
    setPurchases(updatedPurchases);
    setTotal((prevTotal) => prevTotal - deletedItem.total);
  };

  const handleSavePurchases = async () => {
    const iduser = localStorage.getItem('id2');
    
    for (const purchase of purchases) {
      await addPurchase(purchase.name, purchase.quantity, Number(iduser));
    }

    await fetchAdminPurchases();
    setPurchases([]);
    navigate(`/admin/clients`);
  };

  const handleClose = () => {
    navigate(`/admin/clients`);
  };
  const calculateTotalAmount = () => {
    return purchases.reduce((total, purchase) => total + purchase.total, 0).toFixed(2);
  };
  return (
    
    <div className="max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded-md " >
      <h3 className="text-2xl font-semibold mb-4">Add Purchase</h3>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mb-4">
          <input
            className="border border-gray-300 p-2 w-full rounded-md"
            placeholder="Product title"
            required
            onChange={handleProductNameChange}
            value={name}
          />
        </div>
        <div className="mb-4">
          <input
            className="border border-gray-300 p-2 w-full rounded-md"
            type="number"
            placeholder="Product quantity"
            required
            onChange={handleQuantityChange}
            value={quantity}
          />
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          type="button"
          onClick={handleAddItem}
        >
          Add Item
        </button>
      </form>
      <div className="mt-4">
        <h4 className="text-xl font-semibold">Purchase List</h4>
        <ul>
          {purchases.map((purchase, index) => (
            <li key={index} className="flex justify-between items-center border-b py-2">
              <div>
                <img src={purchase.images} className="w-80" alt="" />
              </div>
              <div className="flex items-center">
                <span className="mr-4 flex">Name: {purchase.name}</span>
                <span className="mr-4 flex ">Quantity: {purchase.quantity}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-4 flex ">Total: ${purchase.total.toFixed(2)}</span>
                <span className="mr-4 flex ">Price: ${purchase.price.toFixed(2)}</span>
                <button
                  className="text-red-500"
                  onClick={() => handleDeleteItem(index)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="text-xl font-semibold">Total Amount:</h4>
              <span className="text-lg">${calculateTotalAmount()}</span>
            </div>
            <div>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                onClick={handleSavePurchases}
              >
                Save Purchases
              </button>
              <button
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
                onClick={handleClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormTransaction;
