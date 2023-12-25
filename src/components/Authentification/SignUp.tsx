import React, { useState, ChangeEvent } from "react";
import COVER_IMAGE from "../../assets/Idea_1.jpg";
import { FaEye, FaEyeSlash, FaPhoneAlt } from "react-icons/fa";
import { IoCard } from "react-icons/io5";
import { HiOutlineMail } from "react-icons/hi";

import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const navigate = useNavigate();

  const handleGetverifyClick = () => {
    navigate('/verify-email');
  };
  

  
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [customAddress, setCustomAddress] = useState<string>("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleCityChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(event.target.value);
  };

  const handleCustomAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCustomAddress(event.target.value);
  };

  return (
    <div className="w-full h-screen flex items-start">
      <div className="relative w-1/2 h-full flex flex-col">
        <img src={COVER_IMAGE} className="w-full h-full object-cover" />
      </div>
      <div className="w-1/2 h-full bg-[#f5f5f5]  max-w-[500px bg-[#f5f5f5f5]] flex flex-col p-20 justify-between items-center">
        <div className="w-full flex flex-col">
          <div className="w-full flex flex-col mb-2" >
            <h3 className="text-2xl font-semibold mb-2 " >SignUp</h3>
            <p className="text-base mb-2"> Welcome back |Please entrer your informations</p>
          </div>

          <div className="relative w-full">
            <span className="absolute right-0 top-2 text-2xl">          <IoCard />
            </span>
            <input
              type="text"
              placeholder="First Name"
              className=" w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
            />
          </div>
          <div className="relative w-full">
            <span className="absolute right-0 top-2 text-2xl">          <IoCard />
            </span>
            <input
              type="text"
              placeholder="Last Name"
              className=" w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
            />
          </div>


          <div>
            <select
              value={selectedCity}
              onChange={handleCityChange}
              className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
            >
              <option value="" disabled>Select an Address</option>
              <option value="city1">Bir Challouf</option>
              <option value="city2">Dar Chabane</option>
              <option value="city3">Marezga</option>
              <option value="city4">Nabeul</option>
              <option value="other">Other</option>
            </select>

            {selectedCity === "other" && (
              <input
                type="text"
                placeholder="Enter Custom Address"
                value={customAddress}
                onChange={handleCustomAddressChange}
                className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
              />
            )}
          </div>

          <div className="relative w-full">
            <span className="absolute right-0 top-2 text-2xl">                    <HiOutlineMail />
            </span>
            <input
              type="email"
              placeholder="Email"
              className=" w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
            />
          </div>
          <div className="relative w-full">
            <span className="absolute right-0 top-2 text-2xl"><FaPhoneAlt /> </span>
            <input
              type="text"
              placeholder="Phone Number"
              className=" w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
            />
          </div>

          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full text-black py-4 my-2 bg-transparent border-b border-black outline-none focus:outline-none pr-8"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-0 top-0 mt-7 mr-2"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="relative w-full">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="off"
              className="w-full text-black py-4 my-2 bg-transparent border-b border-black outline-none focus:outline-none pr-8"
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute right-0 top-0 mt-7 mr-2"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <div className="w-full flex flex-col space-y-3 items-center mx-auto">
          <button className="w-1/4 bg-[#036FE6] h-8 text-[#060606] font-semibold border-2 border-black rounded-md py my-2 text-center flex items-center justify-center"
          onClick={handleGetverifyClick}
          >
                 Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
