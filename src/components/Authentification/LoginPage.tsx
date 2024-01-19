import React from "react";
import login_IMAGE from '../../assets/login.png'
import {useState} from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { FaEye, FaEyeSlash} from "react-icons/fa";
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';


export default function LoginPage()  {
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
   if (role==="USER") {
    return setTimeout(() => {
      window.location.pathname =('/client/dashboard')
    }, 1500);
   } else if (role==="MANGER") {
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

    
    <div className="flex items-center justify-center h-screen" > 
      <ToastContainer /> {/* the ToastContainer at the top level */}
      
      {/* Image of the login page*/}
      <div className="flex flex-col items-center h-full bg-white " >
        <img src={login_IMAGE} alt="login_image" className="w-full h-full object-cover" />
      </div>

      <div className="w-1/2 h-full bg-[#f5f5f5]   flex flex-col p-20 justify-between items-center">
        <div className="w-full flex flex-col  ">

          <div className="w-full flex flex-col mb-2" >
            <h3 className="text-2xl font-semibold mb-2 " >Login</h3>
            <p className="text-base mb-2"> Welcome back |Please enter your details</p>
          </div>
          
          {/* fill the form */}
          <div className=" w-full flex flex-col">

            {/* email input */}
            <div className="relative z-0 w-full mb-4 mt-6 group">
              <input
                value={informations.email?informations.email:""}
                onChange={(e)=>handleChange(e,"email")}
                type="email"
                name="floating_email"
                id="floating_email" 
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email address
              </label>
            </div>

            {/* passoword input */}
            <div className="relative z-0 w-full mb-3 group">
              <input
                value={informations.password ? informations.password : ""}
                onChange={(e) => handleChange(e, "password")}
                type={showPassword ? "text" : "password"}
                name="floating_password"
                id="floating_password"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_password"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Password
              </label>
              {/* button to show the hidden password */}
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-1 top-2  "
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          
          {/* forgot password ? */}

          <div className="w-full flex items-center justify-between mb-5">
            <p className="text-sm font-meduim whitespace-nowrap cursor-pointer underline underline-offset-2">Forgot Password?</p>
          </div>

          {/* button login */}

          <button 
            onClick={handleClick}
            type="submit"
            className=" px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
            Login
          </button>

        </div>
        {/* navigate to the sign up page */}

        <div className="w-full flex items-center  mb-10">
          <span className="text-[#060606] text-sm">Don't have an account? </span>
            <Link to="/signup" className="text-blue-600 underline underline-offset hover:text-blue-700 text-sm font-semibold">
              Sign Up.
            </Link>
        </div>
      </div>
    </div>
  
  ); 
};