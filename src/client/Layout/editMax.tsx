import React, { ChangeEvent, useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

export default function EditMax() {


  const navigate = useNavigate();
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

      setError(null); // Reset the error state if the update is successful
      console.log('Max Amount updated successfully');
      navigate(`/client/dashboard`)
      
    } catch (error) {
      console.error('Error updating max amount:', error);
      setError('Error updating max amount');
    }
  };

  return (
    <div className="flex flex-col items-center mt-20">
      <input
        type="number"
        placeholder="Enter new maximum amount"
        value={newMaxAmount}
        onChange={handleInputChange}
        className="w-64 px-4 py-2 mb-4 text-xl border rounded"
      />
      <button
        onClick={handleSubmit}
        
        className="bg-green-500 text-white px-4 py-2 border-none rounded cursor-pointer text-xl"
      >
        Submit
      </button>

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
