import React from 'react';
import COVER_IMAGE from '../../assets/Idea_1.jpg';
import { useNavigate } from 'react-router-dom';

function EmailVerification() {
  const navigate = useNavigate();

  const handleGetLOGINNClick = () => {
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
            We emailed you the six-digit code to personal@gmail.com <br />
            Enter the code below to confirm your email address
          </p>
        </div>

        <div className="w-full flex flex-col space-y-3 items-center">
          <div className="grid grid-cols-6 gap-2">
            {[1, 2, 3, 4, 5, 6].map((_, index) => (
              <input key={index} type="text" className="h-12 w-full bg-[#E3E5E6] text-center" maxLength={1} />
            ))}
          </div>

          <button
            className="w-1/2 md:w-1/4 bg-[#036FE6] h-10 text-white font-semibold border-2 border-black rounded-md my-2 text-center flex items-center justify-center"
            onClick={handleGetLOGINNClick}
          >
            Verify
          </button>

          <small>
            If you didn't receive a code! <strong>RESEND</strong>
          </small>
        </div>
      </div>
    </div>
  );
}

export default EmailVerification;
