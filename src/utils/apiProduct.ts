import axios from "axios";

const BASE_URL = "http://localhost:8882"; // Replace with your Spring Boot backend URL

export const getProductList = async (accessToken: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/products`, {
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
    const response = await axios.get(`${BASE_URL}/products/${id}`, {
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
    await axios.post(`${BASE_URL}/products`, data, {
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
    await axios.put(`${BASE_URL}/products/${id}`, data, {
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
    await axios.delete(`${BASE_URL}/products/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};
