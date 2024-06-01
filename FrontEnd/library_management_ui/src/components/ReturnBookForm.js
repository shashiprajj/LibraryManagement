import React, { useState } from 'react';
import axios from 'axios';
// import { useParams } from 'react-router-dom';

function ReturnBookForm({ onReturn }) {
  const [borrowerName, setBorrowerName] = useState('');
  const [borrowerEmail, setBorrowerEmail] = useState('');
  const [borrowerBookId, setBorrowerBookId] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleReturn = () => {
    const payload = {
      borrower: {
        name: borrowerName,
        email: borrowerEmail,
      },
    };

    axios.post(`http://localhost:8000/api/books/${borrowerBookId}/return_book/`, payload)
      .then(response => {
        setMessage('Book returned successfully');
        onReturn(borrowerBookId); // Notify parent component of successful return
      })
      .catch(error => {
        console.error('Error returning book:', error);
        setError('Error returning book');
      });
  };

  return (
    <div>
      <h2>Return Book</h2>
      <label>
        Borrower Name:
        <input type="text" value={borrowerName} onChange={(e) => setBorrowerName(e.target.value)} />
      </label>
      <label>
        Borrower Email:
        <input type="email" value={borrowerEmail} onChange={(e) => setBorrowerEmail(e.target.value)} />
      </label>
      <label>
        Book ID:
        <input type="text" value={borrowerBookId} onChange={(e) => setBorrowerBookId(e.target.value)} />
      </label>
      <button onClick={handleReturn}>Return</button>
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
    </div>
  );
}

export default ReturnBookForm;
