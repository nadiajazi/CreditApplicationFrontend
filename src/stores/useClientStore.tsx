import {create } from "zustand";

export interface Client {
    id: number
    name: string
    totalAmount: number
    email:string;
    image: string;
    adresse:string;
   
   }
interface State {
    clients: Client [],
    isLoading : boolean,
    error: any ,
}
interface Actions {
    fetchData : () => Promise<void>
    removeClient: (clientId: number) => void;
    updateClientTotalAmount: (clientId: number, totalAmount: number) => void;

}

const INITIAL_STATE: State = {
    clients: [],
    isLoading: false,
    error: null,
}

export const useClientStore = create<State & Actions>((set) => ({
    ...INITIAL_STATE,
    fetchData: async () => {
        try {
          set({ isLoading: true, error: null });
          const response = await fetch("/src/data/client.json");
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          set({ clients: data, isLoading: false });
        } catch (error) {
          console.error("Error fetching data:", error);
          set({ error, isLoading: false });
        }
      },

    removeClient: (clientId:number) =>
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