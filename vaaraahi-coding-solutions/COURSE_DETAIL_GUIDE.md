# Course Detail Page - Implementation Guide

## Overview

A new **Course Detail Page** has been added to your MERN application. This page displays comprehensive information about a specific course when users click on a course from the Courses listing page.

## Features

### What's New

✅ **Detailed Course Information**
- Course name, category (Medical/IT)
- Comprehensive description
- Course duration, mode, and instructor
- Maximum batch size
- Industry certification details

✅ **Interactive Course Sections**
- Course Overview with detailed description
- "What You'll Learn" section with curriculum items
- Course Features with icons (Industry-standard, Hands-on, Certification, Support)
- Learning Schedule (Weekly Quizzes, Final Assessment)
- Detailed course specifications table

✅ **Enrollment & Information Request**
- Enroll Now button (ready for payment integration)
- Request Information form with validation
- Quick FAQ section
- Call-to-action section

✅ **Modern UI/UX**
- Sticky enrollment card on desktop
- Smooth animations (slideUp, slideRight)
- Gradient header with course stats
- Responsive design for all devices
- Loading and error states

## Project Structure Changes

### New Files Created

```
frontend/src/pages/
└── CourseDetail.jsx           # New course detail page component
```

### Modified Files

```
frontend/src/
├── App.jsx                    # Added CourseDetail route
└── pages/Courses.jsx          # Updated with navigation links

backend/
├── seed.js                    # New file - populate sample courses
└── package.json               # Added seed script
```

## Routes Added

### Frontend Routes (React Router)

```javascript
// App.jsx
<Route path="/course/:id" element={<CourseDetail />} />
```

### API Endpoints Used

The CourseDetail component uses these existing backend endpoints:

- `GET /api/courses/:id` - Fetch single course details
- `POST /api/inquiries` - Submit information request

## Component Structure

### CourseDetail.jsx Props

The component works with course data from MongoDB with the following fields:

```javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  category: 'Medical' | 'IT',
  duration: String,        // e.g., "70 Days"
  mode: 'Online' | 'Offline' | 'Online/Offline',
  price: Number,
  instructor: String,
  maxStudents: Number,
  curriculum: [String],
  prerequisites: [String],
  certification: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Setup Instructions

### Step 1: Verify Installation

Ensure both frontend and backend are properly set up:

```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

### Step 2: Seed Sample Courses

Populate your MongoDB with sample courses containing complete information:

```bash
cd backend
npm run seed
```

This command will:
- Connect to your MongoDB Atlas database
- Delete existing courses
- Insert 8 sample courses (Python, Java, C, C++, CPC, CCS, SDS, Home Health Coding)
- Display success confirmation

### Step 3: Update Course Data (Optional)

If you want to add your own courses, you can:

**Option A: Use MongoDB Atlas UI**
1. Log in to MongoDB Atlas
2. Go to your collection
3. Manually insert documents with the course schema

**Option B: Create API Endpoint**
Make a POST request to `/api/courses`:

```bash
curl -X POST http://localhost:5000/api/courses \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Your Course Name",
    "description": "Detailed description",
    "category": "IT",
    "duration": "60 Days",
    "mode": "Online",
    "price": 4999,
    "instructor": "Instructor Name",
    "maxStudents": 30,
    "curriculum": ["Topic 1", "Topic 2", "Topic 3"],
    "certification": "Certification Name"
  }'
```

### Step 4: Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Both servers should be running:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

### Step 5: Test the Feature

1. Navigate to http://localhost:5173/courses
2. Click "View Details" on any course
3. You should see the full course detail page
4. Try the "Request Information" form (will submit to course inquiries)

## Component Usage

### Import and Use

```jsx
import CourseDetail from './pages/CourseDetail'

// Already configured in App.jsx routes
<Route path="/course/:id" element={<CourseDetail />} />
```

### Manual Navigation

To navigate to a course detail page programmatically:

```jsx
import { useNavigate } from 'react-router-dom'

const navigate = useNavigate()
navigate(`/course/${courseId}`)
```

## Features Deep Dive

### Course Header Section

- Sticky, gradient background header
- Course title and category badge
- 4-column stats grid (Duration, Mode, Max Students, Instructor)
- Back to courses button

### Content Sections

1. **Course Overview**
   - Full course description
   - Card-hover effect styling

2. **What You'll Learn**
   - Bullet-point list from curriculum array
   - Animated bullet points
   - Gradient accent bullets

3. **Course Features**
   - 4-feature grid layout
   - Icons with descriptions
   - Hover effects

