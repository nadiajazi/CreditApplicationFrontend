import { useProductStore } from '../stores/useProductStore';

export const fetchPriceFromDatabase = async (productTitle: string): Promise<number> => {
  const products = useProductStore.getState().products;

  const matchingProduct = products.find((product) => product.title === productTitle);

  if (matchingProduct) {
    return matchingProduct.price;
  } else {
    return 0;
  }
};
