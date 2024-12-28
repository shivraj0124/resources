import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const VerifyOTP = () => {
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const navigate = useNavigate();
  const handleVerifyOTP = async () => {
    try {
      const response = await axios.post("http://localhost:5000/verify-otp", {
        email,
        otp,
      });
      console.log(response);

      alert(response.data.message);

      if (response.data.success) {
        console.log(response.data.otpExpiry);

        navigate("/forgotPassword");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="w-[100%] h-[100vh] flex  justify-center items-center bg-black">
      <div className="flex  flex-col justify-between border-1 p-5 w-[30%] h-[30%] bg-slate-900 items-center rounded-md">
        <div className="flex flex-col gap-4 w-[100%]">
          <input
            className="w-[100%] p-2 focus:none outline-none bg-gray-800 placeholder:text-gray-600 text-gray-400 rounded-md"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-[100%] p-2 focus:none outline-none bg-gray-800 placeholder:text-gray-600 text-gray-400 rounded-md"
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOTP(e.target.value)}
          />
        </div>
        <button
          className="p-2 px-4 border border-gray-600 text-white w-max rounded-md hover:bg-gray-950 "
          onClick={handleVerifyOTP}
        >
          Verify OTP
        </button>
      </div>
    </div>
  );
};

export default VerifyOTP;
