import React, { useState } from "react";
import { createBook, updateBook } from "../api/books";
import { getAdminToken } from "../utils/token";
import { handleError } from "../utils/errorHandler";

const UnifiedBookForm = ({ initialData, onClose, onSave, mode = "create" }) => {
  const [formData, setFormData] = useState(
    initialData || { name: "", author: "", quantity: "" }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = getAdminToken();
      if (mode === "edit") {
        const response = await updateBook(initialData._id, formData, token);
        onSave(response.data); // Call parent save function
      } else {
        const response = await createBook(formData, token);
        onSave(response.data);
      }
      onClose(); // Close the modal
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-lg"
        onClick={(e) => e.stopPropagation()} // Prevent modal close on internal clicks
      >
        <h3 className="text-xl font-bold text-white mb-4">
          {mode === "edit" ? "Edit Book" : "Add New Book"}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-300"
            >
              Book Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-gray-700 text-white border-none rounded-lg px-4 py-2 focus:ring focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="author"
              className="block text-sm font-medium text-gray-300"
            >
              Author
            </label>
            <input
              type="text"
              name="author"
              id="author"
              value={formData.author}
              onChange={handleChange}
              required
              className="w-full bg-gray-700 text-white border-none rounded-lg px-4 py-2 focus:ring focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-300"
            >
              Quantity
            </label>
            <input
              type="number"
              name="quantity"
              id="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
              min={1}
              className="w-full bg-gray-700 text-white border-none rounded-lg px-4 py-2 focus:ring focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              {mode === "edit" ? "Save Changes" : "Add Book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UnifiedBookForm;
