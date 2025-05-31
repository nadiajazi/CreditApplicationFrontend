import React, { useState, useEffect, ChangeEvent } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import COVER_IMAGE from '../../assets/Payment.png';

interface EmailVerificationProps {}

const EmailVerification: React.FC<EmailVerificationProps> = () => {
  const navigate = useNavigate();
  const [verificationCodes, setVerificationCodes] = useState(['', '', '', '', '', '']);
  const storedEmail = localStorage.getItem('email');
  const [email, setEmail] = useState<string>(storedEmail !== null ? storedEmail : '');

  const handleCodeChange = (index: number, value: string) => {
    const updatedCodes = [...verificationCodes];
    updatedCodes[index] = value;
    setVerificationCodes(updatedCodes);
  };

  // const handleVerifyClick = () => {
  //   const verificationCode = verificationCodes.join('');

  //   axios.post('http://localhost:8882/api/v1/auth/verify-registration', { email: email, confirmationCode: verificationCode })
  //     .then((response: AxiosResponse) => {
  //       console.log('Verification success:', response.data);
  //       toast.success("Verification successful");

  //       // You can redirect the user to the desired page upon successful verification
  //       handleLoginClick(); // Replace '/login' with the actual success page URL
  //     })
  //     .catch((error: AxiosError) => {
  //       console.error('Verification error:', error);
  //       handleVerificationError(error);
  //     });
  // };

  // const handleVerificationError = (error: AxiosError) => {
  //   if (error.response) {
  //     console.error('Response data:', error.response.data);
  //     console.error('Response status:', error.response.status);
  //     console.error('Response headers:', error.response.headers);
  //     const errorMessage = (error.response.data as any)?.message || 'Verification failed';
  //     toast.error(`Verification failed: ${errorMessage}`);
  //   } else if (error.request) {
  //     console.error('No response received:', error.request);
  //     toast.error('No response received from the server');
  //   } else {
  //     console.error('Request setup error:', error.message);
  //     toast.error('Error setting up the request');
  //   }
  // };

  const handleResendClick = () => {
    axios.post(`http://localhost:8882/api/v1/auth/resend-verification-code?email=${email}`)
      .then((response: AxiosResponse) => {
        console.log('Resend success:', response.data);
        toast.success('Verification code resent successfully');
      })
      .catch((error: AxiosError) => {
        console.error('Resend error:', error);
        toast.error('Error resending verification code');
      });
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="relative w-1/2 h-full flex flex-col">
        <img src={COVER_IMAGE} className="w-full h-full object-cover" alt="Cover" />
      </div>
      <div className="w-full h-full bg-[#f5f5f5] max-w-[500px] flex flex-col p-10 justify-center items-center">
        <div className="w-full flex flex-col mb-4">
          <h3 className="text-2xl font-semibold mb-2">Verify Your Account</h3>
          <p>
            We emailed you the six-digit code to {email} <br />
            Enter the code below to confirm your email address
          </p>
        </div>

        <div className="w-full flex flex-col space-y-3 items-center">
          <div className="grid grid-cols-6 gap-2">
            {verificationCodes.map((code, index) => (
              <input
                key={index}
                type="text"
                className="h-12 w-full bg-[#E3E5E6] text-center"
                maxLength={1}
                value={code}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleCodeChange(index, e.target.value)}
              />
            ))}
          </div>

          <button
            className="w-1/2 md:w-1/4 bg-[#036FE6] h-10 text-white font-semibold border-2 border-black rounded-md my-2 text-center flex items-center justify-center"
            onClick={handleLoginClick}
          >
            Verify
          </button>

          <small>
            If you didn't receive a code! <strong onClick={handleResendClick}>RESEND</strong>
          </small>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default EmailVerification;