4. **Learning Schedule**
   - Weekly Quizzes info
   - Final Assessment info
   - Icon indicators

5. **Course Details Table**
   - Duration, Mode, Instructor, Certification, Batch Size
   - Bordered layout with semantic data

### Enrollment Sidebar

- Sticky positioning on desktop
- 4 benefit checkmarks
- "Enroll Now" primary button
- "Request Information" secondary button
- Optional form display
- Quick FAQ section

### Information Request Form

- Name input (required)
- Email input (required)
- Phone input (required)
- Form validation
- Success/error feedback
- Submits to `/api/inquiries` endpoint

### Call-to-Action Section

- Full-width gradient footer section
- Encouragement message
- CTA button
- Responsive design

## Customization Guide

### Change Course Data Fields

Update the course model in `backend/models/Course.js` and modify the CourseDetail component to display new fields:

```jsx
// In CourseDetail.jsx
<p className="text-gray-700">{course.yourNewField}</p>
```

### Modify Colors

Update the gradient colors in CourseDetail.jsx:

```jsx
// Change from indigo-600 to your preferred color
className="bg-gradient-to-r from-your-color-600 via-your-color-500 to-cyan-400"
```

### Update Button Text

```jsx
// Change "View Details" text in Courses.jsx
<Link to={`/course/${course._id}`}>
  Your Custom Text
</Link>
```

### Add More Sections

Add new sections following the same pattern:

```jsx
<section className="animate-slideUp" style={{ animationDelay: '0.5s' }}>
  <h2 className="text-4xl font-bold mb-6 gradient-text">New Section</h2>
  {/* Content here */}
</section>
```

## Animations Used

The CourseDetail page uses several animations from the global CSS:

- `slideUp` - Content slides up on load
- `slideRight` - Sidebar slides in from right
- Animation delays (0s, 0.1s, 0.2s, etc.) for staggered effect
- Smooth transitions on hover
- Loading spinner animation

## Troubleshooting

### Course Not Displaying

1. Check MongoDB connection:
   ```bash
   # Backend console should show "Connected to MongoDB"
   ```

2. Verify course exists in database:
   ```bash
   # Check MongoDB Atlas UI or run seed command
   npm run seed
   ```

3. Check browser console for errors (F12 → Console)

### 404 Error on Course Page

- Ensure the course ID is valid
- Check the backend `/api/courses/:id` endpoint is working
- Test with Postman: `GET http://localhost:5000/api/courses/{courseId}`

### Form Submission Not Working

1. Ensure backend is running on port 5000
2. Check CORS configuration in backend server.js
3. Verify `/api/inquiries` endpoint exists
4. Check browser console for errors

### Animations Not Working

1. Ensure Tailwind CSS is compiled correctly
2. Clear browser cache (Ctrl+Shift+Delete)
3. Restart dev server
4. Check that index.css has animation keyframes defined

## Integration with Payment

To enable "Enroll Now" button:

1. Update the button click handler
2. Integrate with Stripe/Razorpay
3. Add enrollment logic to backend

```jsx
const handleEnroll = async () => {
  // Implement payment gateway integration
}

<button onClick={handleEnroll} className="btn-primary">
  Enroll Now
</button>
```

## Next Steps

1. ✅ Run `npm run seed` to populate courses
2. ✅ Start both frontend and backend servers
3. ✅ Test navigation from Courses → Course Detail page
4. ✅ Customize courses data in MongoDB
5. Optional: Add payment gateway integration
6. Optional: Add user authentication and enrollment tracking

## API Documentation

### Get Single Course

```
GET /api/courses/:id

Response:
{
  "_id": "ObjectId",
  "name": "Course Name",
  "description": "...",
  "category": "IT",
  "duration": "70 Days",
  "mode": "Online",
  "price": 4999,
  "instructor": "Instructor Name",
  "maxStudents": 30,
  "curriculum": ["Topic 1", "Topic 2"],
  "prerequisites": ["Prerequisite"],
  "certification": "Certification Name"
}
```

### Submit Information Request

```
POST /api/inquiries

Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 9999999999",
  "courseInterest": "Python Programming",
  "message": "Optional message"
}

Response:
{
  "statusCode": 201,
  "message": "Inquiry created successfully"
}
```

## Support

For issues or questions:
- Check the error message in browser console
- Verify MongoDB connection
- Ensure all dependencies are installed
- Review the troubleshooting section above

---

**Happy Learning! Your course detail page is ready to showcase your courses beautifully!** 🎉
