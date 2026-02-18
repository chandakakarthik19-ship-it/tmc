# Vaaraahi Coding Solutions Development Setup

## Quick Start Guide

This workspace contains a full-stack MERN application for Vaaraahi Coding Solutions.

## Prerequisites
- Node.js 16+
- MongoDB Atlas account (free tier available)
- VS Code or similar editor

## Installation Steps

### 1. Setup Backend First
```bash
cd backend
npm install
cp .env.example .env
# Edit .env and add MongoDB Atlas connection string
```

### 2. Setup Frontend
```bash
cd frontend
npm install
```

### 3. Start Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# Runs on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# Runs on http://localhost:5173
```

## MongoDB Atlas Connection String Format
```
mongodb+srv://username:password@cluster0.mongodb.net/vaaraahi
```

Replace:
- `username` - Your MongoDB Atlas username
- `password` - Your MongoDB Atlas password
- `cluster0` - Your cluster name

## Project Structure
- `/frontend` - React application with Tailwind CSS
- `/backend` - Node.js + Express API server
- Dashboard features: Courses, Batches, Alumni, Inquiries

## API Endpoints
- Courses: `/api/courses`
- Batches: `/api/batches`
- Alumni: `/api/alumni`
- Inquiries: `/api/inquiries`

## Features Included
✅ Responsive design
✅ Course management
✅ Batch scheduling
✅ Alumni profiles
✅ Inquiry form
✅ RESTful API
✅ MongoDB integration

## Next Steps
1. Install dependencies (npm install in both frontend and backend)
2. Configure MongoDB connection string
3. Start development servers
4. Visit http://localhost:5173 for the application

For detailed information, see README.md in the project root.
