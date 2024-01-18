import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddProducts() {
  const navigate = useNavigate();

  // State for storing the access token
  const [accessToken, setAccessToken] = useState<string>(""); // Set initial state to an empty string

  const [productData, setProductData] = useState({
    name: "",
    quantity: "",
    price: "",
    ref: "",
    images: "", // Add the imageUrl field

  });

  const { name, quantity, price, ref, images } = productData;

  useEffect(() => {
    // Fetch the access token from local storage (adjust the key accordingly)
    const storedToken = localStorage.getItem("accessToken") ?? ""; // Use an empty string if storedToken is null
    setAccessToken(storedToken);
  }, []);

  const onInputChange = (e:any) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e:any) => {
    e.preventDefault();
    try {
      // Include the access token in the Authorization header
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      // Make the POST request with the access token
      await axios.post("http://localhost:8080/product", productData, config);

      console.log(productData);
      navigate("/admin/products");
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center h-screen">
        <div className="border rounded p-4 mt-2 shadow w-96 " style={{ backgroundColor: '#C8DEFD' }}>
          <h2 className="text-center m-4 text-2xl font-bold">Add Product</h2>

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

            {/* Display the image */}
            {images && (
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-600">Preview Image</label>
                <img
                  src={images}
                  alt="Product Preview"
                  className="mt-1 p-2 border rounded-md max-w-full"
               
                  style={{ backgroundColor: '#E3E5E6' }}/>
              </div>
            )}
     
           
           
           
            <div className="mb-3">
              <label htmlFor="name" className="block text-sm font-medium text-gray-600">
                Name
              </label>
              <input
                type="text"
                className="form-input mt-1 p-2 border rounded-md"
                placeholder="Enter product name"
                name="name"
                value={name}
                onChange={(e) => onInputChange(e)}
                style={{ backgroundColor: '#E3E5E6' }}
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
                style={{ backgroundColor: '#E3E5E6' }}
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
                style={{ backgroundColor: '#E3E5E6' }}
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
                style={{ backgroundColor: '#E3E5E6' }}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <button type="submit" className="bg-[#82c0cc] text-white p-2 rounded-md">
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