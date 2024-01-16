import { create } from "zustand";
import * as api from '../utils/apiProduct'; // Adjust the path based on your project structure

export interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
  quantity?: number;
}

interface State {
  products: Product[];
  totalProducts: number;
  isLoading: boolean;
  error: any;
  accessToken : string;
}
interface Actions {

  setAccessToken: (token: string) => void;
  products: Product[];
  setProducts: (products: Product[]) => void;
  addProduct: (data: any) => Promise<void>;
  updateProduct: (id: number, data: any) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
  fetchData: () => Promise<void>;
}

const INITIAL_STATE: State = {
  products: [],
  totalProducts: 0,
  isLoading: false,
  error: null,
  accessToken:'',

};

export const useProductStore = create<State & Actions>((set,get) => ({
 
    ...INITIAL_STATE,
  setAccessToken: (token) => set({ accessToken: token }),
  products: [],
  setProducts: (products) => set({ products: products }),
  addProduct: async (data) => {
    const { accessToken } = get();
    try {
      await api.addProductAPI(data, accessToken);
      await fetchProductList();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  },
  updateProduct: async (id, data) => {
    const { accessToken } = get();
    try {
      await api.updateProductAPI(id, data, accessToken);
      await fetchProductList();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  },
  deleteProduct: async (id) => {
    const { accessToken } = get();
    try {
      await api.deleteProductAPI(id, accessToken);
      await fetchProductList();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  },
  fetchData: async () => {
    const { accessToken } = get();
    try {
      set({ isLoading: true, error: null });
      const productList = await api.getProductList(accessToken);
      set({ products: productList, isLoading: false });
    } catch (error) {
      console.error("Error fetching products:", error);
      set({ error, isLoading: false });
    }
  },
}));

const fetchProductList = async () => {
  const { accessToken, setProducts } = useProductStore.getState();
  const productList = await api.getProductList(accessToken);
  setProducts(productList);
};
