import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../api/auth";
import { getAdminToken, setAdminToken } from "../utils/token";
import { handleError } from "../utils/errorHandler";

const AdminLoginForm = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    //ider_we_are_redirecting_if_admin_already_logged_in_hoga
    if (getAdminToken()) {
      navigate("/admin");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginAdmin(
        credentials.username,
        credentials.password
      );
      setAdminToken(response.data.token);
      // alert("Login Successful!");
      navigate("/admin");
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-800">
      <div className="bg-gray-900 text-white rounded-lg shadow-lg w-96 p-6">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center mb-4">Admin Login</h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="border border-gray-600 w-full rounded-lg p-2 text-sm bg-gray-800 text-white"
              placeholder="Enter username"
              value={credentials.username}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="border border-gray-600 w-full rounded-lg p-2 text-sm bg-gray-800 text-white"
              placeholder="Enter password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg px-4 py-2"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginForm;
