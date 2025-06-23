# 💰 Expense Tracker App

A full-stack expense and income tracking application built with React, Node.js, and MongoDB. Features real-time financial tracking, beautiful UI, and complete CRUD operations.

## ✨ Features

### 🔐 Authentication
- **User Registration & Login** with JWT tokens
- **Secure password hashing** with bcrypt
- **Protected routes** with authentication middleware
- **Session management** with localStorage

### 💳 Expense Management
- **Add Expenses** with beautiful modal forms
- **Edit Expenses** with pre-populated data
- **Delete Expenses** with confirmation dialogs
- **Category-based organization** (Food, Transport, Utilities, etc.)
- **Real-time data synchronization**

### 💰 Income Management
- **Add Income** with comprehensive forms
- **Edit Income** entries
- **Delete Income** records
- **Multiple income categories** (Salary, Freelance, Business, etc.)
- **Full CRUD operations**

### 📊 Dashboard Analytics
- **Real-time financial overview**
- **Live statistics** (Total Expenses, Income, Net Balance)
- **Recent transactions** display
- **Savings rate calculation**
- **Period-based filtering** (Week, Month, Year)
- **Beautiful charts and visualizations**

### 🎨 User Interface
- **Modern, responsive design**
- **Beautiful modals** for all operations
- **Smooth animations** and transitions
- **Hover effects** and interactive elements
- **Mobile-friendly** navigation
- **Real-time clock** display

### 🔧 Technical Features
- **RESTful API** with Express.js
- **MongoDB** database with Mongoose ODM
- **JWT authentication** for security
- **CORS enabled** for cross-origin requests
- **Error handling** and validation
- **Loading states** and user feedback

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### 1. Clone the Repository
```bash
git clone <repository-url>
cd expense-tracker-app
```

### 2. Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Create .env file
echo "JWT_SECRET=your_jwt_secret_key_here_make_it_long_and_secure
MONGO_URI=mongodb://localhost:27017/expense-tracker" > .env

# Start the server
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

### 4. Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

## 📁 Project Structure

```
expense-tracker-app/
├── backend/
│   ├── config/
│   │   └── db.js                 # Database connection
│   ├── controllers/
│   │   ├── account.controller.js # Authentication logic
│   │   ├── expense.controller.js # Expense CRUD operations
│   │   └── income.controller.js  # Income CRUD operations
│   ├── middleware/
│   │   └── auth.js               # JWT authentication middleware
│   ├── models/
│   │   ├── account.model.js      # User account schema
│   │   ├── expense.model.js      # Expense schema
│   │   └── income.model.js       # Income schema
│   ├── routes/
│   │   ├── account.routes.js     # Auth routes
│   │   ├── expense.routes.js     # Expense API routes
│   │   └── income.routes.js      # Income API routes
│   ├── server.js                 # Express server setup
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   │   └── components/
│   │   │       ├── app/
│   │   │       │   ├── Dashboard.jsx    # Main dashboard
│   │   │       │   ├── Expense.jsx      # Expense management
│   │   │       │   ├── Income.jsx       # Income management
│   │   │       │   └── Navigation.jsx   # App navigation
│   │   │       ├── authentication/
│   │   │       │   ├── Login.jsx        # Login component
│   │   │       │   └── Register.jsx     # Registration component
│   │   │       └── landing/             # Landing page components
│   │   ├── App.jsx                      # Main app component
│   │   └── main.jsx                     # App entry point
│   └── package.json
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/accounts/register` - Register new user
- `POST /api/accounts/login` - Login user

### Expenses (Protected)
- `GET /api/expenses` - Get user's expenses
- `POST /api/expenses` - Create new expense
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense

### Income (Protected)
- `GET /api/income` - Get user's income
- `POST /api/income` - Create new income
- `PUT /api/income/:id` - Update income
- `DELETE /api/income/:id` - Delete income

## 🎯 Usage Guide

### 1. Registration & Login
1. Visit the application
2. Click "Register" to create an account
3. Fill in your details and submit
4. You'll be redirected to login
5. Login with your credentials

### 2. Dashboard Overview
- View real-time financial statistics
- See recent transactions
- Monitor savings rate
- Check net balance

### 3. Managing Expenses
- Click "Add Expense" button
- Fill in amount, category, and description
- Submit to save the expense
- Hover over expenses to edit/delete

### 4. Managing Income
- Navigate to Income section
- Add new income entries
- Track different income sources
- Monitor total earnings

### 5. Navigation
- Use the top navigation bar
- Switch between Dashboard, Expenses, and Income
- User ID is displayed for reference
- Logout functionality available

## 🛠️ Technologies Used

### Frontend
- **React 19** - UI framework
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling framework
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## 🔒 Security Features

- **JWT token authentication**
- **Password hashing** with bcrypt
- **Protected API routes**
- **Input validation**
- **Error handling**
- **CORS configuration**

## 📱 Responsive Design

- **Mobile-first approach**
- **Tablet and desktop optimized**
- **Touch-friendly interfaces**
- **Responsive navigation**
- **Adaptive layouts**

## 🚀 Deployment

### Backend Deployment
1. Set up environment variables
2. Configure MongoDB connection
3. Deploy to your preferred platform (Heroku, Vercel, etc.)

### Frontend Deployment
1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting service
3. Update API base URL if needed

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:
1. Check the console for error messages
2. Verify your MongoDB connection
3. Ensure all environment variables are set
4. Check the browser's network tab for API errors

## 🎉 Features Summary

✅ **100% Functional Frontend**
- Complete CRUD operations for expenses and income
- Real-time dashboard with live statistics
- Beautiful modals for all operations
- Responsive design with smooth animations
- User authentication and session management

✅ **Robust Backend**
- RESTful API with proper error handling
- JWT authentication and authorization
- MongoDB integration with Mongoose
- Input validation and security measures

✅ **Real-time Features**
- Live financial tracking
- Instant data updates
- Real-time statistics calculation
- Dynamic transaction lists

✅ **User Experience**
- Intuitive navigation
- Loading states and feedback
- Error handling and validation
- Mobile-responsive design

The application is now **100% functional** with all features working seamlessly! 🎊 