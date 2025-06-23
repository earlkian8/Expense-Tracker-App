# Expense Tracker App Setup Guide

## Prerequisites
- Node.js (v16 or higher)
- MongoDB (running locally or MongoDB Atlas)
- npm or yarn

## Backend Setup

### 1. Navigate to backend directory
```bash
cd backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create environment file
Create a `.env` file in the backend directory with:
```
JWT_SECRET=your_jwt_secret_key_here_make_it_long_and_secure
MONGO_URI=mongodb://localhost:27017/expense-tracker
```

### 4. Start the backend server
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

## Frontend Setup

### 1. Navigate to frontend directory
```bash
cd frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the frontend development server
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## Features Implemented

### Authentication
- User registration and login
- JWT token-based authentication
- Protected routes

### Expense Management
- Add new expenses with modal
- Edit existing expenses with modal
- Delete expenses with confirmation modal
- Real-time data fetching from backend
- User-specific expense tracking

### UI/UX
- Modern, responsive design
- Beautiful modals for CRUD operations
- Loading states and error handling
- Hover effects and animations
- Category-based expense organization

## API Endpoints

### Authentication
- `POST /api/accounts/register` - Register new user
- `POST /api/accounts/login` - Login user

### Expenses (Protected)
- `GET /api/expenses` - Get user's expenses
- `POST /api/expenses` - Create new expense
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense

## Usage

1. Start both backend and frontend servers
2. Register a new account or login
3. Navigate to the dashboard
4. Use the "Add Expense" button to create new expenses
5. Hover over expense items to see edit/delete options
6. All expenses are tied to the authenticated user

## Troubleshooting

### Common Issues

1. **CORS Error**: Make sure the backend CORS configuration matches your frontend URL
2. **MongoDB Connection**: Ensure MongoDB is running and the connection string is correct
3. **JWT Secret**: Make sure the JWT_SECRET is set in your .env file
4. **Port Conflicts**: Ensure ports 5000 (backend) and 5173 (frontend) are available

### Error Messages
- "No token, authorization denied" - User needs to login
- "Token is not valid" - JWT token has expired or is invalid
- "Server Error" - Check backend logs for detailed error information 