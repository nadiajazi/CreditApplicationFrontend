import { create } from 'zustand';
import { fetchPriceFromDatabase } from '../services/FetchPriceFromDataBase';

export interface Transaction {
  id: string;
  title: string;
  quantity: number;
  price: number;
}

interface TransactionState {
  transactions: Transaction[];
  totalItems: number;
  totalPrice: number;
}

interface TransactionActions {
  addTransaction: (transaction: { title: string; quantity: number; price: number }) => void;
  removeTransaction: (id: string) => void;
}

const INITIAL_STATE: TransactionState = {
  transactions: [],
  totalItems: 0,
  totalPrice: 0,
};

const generateId = (): string => {
  return '_' + Math.random().toString(36);
};

export const useTransactionStore = create<TransactionState & TransactionActions>((set, get) => ({
  transactions: INITIAL_STATE.transactions,
  totalItems: INITIAL_STATE.totalItems,
  totalPrice: INITIAL_STATE.totalPrice,

  addTransaction: async (transaction) => {
    const price = await fetchPriceFromDatabase(transaction.title);
   

    set((state) => ({
      transactions: [
        ...state.transactions,
        {
          id: generateId(),
          title: transaction.title,
          quantity: transaction.quantity,
          price: price,
        },
      ],
      totalItems: state.totalItems + transaction.quantity,
      totalPrice: state.totalPrice + transaction.price * transaction.quantity,
    }));
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


