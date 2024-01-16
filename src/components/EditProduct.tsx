import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";



export default function EditProduct  ()  {
    let navigate = useNavigate();
    const { id } = useParams();
  
    const [accessToken, setAccessToken] = useState<string>("");
    const [refreshToken, setRefreshToken] = useState<string>("");
    const [productData, setProductData] = useState({
      title: "",
      quantity: "",
      price: "",
      ref: "",
      images: "", // Add the imageUrl field
  
    });
  
    const { title, quantity, price, ref, images } = productData;
  
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
    
      // Check if id is valid before making the request
      if (id) {
        loadProduct();
      }
    }, []);
    const loadProduct = async () => {
      try {
        const storedAccessToken = localStorage.getItem("accessToken");
        const result = await axios.get(`http://localhost:8080/Product/${id}`, {
          headers: {
            Authorization:` Bearer ${storedAccessToken}`,
          },
        });
        console.log(id)
        console.log("Product Data:", result.data);
        setProductData(result.data);
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          console.error("Token expired, refreshing tokens...");
          await refreshTokens();
          // Retry the loadProduct function after refreshing tokens
          await loadProduct();
        } else {
          console.error("Error loading product:", error.message);
        }
      }
    };
    
    
  
    const refreshTokens = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/refresh-token",
          { refreshToken },
          {
            headers: {
              // Include any necessary headers for refreshing tokens
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
  
    const onSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        await axios.put(`http://localhost:8080/Product/${id}`, productData, {
          headers: {
            Authorization:` Bearer ${accessToken}`,
          },
        });
        navigate("/admin/products");
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          console.error("Token expired, handle refresh logic here");
        } else {
          console.error("Error submitting product:", error.message);
        }
      }
    };
  
    return (
      <div className="container mx-auto">
        <div className="flex justify-center items-center h-screen">
          <div className="border rounded p-4 mt-2 shadow w-96">
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
                    className="mt-1 p-2 border rounded-md max-w-full"
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
                  name="title"
                  value={title}
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
              </button>
              <Link className="bg-red-500 text-white p-2 rounded-md mx-2" to="/admin/products">
                Cancel
              </Link>
           
         
            </form>
          </div>
        </div>
      </div>
    );
  }