import React, { useState, useEffect } from 'react';
import { useTransactionStore } from '../stores/useTransactionStore';
import { useNavigate } from 'react-router-dom';
import { fetchImageFromDatabase } from '../services/FetchImageFromDataBase';
import { fetchPriceFromDatabase } from '../services/FetchPriceFromDataBase';

interface TransactionProps {
  clientId: number;
}

const FormTransaction: React.FC<TransactionProps> = ({ clientId }) => {
  const [name, setName] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [purchases, setPurchases] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const addPurchase = useTransactionStore((state) => state.addPurchase);
  const fetchAdminPurchases = useTransactionStore((state) => state.fetchAdminPurchases);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAdminPurchases();
  }, [fetchAdminPurchases, clientId]);

  const handleProductNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(parseInt(e.target.value, 10));
  };

  const handleAddItem = async () => {
    try {
      const price = await fetchPriceFromDatabase(name);
      const images = await fetchImageFromDatabase(name);
      const newPurchase = { name, quantity, total: quantity * price, price, images };
      setPurchases([...purchases, newPurchase]);
      setName('');
      setQuantity(1);
    } catch (error) {
      console.error('Error adding purchase item:', error);
    }
  };

  const handleDeleteItem = (index: number) => {
    const updatedPurchases = [...purchases];
    updatedPurchases.splice(index, 1);
    setPurchases(updatedPurchases);
  };

  const handleSavePurchases = async () => {
    try {
      setLoading(true);
      const iduser = localStorage.getItem('id2');
      const products = purchases.map(purchase => ({
        productName: purchase.name,
        quantity: purchase.quantity,
      }));
      await addPurchase(Number(iduser), products);
      setPurchases([]);
      navigate(`/admin/clients`);
    } catch (error) {
      console.error('Error adding purchases:', error);
      setError('Error adding purchases');
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalAmount = () => {
    return purchases.reduce((total, purchase) => total + purchase.total, 0).toFixed(2);
  };

  return (
    <div className="max-w-5xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg flex space-x-8">
      <div className="w-1/2">
        <h3 className="text-3xl font-bold mb-6">Add Purchase</h3>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <div className="mb-4">
            <label htmlFor="productName" className="block text-gray-700 font-medium mb-2">Product Name</label>
            <input
              id="productName"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-indigo-500"
              placeholder="Product title"
              required
              onChange={handleProductNameChange}
              value={name}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="productQuantity" className="block text-gray-700 font-medium mb-2">Product Quantity</label>
            <input
              id="productQuantity"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-indigo-500"
              type="number"
              placeholder="Product quantity"
              required
              onChange={handleQuantityChange}
              value={quantity}
            />
          </div>
          <button
            className="w-full bg-[#34ADB1] text-white p-3 rounded-lg hover:bg-[#B8F3FF] transition duration-300"
            type="button"
            onClick={handleAddItem}
          >
            Add Item
          </button>
        </form>
      </div>
      <div className="w-1/2">
        <h4 className="text-2xl font-semibold mb-4">Purchase List</h4>
        <ul className="space-y-4">
          {purchases.map((purchase, index) => (
            <li key={index} className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-sm">
              <div className="flex items-center space-x-4">
                <img src={purchase.images} alt={purchase.name} className="w-16 h-16 object-cover rounded-lg" />
                <div>
                  <div className="text-lg font-medium text-gray-700">{purchase.name}</div>
                  <div className="text-sm text-gray-500">Quantity: {purchase.quantity}</div>
                  <div className="text-sm text-gray-500">Price: {purchase.price.toFixed(2)} TND</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="text-lg font-medium text-gray-700">{purchase.total.toFixed(2)} TND</div>
                <button
                  className="text-red-600 hover:text-red-800 transition duration-300"
                  onClick={() => handleDeleteItem(index)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-sm">
            <div>
              <h4 className="text-xl font-semibold text-gray-700">Total Amount:</h4>
              <span className="text-xl text-gray-900">{calculateTotalAmount()} TND</span>
            </div>
            <div className="flex space-x-4">
              <button
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300"
                onClick={handleSavePurchases}
                disabled={loading}
              >
                Save Purchases
              </button>
              <button
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition duration-300"
                onClick={() => navigate(`/admin/clients`)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
        {error && <div className="mt-4 text-red-600">{error}</div>}
      </div>
    </div>
  );
};

export default FormTransaction;
