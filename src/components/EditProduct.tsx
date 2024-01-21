import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface EditProductProps {
  onClose: () => void; 
  id?: number;

}

const EditProduct: React.FC<EditProductProps> = ({ onClose, id}) => {
    let navigate = useNavigate();
    const { productId } = useParams();
    const [accessToken, setAccessToken] = useState<string>("");
    const [refreshToken, setRefreshToken] = useState<string>("");
    const [apiCallSuccess, setApiCallSuccess] = useState<boolean>(false);

    const [productData, setProductData] = useState({
      name: "",
      quantity: "",
      price: "",
      ref: "",
      images: "", 
  
    });
  
    const { name, quantity, price, ref, images } = productData;
  
    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setProductData({ ...productData, [e.target.name]: e.target.value });
    };
  
    useEffect(() => {
      const storedAccessToken = localStorage.getItem("accessToken");
      const storedRefreshToken = localStorage.getItem("refreshToken");
    
      console.log("Stored Access Token:", storedAccessToken);
      console.log("Stored Refresh Token:", storedRefreshToken);
    
      if (storedAccessToken && storedRefreshToken) {
        setAccessToken(storedAccessToken);
        setRefreshToken(storedRefreshToken);
      }
    
      
    }, [id]);

   
    
  
    const refreshTokens = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/refresh-token",
          { refreshToken },
          {
            headers: {
            },
          }
        );
  
        const newAccessToken = response.data.accessToken;
        setAccessToken(newAccessToken);
  
        localStorage.setItem("accessToken", newAccessToken);
      } catch (error: any) {
        console.error("Error refreshing tokens:", error.message);
      }
    };
  
    
   
    
    useEffect(() => {
      const loadProduct = async () => {
        try {
          const storedAccessToken = localStorage.getItem("accessToken");
          const result = await axios.get(`http://localhost:8080/Product/${id}`, {
            headers: {
              Authorization: `Bearer ${storedAccessToken}`,
            },
          });
          console.log(id);
          console.log("Product Data:", result.data);
          setProductData(result.data);
        } catch (error: any) {
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
      console.log("Cancel button clicked");
      onClose();

    };
    const onSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        console.log("Submitting changes...");
    
        const response = await axios.put(
          `http://localhost:8080/Product/${id}`,
          productData,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
    
        console.log("PUT Response:", response.data);
    
        // Update the local state with the new product data
        setProductData(response.data);
        setApiCallSuccess(true);
    
        // Close the modal
        onClose();
      } catch (error: any) {
        console.error("Error submitting product:", error.message);
    
        if (error.response && error.response.status === 401) {
          console.error("Token expired, handle refresh logic here");
        }
      }
    };
    
    
    const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    };
    return (
      <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center"
        onClick={handleOutsideClick}>
        <div className="bg-white p-6 border rounded-md max-w-2xl w-full h-full shadow overflow-y-auto">
            <h2 className="text-center m-4 text-2xl font-bold">Edit Product</h2>
  
            <form onSubmit={(e) => onSubmit(e)}>
              <div className="mb-3">
                <label htmlFor="images" className="block text-sm font-medium text-gray-600">
                  Image URL
                </label>
                <input
                  type="text"
                  className="form-input mt-1 p-2 border rounded-md"
                  placeholder="Enter product image URL"
                  name="images"
                  value={images}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
  
              {images && (
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-600">Preview Image</label>
                  <img
                    src={images}
                    alt="Product Preview"
                    className="mt-1 p-2 border rounded-md max-w-xs max-h-100 object-contain"
                    />
                </div>
              )}
  
              <div className="mb-3">
                <label htmlFor="name" className="block text-sm font-medium text-gray-600">
                  Label
                </label>
                <input
                  type="text"
                  className="form-input mt-1 p-2 border rounded-md"
                  placeholder="Enter product name"
                  name="name"
                  value={name}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-600">
                  Quantity
                </label>
                <input
                  type="text"
                  className="form-input mt-1 p-2 border rounded-md"
                  placeholder="Enter product quantity"
                  name="quantity"
                  value={quantity}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="price" className="block text-sm font-medium text-gray-600">
                  Price
                </label>
                <input
                  type="text"
                  className="form-input mt-1 p-2 border rounded-md"
                  placeholder="Enter product price"
                  name="price"
                  value={price}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="ref" className="block text-sm font-medium text-gray-600">
                  Reference
                </label>
                <input
                  type="text"
                  className="form-input mt-1 p-2 border rounded-md"
                  placeholder="Enter product reference"
                  name="ref"
                  value={ref}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
                Submit
              </button >
              <button
                className="bg-red-500 text-white p-2 rounded-md mx-2"
                onClick={handleCancel}
              >
                  Cancel
              </button>
            </form>
          
        </div>
      </div>
    );
  }

  export default EditProduct;