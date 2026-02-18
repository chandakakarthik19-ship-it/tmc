# Vaaraahi Coding Solutions - Full Stack Application

A complete MERN (MongoDB, Express.js, React, Node.js) stack application for Vaaraahi Coding Solutions - an educational platform offering medical coding and IT technical courses.

## Project Overview

This is a full-stack web application that mirrors the functionality of Vaaraahi Coding Solutions website:
- **Medical Coding Courses**: CPC, CCS, SDS, Home Health, ED/EM, IPDRG, etc.
- **IT Technical Courses**: Python, Java, C, C++ Programming
- **Batch Management**: Schedule upcoming and ongoing batches
- **Alumni Profiles**: Showcase success stories
- **Inquiry Management**: Handle student inquiries

## Tech Stack

### Frontend
- **React 18.2** - UI library
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **CORS** - Cross-origin resource sharing
- **Dotenv** - Environment variable management

## Project Structure

```
vaaraahi-coding-solutions/
├── frontend/                    # React frontend application
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   │   ├── Header.jsx     # Navigation header
│   │   │   └── Footer.jsx     # Footer component
│   │   ├── pages/             # Page components
│   │   │   ├── Home.jsx       # Homepage
│   │   │   ├── Courses.jsx    # Courses listing
│   │   │   ├── Alumni.jsx     # Alumni showcase
│   │   │   └── Contact.jsx    # Contact/Inquiry form
│   │   ├── App.jsx            # Root component
│   │   ├── main.jsx           # Entry point
│   │   └── index.css          # Global styles
│   ├── index.html             # HTML template
│   ├── package.json           # Dependencies
│   ├── vite.config.js         # Vite configuration
│   ├── tailwind.config.js     # Tailwind configuration
│   └── postcss.config.js      # PostCSS configuration
│
├── backend/                     # Express backend application
│   ├── models/                # MongoDB schemas
│   │   ├── Course.js          # Course model
│   │   ├── Batch.js           # Batch model
│   │   ├── Alumni.js          # Alumni model
│   │   └── Inquiry.js         # Inquiry model
│   ├── routes/                # API routes
│   │   ├── courseRoutes.js    # Course endpoints
│   │   ├── batchRoutes.js     # Batch endpoints
│   │   ├── alumniRoutes.js    # Alumni endpoints
│   │   └── inquiryRoutes.js   # Inquiry endpoints
│   ├── server.js              # Main server file
│   ├── package.json           # Dependencies
│   ├── .env.example           # Example environment variables
│   └── .gitignore             # Git ignore file
│
└── README.md                  # This file
```

## Prerequisites

