import axios from "axios";


export const getProductList = async (accessToken: string) => {
  try {
    const response = await axios.get("/products", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching product list:", error);
    throw error;
  }
};

export const getProduct = async (id: number, accessToken: string) => {
  try {
    const response = await axios.get(`/products/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

export const addProductAPI = async (data: any, accessToken: string) => {
  try {
    await axios.post("/products", data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

export const updateProductAPI = async (id: number, data: any, accessToken: string) => {
  try {
    await axios.put(`/products/${id}`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

export const deleteProductAPI = async (id: number, accessToken: string) => {
  try {
    await axios.delete(`/products/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};
