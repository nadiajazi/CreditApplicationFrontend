import React, { ChangeEvent,useState, useEffect } from 'react';
import axios from 'axios';

interface EditMaxProps {
  onClose: () => void;
}

const EditMax: React.FC<EditMaxProps> = ({ onClose }) => {
  const [newMaxAmount, setNewMaxAmount] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMaxAmount = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const userId = localStorage.getItem('id');

        const response = await axios.get(`http://localhost:8080/api/v1/user/maxAmount/${userId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setNewMaxAmount(response.data.maxAmount);
      } catch (error) {
        console.error('Error fetching max amount:', error);
        setError('Error fetching max amount');
      }
    };

    fetchMaxAmount();
  }, []);
  
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewMaxAmount(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const userId = localStorage.getItem('id');

      await axios.put(
        `http://localhost:8080/api/v1/user/maxAmount/${userId}`,
        { maxAmount: newMaxAmount },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setError(null);
      console.log('Max Amount updated successfully');
      
      
    } catch (error) {
      console.error('Error updating max amount:', error);
      setError('Error updating max amount');
    }
  };

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    onClose();
  };
  

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-30 flex items-center justify-center"
        onClick={handleOutsideClick}>
    <div className="bg-white p-8 rounded-lg w-96">
      <h2 className="text-2xl font-semibold mb-4 text-black">Update Credit Limit</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">New Credit Limit:</label>
          <input
            type="number"
            className="mt-1 p-2 border rounded w-full"
            value={newMaxAmount ?? ''}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            className="bg-gray-300 text-gray-800 px-4 py-2 mr-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            
            type="submit"
            className="bg-[#0077b6] text-gray-100 px-4 py-2 rounded"
          >
            Update
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default EditMax;
