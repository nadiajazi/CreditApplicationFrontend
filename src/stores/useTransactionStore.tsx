import {create} from 'zustand';

export interface Transaction {
  id: string,
  title : string ,
  quantity : number,
}

interface TransactionState {
    transactions: Transaction[];
    addTransaction: (transaction: { title: string; quantity: number }) => void;
    removeTransaction: (id: string) => void;
}

const generateId = (): string => {
    return '_' + Math.random().toString(36);
  };
export const useTransactionStore = create<TransactionState>((set) => ({
    transactions: [],
    addTransaction: (transaction) =>
    set((state) => ({
      transactions: [
        ...state.transactions,
        {
          id: generateId(),
          title: transaction.title,
          quantity: transaction.quantity,
        },
      ],
    })),
    removeTransaction: (id) => {
      set((state) => ({
        transactions: state.transactions.filter((transaction) => transaction.id !== id),
      }));
    },
  }));
