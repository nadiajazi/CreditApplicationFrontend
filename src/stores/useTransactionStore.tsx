import { create } from 'zustand';
import { Product } from './useProductStore';

export interface Transaction {
  id: number;
  userId: number;
  amount: number;
  name: string;
  quantity: number;
  product: Product;
  price: number;
  purchasedate: Date;
  purchaseName: string;

}

interface TransactionStore {
  adminPurchases: Transaction[] | null;
  clientPurchases: Transaction[] | null;
  fetchAdminPurchases: () => void;
  fetchClientPurchases: (clientId: number) => void;
  addPurchase: (name: string, quantity: number,userId: number ) => void;
}


export const useTransactionStore = create<TransactionStore>((set) => {
  return {
    adminPurchases: null,
    clientPurchases: null,

    fetchAdminPurchases: async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        console.error('Authentication token not found in local storage');
        return;
      }
    
      try {
        const response = await fetch('http://localhost:8080/api/purchases/admin', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
    
        if (!response.ok) {
          throw new Error('Error fetching admin purchases');
        }
    
        const data = await response.json();
        set((state) => ({ ...state, adminPurchases: data }));
        console.log(data);
      } catch (error) {
        console.error('Error fetching admin purchases:', error);
      }
    },

    fetchClientPurchases: async (userId: number) => {
      set({ clientPurchases: null }); // Reset state before fetching
      const token = localStorage.getItem('accessToken');
      if (!token) {
        console.error('Authentication token not found in local storage');
        return;
      }

      try {
        const response = await fetch(`http://localhost:8080/api/purchases/client/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        set({ clientPurchases: data });
      } catch (error) {
        console.error('Error fetching client purchases:', error);
      }
    },

    addPurchase: async (name: string, quantity: number, userId: number) => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        console.error('Authentication token not found in local storage');
        return;
      }
      console.log({ name, quantity, userId })
      try {
        const response = await fetch('http://localhost:8080/api/purchases/admin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          
          },
          
          body: JSON.stringify({ name, quantity, userId }),
        });

        if (!response.ok) {
          throw new Error('Error adding purchase');
        console.log({ name, quantity, userId })
        }


       
      } catch (error) {
        console.error('Error adding purchase:', error);
      }
    },
  };
});