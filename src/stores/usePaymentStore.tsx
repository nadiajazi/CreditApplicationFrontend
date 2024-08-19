import { create } from 'zustand';


export interface Payment{
  id: number;
  amount: number;
  paymentMethod: string;
  createdDate: any;
  customer :  {firstname: string;
    lastname: string;
    email: string;
    phone: string};
}

interface PaymentStore {
  clientInvoices: Payment[] | null;
  adminInvoices: Payment[] | null;
  fetchClientInvoices: () => void;
  fetchAdminInvoices: () => void;
}

export const usePaymentStore = create<PaymentStore>((set) => {
  return {
    clientInvoices: null,
    adminInvoices: null,

    fetchClientInvoices: async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        console.error('Authentication token not found in local storage');
        return;
      }

      try {
        const response = await fetch("/api/v1/payment/user", {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Error fetching admin purchases');
        }

        const data = await response.json();
        set({ clientInvoices: data });
      } catch (error) {
        console.error('Error fetching admin purchases:', error);
        throw error; 
      }
    },

    fetchAdminInvoices: async () => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          console.error('Authentication token not found in local storage');
          return;
        }
  
        try {
          const response = await fetch("/api/v1/payment/admin", {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
  
          if (!response.ok) {
            throw new Error('Error fetching admin invoices');
          }
  
          const data = await response.json();
          set({ adminInvoices: data });
        } catch (error) {
          console.error('Error fetching admin invoices:', error);
          throw error; 
        }
      },
  };
});
