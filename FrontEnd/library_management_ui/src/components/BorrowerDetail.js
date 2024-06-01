import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function BorrowerDetail({ match }) {
  const { id } = useParams();
  const [borrower, setBorrower] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/borrowers/${id}/`)
      .then(response => {
        setBorrower(response.data);
      })
      .catch(error => {
        console.error('Error fetching borrower details:', error);
      });
  }, [id]);

  return (
    <div>
      <h2>Borrower Details</h2>
      {borrower && (
        <div>
          <h3>{borrower.name}</h3>
          <p>Email: {borrower.email}</p>
        </div>
      )}
    </div>
  );
}

export default BorrowerDetail;
