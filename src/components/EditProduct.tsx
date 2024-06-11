import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useProductStore } from "../stores/useProductStore";

interface EditProductProps {
  onClose: () => void; 
  id?: number;

}

const EditProduct: React.FC<EditProductProps> = ({ onClose, id}) => {
    const { productId } = useParams();
    const [accessToken, setAccessToken] = useState<string>("");
    const [refreshToken, setRefreshToken] = useState<string>("");
    const {  fetchData } = useProductStore()

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const [productData, setProductData] = useState({
    name: "",
    quantity: "",
    price: "",
    ref: "",
    images: "",
  });

  const { name, quantity, price, ref, images } = productData;

  const onInputChange = (e:any) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const storedAccessToken = localStorage.getItem("accessToken");
    const storedRefreshToken = localStorage.getItem("refreshToken");

    if (storedAccessToken && storedRefreshToken) {
      setAccessToken(storedAccessToken);
      setRefreshToken(storedRefreshToken);
    }
  }, [id]);

  const refreshTokens = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8060//api/v1/auth/refresh-token",
        { refreshToken },
        {
          headers: {},
        }
      );

      const newAccessToken = response.data.accessToken;
      setAccessToken(newAccessToken);

      localStorage.setItem("accessToken", newAccessToken);
    } catch (error:any) {
      console.error("Error refreshing tokens:", error.message);
    }
  };

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const storedAccessToken = localStorage.getItem("accessToken");
        const result = await axios.get(
          `http://localhost:8060/Product/${id}`,
          {
            headers: {
              Authorization: `Bearer ${storedAccessToken}`,
            },
          }
        );
        setProductData(result.data);
      } catch (error:any) {
        if (error.response && error.response.status === 401) {
          console.error("Token expired, refreshing tokens...");
          await refreshTokens();
          await loadProduct();
        } else {
          console.error("Error loading product:", error.message);
        }
      }
    };
    if (id) {
      loadProduct();
    }
  }, [id]);

  const handleCancel = () => {
    onClose();
  };

  const onSubmit = async (e:any) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8060/Product/${id}`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setProductData((prevData) => ({
        ...prevData,
        ...response.data,
      }));

      onClose();
      fetchData();
    } catch (error:any) {
      console.error("Error submitting product:", error.message);
    }
  };

  const handleOutsideClick = (e:any) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center"
      onClick={handleOutsideClick}
    >
      <div className="bg-white p-6 border rounded-md max-w-2xl w-full h-full shadow overflow-y-auto">
        <h2 className="text-center m-4 text-2xl font-bold">Edit Product</h2>

        <form onSubmit={(e) => onSubmit(e)}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Image URL
            </label>
            <input
              type="text"
              className="form-input mt-1 p-2 border rounded-md"
              placeholder="Enter product image URL"
              name="images"
              value={images}
              onChange={onInputChange}
            />
          </div>

          {images && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Preview Image
              </label>
              <img
                src={images}
                alt="Product Preview"
                className="mt-1 p-2 border rounded-md max-w-xs max-h-100 object-contain"
              />
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Name
              </label>
              <input
                type="text"
                className="form-input mt-1 p-2 border rounded-md"
                placeholder="Enter product name"
                name="name"
                value={name}
                onChange={onInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Quantity
              </label>
              <input
                type="text"
                className="form-input mt-1 p-2 border rounded-md"
                placeholder="Enter product quantity"
                name="quantity"
                value={quantity}
                onChange={onInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Price
              </label>
              <input
                type="text"
                className="form-input mt-1 p-2 border rounded-md"
                placeholder="Enter product price"
                name="price"
                value={price}
                onChange={onInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Reference
              </label>
              <input
                type="text"
                className="form-input mt-1 p-2 border rounded-md"
                placeholder="Enter product reference"
                name="ref"
                value={ref}
                onChange={onInputChange}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-md mr-2"
            >
              Submit
            </button>
            <button
              className="bg-red-500 text-white p-2 rounded-md"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
