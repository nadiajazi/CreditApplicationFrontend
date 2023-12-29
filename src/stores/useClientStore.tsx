import { create } from "zustand";

export interface Address {
  city: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  address: Address;
}

export interface Client extends User {
  totalAmount: number;
}

interface State {
  clients: Client[];
  totalClients: number;
  isLoading: boolean;
  error: any;
}

interface Actions {
  fetchData: () => Promise<void>;
  removeClient: (clientId: number) => void;
  updateTotalAmount: (clientId: number, transactionAmount: number) => void;
}

const INITIAL_STATE: State = {
  clients: [],
  totalClients: 0,
  isLoading: false,
  error: null,
};

export const useClientStore = create<State & Actions>((set) => ({
  ...INITIAL_STATE,
  fetchData: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data: User[] = await response.json();
      const totalClients = data.length;
      const clientsWithTotalAmount: Client[] = data.map((client: User) => ({
        ...client,
        totalAmount: 0, 
      }));

      set({ clients: clientsWithTotalAmount, totalClients, isLoading: false });
    } catch (error) {
      console.error("Error fetching data:", error);
      set({ error, isLoading: false });
    }
  },

  removeClient: (clientId: number) =>
    set((state) => {
      const updatedClients = state.clients.filter((item) => item.id !== clientId);
      return { ...state, clients: updatedClients };
    }),

    updateTotalAmount: (clientId, transactionAmount) =>
    set((state) => ({
      clients: state.clients.map((client) =>
        client.id === clientId
          ? { ...client, totalamount: client.totalAmount + transactionAmount }
          : client
      ),
    })),
}));