- **Node.js** 16+ and **npm** or **yarn**
- **MongoDB Atlas** account (free tier available at https://www.mongodb.com/cloud/atlas)
- **Git** for version control
- A code editor (VS Code recommended)

## Installation & Setup

### 1. Clone Repository or Extract Project Files

```bash
cd vaaraahi-coding-solutions
```

### 2. Setup Backend

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file from .env.example
cp .env.example .env

# Edit .env and add your MongoDB Atlas connection string
# MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/vaaraahi
```

#### Getting MongoDB Atlas Connection String:

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster
4. Click "Connect" and choose "Connect your application"
5. Copy the connection string
6. Replace `username`, `password`, and `cluster0` with your credentials
7. Update the `.env` file with the connection string

### 3. Setup Frontend

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install
```

## Running the Application

### Development Environment

#### Terminal 1 - Start Backend Server:
```bash
cd backend
npm install  # if not done already
npm run dev
```
Backend will run on `http://localhost:5000`

#### Terminal 2 - Start Frontend Dev Server:
```bash
cd frontend
npm install  # if not done already
npm run dev
```
Frontend will run on `http://localhost:5173`

### Production Build

#### Frontend:
```bash
cd frontend
npm run build
# Creates optimized build in dist/ folder
```

#### Backend:
```bash
cd backend
npm start
```

## API Endpoints

### Courses Routes
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course by ID
- `GET /api/courses/category/:category` - Get courses by category
- `POST /api/courses` - Create new course
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course

### Batches Routes
- `GET /api/batches` - Get all batches
- `GET /api/batches/:id` - Get batch by ID
- `GET /api/batches/status/upcoming` - Get upcoming batches
- `POST /api/batches` - Create new batch
- `PUT /api/batches/:id` - Update batch
- `DELETE /api/batches/:id` - Delete batch

### Alumni Routes
- `GET /api/alumni` - Get all alumni
- `GET /api/alumni/:id` - Get alumni by ID
- `GET /api/alumni/featured/true` - Get featured alumni
- `GET /api/alumni/course/:course` - Get alumni by course
- `POST /api/alumni` - Create alumni profile
- `PUT /api/alumni/:id` - Update alumni profile
- `DELETE /api/alumni/:id` - Delete alumni profile

### Inquiries Routes
- `GET /api/inquiries` - Get all inquiries
- `GET /api/inquiries/:id` - Get inquiry by ID
- `GET /api/inquiries/status/:status` - Get inquiries by status
- `POST /api/inquiries` - Create new inquiry
- `PUT /api/inquiries/:id` - Update inquiry
- `DELETE /api/inquiries/:id` - Delete inquiry

## Features

### Frontend Features
- ✅ **Modern UI Design** - Contemporary gradient colors and shadows
- ✅ **Smooth Animations** - Fade-in, slide-up, scale, float, glow effects
- ✅ **Responsive Design** - Works perfectly on Desktop, Tablet & Mobile
- ✅ **Interactive Elements** - Hover effects, loading states, form validation
- ✅ **Course Filtering** - Filter courses by Medical/IT categories
- ✅ **Inquiry Form** - With validation and success feedback
- ✅ **Alumni Showcase** - Success stories with testimonials

### Backend Features
- ✅ **RESTful API** - Complete CRUD operations
- ✅ **MongoDB Integration** - Atlas cloud database support
- ✅ **Data Models** - Courses, Batches, Alumni, Inquiries
- ✅ **CORS Support** - Frontend-backend communication enabled
- ✅ **Environment Config** - Secure .env configuration
- ✅ **Data Validation** - Input validation and error handling

### Design Highlights
- 🎨 **Gradient Backgrounds** - Indigo → Blue → Cyan transitions
- 🎬 **10+ Animations** - Slide, fade, scale, float, glow effects
- 📱 **Mobile First** - Optimized for all screen sizes
- ♿ **Accessible** - WCAG compliance considerations
- ⚡ **Performance** - GPU-accelerated animations at 60fps

## Design System

### Colors
- **Primary Gradient**: Indigo-600 → Blue-500 → Cyan-400
- **Dark Mode**: Slate-900 → Slate-800
- **Accent**: Blue-500, Cyan-400
- **Text**: Gray-700 (dark), Gray-400 (light)

### Animations
- **Fade In** - Smooth opacity transition
- **Slide Up/Down/Left/Right** - Directional entrances
- *Documentation Files

- **[README.md](README.md)** - This file, project overview
- **[SETUP.md](SETUP.md)** - Quick setup instructions
- **[STYLING_UPDATE.md](STYLING_UPDATE.md)** - Comprehensive styling changes
- **[DESIGN_GUIDE.md](DESIGN_GUIDE.md)** - Design system documentation
- **[ANIMATIONS_REFERENCE.md](ANIMATIONS_REFERENCE.md)** - Animation code reference

## Troubleshooting

### MongoDB Connection Issues
- Ensure your MongoDB Atlas cluster is running
- Check that the connection string is correct in `.env`
- Verify your IP address is whitelisted in MongoDB Atlas
- Test connection with MongoDB Compass

### Port Already in Use
- Frontend: If port 5173 is busy, Vite will automatically use the next available port
- Backend: Change PORT in `.env` file if 5000 is already in use
- Check: `netstat -ano | findstr :5000` (Windows) or `lsof -i :5000` (Mac/Linux)

### CORS Errors
- Ensure backend is running before starting frontend
- Check that CORS middleware is properly configured in `server.js`
- Verify frontend proxy in `vite.config.js`

### Animations Not Showing
- Clear browser cache (Ctrl+Shift+Delete)
- Check if animations are disabled in system preferences
- Verify Tailwind CSS is compiled correctly
- Check browser console for CSS errors

### Dependencies Issues
```bash
# Complete clean install
rm -rf node_modules package-lock.json
npm install

# Or for yarn
rm -rf node_modules yarn.lock
yarn install
```

### Build Errors
```bash
# Clear Vite cache
rm -rf dist .vite

# Rebuild
npm run buildd course recommendations

## Troubleshooting

### MongoDB Connection Issues
- Ensure your MongoDB Atlas cluster is running
- Check that the connection string is correct in `.env`
- Verify your IP address is whitelisted in MongoDB Atlas

### Port Already in Use
- Frontend: If port 5173 is busy, Vite will automatically use the next available port
- Backend: Change PORT in `.env` file if 5000 is already in use

### CORS Errors
- Ensure backend is running before starting frontend
- Check that CORS middleware is properly configured in `server.js`

### Dependencies Issues
```bash
# Clean install
rm -rf node_modules
npm install
```

## Contributing

To contribute to this project:
1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Contact

**Vaaraahi Coding Solutions**
- Email: info@vaaraahi.com
- Phone: +91 7013428464 (Medical Courses)
- Phone: +91 6301932198 (IT Courses)
- Website: https://vaaraahicodingsolutions.in/

---

**Happy Learning! Made with ❤️ by Vaaraahi Coding Solutions**
