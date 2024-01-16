import { create } from "zustand";
import apiClient, { setAuthToken } from '../utils/apiClient';
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
  token: string;
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
  token: '',
  selectClient: () => {}, 
};

export const useClientStore = create<State & Actions>((set,get) => ({
  ...INITIAL_STATE,
  selectClient: (client) => set({ selectedClient: client }),

  fetchData: async () => {
    set({ isLoading: true, error: null });
    try {
      const token = get().token; 
      setAuthToken(token); 
      const response = await apiClient.get("/api/v1/users");
      const clientsWithTotalAmount: Client[] = response.data.map((client: User) => ({
        ...client,
        totalAmount: 0,
      }));

      set({ clients: clientsWithTotalAmount, totalClients: response.data.length, isLoading: false });
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
