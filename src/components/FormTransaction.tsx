import React, {useState} from  'react';
// import { useProductStore} from '../stores/useProductStore';
import { useTransactionStore, Transaction } from '../stores/useTransactionStore';

interface TransactionProps {
  transactions?:Transaction[];
  onClose: () => void;
  }

//   const fetchPriceFromDatabase = async (productTitle: string) => {
//     const products = useProductStore.getState().products; 
  
//     const matchingProduct = products.find((product) => product.title === productTitle);
  
//     if (matchingProduct) {
//       return matchingProduct.price;
//   };

const FormTransaction: React.FC<TransactionProps> = ({ onClose }) => {
    const [title, setTitle] = useState<string>("");
    const [quantity, setQuantity] = useState<number>(1);
    const transactions = useTransactionStore((state) => state.transactions);
    const addTransaction = useTransactionStore((state) => state.addTransaction);
    const removeTransaction = useTransactionStore((state) => state.removeTransaction);
  
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
            onClick={() => {
            if (title.length && quantity > 0) {
            addTransaction({ title, quantity });
            setTitle("");
            setQuantity(1);
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
                <button
                  onClick={() => {
                    removeTransaction(transaction.id);
                  }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      );
    };
    
    export default FormTransaction;