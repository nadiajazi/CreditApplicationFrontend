import { create } from 'zustand';
import { fetchPriceFromDatabase } from '../services/FetchPriceFromDataBase';

export interface Transaction {
  id: string;
  title: string;
  quantity: number;
  price: number;
  date: Date
}

interface TransactionState {
  transactions: Transaction[];
  totalItems: number;
  totalPrice: number;
}

interface TransactionActions {
  addTransaction: (transaction: Transaction) => void;
  removeTransaction: (id: string) => void;
}

const INITIAL_STATE: TransactionState = {
  transactions: [],
  totalItems: 0,
  totalPrice: 0,
};

const generateId = (): string => {
  return '_' + Math.random().toString(36).substr(2, 9);
};

export const useTransactionStore = create<TransactionState & TransactionActions>((set, get) => ({
  transactions: INITIAL_STATE.transactions,
  totalItems: INITIAL_STATE.totalItems,
  totalPrice: INITIAL_STATE.totalPrice,

  addTransaction: async (transaction) => {
    try {
      const price = await fetchPriceFromDatabase(transaction.title);
      console.log("Fetched price from the database:", price);
  
      set((state) => {
        console.log("Current state before update:", state);
  
        const newState = {
          transactions: [
            ...state.transactions,
            {
              id: generateId(),
              title: transaction.title,
              quantity: transaction.quantity,
              price: price,
              date: transaction.date, 
           
            },
          ],
          totalItems: state.totalItems + transaction.quantity,
          totalPrice: state.totalPrice + price * transaction.quantity,
        };
  
        console.log("New state after update:", newState);
        return newState;
      });
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  },
  removeTransaction: (id) => {
    set((state) => {
      const removedTransaction = state.transactions.find((transaction) => transaction.id === id);

      if (!removedTransaction) {
        return state;
      }

      return {
        transactions: state.transactions.filter((transaction) => transaction.id !== id),
        totalItems: state.totalItems - removedTransaction.quantity,
        totalPrice: state.totalPrice - removedTransaction.price * removedTransaction.quantity,
      };
    });
  },
}));