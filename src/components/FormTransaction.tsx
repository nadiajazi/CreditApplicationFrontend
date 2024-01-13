import React, { useState } from 'react';
import { useTransactionStore } from '../stores/useTransactionStore';
import { useProductStore } from '../stores/useProductStore';
import { useNavigate } from 'react-router-dom';


interface TransactionProps {
  clientId: number;
}

const FormTransaction: React.FC<TransactionProps> = ({ clientId }) => {
  const [title, setTitle] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const transactions = useTransactionStore((state) => state.transactions);
  const addTransactionForClient = useTransactionStore((state) => state.addTransactionForClient);
  const removeTransaction = useTransactionStore((state) => state.removeTransaction);
  const products = useProductStore((state) => state.products);
  const navigate = useNavigate();

  const fetchPriceFromDatabase = async (productTitle: string): Promise<number> => {
    const matchingProduct = products.find((product) =>
      product.title.trim().toLowerCase() === productTitle.trim().toLowerCase()
    );

    if (matchingProduct) {
      return matchingProduct.price;
    } else {
      console.error(`Product with title "${productTitle}" not found in the database.`);
      return 0;
    }
  };

  const handleTransactionSubmit = async () => {
    if (title.length && quantity > 0) {
      const price = await fetchPriceFromDatabase(title);
      if (price > 0) {
        addTransactionForClient(clientId, {
          title,
          quantity,
          price,
          date: new Date(),
        });
        setTitle("");
        setQuantity(1);
      } else {
        console.error(`Product with title "${title}" not found in the database.`);
      }
    }
  };
  
  const calculateTotalAmount = () => {
    const clientTransactions = transactions.filter(transaction => transaction.clientId === clientId);
    const totalAmount = clientTransactions.reduce((total, transaction) => total + transaction.price * transaction.quantity, 0);
    return totalAmount;
  };



  const handleClose = () => {
    navigate(`/admin/clients`);
    console.log('Client ID:', clientId);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md"> 
      <h3 className="text-2xl font-semibold mb-4">Transactions</h3>
      <div className="mb-4">
        <input
          className="border border-gray-300 p-2 w-full rounded-md"
          placeholder="Product title"
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </div>
      <div className="mb-4">
        <input
          className="border border-gray-300 p-2 w-full rounded-md"
          type="number"
          placeholder="Product quantity"
          required
          onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
          value={quantity}
        />
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
        onClick={handleTransactionSubmit}
      >
        Add Item
      </button>
      <ul className="mt-4">
        {transactions.map((transaction) => (
          <li key={transaction.id} className="flex justify-between items-center border-b py-2">
            <div>
              <span>{transaction.title}</span>
              <span className="ml-4">Quantity: {transaction.quantity}</span>
              <span className="ml-4">Date: {transaction.date.toISOString()}</span>
            </div>
            <div>
              <span>Price: ${transaction.price}</span>
              <span>Price: ${transaction.price}</span>
              <button
                className="text-red-500 hover:text-red-700 ml-4"
                onClick={() => {
                  removeTransaction(transaction.id);
                  
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <h4 className="text-xl font-semibold">Total Amount: ${calculateTotalAmount()}</h4>
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







