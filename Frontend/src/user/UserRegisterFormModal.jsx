import React, { useState } from "react";
import { registerUser } from "../api/auth";
import { handleError } from "../utils/errorHandler";

const UserRegisterFormModal = ({ onClose, onSwitchToLogin }) => {
  const [newUser, setNewUser] = useState({
    username: "",
    name: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerUser(newUser);
      // alert("Registration Successful! Please log in.");
      onSwitchToLogin(); // Switch to Login Modal
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
          <h2 className="text-2xl font-bold text-white">Register</h2>
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
              value={newUser.username}
              onChange={handleChange}
              placeholder="Choose a username"
              className="w-full p-2 bg-gray-700 text-white rounded focus:ring focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={newUser.name}
              onChange={handleChange}
              placeholder="Enter your full name"
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
              value={newUser.password}
              onChange={handleChange}
              placeholder="Create a password"
              className="w-full p-2 bg-gray-700 text-white rounded focus:ring focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-green-600 rounded hover:bg-green-700 transition text-white font-semibold"
          >
            Register
          </button>
        </form>

        {/* Footer */}
        <div className="text-sm text-gray-400 mt-4 text-center">
          Already have an account?{" "}
          <button
            onClick={onSwitchToLogin}
            className="text-blue-500 hover:underline"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserRegisterFormModal;
