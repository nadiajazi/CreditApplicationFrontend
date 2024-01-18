import { useProductStore } from '../stores/useProductStore';

export const fetchPriceFromDatabase = async (productname: string): Promise<number> => {
    const products = useProductStore.getState().products;
    const matchingProduct = products.find((product) =>
      product.name.trim().toLowerCase() === productname.trim().toLowerCase()
    );
  
    if (matchingProduct) {
      return matchingProduct.price;
    } else {
      console.error(`Product with name "${productname}" not found in the database.`);
      return 0;
    }
  };
  