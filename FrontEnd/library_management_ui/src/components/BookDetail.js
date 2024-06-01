import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/books/${id}/`)
      .then(response => {
        setBook(response.data);
      })
      .catch(error => {
        console.error('Error fetching book details:', error);
      });
  }, [id]);

  return (
    <div>
      <h2>Book Details</h2>
      {book && (
        <div>
          <h3>{book.title}</h3>
          <p>Author: {book.author}</p>
          <p>ISBN: {book.isbn}</p>
          <p>Publication Date: {book.publication_date}</p>
          <p>Availability: {book.availability ? 'Available' : 'Not Available'}</p>
        </div>
      )}
    </div>
  );
}

export default BookDetail;
