import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchBooks, deleteBook } from "../api/books";
import { getAdminToken, clearAdminToken } from "../utils/token";
import { handleError } from "../utils/errorHandler";
import UnifiedBookForm from "../forms/UnifiedBookForm";
import Table from "../components/Table";

const AdminDashboard = () => {
  const [books, setBooks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);
  const navigate = useNavigate();

  const columns = [
    { title: "Name", key: "name" },
    { title: "Author", key: "author" },
    { title: "Quantity", key: "quantity" },
  ];

  useEffect(() => {
    fetchBooks()
      .then((response) => setBooks(response.data))
      .catch((err) => handleError(err));
  }, []);

  const handleLogout = () => {
    clearAdminToken();
    navigate("/admin/login");
  };

  const handleSaveNewBook = (newBook) => {
    setBooks((prevBooks) => [...prevBooks, newBook]);
  };

  const handleSaveUpdatedBook = (updatedBook) => {
    // console.log("Updated book data:", updatedBook);
    if (!updatedBook || !updatedBook._id) {
      console.error("Updated book has no valid _id!");
      return;
    }

    setBooks((prevBooks) =>
      prevBooks.map((book) => (book._id === updatedBook._id ? updatedBook : book))
    );
  };

  const handleEditClick = (book) => {
    setCurrentBook(book);
    setEditModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await deleteBook(id, getAdminToken());
        setBooks((prevBooks) => prevBooks.filter((book) => book._id !== id));
      } catch (err) {
        handleError(err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">

      {/* Header Section */}
      <header className="bg-gray-800 p-6 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition text-white"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto my-6 flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Books List</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white transition"
          >
            Add New Book
          </button>
        </div>

        <Table
          columns={columns}
          data={books}
          renderActions={(book) => (
            <>
              <button
                onClick={() => handleEditClick(book)}
                className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded-lg text-white transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(book._id)}
                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-lg text-white transition ml-2"
              >
                Delete
              </button>
            </>
          )}
        />

        {isModalOpen && (
          <UnifiedBookForm
            mode="create"
            onClose={() => setIsModalOpen(false)}
            onSave={handleSaveNewBook}
          />
        )}
        {editModalOpen && (
          <UnifiedBookForm
            mode="edit"
            initialData={currentBook}
            onClose={() => setEditModalOpen(false)}
            onSave={handleSaveUpdatedBook}
          />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;