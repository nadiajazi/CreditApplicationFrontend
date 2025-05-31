import { create } from "zustand";

export interface Address {
  city: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  montant: number;
  maxAmount: number;

}

export interface Client extends User {
 
}

interface State {
  clients: Client[];
  selectedClient: Client | null;
  selectClient: (client: Client) => void;
  totalClients: number;
  isLoading: boolean;
  error: any;
}

interface Actions {
  fetchData: () => Promise<void>;
  removeClient: (clientId: number) => void;
  updatemontant: (clientId: number, transactionAmount: number) => void;
}

const INITIAL_STATE: State = {
  clients: [],
  selectedClient: null,
  totalClients: 0,
  isLoading: false,
  error: null,
  selectClient: () => { }, // Temporary placeholder, will be overwritten
};


export const useClientStore = create<State & Actions>((set) => ({

  ...INITIAL_STATE,
  selectClient: (client) => set({ selectedClient: client }),
  
  fetchData: async () => {
    set({ isLoading: true, error: null });
    try {
      const accessToken = localStorage.getItem("accessToken");
  
      const response = await fetch("http://localhost:8882/api/v1/management/users", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data: User[] = await response.json();
      const clientsWithMontant: Client[] = data.map((user) => ({
        ...user,
        montant: user.montant, // Set an initial value for montant
        maxAmount: user.maxAmount,   // Set an initial value for maxAmount
      }));
  
      set({ clients: clientsWithMontant, totalClients: clientsWithMontant.length, isLoading: false });
    } catch (error) {
      console.error("Error fetching data:", error);
      set({ error, isLoading: false });
    }
  },
  
  removeClient: async (clientId: number) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await fetch(`http://localhost:8882/api/v1/management/user/${clientId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(clientId)

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // If API request is successful, update the state
      set((state) => ({
        clients: state.clients.filter((client) => client.id !== clientId),
        totalClients: state.totalClients - 1,
      }));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  },

  updatemontant: (clientId, transactionAmount) =>
    set((state) => ({
      clients: state.clients.map((client) =>
        client.id === clientId
          ? { ...client, montant: client.montant + transactionAmount }
          : client
      ),
    })),
}));