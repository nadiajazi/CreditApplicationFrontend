import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// Define an interface for the Product type
interface Product {
  id: number;
  label: string;
  quantity: number;
  price: number;
  ref: string;
  imageUrl: string;
}

export default function Mah () {
  const [products, setProducts] = useState<Product[]>([]);
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const result = await axios.get("http://localhost:8080/Products", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setProducts(result.data);
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/Product/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      loadProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="py-4">
        <table className="table w-full border shadow">
          <thead>
            <tr>
              <th className="p-2">S.N</th>
              <th className="p-2">Image</th>
              <th className="p-2">Label</th>
              <th className="p-2">Quantity</th>
              <th className="p-2">Price</th>
              <th className="p-2">Reference</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index} className="border-t">
                <td className="p-2">{index + 1}</td>
                <td className="p-2">
                  <img src={product.imageUrl} alt="" className="w-12 h-12" />
                </td>
                <td className="p-2">{product.label}</td>
                <td className="p-2">{product.quantity}</td>
                <td className="p-2">{product.price}</td>
                <td className="p-2">{product.ref}</td>
                <td className="p-2">
                  <Link
                    className="btn btn-primary mx-2"
                    to={`/viewproduct/${product.id}`}
                  >
                    View
                  </Link>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/admin/EditProduct/${product.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteProduct(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

