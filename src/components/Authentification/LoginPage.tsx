import React from "react";
import COVER_IMAGE from '../../assets/Idea_1.jpg'
import Google from '../../assets/Google-removebg-preview.png'
import { useNavigate } from 'react-router-dom';
import {useState} from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

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

const redirectUser =()=>{
   return setTimeout(() => {
     window.location.pathname =('/Dashboard')
   }, 5000);
  
 }
const sendToServer = async()=>{
  await axios.post("http://localhost:8080/api/v1/auth/authenticate",{
    password:informations.password,
    email:informations.email
  }).then((res)=>{
console.log(res.data)
localStorage.setItem('accesToken',res.data.accessToken )
localStorage.setItem('refreshToken',res.data.refreshToken )

toast.success("succed")
return redirectUser()
  }).catch((err)=>{
    console.log(err)
toast.error("erreur ")
   })
}
const handleClick=()=>{
  sendToServer()

}

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
          <input
           value={informations.password?informations.password:""}
           onChange={(e)=>handleChange(e,"password")}
         type="password" 
        placeholder="Password"
        className="w-full text-black py-4 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
        />
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
    
    
    



  )

  
}