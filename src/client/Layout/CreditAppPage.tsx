import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// ... (import statements)

const CreditAppPage: React.FC = () => {
  const navigate = useNavigate();

  const [newMaxAmount, setNewMaxAmount] = useState<number | null>(null);
  const [montant, setMontant] = useState<number | null>(null);

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
        console.log(response.data);
        setNewMaxAmount(response.data);
      } catch (error) {
        console.error('Error fetching max amount:', error);
      }
    };

    fetchMaxAmount();
  }, []);
  useEffect(() => {
    const fetchMontant = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const userId = localStorage.getItem('id');

        const response = await axios.get(`http://localhost:8080/api/v1/user/montant/${userId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log(response.data);
        setMontant(response.data);
      } catch (error) {
        console.error('Error fetching max amount:', error);
      }
    };

    fetchMontant();
  }, []);

  
  const [totalCostPurchases, setTotalCostPurchases] = useState<number>(500);
  const storedName = localStorage.getItem('firstname');
  const storedId = localStorage.getItem('id');
  const [name, setName] = useState<string>(storedName !== null ? storedName : '');

  if (newMaxAmount === null) {
    // Loading state or handle it as appropriate
    return <div>Loading...</div>;
  }
   // Add a check for newMaxAmount
   const progressPercentage = newMaxAmount ? ((montant ?? 0) / Number(newMaxAmount)) * 100 : 0;

  // Add a check for newMaxAmount

  const colorScale = [
    { percentage: 0, color: 'limegreen' },
    { percentage: 50, color: 'green' },
    { percentage: 85, color: 'orange' },
    { percentage: 100, color: 'red' },
  ];

  const getColor = () => {
    for (const { percentage, color } of colorScale) {
      if (progressPercentage <= percentage) {
        return color;
      }
    }
    return 'red';
  };

  return (
    <div className="min-h-screen grid grid-cols-2 gap-4 items-center justify-center bg-gray-100 max-h-1500-px">
      <div className="pr-4">
        <p className="text-carribean font-semibold text-5xl pl-10 p-6">Welcome {name}</p>
        <p className="text-black text-2xl p-10 ">
          Welcome to the credit app! We're delighted to have you on board. Here's some essential information about your credit limit: manage your spending wisely and keep track of your total cost purchases.
        </p>
      </div>
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold mb-4 text-carribean">Credit Limit</h2>

        {/* Progress Widget */}
        <div className="mb-4">
          <p className="text-gray-700 mb-2">Your total cost purchases is :</p>
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-black " style={{ backgroundColor: getColor(), }}>
                  {`${montant} / ${newMaxAmount} DT`}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-teal-600" style={{ color: getColor(), }}>
                  {`${progressPercentage.toFixed(2)}%`}
                </span>
              </div>
            </div>
            <div
              className="flex h-2 mb-4 overflow-hidden text-xs rounded"
              style={{
                backgroundColor: "aliceblue"
              }}
            >
              <div
                style={{ width: `${progressPercentage}%`, backgroundColor: getColor() }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center"
              ></div>
            </div>
          </div>
        </div>

        {/* Add your content for the Credit App page */}
        <p className="text-gray-700 mb-4">
          You can update your limit by clicking down
        </p>

        {/* Add more content as needed */}

        {/* Example button */}
        <button
          className="bg-[#0077b6] text-gray-100 px-4 py-2  rounded-xl "
          onClick={() => {
            navigate('/user/editMax');
          }}
        >
          Change Limit Amount
        </button>
      </div>
    </div>
  );
};

export default CreditAppPage;