import { useProductStore } from '../stores/useProductStore';

export const fetchPriceFromDatabase = async (productTitle: string): Promise<number> => {
    const products = useProductStore.getState().products;
    const matchingProduct = products.find((product) =>
      product.title.trim().toLowerCase() === productTitle.trim().toLowerCase()
    );
  
    if (matchingProduct) {
      return matchingProduct.price;
    } else {
      console.error(`Product with title "${productTitle}" not found in the database.`);
      return 0;
    }
  };
  