import React, { useEffect, useState } from "react";
import {
  fetchBooks,
  fetchRentedBooks,
  rentBook,
  returnBook,
} from "../api/books";
import { clearUserToken, getUserToken } from "../utils/token";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const [username, setUsername] = useState("");
  const [availableBooks, setAvailableBooks] = useState([]);
  const [rentedBooks, setRentedBooks] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const allBooks = await fetchBooks();
      const rentedBooksData = await fetchRentedBooks();
  
      // Ensure that `rentedBooksData.data` is valid
      const rentedBooksList = Array.isArray(rentedBooksData.data) ? rentedBooksData.data : [];
  
      const rentedBookIds = rentedBooksList.map((r) => r.bookId?._id).filter(Boolean); // Remove undefined values
  
      const filteredBooks = allBooks.data.filter(
        (book) => !rentedBookIds.includes(book?._id)
      );
  
      // Safely extract book details
      const rentedBooksWithDetails = rentedBooksList.map((rented) => ({
        ...rented,
        name: rented.bookId?.name || "Unknown Book",
        author: rented.bookId?.author || "Unknown Author",
      }));
  
      setAvailableBooks(filteredBooks || []);
      setRentedBooks(rentedBooksWithDetails || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  
  

  useEffect(() => {
    const token = getUserToken();
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT
        // console.log("Decoded Token Payload:", payload); // Debugging
  
        setUsername(payload?.username || payload?.name || "User"); // Correcting username
      } catch (error) {
        console.error("Error decoding token:", error);
        setUsername("User");
      }
    }
    fetchData();
  }, []);

  // Handle book renting
  const handleRentBook = async (bookId) => {
    try {
      // Pehle UI se book hatao
      setAvailableBooks((prevBooks) =>
        prevBooks.filter((book) => book._id !== bookId)
      );
  
      await rentBook(bookId); // API Call
      await fetchData(); // Fresh data le aayega
    } catch (error) {
      console.error("Error renting book:", error);
      alert("Failed to rent the book. Please try again.");
  
      // Error aane pe book wapas add kar do
      setAvailableBooks((prevBooks) => [...prevBooks, { _id: bookId }]);
    }
  };
  
  

  // Handle book return
  const handleReturnBook = async (bookId) => {
    try {
      // console.log("Returning book with ID:", bookId);
      await returnBook(bookId);
      await fetchData(); // Refresh list
    } catch (error) {
      console.error("Error returning book:", error.response?.data || error.message);
      alert("Failed to return the book. Please try again.");
    }
  };
  
  
  
  

  const handleLogout = () => {
    clearUserToken();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header Section */}
      <header className="bg-gray-800 p-6 shadow-lg">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">Welcome, {username}!</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Rented Books Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Your Rented Books</h2>
          {rentedBooks.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rentedBooks.map((book) => (
                <div
                  key={book.bookId || book._id}
                  className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition"
                >
                  <h3 className="text-xl font-semibold">{book.name}</h3>
                  <p className="text-gray-400">Author: {book.author}</p>
                  <button
                     onClick={() => handleReturnBook(book.bookId._id)}
                    className="mt-4 bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition"
                  >
                    Return Book
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">You have not rented any books yet.</p>
          )}
        </section>

        {/* Available Books Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Available Books</h2>
          {availableBooks.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {availableBooks.map((book) => (
                <div
                  key={book._id}
                  className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition"
                >
                  <h3 className="text-xl font-semibold">{book.name}</h3>
                  <p className="text-gray-400">Author: {book.author}</p>
                  <button
                    onClick={() => handleRentBook(book._id)}
                    className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition"
                  >
                    Rent Book
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">
              No books available for rent right now.
            </p>
          )}
        </section>
      </main>
    </div>
  );
};

export default UserDashboard;
