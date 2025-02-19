import axios from "axios";
import { BACKEND_URL } from "../config";
import { getUserToken } from "../utils/token";

const getAuthHeaders = () => {
  const token = getUserToken();
  return { Authorization: `Bearer ${token}` };
};

export const fetchBooks = async () => axios.get(`${BACKEND_URL}/books`);

// yaha_iam_fetching_user_rented_books
export const fetchRentedBooks = async () => {
  return await axios.get(`${BACKEND_URL}/rent`, { headers: getAuthHeaders() });
};

// yaha_renting_a_book
export const rentBook = async (bookId) => {
  return await axios.post(`${BACKEND_URL}/rent/${bookId}`, null, {
    headers: getAuthHeaders(),
  });
};

//yahaReturningTheRentedBook
export const returnBook = async (bookId) => {
  // console.log("API Call for Returning Book - ID:", bookId); // Debugging
  return await axios.post(`${BACKEND_URL}/rent/return/${bookId}`, null, {
    headers: getAuthHeaders(),
  });
};


// admin operations:
// create book
export const createBook = async (newBook, token) => {
  const response = await axios.post(`${BACKEND_URL}/books`, newBook, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
};

// update book
export const updateBook = async (id, updateBook, token) => {
  const response = await axios.put(`${BACKEND_URL}/books/${id}`, updateBook, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
};

// delete book
export const deleteBook = async (id, token) => {
  const response = await axios.delete(`${BACKEND_URL}/books/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
};