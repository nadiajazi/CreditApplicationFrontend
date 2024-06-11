import axios from "axios";
import React, { useState, useEffect } from "react";
import { useProductStore } from "../stores/useProductStore";

interface AddProductProps {
  onClose: () => void;
}

const AddProducts: React.FC<AddProductProps> = ({ onClose }) => {
  const [accessToken, setAccessToken] = useState<string>("");
  const { fetchData } = useProductStore();
  const [productData, setProductData] = useState({
    name: "",
    quantity: "",
    price: "",
    ref: "",
    images: "",
  });

  const { name, quantity, price, ref, images } = productData;

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken") ?? "";
    setAccessToken(storedToken);
  }, []);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    onClose();
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      await axios.post("http://localhost:8060/product", productData, config);

      fetchData();

    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center"
      onClick={handleOutsideClick}
    >
      <div className="flex justify-center items-center h-screen">
        <div className="border rounded p-4 mt-2 shadow w-96 bg-white">
          <h2 className="text-center m-4 text-2xl font-bold">Add Product</h2>

          <form onSubmit={onSubmit}>
            <div className="mb-4">
              <label htmlFor="images" className="block text-sm font-medium text-gray-600">
                Image URL
              </label>
              <input
                type="text"
                className="form-input mt-1 p-2 border rounded-md w-full"
                placeholder="Enter product image URL"
                name="images"
                value={images}
                onChange={onInputChange}
              />
            </div>

            {images && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Preview Image</label>
                <img
                  src={images}
                  alt="Product Preview"
                  className="mt-1 p-2 border rounded-md max-w-full"
                  style={{ backgroundColor: "#E3E5E6" }}
                />
              </div>
            )}

            <div className="grid grid-cols-1 gap-4 mb-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-600">
                  Name
                </label>
                <input
                  type="text"
                  className="form-input mt-1 p-2 border rounded-md w-full"
                  placeholder="Enter product name"
                  name="name"
                  value={name}
                  onChange={onInputChange}
                />
              </div>
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-600">
                  Quantity
                </label>
                <input
                  type="text"
                  className="form-input mt-1 p-2 border rounded-md w-full"
                  placeholder="Enter product quantity"
                  name="quantity"
                  value={quantity}
                  onChange={onInputChange}
                />
              </div>
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-600">
                  Price
                </label>
                <input
                  type="text"
                  className="form-input mt-1 p-2 border rounded-md w-full"
                  placeholder="Enter product price"
                  name="price"
                  value={price}
                  onChange={onInputChange}
                />
              </div>
              <div>
                <label htmlFor="ref" className="block text-sm font-medium text-gray-600">
                  Reference
                </label>
                <input
                  type="text"
                  className="form-input mt-1 p-2 border rounded-md w-full"
                  placeholder="Enter product reference"
                  name="ref"
                  value={ref}
                  onChange={onInputChange}
                />
              </div>
            </div>

            <div className="flex justify-between">
              <button type="submit" className="bg-[#82c0cc] text-white p-2 rounded-md">
                Submit
              </button>
              <button className="text-gray-600 hover:text-gray-800 p-2" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;
