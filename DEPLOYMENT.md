# Deployment Guide - Expense Tracker App

## Prerequisites

1. **GitHub Account** - Push your code to GitHub
2. **Vercel Account** - Sign up at [vercel.com](https://vercel.com)
3. **MongoDB Atlas** - Set up a MongoDB database
4. **Environment Variables** - Prepare your environment variables

## Step 1: Prepare Your Repository

### 1.1 Push to GitHub
```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/expense-tracker-app.git
git push -u origin main
```

### 1.2 Repository Structure
Your repository should look like this:
```
expense-tracker-app/
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── vercel.json
│   └── src/
├── backend/
│   ├── package.json
│   ├── server.js
│   ├── vercel.json
│   └── ...
├── README.md
├── DEPLOYMENT.md
└── .gitignore
```

## Step 2: Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Get your connection string
4. Create a database user
5. Whitelist your IP (or use 0.0.0.0/0 for all IPs)

## Step 3: Deploy Backend to Vercel

### 3.1 Connect Backend Repository
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Select the `backend` folder as the root directory
5. Configure the following settings:

**Build Settings:**
- Framework Preset: `Node.js`
- Build Command: `npm install`
- Output Directory: `(leave empty)`
- Install Command: `npm install`

**Environment Variables:**
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/expense-tracker?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-here
NODE_ENV=production
```

### 3.2 Deploy Backend
1. Click "Deploy"
2. Wait for deployment to complete
3. Copy the deployment URL (e.g., `https://your-backend.vercel.app`)

## Step 4: Deploy Frontend to Vercel

### 4.1 Connect Frontend Repository
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository again
4. Select the `frontend` folder as the root directory
5. Configure the following settings:

**Build Settings:**
- Framework Preset: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

**Environment Variables:**
```
VITE_API_URL=https://your-backend.vercel.app
```

### 4.2 Update Frontend API Configuration
Update your frontend to use the environment variable for API calls:

```javascript
// In your API calls, use:
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';
```

### 4.3 Deploy Frontend
1. Click "Deploy"
2. Wait for deployment to complete
3. Copy the frontend URL (e.g., `https://your-frontend.vercel.app`)

## Step 5: Update CORS Configuration

### 5.1 Update Backend CORS
In `backend/server.js`, update the `allowedOrigins` array with your actual frontend URL:

```javascript
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://your-frontend.vercel.app', // Add your actual frontend URL
];
```

### 5.2 Redeploy Backend
1. Go to your backend project in Vercel
2. Click "Redeploy" to apply the CORS changes

## Step 6: Test Your Deployment

1. **Test Backend Health Check:**
   ```
   https://your-backend.vercel.app/api/health
   ```

2. **Test Frontend:**
   - Visit your frontend URL
   - Try to register a new account
   - Test login functionality
   - Test adding expenses and income

## Step 7: Custom Domain (Optional)

1. Go to your Vercel project settings
2. Click "Domains"
3. Add your custom domain
4. Update DNS settings as instructed

## Troubleshooting

### Common Issues:

1. **CORS Errors:**
   - Make sure your frontend URL is in the `allowedOrigins` array
   - Check that the backend URL is correct in your frontend configuration

2. **Database Connection Issues:**
   - Verify your MongoDB connection string
   - Check that your IP is whitelisted in MongoDB Atlas
   - Ensure your database user has the correct permissions

3. **Build Failures:**
   - Check that all dependencies are in `package.json`
   - Verify that build commands are correct
   - Check Vercel build logs for specific errors

4. **Environment Variables:**
   - Make sure all environment variables are set in Vercel
   - Check that variable names match your code
   - Redeploy after adding new environment variables

### Useful Commands:

```bash
# Test backend locally
cd backend
npm install
npm run dev

# Test frontend locally
cd frontend
npm install
npm run dev

# Check build locally
cd frontend
npm run build
```

## Environment Variables Summary

### Backend (.env):
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/expense-tracker
JWT_SECRET=your-super-secret-jwt-key-here
NODE_ENV=production
```

### Frontend (.env):
```
VITE_API_URL=https://your-backend.vercel.app
```

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Verify all environment variables are set
3. Test API endpoints individually
4. Check browser console for frontend errors
5. Verify MongoDB connection

Your app should now be fully deployed and accessible online! 🚀 