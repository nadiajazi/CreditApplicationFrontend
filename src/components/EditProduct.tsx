import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function  EditProduct ()  {

  let navigate = useNavigate();

  const { id } = useParams();
  // State for storing the access token
  const [accessToken, setAccessToken] = useState<string>(""); // Set initial state to an empty string

  const [productData, setProductData] = useState({
      label: "",
      quantity: "",
      price: "",
      ref: "",
      imageUrl: "", // Add the imageUrl field

    });

    const { label, quantity, price, ref, imageUrl } = productData;

  const onInputChange = (e:any) => {
      setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
      // Charger l'access token depuis le local storage
      const storedAccessToken = localStorage.getItem("accessToken");
      if (storedAccessToken) {
        setAccessToken(storedAccessToken);
      }
  
      loadProduct();
    }, []); // Assurez-vous que le tableau de dépendances est vide pour exécuter cette effect uniquement une fois au montage
  
    const onSubmit = async (e: any) => {
      e.preventDefault();
      await axios.put(`http://localhost:8080/Product/${id}`, productData, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Ajouter l'access token dans les headers
        },
      });
      navigate("/");
    };

    const loadProduct = async () => {
      // Utiliser l'access token dans la requête GET
      const result = await axios.get(`http://localhost:8080/Product/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Ajouter l'access token dans les headers
        },
      });
      setProductData(result.data);
    };


  
return (
  <div className="container mx-auto">
    <div className="flex justify-center items-center h-screen">
      <div className="border rounded p-4 mt-2 shadow w-96">
        <h2 className="text-center m-4 text-2xl font-bold">Edit Product</h2>

        <form onSubmit={(e) => onSubmit(e)}>
        <div className="mb-3">
              <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-600">
                Image URL
              </label>
              <input
                type="text"
                className="form-input mt-1 p-2 border rounded-md"
                placeholder="Enter product image URL"
                name="imageUrl"
                value={imageUrl}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            {/* Display the image */}
            {imageUrl && (
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-600">Preview Image</label>
                <img
                  src={imageUrl}
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
              name="label"
              value={label}
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
          <Link className="bg-red-500 text-white p-2 rounded-md mx-2" to="/">
            Cancel
          </Link>
        </form>
      </div>
    </div>
  </div>
)
}

