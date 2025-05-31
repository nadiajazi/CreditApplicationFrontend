import React, { ChangeEvent, useState, useEffect } from 'react';
import axios from 'axios';
import { XMarkIcon, CurrencyDollarIcon, CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface EditMaxProps {
  onClose: () => void;
}

const EditMax: React.FC<EditMaxProps> = ({ onClose }) => {
  const [newMaxAmount, setNewMaxAmount] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [currentAmount, setCurrentAmount] = useState('0');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const accessToken = localStorage.getItem('accessToken');
        const userId = localStorage.getItem('id');

        // Fetch max amount
        const maxAmountResponse = await axios.get(`http://localhost:8882/api/v1/user/maxAmount/${userId}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        // Fetch current amount
        const currentAmountResponse = await axios.get(`http://localhost:8882/api/v1/user/montant/${userId}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        setNewMaxAmount(maxAmountResponse.data.toString());
        setCurrentAmount(currentAmountResponse.data.toString());
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching credit data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewMaxAmount(event.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newMaxAmount || parseFloat(newMaxAmount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const accessToken = localStorage.getItem('accessToken');
      const userId = localStorage.getItem('id');

      await axios.put(
        `http://localhost:8882/api/v1/user/maxAmount/${userId}`,
        { maxAmount: parseFloat(newMaxAmount) },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setIsSuccess(true);
      localStorage.setItem('maxAmount', newMaxAmount);

      // Close modal after success
      setTimeout(() => {
        onClose();
      }, 2000);

    } catch (error) {
      console.error('Error updating max amount:', error);
      setError('Failed to update credit limit. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };


  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={handleOutsideClick}>
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden transform transition-all duration-300 scale-100 hover:scale-105">
        {/* Header */}
        <div className="bg-gradient-to-r from-moonstone to-carribean p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors duration-200"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-3">
            <div className="p-3 bg-white/20 rounded-full">
              <CurrencyDollarIcon className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Update Credit Limit</h2>
              <p className="text-blue-100 text-sm">Adjust your spending limit</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSuccess ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircleIcon className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Success!</h3>
              <p className="text-gray-600">Your credit limit has been updated successfully.</p>
            </div>
          ) : (
            <>
              {/* Current Status */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Current Status</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Current Limit</p>
                    <p className="text-lg font-bold text-carribean">${newMaxAmount || '0'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Used Amount</p>
                    <p className="text-lg font-bold text-orange-600">${currentAmount}</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Usage</span>
                    <span>{((parseFloat(currentAmount) / parseFloat(newMaxAmount || '1')) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-moonstone to-carribean h-2 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min((parseFloat(currentAmount) / parseFloat(newMaxAmount || '1')) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Credit Limit
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 text-lg">$</span>
                    </div>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-moonstone focus:border-transparent transition-all duration-300 text-lg font-semibold"
                      value={newMaxAmount}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      required
                    />
                  </div>
                  {parseFloat(newMaxAmount || '0') < parseFloat(currentAmount) && (
                    <div className="mt-2 flex items-center text-amber-600 text-sm">
                      <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
                      Warning: New limit is less than current usage
                    </div>
                  )}
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                    <div className="flex items-center text-red-700 text-sm">
                      <ExclamationTriangleIcon className="w-4 h-4 mr-2" />
                      {error}
                    </div>
                  </div>
                )}

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-gradient-to-r from-moonstone to-carribean text-white px-4 py-3 rounded-xl hover:from-carribean hover:to-moonstone transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Updating...
                      </div>
                    ) : (
                      'Update Limit'
                    )}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditMax;
