# Expense Tracker Backend

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Create a `.env` file in the backend directory with the following variables:

```
JWT_SECRET=your_jwt_secret_key_here_make_it_long_and_secure
MONGO_URI=mongodb://localhost:27017/expense-tracker
```

### 3. Start the Server
```bash
npm run dev
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/accounts/register` - Register a new account
- `POST /api/accounts/login` - Login to account

### Expenses (Requires Authentication)
- `GET /api/expenses` - Get all expenses for the authenticated user
- `POST /api/expenses` - Create a new expense
- `PUT /api/expenses/:id` - Update an expense
- `DELETE /api/expenses/:id` - Delete an expense

## Authentication
All expense endpoints require a valid JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
``` 