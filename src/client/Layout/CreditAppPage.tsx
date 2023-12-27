import React, { useState } from 'react';

const CreditAppPage: React.FC = () => {
  // Assume the user's credit limit is $1000
  const creditLimit = 1000;

  // Example state for user's total cost purchases
  const [totalCostPurchases, setTotalCostPurchases] = useState<number>(500);

  const storedName = localStorage.getItem('firstname');
  const [name, setName] = useState(storedName !== null ? storedName : '');
  
  // ... rest of your component code
  

  // Calculate the progress percentage
  const progressPercentage = (totalCostPurchases / creditLimit) * 100;

  // Define a color scale
  const colorScale = [
    { percentage: 0, color: 'limegreen' },
    { percentage: 50, color: 'green' },
    { percentage: 85, color: 'orange' },
    { percentage: 100, color: 'red' },
  ];

  // Find the color based on the progress percentage
  const getColor = () => {
    for (const { percentage, color } of colorScale) {
      if (progressPercentage <= percentage) {
        return color;
      }
    }
    return 'red'; // Default color if percentage exceeds the defined scale
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
                  {`${totalCostPurchases} / ${creditLimit} DT`}
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
          className="bg-orange text-carribean px-4 py-2 rounded-xl "
          onClick={() => {
            // Add logic to update totalCostPurchases
            setTotalCostPurchases(970.5);
          }}
        >
          Change Limit Amount
        </button>
      </div>
    </div>
  );
};

export default CreditAppPage;


