import React, { useState, ChangeEvent } from "react";
import COVER_IMAGE from "../../assets/Idea_1.jpg";
import { FaEye, FaEyeSlash, FaPhoneAlt } from "react-icons/fa";
import { IoCard } from "react-icons/io5";
import { HiOutlineMail } from "react-icons/hi";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignUp() {
  const navigate = useNavigate();

  
  const [informations, setInformations] = useState({
    firstname:null,
    lastname:null,
    password: null,
    email: null,
    phone:null,
  }),
  [error, setError] = useState(null);
  const handleChange = (e:any, type:string) => {
    setInformations((prev) => {
      return { ...prev, [type]: e.target.value };
    });
  };

  const redirectUser =()=>{
    return setTimeout(() => {
      window.location.pathname =('/verify-email')
    }, 5000);
   
  }
  const sendToServer = async()=>{
    await axios.post("http://localhost:8080/api/v1/auth/register",{
    firstname:informations.firstname,
    lastname:informations.lastname,  
    password:informations.password,
      email:informations.email,
      phone:informations.phone

    }).then((res)=>{
      toast.success("succed")
      return redirectUser()

  console.log(res.data)
    }).catch((err)=>{
      console.log(err)
      toast.error("erreur ")

     })
  }
  const handleClick=()=>{
    sendToServer()
  
  }
  
  {/*    pour le mot passe at le cas other dans la liste d'addrese*/ }
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
  {/* termine ici  */ }

  return (
    <div className="w-full h-screen flex items-start">
                  <ToastContainer />

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
              value={informations.firstname?informations.firstname:""}
              onChange={(e)=>handleChange(e,"firstname")}
              type="text"
              placeholder="First Name"
              className=" w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
            />
          </div>
          <div className="relative w-full">
            <span className="absolute right-0 top-2 text-2xl">          <IoCard />
            </span>
            <input
              value={informations.lastname?informations.lastname:""}
              onChange={(e)=>handleChange(e,"lastname")}
              type="text"
              placeholder="Last Name"
              className=" w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
            />
          </div>


       

          <div className="relative w-full">
            <span className="absolute right-0 top-2 text-2xl">                    <HiOutlineMail />
            </span>
            <input
              value={informations.email?informations.email:""}
              onChange={(e)=>handleChange(e,"email")}
              type="email"
              placeholder="Email"
              className=" w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
            />
          </div>
          <div className="relative w-full">
            <span className="absolute right-0 top-2 text-2xl"><FaPhoneAlt /> </span>
            <input
             value={informations.phone?informations.phone:""}

               onChange={(e)=>handleChange(e,"phone")}

              type="text"
              placeholder="Phone Number"
              className=" w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
            />
          </div>

          <div className="relative w-full">
            <input
              value={informations.password?informations.password:""}
              onChange={(e)=>handleChange(e,"password")}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              
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
         
        </div>

        <div className="w-full flex flex-col space-y-3 items-center mx-auto">
          <button className="w-1/4 bg-[#036FE6] h-8 text-[#060606] font-semibold border-2 border-black rounded-md py my-2 text-center flex items-center justify-center"
          onClick={ handleClick}
          >
                 Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
