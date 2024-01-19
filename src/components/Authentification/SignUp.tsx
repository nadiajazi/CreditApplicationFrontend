import React, { useState, ChangeEvent } from "react";
import COVER_IMAGE from "../../assets/Payment.png";
import { FaEye, FaEyeSlash, FaPhoneAlt } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import Google from '../../assets/Google-removebg-preview.png'
import 'react-toastify/dist/ReactToastify.css';
import { FaUser } from "react-icons/fa";
import { Link } from 'react-router-dom';

export default function SignUp() {
 


  const [informations, setInformations] = useState({
    firstname: null,
    lastname: null,
    password: null,
    email: null,
    phone: null,
    role: "USER"

  }),
    [error, setError] = useState(null);
  const handleChange1 = (e: any, type: string) => {
    const inputValue = e.target.value;

    // Regular expression to match only letters (no numbers or symbols)
    const lettersOnlyRegex = /^[a-zA-Z]+$/;

    // Check if the input value contains only letters
    if (lettersOnlyRegex.test(inputValue) || inputValue === "") {
      setInformations((prev) => {
        return { ...prev, [type]: inputValue };
      });
    }
  };
  const [inputError, setInputError] = useState<string | null>(null);

  const handleChange2 = (e: any, type: string) => {
    const inputValue = e.target.value;

    // Regular expression to match numeric digits
    const numericOnlyRegex = /^[0-9]*$/;

    if (numericOnlyRegex.test(inputValue) && inputValue.length <= 8) {
      // If the input is a digit and total digits are 8 or less, update the state
      setInformations((prev) => {
        return { ...prev, [type]: inputValue };
      });

      if (inputValue.length === 8) {
        // If exactly 8 digits are entered, you can perform additional actions here if needed
      }
    } else {
      // If the input is not a digit or more than 8 digits, display a toast message
      toast.error("Please enter up to 8 digits for the phone number");
    }
  };



  // Check the password validation


  const handleChange = (e: any, type: string) => {
    setInformations((prev) => {
      return { ...prev, [type]: e.target.value };
    });
  };


  const redirectUser = () => {
    return setTimeout(() => {
      window.location.pathname = ('/login')
    }, 2000);

  }
  const validateField = (field: string | null, fieldName: string) => {
    if (field === null || field === "") {
      return `Please fill in the ${fieldName} field`;
    }
    return null; // No error
  };

  const sendToServer = async () => {
    const errors: string[] = [];

    // Validate each field
    const firstnameError = validateField(informations.firstname, "First Name");
    const lastnameError = validateField(informations.lastname, "Last Name");
    const emailError = validateField(informations.email, "Email");
    const passwordError = validateField(informations.password, "Password");
    const phoneError = validateField(informations.phone, "Phone Number");

    // Collect errors
    if (firstnameError) errors.push(firstnameError);
    if (lastnameError) errors.push(lastnameError);
    if (emailError) errors.push(emailError);
    if (passwordError) errors.push(passwordError);
    if (phoneError) errors.push(phoneError);

    // Display errors in toast messages
    if (errors.length > 0) {
      errors.forEach((error) => toast.error(error));
    } else {
      // Proceed with server request
      try {
        const res = await axios.post("http://localhost:8080/api/v1/auth/register", {
          firstName: informations.firstname,
          lastName: informations.lastname,
          password: informations.password,
          email: informations.email,
          tel: informations.phone,
          role: informations.role

        });

        toast.success("Success");
        return redirectUser();
      } catch (err) {
        console.log(err);
        toast.error("Error");
      }
    }
  };


  const handleClick = () => {
    sendToServer()

  }


  const [customAddress, setCustomAddress] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };


  const handleCustomAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCustomAddress(event.target.value);
  };


  return (
    <div className="flex items-center justify-center h-screen bg-blue-100">
      <ToastContainer /> 
      <div className="rounded-lg shadow-lg border flex bg-white relative ">

        {/* signup image */}
        <div className=" flex flex-col items-center h-[490px] bg-white  ">
        <img src={COVER_IMAGE} alt="cover_image" className="w-full h-full object-cover" />
        </div> 

        
        <div className="static p-8 max-h-screen items-center justify-start bg-blue-100 ">
          <div className="max-w-md mx-auto">
            {/* header of the signup form */}
            <div className="w-full flex flex-col mb-2" >
              <h2 className="text-2xl font-bold text-center mb-2">Welcome|Sign Up</h2>
              <p className="text-left">Let's ensure you have everything in order to proceed with your credit application and initiate the setup for your first credit account!</p>
            </div>

          {/* firstname & lastname */}
          <div className="grid md:grid-cols-2 md:gap-6">
          {/* firstname */}
            <div className="relative z-0 w-full mb-5 group">
              <span className="absolute right-0 top-3 text-1xl"><FaUser /></span>
              <input
                value={informations.firstname ? informations.firstname : ""}
                onChange={(e) => handleChange1(e, "firstname")}
                type="text"
                placeholder=" "
                required
                name="floating_first_name"
                id="floating_first_name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
              <label
                htmlFor="floating_first_name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                First name
              </label>
            </div>

          {/*LastName */}
            <div className="relative z-0 w-full mb-5 group">
              <span className="absolute right-0 top-3 text-1xl"><FaUser /></span>
              <input
                value={informations.lastname ? informations.lastname : ""}
                onChange={(e) => handleChange1(e, "lastname")}
                type="text"
                name="floating_last_name"
                id="floating_last_name"
                placeholder=" "
                required
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
              <label
                htmlFor="floating_last_name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Last name
              </label>
          </div>
        </div>

          {/* phonenumber */}
          <div className="relative z-0 w-full mb-5 group">
            <span className="absolute right-1 top-3 text-1xl"><FaPhoneAlt /> </span>
            <input
              type="tel"
              value={informations.phone ? informations.phone : ""}
              onChange={(e) => handleChange2(e, "phone")}
              name="floating_phone"
              id="floating_phone"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required            />
              <label
                htmlFor="floating_phone"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Phone number
              </label>
          </div>

          {/* email */}
          <div className="relative z-0 w-full mb-5 group">
            <span className="absolute right-0 top-2 text-2xl"><HiOutlineMail /></span>
            <input
              type="email"
              name="floating_email"
              id="floating_email"
              value={informations.email ? informations.email : ""}
              onChange={(e) => handleChange(e, "email")}
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

          {/* password */}
          <div className="relative z-0 w-full mb-5 group">
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
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-1 top-2  "
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="grid md:grid-cols-2 md:gap-6">
           {/* signupButton */}

            <button 
              type="submit"
              onClick={handleClick}
              className=" px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Create an account
            </button>
              {/* back to page login */}
              <div className="text-center mt-2">
                <span className="text-gray-600 text-sm">Already have an account?</span>
                  <Link to="/login" className="text-blue-600 hover:text-blue-700 text-sm font-semibold">
                    Log in.
                  </Link>
              </div>
          </div>
        </div>

            {/* signup with google */}
          <div className="flex items-center mt-2 mb-2 justify-center space-x-4">
            <hr className="flex-grow border-t border-gray-300" />
              <span className="text-gray-500">Or</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>
          <div className="space-y-4"> 
            <button className=" mx-auto items-center w-1/10  my-2  text-black bg-blue-100 rounded-md border -1 border-black  hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-300  p-4 text-center flex  h-12 justify-center ">
                Sign up with Google
              <img src={Google} alt="google_image" className="h-8 mr-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}