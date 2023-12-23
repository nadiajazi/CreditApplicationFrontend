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
  isLoading: boolean;
  error: any;
}

interface Actions {
  fetchData: () => Promise<void>;
  removeClient: (clientId: number) => void;
  updateClientTotalAmount: (clientId: number, newTotalAmount: number) => void;
}

const INITIAL_STATE: State = {
  clients: [],
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

      const clientsWithTotalAmount: Client[] = data.map((client: User) => ({
        ...client,
        totalAmount: 0, // Set the initial total amount here
      }));

      set({ clients: clientsWithTotalAmount, isLoading: false });
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

  updateClientTotalAmount: (clientId: number, newTotalAmount: number) =>
    set((state) => ({
      clients: state.clients.map((client) =>
        client.id === clientId ? { ...client, totalAmount: newTotalAmount } : client
      ),
    })),
}));
