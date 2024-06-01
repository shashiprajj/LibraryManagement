# PraisElite Coding Assessment
# Library Management System

Brief description of your project.
The Library Management System is a web application designed to streamline the management of books and borrowers in a library. It allows librarians to easily manage book inventory, track borrower information, and facilitate borrowing and returning processes. The system provides a user-friendly interface for both librarians and borrowers, enhancing the overall efficiency and experience of library operations.

Key features include:

1. Book management: Add, edit, and delete books from the library inventory.
2. Borrower management: Maintain borrower records, including names, contact information, and borrowing history.
3. Borrowing process: Facilitate the borrowing of books by registered borrowers, ensuring accurate tracking of borrowed items.
4. Returning process: Enable borrowers to return books, updating the availability of books in the inventory.
5. The system is built using Django for the backend API and React.js for the frontend user interface, providing a modern and responsive web application. It leverages Django REST Framework for building RESTful APIs and Axios for handling HTTP requests between the frontend and backend.

This project aims to simplify library management tasks, improve accessibility for librarians and borrowers, and enhance the overall efficiency of library operations.

## Setup Instructions

### Backend (Django)
1. Install Django and Django REST Framework
   
3. Clone the repository:

3. Navigate to the project directory
   
5. install all backend requirements using-> py -m pip freeze > requirements.txt
   
6. Run migrations:
   python manage.py makemigrations, 
   python manage.py migrate
   
8. Start the Django development server:
   python manage.py runserver


### Frontend (React)

1. Navigate to the frontend directory:

2. Install dependencies:
   npm install

4. Start the development server:
   npm start

## Technologies Used

- Django
- Django REST Framework
- React
- Axios (for HTTP requests)



