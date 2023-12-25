import React from 'react';
import illustration from "../assets/illustration.jpg";
import { useNavigate } from 'react-router-dom';


const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {

    navigate('/login');


  };
  return (
    <div className="flex flex-col md:flex-row justify-center items-center h-screen">
      <div className="md:w-1/2 p-8 flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold mb-4 text-center md:text-left">Welcome to Our Application!</h1>
        <p className="text-lg mb-6 text-center md:text-left">
          Take control of your credit purchases with our user-friendly application.
          Easily manage and monitor your credit transactions, empowering you to make informed financial decisions.
        </p>
        <button 
          onClick={handleGetStartedClick}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Get Started
        </button>
      </div>
      <div className="md:w-1/2 mb-4 md:mb-0">
        <img src={illustration} alt="Illustration" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default LandingPage;

