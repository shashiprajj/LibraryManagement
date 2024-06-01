import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function BorrowBookForm({ onBorrow }) {
  const { bookId } = useParams(); // Extract bookId from URL params
  const [borrowerName, setBorrowerName] = useState('');
  const [borrowerEmail, setBorrowerEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleBorrow = () => {
    const borrowerData = { name: borrowerName, email: borrowerEmail };
    axios.post(`http://localhost:8000/api/books/${bookId}/borrow_book/`, { borrower: borrowerData })
      .then(response => {
        setMessage('Book borrowed successfully');
        onBorrow(bookId); // Pass bookId to the onBorrow function
      })
      .catch(error => {
        console.error('Error borrowing book:', error);
        if (error.response) {
          setError(`Error: ${error.response.data.detail}`);
        } else if (error.request) {
          setError('Error: No response received from the server');
        } else {
          setError('Error: Request failed to be sent');
        }
      });
  };

  return (
    <div>
      <h2>Borrow Book</h2>
      <label>
        Borrower Name:
        <input type="text" value={borrowerName} onChange={(e) => setBorrowerName(e.target.value)} />
      </label>
      <label>
        Borrower Email:
        <input type="email" value={borrowerEmail} onChange={(e) => setBorrowerEmail(e.target.value)} />
      </label>
      <button onClick={handleBorrow}>Borrow</button>
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
    </div>
  );
}

export default BorrowBookForm;
