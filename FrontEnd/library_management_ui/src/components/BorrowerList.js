import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BorrowerList() {
  const [borrowers, setBorrowers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/borrowers/')
      .then(response => {
        setBorrowers(response.data);
      })
      .catch(error => {
        console.error('Error fetching borrowers:', error);
      });
  }, []);

  return (
    <div>
      <h2>Borrower List</h2>
      <ul>
        {borrowers.map(borrower => (
          <li key={borrower.id}>
            <strong>{borrower.name}</strong> - {borrower.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BorrowerList;
