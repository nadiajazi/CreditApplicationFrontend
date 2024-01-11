import { create } from 'zustand';
import { fetchPriceFromDatabase } from '../services/FetchPriceFromDataBase';

export interface Transaction {
  id: string;
  clientId: number;
  title: string;
  quantity: number;
  price: number;
  date: Date;
}

interface TransactionState {
  transactions: Transaction[];
  totalItems: number;
  totalPrice: number;
  addTransactionForClient: (clientId: number, transaction: Omit<Transaction, 'id' | 'clientId'>) => Promise<void>;
  removeTransaction: (id: string) => void;
}

const INITIAL_STATE: Omit<TransactionState, 'addTransactionForClient' | 'removeTransaction'> = {
  transactions: [],
  totalItems: 0,
  totalPrice: 0,
};

const generateId = (): string => {
  return '_' + Math.random().toString(36).substr(2, 9);
};

export const useTransactionStore = create<TransactionState>((set, get) => ({
  ...INITIAL_STATE,

  addTransactionForClient: async (clientId, transaction) => {
    try {
      const price = await fetchPriceFromDatabase(transaction.title);
      set((state) => {
        const newTransaction = {
          id: generateId(),
          clientId: clientId,
          ...transaction,
          price: price,
        };

        const updatedTransactions = [...state.transactions, newTransaction];
        const updatedTotalItems = state.totalItems + transaction.quantity;
        const updatedTotalPrice = state.totalPrice + (price * transaction.quantity);

        return {
          ...state,
          transactions: updatedTransactions,
          totalItems: updatedTotalItems,
          totalPrice: updatedTotalPrice,
        };
      });
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  },

  removeTransaction: (id) => {
    set((state) => {
      const removedTransaction = state.transactions.find((t) => t.id === id);
      if (!removedTransaction) {
        return state;
      }

      const updatedTransactions = state.transactions.filter((t) => t.id !== id);
      const updatedTotalItems = state.totalItems - removedTransaction.quantity;
      const updatedTotalPrice = state.totalPrice - (removedTransaction.price * removedTransaction.quantity);

      return {
        ...state,
        transactions: updatedTransactions,
        totalItems: updatedTotalItems,
        totalPrice: updatedTotalPrice,
      };
    });
  },
}));
