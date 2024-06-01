import React, { useState } from 'react';
import axios from 'axios';

function BorrowerForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBorrower = { name, email };
    
    axios.post('http://localhost:8000/api/borrowers/', newBorrower)
      .then(response => {
        setSuccessMessage('Borrower created successfully');
        setErrorMessage('');
        onSubmit();
      })
      .catch(error => {
        console.error('Error creating borrower:', error);
        setErrorMessage('Error creating borrower');
        setSuccessMessage('');
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <button type="submit">Submit</button>
      </form>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
}

export default BorrowerForm;
