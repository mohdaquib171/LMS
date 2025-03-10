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
3. **Login** to access the admin dashboard.

## How to Run Locally (Without Docker)
1. Clone the repository:
   ```sh
   git clone https://github.com/mohdaquib171/LMS.git
   cd LMS
   ```
2. Install dependencies:
   ```sh
   cd Backend && npm install
   cd ../Frontend && npm install
   ```
3. Create a `.env` file in the `Backend` directory with the following content:
   ```sh
   PORT=5000
   JWT_SECRET=your_secret_key
   MONGO_URI=mongodb://localhost:27017/lms
   ```
4. Start the backend:
   ```sh
   cd Backend
   npm start
   ```
5. Start the frontend:
   ```sh
   cd Frontend
   npm run dev
   ```

## How to Run with Docker (Recommended)
### Prerequisites
- Ensure [Docker](https://www.docker.com/) is installed.

### Steps to Run
1. Clone the repository:
   ```sh
   git clone https://github.com/mohdaquib171/LMS.git
   cd LMS
   ```
2. Create a `.env` file in the `Backend` directory with the following content:
   ```sh
   PORT=5000
   JWT_SECRET=your_secret_key
   MONGO_URI=mongodb://mongo:27017/lms
   ```
3. Run the application using Docker Compose:
   ```sh
   docker compose up -d
   ```
   This command will pull images and start the services in detached mode.

4. To stop the application:
   ```sh
   docker compose down
   ```

### Removing Docker Images, Networks, and Volumes
If you want to clean up all Docker images, networks, and volumes after shutting down the containers, run:
```sh
docker rmi mohdaquib/lms-backend:latest mohdaquib/lms-frontend:latest mongo
docker network prune -f
docker volume prune -f
```

## Deployment
- **Backend**: Deployed on Render
- **Frontend**: Deployed on Vercel

