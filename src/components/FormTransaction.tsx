import React, {useState} from  'react';
import { useTransactionStore, Transaction } from '../stores/useTransactionStore';
import { useProductStore } from '../stores/useProductStore';

interface TransactionProps {
  transactions?:Transaction[];
  onClose: () => void;
  clientId: number;
  updateClientTotalAmount: (clientId: number, totalAmount: number) => void;
  }


const FormTransaction: React.FC<TransactionProps> = ({ onClose, clientId, updateClientTotalAmount }) => {
    const [title, setTitle] = useState<string>("");
    const [quantity, setQuantity] = useState<number>(1);
    const transactions = useTransactionStore((state) => state.transactions);
    const addTransaction = useTransactionStore((state) => state.addTransaction);
    const removeTransaction = useTransactionStore((state) => state.removeTransaction);
    const totalAmount = useTransactionStore((state) => state.totalPrice);
    const calculateTotalAmount = () => {
      return transactions.reduce((total, transaction) => {
        return total + transaction.price * transaction.quantity;
      }, 0);
    };


    const fetchPriceFromDatabase = async (productTitle: string): Promise<number> => {
      const products = useProductStore.getState().products;
      const matchingProduct = products.find((product) => product.title === title);
  
      if (matchingProduct) {
        return matchingProduct.price;
      } else {
        return 0;
      }
    };

    return (
        <div style={{ maxWidth: 'xs' }}>
          <h3>Transactions</h3>
          <input
            placeholder="Product title"
            required
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <input
            type="number" 
            placeholder="Product quantity"
            required
            onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
            value={quantity}
          />
            <button
            onClick={async () => {
            if (title.length && quantity > 0) {
            const price = await fetchPriceFromDatabase(title);
            addTransaction({ title, quantity, price });
            setTitle("");
            setQuantity(1);
            updateClientTotalAmount(clientId,calculateTotalAmount());

            }
            }}
            >
            Add Item
            </button>
          <ul>
            {transactions.map((transaction) => (
              <li key={transaction.id}>
                <span>{transaction.title}</span>
                <span>Quantity: {transaction.quantity}</span>
                <span>Price: ${transaction.price}</span>
                <button
                  onClick={() => {
                    removeTransaction(transaction.id);
                    updateClientTotalAmount(clientId,calculateTotalAmount());

                  }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>4<div>
            <h4>Total Amount: ${totalAmount}</h4>
          </div>
        </div>
      );
    };
    
    export default FormTransaction;