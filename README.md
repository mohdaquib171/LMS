# Library Management System (LMS)

A simple Library Management System built with the MERN stack.

## Sample User Accounts
```json
{
    "username": "harrypotter",
    "password": "harrypotter"
}
```

## API Endpoints

### Books (Public)
- `GET /api/v1/books` → Get all books

### Admin Routes
1. `POST /api/v1/auth/adminlogin` → Admin login
2. `POST /api/v1/books` → Create a new book
3. `PUT /api/v1/books/:bookId` → Update a book
4. `DELETE /api/v1/books/:bookId` → Delete a book

### User Routes
1. `POST /api/v1/auth/register` → Register a user
2. `POST /api/v1/auth/login` → User login
3. `POST /api/v1/rent/:bookId` → Rent a book
4. `GET /api/v1/rent` → Get all rented books
5. `POST /api/v1/rent/return/:bookId` → Return a rented book

## Admin Login via Frontend
1. Go to the admin login page: `http://localhost:5173/admin/login`
2. Enter the admin credentials:
   - **Username:** admin
   - **Password:** LMS-Admin123
4. **Login** to access the admin dashboard.