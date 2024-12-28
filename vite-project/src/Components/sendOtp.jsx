import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const SendOTP = () => {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  const handleSendOTP = async () => {
    try {
      const response = await axios.post("http://localhost:5000/send-otp", {
        email,
      });
      alert(response.data.message);
      if (response.data.success) {
        navigate("/verifyOtp");
      }
    } catch (error) {
      alert("Error sending OTP");
    }
  };

  return (
    <div className="w-[100%] h-[100vh] flex  justify-center items-center bg-black">
      <div className="flex  flex-col justify-between border-1 p-5 w-[30%] h-[40%] bg-slate-900 items-center rounded-md">
        <input
        className="w-[100%] p-2 focus:none outline-none bg-gray-800 placeholder:text-gray-600 text-gray-400 rounded-md"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="p-2 px-4 border border-gray-600 text-white w-max rounded-md hover:bg-gray-950 " onClick={handleSendOTP}>Send OTP</button>
      </div>
    </div>
  );
};

export default SendOTP;
