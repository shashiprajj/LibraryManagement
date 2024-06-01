import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookList from './components/BookList';
import BookDetail from './components/BookDetail';
import BookForm from './components/BookForm';
import BorrowerList from './components/BorrowerList';
import BorrowerDetail from './components/BorrowerDetail';
import BorrowerForm from './components/BorrowerForm';
import BorrowBookForm from './components/BorrowBookForm';
import ReturnBookForm from './components/ReturnBookForm'; // Import ReturnBookForm

const MainComponent = () => {
    const handleBookFormSubmit = () => {
        console.log('Book created successfully');
    };

    const handleBorrowerFormSubmit = () => {
        console.log('Borrower created successfully');
    };

    const handleBookBorrowFormSubmit = () => {
        console.log('Book borrowed successfully');
    };

    const handleBookReturnFormSubmit = () => {
        console.log('Book returned successfully');
    };
    
    return (
        <Router>
            <div>
                <h1>Library Management System</h1>
                <Routes>
                    <Route path="/books" element={<BookList />} />
                    <Route path="/books/:id" element={<BookDetail />} />
                    <Route path="/create-book" element={<BookForm onSubmit={handleBookFormSubmit} />}/>
                    <Route path="/borrowers" element={<BorrowerList />} />
                    <Route path="/borrowers/:id" element={<BorrowerDetail />} />
                    <Route path="/create-borrower" element={<BorrowerForm onSubmit={handleBorrowerFormSubmit} />} />
                    <Route path="/borrow-book/:bookId" element={<BorrowBookForm onBorrow={handleBookBorrowFormSubmit} />} />
                    <Route path="/return-book/:bookId" element={<ReturnBookForm onReturn={handleBookReturnFormSubmit} />} />
                </Routes>
            </div>
        </Router>
    );
};

export default MainComponent;
