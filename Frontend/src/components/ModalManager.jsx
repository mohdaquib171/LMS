import React, { useState } from "react";
import UserLoginFormModal from "../user/UserLoginFormModal";
import UserRegisterFormModal from "../user/UserRegisterFormModal";

const ModalManager = ({ onClose }) => {
  const [activeModal, setActiveModal] = useState(null);

  const openModal = (modalName) => setActiveModal(modalName);
  const closeModal = () => setActiveModal(null);

  const handleSwitchToLogin = () => setActiveModal("login");
  const handleSwitchToRegister = () => setActiveModal("register");

  return (
    <>
      {/* Buttons to Open Login and Register */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => openModal("login")}
          // className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4 py-2"
          className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </button>
        <button
          onClick={() => openModal("register")}
          // className="bg-green-600 hover:bg-green-700 text-white rounded-lg px-4 py-2"
          className="px-6 py-3 bg-green-600 rounded-lg hover:bg-green-700 transition"
        >
          Register
        </button>
      </div>

      {/* Render Modals */}
      {activeModal === "login" && (
        <UserLoginFormModal
          onClose={closeModal}
          onSwitchToRegister={handleSwitchToRegister}
        />
      )}
      {activeModal === "register" && (
        <UserRegisterFormModal
          onClose={closeModal}
          onSwitchToLogin={handleSwitchToLogin}
        />
      )}
    </>
  );
};

export default ModalManager;