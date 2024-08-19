import { create } from "zustand";

export interface Product {
  id: number;
  name: string;
  price: number;
  images: string;
  quantity: number;
  purchaseDate: Date;
}

interface State {
  products: Product[];
  totalProducts: number;
  isLoading: boolean;
  error: any;
}

interface Actions {
  fetchData: () => Promise<void>;
  removeProduct: (productId: number) => void;
  incrementQuantity: (productId: number) => void;
  decrementQuantity: (productId: number) => void;
  addProduct: (
    name: string,
    price: number,
    images: string,
    ref: string,
    quantity: number
  ) => void;
}

const INITIAL_STATE: State = {
  products: [],
  totalProducts: 0,
  isLoading: false,
  error: null,
};

export const useProductStore = create<State & Actions>((set) => ({
  ...INITIAL_STATE,

  fetchData: async () => {
    try {
      set({ isLoading: true, error: null });
      const accessToken = localStorage.getItem("accessToken");

      const response = await fetch("/Products", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const totalProducts = data.length;

      set((state) => {
        const updatedState = { products: data, totalProducts, isLoading: false };
        localStorage.setItem("productData", JSON.stringify(updatedState));
        return updatedState;
      });
    } catch (error) {
      set({ error, isLoading: false });
    }
  },

  removeProduct: async (productId) => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const response = await fetch(`/Product/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      set((state) => ({
        products: state.products.filter((item) => item.id !== productId),
      }));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  },

  incrementQuantity: (productId: number) => {
    set((state) => ({
      products: state.products.map((product) =>
        product.id === productId
          ? { ...product, quantity: product.quantity + 1 }
          : product
      ),
    }));
  },

  decrementQuantity: (productId: number) => {
    set((state) => ({
      products: state.products.map((product) =>
        product.id === productId
          ? { ...product, quantity: Math.max(0, product.quantity - 1) }
          : product
      ),
    }));
  },

  addProduct: async (name, price, images, ref, quantity) => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const response = await fetch("/Product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ name, price, images, ref, quantity }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const product = await response.json();

      set((state) => ({
        products: [...state.products, product],
      }));
    } catch (error) {
      console.error("Error adding product:", error);
    }
  },
}));
