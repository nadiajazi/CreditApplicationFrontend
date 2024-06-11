import { create } from 'zustand';
import { Product } from './useProductStore';


export interface userResponse {
  name: string;
  phone: string;
}

export interface TransactionProduct {
  productId: number;
  name: string;
  price: number;
}

export interface PurchaseResponse{
  id: number;
  amount: number;
  userResponse: userResponse;
  products: TransactionProduct[];
  createdDate: any;
}
export interface Transaction {
  amount: number;
  userResponse: userResponse;
  purchasedProducts: TransactionProduct[];
  createdDate: string;
  id: number;
  userId: number;
  name: string;
  quantity: number;
  product: Product;
  price: number;
  purchaseName: string;
  purchaseDate: any;
  products: { productName: string; quantity: number }[]; 
}

interface TransactionStore {
  adminPurchases: PurchaseResponse[] | null;
  clientPurchases: PurchaseResponse[] | null;
  fetchAdminPurchases: () => void;
  fetchClientPurchases: (userId: number) => void;
  addPurchase: (userId: number, products: { productName: string; quantity: number }[]) => void;
  getTotalTransactions: () => number;
}

export const useTransactionStore = create<TransactionStore>((set, get) => {
  return {
    adminPurchases: null,
    clientPurchases: null,

    getTotalTransactions: () => {
      const { adminPurchases, clientPurchases } = get();
      const totalAdminTransactions = adminPurchases ? adminPurchases.length : 0;
      const totalClientTransactions = clientPurchases ? clientPurchases.length : 0;
      return totalAdminTransactions + totalClientTransactions;
    },

    fetchAdminPurchases: async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        console.error('Authentication token not found in local storage');
        return;
      }

      try {
        const response = await fetch('http://localhost:8060/api/purchases/admin/allpurchases', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Error fetching admin purchases');
        }

        const data = await response.json();
        set({ adminPurchases: data });
      } catch (error) {
        console.error('Error fetching admin purchases:', error);
        throw error; 
      }
    },

    fetchClientPurchases: async (userId: number) => {
      set({ clientPurchases: null }); 
      const token = localStorage.getItem('accessToken');
      if (!token) {
        console.error('Authentication token not found in local storage');
        return;
      }

      try {
        const response = await fetch(`http://localhost:8060/api/purchases/client/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        set({ clientPurchases: data });
      } catch (error) {
        console.error('Error fetching client purchases:', error);
        throw error; // Ensure the error is thrown so it can be caught in the component
      }
    },

    addPurchase: async (userId: number, products: { productName: string; quantity: number }[]) => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        console.error('Authentication token not found in local storage');
        return;
      }

      try {
        const response = await fetch('http://localhost:8060/api/purchases/admin', { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ userId, products }),
        });

        if (!response.ok) {
          throw new Error('Error adding purchase');
        }
      } catch (error) {
        console.error('Error adding purchase:', error);
        throw error; // Ensure the error is thrown so it can be caught in the component
      }
    },
  };
});
