import React, { useState } from 'react';
import axios from 'axios';

function BorrowReturnBook({ bookId, onBorrow, onReturn }) {
  const [borrowerName, setBorrowerName] = useState('');
  const [borrowerEmail, setBorrowerEmail] = useState('');
  const [action, setAction] = useState('');

  const handleAction = () => {
    if (action === 'borrow') {
      const borrowerData = { name: borrowerName, email: borrowerEmail };
      axios.post(`http://localhost:8000/api/books/${bookId}/borrow_book/`, { borrower: borrowerData })
        .then(response => {
          onBorrow();
        })
        .catch(error => {
          console.error('Error borrowing book:', error);
        });
    } else if (action === 'return') {
      const borrowerData = { name: borrowerName, email: borrowerEmail };
      axios.post(`/api/books/${bookId}/return_book/`, { borrower: borrowerData })
        .then(response => {
          onReturn();
        })
        .catch(error => {
          console.error('Error returning book:', error);
        });
    }
  };

  return (
    <div>
      <label>
        Borrower Name:
        <input type="text" value={borrowerName} onChange={(e) => setBorrowerName(e.target.value)} />
      </label>
      <label>
        Borrower Email:
        <input type="email" value={borrowerEmail} onChange={(e) => setBorrowerEmail(e.target.value)} />
      </label>
      <button onClick={() => setAction('borrow')}>Borrow</button>
      <button onClick={() => setAction('return')}>Return</button>
      <button onClick={handleAction}>Submit</button>
    </div>
  );
}

export default BorrowReturnBook;
