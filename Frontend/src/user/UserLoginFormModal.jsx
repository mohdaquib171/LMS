import React, { useState } from "react";
import { loginUser } from "../api/auth";
import { setUserToken } from "../utils/token";
import { useNavigate } from "react-router-dom";
import { handleError } from "../utils/errorHandler";

const UserLoginFormModal = ({ onClose, onSwitchToRegister }) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser(
        credentials.username,
        credentials.password
      );
      setUserToken(response.data.token);
      // alert("User Login Successful!");
      onClose();
      navigate("/user/dashboard");
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Login</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
          >
            ✖
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-start">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className="w-full p-2 bg-gray-700 text-white rounded focus:ring focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full p-2 bg-gray-700 text-white rounded focus:ring focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 rounded hover:bg-blue-700 transition text-white font-semibold"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <div className="text-sm text-gray-400 mt-4 text-center">
          Don't have an account?{" "}
          <button
            onClick={onSwitchToRegister}
            className="text-blue-500 hover:underline"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserLoginFormModal;
