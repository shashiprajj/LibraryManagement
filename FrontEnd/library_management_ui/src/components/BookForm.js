import React, { useState } from 'react';
import axios from 'axios';

function BookForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [publicationDate, setPublicationDate] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBook = { title, author, isbn, publication_date: publicationDate };

    axios.post('http://localhost:8000/api/books/', newBook)
      .then(response => {
        setSuccessMessage('Book created successfully');
        onSubmit();
      })
      .catch(error => {
        if (error.response) {
          console.error('Backend responded with an error:', error.response.data);
        } else if (error.request) {
          console.error('No response received:', error.request);
        } else {
          console.error('Error creating book:', error.message);
        }
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
        <input type="text" placeholder="ISBN" value={isbn} onChange={(e) => setIsbn(e.target.value)} />
        <input type="date" placeholder="Publication Date" value={publicationDate} onChange={(e) => setPublicationDate(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
      {successMessage && <p>{successMessage}</p>}
    </div>
  );
}

export default BookForm;
