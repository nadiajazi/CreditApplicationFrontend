import React from "react";
import COVER_IMAGE from '../../assets/Idea_1.jpg'
import Google from '../../assets/Google-removebg-preview.png'
import { useNavigate } from 'react-router-dom';
import {useState} from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { FaEye, FaEyeSlash, FaPhoneAlt } from "react-icons/fa";

import 'react-toastify/dist/ReactToastify.css';


export default function LoginPage()  {
  const navigate = useNavigate();



const handleGetSigninClick = () => {
  navigate('/signup');
};
const [informations, setInformations] = useState({
  password: null,
  email: null,
}),

[error, setError] = useState(null);
const handleChange = (e:any, type:string) => {
  setInformations((prev) => {
    return { ...prev, [type]: e.target.value };
  });
};


const [showPassword, setShowPassword] = useState(false);

const togglePasswordVisibility = () => {
  setShowPassword(!showPassword);
};
const redirectUser =(role: any)=>{
   if (role=="USER") {
    return setTimeout(() => {
      window.location.pathname =('/client/dashboard')
    }, 1500);
    
   } else if (role=="MANGER") {

    
   } else {
    
   
    return setTimeout(() => {
      window.location.pathname =('/admin')
    }, 1500);
    
   }
  
 }


 const validateField = (field: string | null, fieldName: string) => {
  if (field === null || field === "") {
    return `Please fill in the ${fieldName} field`;
  }
  return null; // No error
};

 const sendToServer = async () => {
  const errors: string[] = [];

  const emailError = validateField(informations.email, "Email");
  const passwordError = validateField(informations.password, "Password");

  if (emailError) errors.push(emailError);
  if (passwordError) errors.push(passwordError);

  if (errors.length > 0) {
    errors.forEach((error) => toast.error(error));
  } else {
    try {
      const response = await axios.post("http://localhost:8080/api/v1/auth/authenticate", {
        password: informations.password,
        email: informations.email
      });

      const { data } = response;

      console.log(data);

      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('firstname', data.firstName);
      localStorage.setItem('id', data.id);
      console.log('id', data.id);
      localStorage.setItem('maxAmount', data.montant);



      toast.success("Success");
      
      redirectUser(data.role);
    } catch (error) {
      console.error(error);
      toast.error("Error");
    }
  }
};

const handleClick = () => {
  sendToServer();
};


  return (

    
    <div className="w-full h-screen flex items-start" > 
            <ToastContainer />

    <div className="relative w-1/2 h-full flex flex-col" >
   
      <img src={COVER_IMAGE} className="w-full h-full object-cover" />
    </div>
    <div className="w-1/2 h-full bg-[#f5f5f5]  max-w-[500px bg-[#f5f5f5f5]] flex flex-col p-20 justify-between items-center  " >
     
     
     <div className="w-full flex flex-col  ">
      <div className="w-full flex flex-col mb-2" >
        <h3 className="text-2xl font-semibold mb-2 " >Login</h3>
        <p className="text-base mb-2"> Welcome back |Please entrer your details</p>
      </div>
      <div className=" w-full flex flex-col">
        <input
          value={informations.email?informations.email:""}
          onChange={(e)=>handleChange(e,"email")}
         type="email" 
        placeholder="Email"
        className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
        />
        <div className="relative">
    <input
      value={informations.password ? informations.password : ""}
      onChange={(e) => handleChange(e, "password")}
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
      <div className="w-full flex items-center justify-between">
        <div className="w-full flex iteams-center">
        </div>


        <p className="text-sm font-meduim whitespace-nowrap cursor-pointer underline underline-offset-2">Forgot Passwoed</p>
      </div>

      <div className="w-full flex flex-col space-y-3 items-center mx-auto">
  <button 
  onClick={handleClick}
  
  className="w-1/4 bg-[#036FE6] h-8 text-white font-semibold border-2 border-black rounded-md py my-2 text-center flex items-center justify-center">
    Login
  </button>

  <button className="w-1/4 bg-[#E3E5E6] h-8 text-[#060606] font-semibold border-2 border-black rounded-md py my-2 text-center flex items-center justify-center" onClick={handleGetSigninClick}>
    Sign Up
  </button>
</div>

      <div className="w-full flex items-center justify-center relative py-2 space-y-4 ">
        
        <p className="text-lg absolute  text-black/80 bg-[#f5f5f5f] ">or</p>
      </div>
     
     <div className="space-y-4"> 
      <button className=" mx-auto items-center w-1/10 text-[060606] my-2 font-semibold bg-[#036FE6] border -1 border-black rounded-md p-4 text-center flex items-center h-12 justify-center ">
  Sign In with Google
  <img src={Google} className="h-8 mr-3" />

        </button>
        </div>
 
      </div>
      <div className="w-full flex items-center justifey-center">
        <p className="text-sm font-normal text-[#060606]"> Don't have an account? <span className="font-semibold underline underline-offset"></span></p>
      </div>
      </div>


    </div>
    
    
    



  );

  
};