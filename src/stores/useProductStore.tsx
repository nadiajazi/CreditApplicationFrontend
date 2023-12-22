import {create } from "zustand";

export interface Product {
    id: number
    title: string
    price: number
    discountPercentage: number
    stock: number
    category: string
    images: string[]
    quantity?: number
   }
interface State {
    products: Product [],
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
    isLoading: false,
    error: null,
}

export const useProductStore = create<State & Actions>((set) => ({
    ...INITIAL_STATE,
    fetchData: async () => {
        try {
            set({ isLoading: true, error: null });
            const response = await fetch("https://dummyjson.com/products");
            const data = await response.json();
            set({ products: data.products, isLoading: false });
        } catch (error) {
            set({ error, isLoading: false });
        }
    },

    removeProduct: (productId:number) =>
    set((state) => {
      const updatedProducts = state.products.filter((item) => item.id !== productId);
      
      return { ...state, products: updatedProducts };
    }),
  

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