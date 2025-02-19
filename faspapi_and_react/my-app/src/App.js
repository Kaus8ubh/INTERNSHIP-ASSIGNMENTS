import logo from './logo.svg';
import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <button id='fetchbook' type='button'>show all books</button>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';

function App() {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [quantity, setQuantity] = useState('');
  const [name, setName] = useState('');
  const [bookId, setBookId] = useState('');
  const [userId, setUserId] = useState('');


  // Fetch books from the backend
  const fetchBooks = async () => {
    const response = await fetch('http://127.0.0.1:8000/books');
    const data = await response.json();
    setBooks(data);
  };

  // Fetch users from the backend
  const fetchUsers = async () => {
    const response = await fetch('http://127.0.0.1:8000/users');
    const data = await response.json();
    setUsers(data);
  };

  // Add a new book
  const handleAddBook = async (e) => {
    e.preventDefault();
    const response = await fetch('http://127.0.0.1:8000/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, author, quantity: parseInt(quantity) }),
    });
    if (response.ok) {
      fetchBooks();
      setTitle('');
      setAuthor('');
      setQuantity('');
    }
  };

  // Add a new user
  const handleAddUser = async (e) => {
    e.preventDefault();
    const response = await fetch('http://127.0.0.1:8000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });
    if (response.ok) {
      fetchUsers();
      setName('');
    }
  };

  // Allocate a book to a user
  const handleAllocateBook = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://127.0.0.1:8000/allocate/${bookId}/${userId}`, {
      method: 'POST',
    });
    if (response.ok) {
      fetchBooks();
      setBookId('');
      setUserId('');
    }
  };

  // Deallocate a book from a user
  const handleDeallocateBook = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://127.0.0.1:8000/deallocate/${bookId}/${userId}`, {
      method: 'POST',
    });
    if (response.ok) {
      fetchBooks();
      setBookId('');
      setUserId('');
    }
  };

  return (
    <div>
      <h1>Library Management System</h1>

      {/* Add Book Form */}
      <div>
        <h2>Add Book</h2>
        <form onSubmit={handleAddBook}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
          <button type="submit">Add Book</button>
        </form>
      </div>

      {/* Add User Form */}
      <div>
        <h2>Add User</h2>
        <form onSubmit={handleAddUser}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <button type="submit">Add User</button>
        </form>
      </div>

      {/* Allocate Book Form */}
      <div>
        <h2>Allocate Book</h2>
        <form onSubmit={handleAllocateBook}>
          <select value={bookId} onChange={(e) => setBookId(e.target.value)} required>
            <option value="">Select Book</option>
            {books.map((book) => (
              <option key={book.id} value={book.id}>
                {book.title}
              </option>
            ))}
          </select>
          <select value={userId} onChange={(e) => setUserId(e.target.value)} required>
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          <button type="submit">Allocate</button>
        </form>
      </div>

      {/* Deallocate Book Form */}
      <div>
        <h2>Deallocate Book</h2>
        <form onSubmit={handleDeallocateBook}>
          <select value={bookId} onChange={(e) => setBookId(e.target.value)} required>
            <option value="">Select Book</option>
            {books.map((book) => (
              <option key={book.id} value={book.id}>
                {book.title}
              </option>
            ))}
          </select>
          <select value={userId} onChange={(e) => setUserId(e.target.value)} required>
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          <button type="submit">Deallocate</button>
        </form>
      </div>

      {/* Display Books */}
      <div>
        <h2>Books</h2>
        <ul>
          {books.map((book) => (
            <li key={book.id}>
              {book.title} by {book.author} (Quantity: {book.quantity})
            </li>
          ))}
        </ul>
      </div>

      {/* Display Users */}
      <div>
        <h2>Users</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

