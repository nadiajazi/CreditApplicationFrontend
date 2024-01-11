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
  selectedClient: Client | null;
  selectClient: (client: Client) => void;
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
  selectedClient: null,
  totalClients: 0,
  isLoading: false,
  error: null,
  selectClient: () => {}, // Temporary placeholder, will be overwritten
};

export const useClientStore = create<State & Actions>((set) => ({
  ...INITIAL_STATE,
  selectClient: (client) => set({ selectedClient: client }),

  fetchData: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data: User[] = await response.json();
      const clientsWithTotalAmount: Client[] = data.map((client) => ({
        ...client,
        totalAmount: 0, 
      }));

      set({ clients: clientsWithTotalAmount, totalClients: data.length, isLoading: false });
    } catch (error) {
      console.error("Error fetching data:", error);
      set({ error, isLoading: false });
    }
  },

  removeClient: (clientId: number) =>
    set((state) => ({
      clients: state.clients.filter((client) => client.id !== clientId),
      totalClients: state.totalClients - 1
    })),

  updateTotalAmount: (clientId, transactionAmount) =>
    set((state) => ({
      clients: state.clients.map((client) =>
        client.id === clientId
          ? { ...client, totalAmount: client.totalAmount + transactionAmount }
          : client
      ),
    })),
}));
