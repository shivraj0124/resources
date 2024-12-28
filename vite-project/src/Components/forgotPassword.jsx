import React, { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleForgotPassword = async () => {
    if (confirmPassword == password) {
      try {
        const response = await axios.post(
          "http://localhost:5000/forgot-password",
          { email, password }
        );
        alert(response.data.message);
      } catch (error) {
        alert("Error updating password");
      }
    } else {
      alert("Passwords do not match. Please try again.");
    }
  };

  return (
    <div className="w-[100%] h-[100vh] flex  justify-center items-center bg-black">
      <div className="flex  flex-col justify-between border-1 p-4 w-[30%] h-[40%] bg-slate-900 items-center rounded-md">
        <div className="flex flex-col gap-2 w-[100%]">
          <input
            className="w-[100%] p-2 focus:none outline-none bg-gray-800 placeholder:text-gray-600 text-gray-400 rounded-md"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-[100%] p-2 focus:none outline-none bg-gray-800 placeholder:text-gray-600 text-gray-400 rounded-md"
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="w-[100%] p-2 focus:none outline-none bg-gray-800 placeholder:text-gray-600 text-gray-400 rounded-md"
            type="password"
            placeholder="Confirm Password"
            value={password}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button
          className="p-2 px-4 border border-gray-600 text-white w-max rounded-md hover:bg-gray-950 "
          onClick={handleForgotPassword}
        >
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
