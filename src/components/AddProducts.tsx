import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddProducts() {
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    name: "",
    quantity: "",
    price: "",
    ref: "",
  });

  const { name, quantity, price, ref } = productData;

  const onInputChange = (e:any) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e:any) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/Product", productData);
      navigate("/");
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Add Product</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter product name"
                name="name"
                value={name}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="quantity" className="form-label">
                Quantity
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter product quantity"
                name="quantity"
                value={quantity}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Price
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter product price"
                name="price"
                value={price}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="ref" className="form-label">
                Reference
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter product reference"
                name="ref"
                value={ref}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
