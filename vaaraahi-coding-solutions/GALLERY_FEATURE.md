# Gallery Feature Documentation

## Overview
The Gallery page allows users to view images and provides admin functionality to upload and manage images.

## Features

### User Features
- View all uploaded images in a responsive grid layout
- Click on any image to view it in full-screen detail mode
- Filter images by category (coming soon)
- Responsive design that works on all devices

### Admin Features
- **Admin Login**: Click "Admin Login" button and use password: `admin123`
- **Upload Images**: Add new images with title, description, URL, and category
- **Delete Images**: Remove unwanted images from the gallery
- **Image Categories**: 
  - General
  - Events
  - Achievements
  - Classroom
  - Students

## Setup Instructions

### 1. Seed Sample Gallery Data
Run the following command to populate the gallery with sample images:

```bash
cd backend
node seedGallery.js
```

### 2. Admin Access
- Default admin password: `admin123`
- For production, implement proper authentication
- Admin status is stored in localStorage

### 3. Image Upload
When uploading images, you can use:
- Direct image URLs from image hosting services
- URLs from platforms like Unsplash, Pexels, or your own CDN
- Format should be a valid image URL ending in .jpg, .png, .jpeg, or .gif

## API Endpoints

### GET /api/gallery
Get all gallery images (sorted by newest first)

### GET /api/gallery/:id
Get a single image by ID

### POST /api/gallery
Create a new gallery image
**Body**: 
```json
{
  "title": "Image Title",
  "description": "Image Description",
  "imageUrl": "https://example.com/image.jpg",
  "category": "events"
}
```

### PUT /api/gallery/:id
Update an existing image

### DELETE /api/gallery/:id
Delete an image

### GET /api/gallery/category/:category
Get images by category

## Security Recommendations for Production

1. **Implement Proper Authentication**
   - Replace simple password with JWT authentication
   - Add user roles (admin, moderator, user)
   - Use secure password hashing (bcrypt)

2. **File Upload Security**
   - Implement actual file upload (e.g., using Multer)
   - Validate file types and sizes
   - Use cloud storage (AWS S3, Cloudinary, etc.)
   - Scan uploaded files for malware

3. **Rate Limiting**
   - Add rate limiting to prevent abuse
   - Implement CAPTCHA for uploads

4. **Input Validation**
   - Validate and sanitize all inputs
   - Check URL validity before saving
   - Prevent XSS attacks

## Customization

### Adding New Categories
Edit `backend/models/Gallery.js`:
```javascript
category: {
  type: String,
  enum: ['general', 'events', 'achievements', 'classroom', 'students', 'YOUR_NEW_CATEGORY'],
  default: 'general'
}
```

Also update the category select in `frontend/src/pages/Gallery.jsx`.

### Changing Admin Password
In production, use environment variables:
```javascript
// In Gallery.jsx
const ADMIN_PASSWORD = process.env.REACT_APP_ADMIN_PASSWORD || 'admin123'
```

## Technologies Used
- **Frontend**: React, TailwindCSS, Axios
- **Backend**: Node.js, Express, MongoDB
- **Database**: MongoDB with Mongoose ODM

## Navigation
The Gallery link is available in:
- Header navigation (desktop and mobile)
- Footer Quick Links section
- Direct URL: `/gallery`

## Troubleshooting

### Images not loading
- Check if the image URL is valid and accessible
- Verify CORS settings if using external image sources
- Check browser console for errors

### Can't login as admin
- Clear browser localStorage
- Check if password is correct (default: admin123)
- Check browser console for errors

### API errors
- Ensure MongoDB is running
- Check backend server is running on port 5000
- Verify API proxy is configured correctly in Vite

## Future Enhancements
- Image upload from device (not just URL)
- Category filtering on frontend
- Search functionality
- Image editing capabilities
- Bulk upload
- Image compression and optimization
- Social sharing features
