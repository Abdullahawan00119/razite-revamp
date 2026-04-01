# Admin Dashboard Setup Guide

## Overview
The admin dashboard is now fully integrated with the backend API for CRUD operations on blogs, projects, and jobs.

## Project Structure

### Frontend (razite-revamp)
```
src/
├── components/
│   └── AdminLayout.tsx          # Admin sidebar navigation layout
├── pages/
│   ├── AdminDashboard.tsx       # Dashboard with stats
│   ├── AdminBlogs.tsx           # Blog CRUD management
│   ├── AdminProjects.tsx        # Project CRUD management
│   └── AdminJobs.tsx            # Job CRUD management
├── lib/
│   └── api.ts                   # API service with all endpoints
├── .env                         # Environment variables
└── App.tsx                      # Updated with admin routes
```

### Backend (razite-backend)
```
src/
├── config/
│   └── database.js              # MongoDB connection
├── models/
│   ├── Blog.js                  # Blog schema
│   ├── Project.js               # Project schema
│   └── Job.js                   # Job schema
├── controllers/
│   ├── BlogController.js        # Blog CRUD logic
│   ├── ProjectController.js     # Project CRUD logic
│   └── JobController.js         # Job CRUD logic
├── routes/
│   ├── blogRoutes.js            # Blog endpoints
│   ├── projectRoutes.js         # Project endpoints
│   └── jobRoutes.js             # Job endpoints
├── middleware/
│   └── errorHandler.js          # Error handling
├── utils/
│   ├── response.js              # Response formatters
│   └── validators.js            # Validation utilities
├── server.js                    # Express server
└── .env                         # Environment variables
```

## Getting Started

### 1. Backend Setup

Navigate to the backend directory:
```bash
cd razite-backend
npm install
```

Create/Update `.env` file:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/razite
JWT_SECRET=your-jwt-secret-key-change-this-in-production
JWT_EXPIRE=7d
CLIENT_ORIGIN=http://localhost:5173
MAX_FILE_SIZE=5242880
UPLOAD_DIR=./uploads
```

Start MongoDB (if using local instance):
```bash
# Make sure MongoDB is running on your system
```

Start the backend server:
```bash
npm run dev
```

You should see:
```
✅ Server is running on http://localhost:5000
```

### 2. Frontend Setup

Navigate to the frontend directory:
```bash
cd razite-revamp
npm install
```

Create/Update `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Accessing the Admin Dashboard

1. Navigate to: `http://localhost:5173/admin`
2. You'll see the admin dashboard with:
   - Navigation sidebar (left)
   - Dashboard overview with stats
   - Quick action panels

## Admin Panel Features

### Dashboard (`/admin`)
- **Real-time Stats**: Shows total blogs, projects, jobs, and open positions
- **Quick Actions**: Direct links to manage blogs, projects, and jobs
- **API Status**: Confirms backend connection

### Blogs Management (`/admin/blogs`)
**Create Blog:**
- Slug (unique identifier for URL)
- Title, Excerpt, Author
- Category (6 predefined categories)
- Read Time
- Status (Draft/Published)
- Featured toggle
- Content array

**View Blogs:**
- List all blogs with status badges
- Featured indicator
- Author, category, read time info

**Edit Blog:**
- Click edit button to modify any blog
- Updates saved to database

**Delete Blog:**
- Click delete button with confirmation
- Removed from database

### Projects Management (`/admin/projects`)
**Create Project:**
- Slug, Title, Description
- Image URL, Project Link
- Technologies (comma-separated)
- Project Type (Web, Mobile, Analytics, Cloud, AI/ML, Other)
- Status (Completed, Ongoing, Planned)
- Featured toggle

**Features:**
- Technology tags display
- Project type filtering
- Status indicators (color-coded)
- Featured projects highlighted

### Jobs Management (`/admin/jobs`)
**Create Job:**
- Job Title, Description
- Location: City, District (required)
- Type (Full-time, Part-time, Contract, Remote, Freelance)
- Department, Experience Level
- Status (Open, Closed, On Hold)
- Featured toggle

**Features:**
- View application count for each job
- Location information displayed
- Experience level indicators
- Department filtering available

## API Endpoints

### Blogs
```
GET    /api/blogs                    # Get all blogs with filters
GET    /api/blogs/:slug              # Get single blog
POST   /api/blogs                    # Create blog
PUT    /api/blogs/:id                # Update blog
DELETE /api/blogs/:id                # Delete blog
```

### Projects
```
GET    /api/projects                 # Get all projects with filters
GET    /api/projects/:slug           # Get single project
POST   /api/projects                 # Create project
PUT    /api/projects/:id             # Update project
DELETE /api/projects/:id             # Delete project
```

### Jobs
```
GET    /api/jobs                     # Get all open jobs with filters
GET    /api/jobs/:id                 # Get single job
POST   /api/jobs                     # Create job
PUT    /api/jobs/:id                 # Update job
DELETE /api/jobs/:id                 # Delete job
POST   /api/jobs/:id/apply           # Submit job application
```

## Error Handling

The admin dashboard includes comprehensive error handling:
- **Toast Notifications**: Success/Error messages appear at top of page
- **Error Boundaries**: Catches and displays API errors
- **Validation**: Form validation before submission
- **Network Errors**: Displays connection issues

## Features Implemented

✅ Complete CRUD operations for all three resources
✅ Real-time data synchronization
✅ Responsive design (Desktop & Mobile)
✅ Animated UI with Framer Motion
✅ Toast notifications for user feedback
✅ Loading states and spinners
✅ Error handling and validation
✅ Type-safe API integration with TypeScript
✅ Protected admin layout with sidebar navigation
✅ Quick access dashboard with statistics

## Troubleshooting

### Backend Connection Error
- Ensure MongoDB is running
- Check MONGODB_URI in .env
- Verify backend server is running on port 5000

### CORS Issues
- Confirm CLIENT_ORIGIN in backend .env = `http://localhost:5173`
- Check CORS middleware in Express server

### API Calls Not Working
- Open browser DevTools (F12)
- Check Network tab for API requests
- Verify VITE_API_URL in frontend .env

### MongoDB Connection Failed
- Install MongoDB Community Edition
- Start MongoDB service
```bash
# Windows (if using mongod.exe in PATH)
mongod

# macOS (using Homebrew)
brew services start mongodb-community

# Linux/Ubuntu
sudo systemctl start mongod
```

## Next Steps

1. **Authentication**: Implement JWT authentication for admin login
2. **File Uploads**: Add image/file upload functionality for projects and resumes
3. **Database Indexing**: Add indexes for better query performance
4. **Search & Filter**: Implement advanced search across resources
5. **Pagination**: Add pagination for large datasets
6. **Email Notifications**: Send emails for new job applications
7. **Analytics**: Add analytics dashboard for content performance
8. **Backups**: Implement automated database backups

## Notes

- All data is persisted in MongoDB
- Changes in admin panel are immediately reflected in the frontend
- Admin dashboard has no authentication layer (add this for production)
- The API follows RESTful conventions
- All responses include success flag for error handling

For more detailed API documentation, see [API-DOCUMENTATION.md](../razite-backend/API-DOCUMENTATION.md) in the backend folder.
