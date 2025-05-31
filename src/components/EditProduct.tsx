import React, { useEffect, useState } from "react";
import axios from "axios";
import { useProductStore } from "../stores/useProductStore";
import { Modal, Button, Input, Card } from "../design-system";
import {
  PhotoIcon,
  TagIcon,
  CubeIcon,
  CurrencyDollarIcon,
  HashtagIcon,
  PencilIcon
} from "@heroicons/react/24/outline";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface EditProductProps {
  onClose: () => void; 
  id?: number;
}

interface ProductData {
  name: string;
  quantity: string;
  price: string;
  ref: string;
  images: string;
}

const EditProduct: React.FC<EditProductProps> = ({ onClose, id }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { fetchData } = useProductStore();
  const [productData, setProductData] = useState<ProductData>({
    name: "",
    quantity: "",
    price: "",
    ref: "",
    images: "", 
  });

  const [errors, setErrors] = useState<Partial<ProductData>>({});
  const [originalData, setOriginalData] = useState<ProductData | null>(null);

  const { name, quantity, price, ref, images } = productData;

  const validateForm = (): boolean => {
    const newErrors: Partial<ProductData> = {};
    
    if (!name.trim()) newErrors.name = "Product name is required";
    if (!quantity.trim()) newErrors.quantity = "Quantity is required";
    if (!price.trim()) newErrors.price = "Price is required";
    if (!ref.trim()) newErrors.ref = "Reference is required";
    if (!images.trim()) newErrors.images = "Image URL is required";
    
    // Validate numeric fields
    if (quantity && isNaN(Number(quantity))) newErrors.quantity = "Quantity must be a number";
    if (price && isNaN(Number(price))) newErrors.price = "Price must be a number";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name as keyof ProductData]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const refreshTokens = async () => {
    try {
      const storedRefreshToken = localStorage.getItem("refreshToken");
      const response = await axios.post(
        "http://localhost:8882/refresh-token",
        { refreshToken: storedRefreshToken }
      );

      const newAccessToken = response.data.accessToken;
      localStorage.setItem("accessToken", newAccessToken);
      return newAccessToken;
    } catch (error: any) {
      console.error("Error refreshing tokens:", error.message);
      throw error;
    }
  };

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;
      
      setIsLoading(true);
      try {
        const storedAccessToken = localStorage.getItem("accessToken");
        const result = await axios.get(`http://localhost:8882/Product/${id}`, {
          headers: {
            Authorization: `Bearer ${storedAccessToken}`,
          },
        });
        
        const data = {
          name: result.data.name || "",
          quantity: String(result.data.quantity || ""),
          price: String(result.data.price || ""),
          ref: result.data.ref || "",
          images: result.data.images || ""
        };
        
        setProductData(data);
        setOriginalData(data);
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          console.error("Token expired, refreshing tokens...");
          try {
            await refreshTokens();
            await loadProduct();
          } catch (refreshError) {
            toast.error("Authentication failed. Please login again.");
          }
        } else {
          console.error("Error loading product:", error.message);
          toast.error("Failed to load product data");
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    setIsLoading(true);
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.put(
        `http://localhost:8882/Product/${id}`,
        {
          ...productData,
          quantity: Number(quantity),
          price: Number(price)
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      toast.success("Product updated successfully!");
      fetchData();
      onClose();
    } catch (error: any) {
      console.error("Error updating product:", error.message);
      
      if (error.response && error.response.status === 401) {
        try {
          await refreshTokens();
          await onSubmit(e);
        } catch (refreshError) {
          toast.error("Authentication failed. Please login again.");
        }
      } else {
        toast.error(error.response?.data?.message || "Failed to update product");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const hasChanges = originalData && JSON.stringify(productData) !== JSON.stringify(originalData);

  return (
    <>
      <ToastContainer position="top-right" />
      <Modal
        isOpen={true}
        onClose={onClose}
        title="Edit Product"
        size="lg"
        footer={
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={onSubmit}
              loading={isLoading}
              disabled={!hasChanges}
              leftIcon={<PencilIcon className="h-4 w-4" />}
            >
              Update Product
            </Button>
          </div>
        }
      >
        {isLoading && !productData.name ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-neutral-600">Loading product data...</p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-6">
            {/* Image URL and Preview */}
            <div className="space-y-4">
              <Input
                label="Product Image URL"
                type="url"
                name="images"
                value={images}
                onChange={onInputChange}
                leftIcon={<PhotoIcon className="h-5 w-5" />}
                placeholder="https://example.com/image.jpg"
                error={errors.images}
                fullWidth
              />
              
              {/* Image Preview */}
              {images && (
                <Card variant="outlined" className="p-4">
                  <div className="text-center">
                    <p className="text-sm font-medium text-neutral-700 mb-3">Image Preview</p>
                    <div className="relative inline-block">
                      <img
                        src={images}
                        alt="Product Preview"
                        className="max-w-full max-h-48 rounded-lg shadow-soft object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    </div>
                  </div>
                </Card>
              )}
            </div>

            {/* Product Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Product Name"
                type="text"
                name="name"
                value={name}
                onChange={onInputChange}
                leftIcon={<TagIcon className="h-5 w-5" />}
                placeholder="Enter product name"
                error={errors.name}
                fullWidth
              />
              
              <Input
                label="Reference"
                type="text"
                name="ref"
                value={ref}
                onChange={onInputChange}
                leftIcon={<HashtagIcon className="h-5 w-5" />}
                placeholder="Enter product reference"
                error={errors.ref}
                fullWidth
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Quantity"
                type="number"
                name="quantity"
                value={quantity}
                onChange={onInputChange}
                leftIcon={<CubeIcon className="h-5 w-5" />}
                placeholder="Enter quantity"
                error={errors.quantity}
                fullWidth
                min="0"
              />
              
              <Input
                label="Price ($)"
                type="number"
                name="price"
                value={price}
                onChange={onInputChange}
                leftIcon={<CurrencyDollarIcon className="h-5 w-5" />}
                placeholder="0.00"
                error={errors.price}
                fullWidth
                step="0.01"
                min="0"
              />
            </div>

            {/* Product Summary */}
            {(name || price) && (
              <Card variant="filled" className="p-4">
                <h4 className="font-medium text-neutral-900 mb-2">Product Summary</h4>
                <div className="space-y-1 text-sm text-neutral-600">
                  {name && <p><span className="font-medium">Name:</span> {name}</p>}
                  {quantity && <p><span className="font-medium">Quantity:</span> {quantity}</p>}
                  {price && <p><span className="font-medium">Price:</span> ${price}</p>}
                  {ref && <p><span className="font-medium">Reference:</span> {ref}</p>}
                </div>
              </Card>
            )}

            {/* Changes indicator */}
            {hasChanges && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <p className="text-sm text-amber-800">
                  <span className="font-medium">Unsaved changes detected.</span> Click "Update Product" to save your changes.
                </p>
              </div>
            )}
          </form>
        )}
      </Modal>
    </>
  );
};

export default EditProduct;
