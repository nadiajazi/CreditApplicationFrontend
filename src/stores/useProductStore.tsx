import {create } from "zustand";

export interface Product {
    id: number
    name: string
    price: number
    images: string
    quantity: number
    purchaseDate: Date;
   }
interface State {
    products: Product [],
    totalProducts: number;
    isLoading : boolean,
    error: any ,
}
interface Actions {
    fetchData : () => Promise<void>
    removeProduct: (productId: number) => void;
    incrementQuantity: (productId: number) => void;
    decrementQuantity: (productId: number) => void;
}

const INITIAL_STATE: State = {
    products: [],
    totalProducts: 0,
    isLoading: false,
    error: null,
}

export const useProductStore = create<State & Actions>((set) => ({
    ...INITIAL_STATE,
    fetchData: async () => {
      try {
        set({ isLoading: true, error: null });
        const accessToken = localStorage.getItem("accessToken");
  
        const response = await fetch("http://localhost:8882/Products", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
        console.log(data);
  
        const totalProducts = data.length; // Assuming data is an array
  
        set((state) => {
          const updatedState = { products: data, totalProducts, isLoading: false };
          localStorage.setItem('productData', JSON.stringify(updatedState));
          return updatedState;
        });
      } catch (error) {
        set({ error, isLoading: false });
      }
    },

    removeProduct: async (productId) => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        
        const response = await fetch(`http://localhost:8882/Product/${productId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        set((state) => {
          const updatedProducts = state.products.filter((item) => item.id !== productId);
          return { ...state, products: updatedProducts };
        });
      } catch (error) {
        // Gérer les erreurs, par exemple, afficher un message à l'utilisateur ou journaliser l'erreur.
        console.error('Erreur lors de la suppression du produit:', error);
      }
    }
,    
    incrementQuantity: (productId: number) =>
    set((state) => ({
      products: state.products.map((product) =>
        product.id === productId
          ? { ...product, quantity: (product.quantity || 0) + 1 }
          : product
      ),
    })),

    decrementQuantity: (productId:number) => {
        set((state) => ({
           products : state.products.map((product) =>
          product.id === productId && (product.quantity || 0) > 0
            ? { ...product, quantity: (product.quantity || 0) - 1 }
            : product
        ),
  
        
      }));
  },




}));