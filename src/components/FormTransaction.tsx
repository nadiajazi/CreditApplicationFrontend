import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useTransactionStore } from '../stores/useTransactionStore';
import { useProductStore } from '../stores/useProductStore';
import { useNavigate } from 'react-router-dom';
import { fetchPriceFromDatabase } from '../services/FetchPriceFromDataBase';
import { fetchImageFromDatabase } from '../services/FetchImageFromDataBase';
import AdminSideBar from './AdminSideBar';
import { Input, Button, Card } from '../design-system';
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  PlusIcon,
  MinusIcon,
  TrashIcon,
  PhotoIcon,
  CheckCircleIcon,
  XMarkIcon,
  ArrowLeftIcon,
  ShoppingBagIcon
} from '@heroicons/react/24/outline';




interface TransactionProps {
  clientId: number;
}

const FormTransaction: React.FC<TransactionProps> = ({ clientId }) => {
  // Sidebar state
  const [open, setOpen] = useState(true);

  // Product search state
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [showProductDropdown, setShowProductDropdown] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  // Transaction state
  const [name, setname] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [purchases, setPurchases] = useState<Array<any>>([]);

  // Store hooks
  const addPurchase = useTransactionStore((state) => state.addPurchase);
  const fetchAdminPurchases = useTransactionStore((state) => state.fetchAdminPurchases);
  const { products, fetchData: fetchProducts } = useProductStore();

  const navigate = useNavigate();

  useEffect(() => {
    fetchAdminPurchases();
    fetchProducts();
  }, [fetchAdminPurchases, fetchProducts, clientId]);

  // Debounce search query
  useEffect(() => {
    setIsSearching(true);
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Filter products based on search
  const filteredProducts = useMemo(() => {
    if (!debouncedSearchQuery || !products) return [];

    const searchTerm = debouncedSearchQuery.toLowerCase();
    return products.filter(product =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.id.toString().includes(searchTerm) ||
      product.price.toString().includes(searchTerm)
    ).slice(0, 5); // Limit to 5 results for dropdown
  }, [products, debouncedSearchQuery]);

  // Handle product search
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowProductDropdown(value.length > 0);
  }, []);

  // Handle product selection from dropdown
  const handleProductSelect = useCallback((product: any) => {
    setSelectedProduct(product);
    setname(product.name);
    setSearchQuery(product.name);
    setShowProductDropdown(false);
  }, []);

  // Handle manual product name change
  const handleProductNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setname(e.target.value);
    setSelectedProduct(null);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(parseInt(e.target.value, 10) || 1);
  };

  const handleAddItem = async () => {
    if (!name.trim()) return;

    const price = selectedProduct ? selectedProduct.price : await fetchPriceFromDatabase(name);
    const images = selectedProduct ? selectedProduct.images : await fetchImageFromDatabase(name);
    const newPurchase = {
      name,
      quantity,
      total: quantity * price,
      price,
      images,
      productId: selectedProduct?.id || null
    };
    setPurchases([...purchases, newPurchase]);
    setname('');
    setQuantity(1);
    setSearchQuery('');
    setSelectedProduct(null);
    setShowProductDropdown(false);
  };

  const handleDeleteItem = (index: number) => {
    const updatedPurchases = [...purchases];
    updatedPurchases.splice(index, 1);
    setPurchases(updatedPurchases);
  };

  const updateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    const updatedPurchases = [...purchases];
    updatedPurchases[index].quantity = newQuantity;
    updatedPurchases[index].total = newQuantity * updatedPurchases[index].price;
    setPurchases(updatedPurchases);
  };

  const handleSavePurchases = async () => {
    const iduser = localStorage.getItem('id2');
    
    for (const purchase of purchases) {
      await addPurchase(purchase.name, purchase.quantity, Number(iduser));
    }

    await fetchAdminPurchases();
    setPurchases([]);
    navigate(`/admin/clients`);
  };

  const handleClose = () => {
    navigate(`/admin/clients`);
  };
  const calculateTotalAmount = () => {
    return purchases.reduce((total, purchase) => total + purchase.total, 0).toFixed(2);
  };

  return (
    <section className="flex gap-6 min-h-screen bg-gray-50">
      {/* Admin Sidebar */}
      <AdminSideBar open={open} toggleSidebar={() => setOpen(!open)} />

      <div className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/admin/clients')}
                leftIcon={<ArrowLeftIcon className="w-4 h-4" />}
              >
                Back to Clients
              </Button>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Transaction</h1>
            <p className="text-gray-600">Add products to create a new transaction for the client</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Product Search & Add */}
            <div className="space-y-6">
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <ShoppingBagIcon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Add Products</h2>
                    <p className="text-sm text-gray-600">Search and add products to the transaction</p>
                  </div>
                </div>

                <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                  {/* Live Product Search */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Search Products
                    </label>
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="Search by product name, ID, or price..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        leftIcon={<MagnifyingGlassIcon className="w-5 h-5" />}
                        rightIcon={isSearching ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                        ) : null}
                        fullWidth
                        variant="outlined"
                      />

                      {/* Product Dropdown */}
                      {showProductDropdown && filteredProducts.length > 0 && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                          {filteredProducts.map((product) => (
                            <div
                              key={product.id}
                              onClick={() => handleProductSelect(product)}
                              className="flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                            >
                              <img
                                src={product.images}
                                alt={product.name}
                                className="w-12 h-12 rounded-lg object-cover mr-3"
                              />
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-900">{product.name}</h4>
                                <p className="text-sm text-gray-500">ID: {product.id}</p>
                                <p className="text-sm font-semibold text-green-600">${product.price}</p>
                              </div>
                              <div className="text-xs text-gray-400">
                                Stock: {product.quantity}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Manual Product Name Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Name
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter product name manually"
                      value={name}
                      onChange={handleProductNameChange}
                      leftIcon={<PhotoIcon className="w-5 h-5" />}
                      fullWidth
                      variant="outlined"
                    />
                  </div>

                  {/* Quantity Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quantity
                    </label>
                    <Input
                      type="number"
                      placeholder="Enter quantity"
                      value={quantity}
                      onChange={handleQuantityChange}
                      min="1"
                      leftIcon={<ShoppingCartIcon className="w-5 h-5" />}
                      fullWidth
                      variant="outlined"
                    />
                  </div>

                  {/* Selected Product Preview */}
                  {selectedProduct && (
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center gap-3">
                        <img
                          src={selectedProduct.images}
                          alt={selectedProduct.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{selectedProduct.name}</h4>
                          <p className="text-sm text-gray-600">Price: ${selectedProduct.price}</p>
                          <p className="text-sm text-gray-600">Available: {selectedProduct.quantity}</p>
                        </div>
                        <CheckCircleIcon className="w-6 h-6 text-green-500" />
                      </div>
                    </div>
                  )}

                  {/* Add Button */}
                  <Button
                    onClick={handleAddItem}
                    disabled={!name.trim() || quantity < 1}
                    variant="primary"
                    size="lg"
                    fullWidth
                    leftIcon={<PlusIcon className="w-5 h-5" />}
                  >
                    Add to Transaction
                  </Button>
                </form>
              </Card>
            </div>

            {/* Right Column - Purchase Cart */}
            <div className="space-y-6">
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <ShoppingCartIcon className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Transaction Cart</h2>
                    <p className="text-sm text-gray-600">{purchases.length} item(s) added</p>
                  </div>
                </div>

                {/* Purchase List */}
                {purchases.length > 0 ? (
                  <div className="space-y-4">
                    {purchases.map((purchase, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-4">
                          {purchase.images && (
                            <img
                              src={purchase.images}
                              alt={purchase.name}
                              className="w-16 h-16 rounded-lg object-cover"
                            />
                          )}
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{purchase.name}</h4>
                            <p className="text-sm text-gray-600">Price: ${purchase.price}</p>
                            <p className="text-sm text-gray-600">Subtotal: ${purchase.total.toFixed(2)}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(index, purchase.quantity - 1)}
                              disabled={purchase.quantity <= 1}
                            >
                              <MinusIcon className="w-4 h-4" />
                            </Button>
                            <span className="w-8 text-center font-medium">{purchase.quantity}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(index, purchase.quantity + 1)}
                            >
                              <PlusIcon className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteItem(index)}
                              className="ml-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <TrashIcon className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Total Section */}
                    <div className="border-t border-gray-200 pt-4 mt-6">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-lg font-semibold text-gray-900">Total Amount:</span>
                        <span className="text-2xl font-bold text-green-600">${calculateTotalAmount()}</span>
                      </div>

                      {/* Action Buttons */}
                      <div className="space-y-3">
                        <Button
                          onClick={handleSavePurchases}
                          variant="primary"
                          size="lg"
                          fullWidth
                          leftIcon={<CheckCircleIcon className="w-5 h-5" />}
                        >
                          Save Transaction
                        </Button>
                        <Button
                          onClick={handleClose}
                          variant="outline"
                          size="lg"
                          fullWidth
                          leftIcon={<XMarkIcon className="w-5 h-5" />}
                        >
                          Cancel & Close
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <ShoppingCartIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Cart is Empty</h3>
                    <p className="text-gray-600">Add products to start building the transaction</p>
                  </div>
                )}
              </Card>

              {/* Transaction Summary */}
              {purchases.length > 0 && (
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Transaction Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Items:</span>
                      <span className="font-medium">{purchases.length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Total Quantity:</span>
                      <span className="font-medium">{purchases.reduce((sum, p) => sum + p.quantity, 0)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="font-medium">${calculateTotalAmount()}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-2 mt-2">
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-900">Total:</span>
                        <span className="font-bold text-lg text-green-600">${calculateTotalAmount()}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormTransaction;
