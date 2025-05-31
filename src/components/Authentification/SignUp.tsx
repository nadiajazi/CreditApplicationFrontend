import React, { useState } from "react";
import { UserIcon, LockClosedIcon, EnvelopeIcon, PhoneIcon, UserPlusIcon } from '@heroicons/react/24/outline';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input } from '../../design-system';

export default function SignUp() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [informations, setInformations] = useState({
    firstname: "",
    lastname: "",
    password: "",
    email: "",
    phone: "",
    role: "USER"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const inputValue = e.target.value;

    // Validation for name fields (only letters)
    if (type === "firstname" || type === "lastname") {
      const lettersOnlyRegex = /^[a-zA-Z\s]*$/;
      if (lettersOnlyRegex.test(inputValue) || inputValue === "") {
        setInformations((prev) => ({ ...prev, [type]: inputValue }));
      }
      return;
    }

    // Validation for phone (only numbers, max 8 digits)
    if (type === "phone") {
      const numericOnlyRegex = /^[0-9]*$/;
      if (numericOnlyRegex.test(inputValue) && inputValue.length <= 8) {
        setInformations((prev) => ({ ...prev, [type]: inputValue }));
      } else if (inputValue.length > 8) {
        toast.error("Phone number must be 8 digits or less");
      }
      return;
    }

    // Default handling for other fields
    setInformations((prev) => ({ ...prev, [type]: inputValue }));
  };


  const validateField = (field: string, fieldName: string) => {
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
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post("http://localhost:8882/api/v1/auth/register", {
        firstName: informations.firstname,
        lastName: informations.lastname,
        password: informations.password,
        email: informations.email,
        tel: informations.phone,
        role: informations.role
      });

      localStorage.setItem('email', res.data.email);
      toast.success("Account created successfully! Redirecting to login...");

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-accent-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="w-full max-w-4xl relative z-10">
        {/* Modern Card */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-hard border border-white/50 overflow-hidden transition-all duration-500 hover:shadow-glow-lg card-hover">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 p-8 text-center">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
              <UserPlusIcon className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
            <p className="text-white/80">Join us to start your credit management journey</p>
          </div>

          {/* Form Content */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <Input
                label="First Name"
                type="text"
                value={informations.firstname}
                onChange={(e) => handleChange(e, "firstname")}
                leftIcon={<UserIcon className="h-5 w-5" />}
                placeholder="Enter your first name"
                fullWidth
                variant="outlined"
              />

              {/* Last Name */}
              <Input
                label="Last Name"
                type="text"
                value={informations.lastname}
                onChange={(e) => handleChange(e, "lastname")}
                leftIcon={<UserIcon className="h-5 w-5" />}
                placeholder="Enter your last name"
                fullWidth
                variant="outlined"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {/* Email */}
              <Input
                label="Email Address"
                type="email"
                value={informations.email}
                onChange={(e) => handleChange(e, "email")}
                leftIcon={<EnvelopeIcon className="h-5 w-5" />}
                placeholder="Enter your email"
                fullWidth
                variant="outlined"
              />

              {/* Phone */}
              <Input
                label="Phone Number"
                type="tel"
                value={informations.phone}
                onChange={(e) => handleChange(e, "phone")}
                leftIcon={<PhoneIcon className="h-5 w-5" />}
                placeholder="Enter phone number"
                fullWidth
                variant="outlined"
                helperText="Maximum 8 digits"
              />
            </div>

            <div className="mt-6">
              {/* Password */}
              <Input
                label="Password"
                type="password"
                value={informations.password}
                onChange={(e) => handleChange(e, "password")}
                leftIcon={<LockClosedIcon className="h-5 w-5" />}
                placeholder="Create a strong password"
                fullWidth
                variant="outlined"
                helperText="Password should be at least 8 characters"
              />
            </div>

            {/* Submit Button */}
            <div className="mt-8">
              <Button
                onClick={sendToServer}
                disabled={isLoading}
                loading={isLoading}
                fullWidth
                size="lg"
                className="ripple"
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </div>

            {/* Divider */}
            <div className="relative mt-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-neutral-500">Or continue with</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="mt-6">
              <Button
                variant="outline"
                fullWidth
                className="flex items-center justify-center"
                leftIcon={
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                }
              >
                Continue with Google
              </Button>
            </div>

            {/* Sign In Link */}
            <div className="text-center mt-6">
              <p className="text-sm text-neutral-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-primary-600 hover:text-primary-700 transition-colors duration-300"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}