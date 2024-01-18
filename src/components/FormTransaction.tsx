import React, { useState, useEffect } from 'react';
import { useTransactionStore } from '../stores/useTransactionStore';
import { useNavigate } from 'react-router-dom';

interface TransactionProps {
  clientId: number;
}

const FormTransaction: React.FC<TransactionProps> = ({ clientId }) => {
  const [name, setname] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const addPurchase = useTransactionStore((state) => state.addPurchase);
  const adminPurchases = useTransactionStore((state) => state.adminPurchases);

  const navigate = useNavigate();

  const handleProductNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setname(e.target.value);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(parseInt(e.target.value, 10));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const iduser = localStorage.getItem('id2');
    console.log(iduser);
    await addPurchase(name, quantity, Number(iduser));

    setname('');
    setQuantity(1);
  };

  const handleClose = () => {
    navigate(`/admin/clients`);
  };

  const formatDate = (date: Date): string => {
    return date.toISOString().slice(0, 16).replace('T', ' ');
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
      <h3 className="text-2xl font-semibold mb-4">Add Purchase</h3>
      <form onSubmit={handleSubmit}>
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
          type="submit"
        >
          Add Item
        </button>
      </form>
      <div className="mt-4">
        <h4 className="text-xl font-semibold">Purchase List</h4>
        <ul>
          {adminPurchases?.map((transaction) => (
            <li key={transaction.id} className="flex justify-between items-center border-b py-2">
              <div>
                <span>{transaction.purchaseName}</span>
                <span className="ml-4">Quantity: {transaction.quantity}</span>
                <span className="ml-4">Date: {formatDate(new Date(transaction.purchaseDate))}</span>
              </div>
              <div>
                <span>Amount: ${transaction.amount}</span>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <h4 className="text-xl font-semibold">
            Total Amount: ${adminPurchases ? adminPurchases.reduce((acc, curr) => acc + curr.amount, 0) : 0}
          </h4>
        </div>
      </div>
      <div className="mt-6">
        <button
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
          onClick={handleClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};


export default FormTransaction;





