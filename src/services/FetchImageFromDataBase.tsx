// FetchImageFromDatabase.tsx

import { useProductStore } from '../stores/useProductStore';

export const fetchImageFromDatabase = async (productName: string): Promise<string> => {
  try {
    const products = useProductStore.getState().products;
    const matchingProduct = products.find((product) =>
      product.name.trim().toLowerCase() === productName.trim().toLowerCase()
    );

    if (matchingProduct) {
      return matchingProduct.images || ''; // Assuming the image is a string (URL), adjust accordingly
    } else {
      console.error(`Product with name "${productName}" not found in the database.`);
      return '';
    }
  } catch (error) {
    console.error('Error fetching image from the database:', error);
    return '';
  }
};
