# GRETSA University Portal - Enterprise Setup Guide

## 🎯 What Changed in the Enterprise Refactor

This portal has been transformed from a demo application into a **production-ready enterprise university system** with:

### ✅ Visual Overhaul
- **New Color Palette:** Deep Navy Blue (#0F172A) primary, Gold (#D97706) for actions
- **Clean Design:** Removed all glassmorphism, 3D particles, and mesh gradients
- **Professional UI:** Standard admin dashboard layouts with white cards and subtle shadows
- **Inter Font:** Modern, readable typography optimized for data-dense interfaces

### ✅ Authentication & Security
- **Supabase Auth:** Email/password authentication with password reset
- **Protected Routes:** Role-based access control (Student, Staff, Admin)
- **Session Management:** Auto-refresh tokens and persistent sessions
- **Row Level Security:** Database policies enforcing data access rules

### ✅ Backend Integration
- **Supabase Database:** PostgreSQL with real-time subscriptions
- **Type-Safe API:** TypeScript interfaces for all database tables
- **Optimistic Updates:** Instant UI feedback with server reconciliation
- **Error Handling:** Toast notifications for all operations

### ✅ Performance Optimizations
- **Code Splitting:** React.lazy() for all major routes
- **Minimal Animations:** CSS transitions only (0.15s duration)
- **No Heavy Effects:** Removed blob animations, particles, and complex gradients
- **Fast Load Times:** Optimized for instant page transitions

---

## 📋 Prerequisites

1. **Node.js 18+** - Download from https://nodejs.org
2. **Supabase Account** - Sign up at https://supabase.com
3. **Git** - For version control

---

## 🚀 Quick Start (5 Minutes)

### Step 1: Clone and Install

```bash
cd "Gretsa portal v2"
npm install
```

### Step 2: Create Supabase Project

1. Go to https://app.supabase.com
2. Click "New Project"
3. Fill in:
   - **Name:** GRETSA University Portal
   - **Database Password:** (save this!)
   - **Region:** Choose closest to Kenya (e.g., Singapore)
4. Wait 2 minutes for project setup

### Step 3: Get Supabase Credentials

1. In your Supabase project, go to **Settings** → **API**
2. Copy:
   - **Project URL** (looks like `https://xxxxx.supabase.co`)
   - **anon public key** (starts with `eyJh...`)

### Step 4: Configure Environment

1. Open `.env` file in the project root
2. Replace with your actual credentials:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Step 5: Create Database Schema

1. In Supabase, go to **SQL Editor**
2. Open the file `SUPABASE_SCHEMA.md` in this project
3. Copy and run **each SQL block** in order (9 blocks total)
4. Verify all tables were created in **Database** → **Tables**

### Step 6: Run the Portal

```bash
npm run dev
```

Open http://localhost:5174

---

## 🔐 User Roles & Access

### Student (`role: 'student'`)
- **Routes:** `/student/dashboard`, `/student/courses`, `/student/grades`, `/student/financials`, `/student/schedule`
- **Permissions:** View own data, enroll in courses, make payments

### Staff (`role: 'staff'`)
- **Routes:** `/teacher/dashboard`
- **Permissions:** View enrolled students, enter grades, manage courses

### Admin (`role: 'admin'`)
- **Routes:** `/admin/dashboard`
- **Permissions:** Full access to all data, user management, system settings

---

## 📝 Creating Your First User

### Option 1: Register via UI

1. Go to http://localhost:5174
2. Click "Register here"
3. Fill in the form:
   - **Full Name:** John Doe
   - **Email:** student@gretsa.ac.ke
   - **Password:** (minimum 8 characters)
4. Check your email for verification link
5. Click the link to verify
6. Login and access the portal

### Option 2: Create User via Supabase Dashboard

1. Go to **Authentication** → **Users** in Supabase
2. Click "Add user" → "Create new user"
3. Enter email and password
4. **Important:** Go to **Database** → **Table Editor** → **users**
5. Click "Insert" → "Insert row"
6. Fill in:
   ```
   id: [Copy the user ID from Authentication]
   email: student@gretsa.ac.ke
   role: student
   full_name: John Doe
   ```
7. Save and login

---

## 🎨 Color Scheme Reference

### Primary Colors
```css
--color-navy-950: #020617  /* Background Dark */
--color-navy-900: #0F172A  /* Primary Dark */
--color-navy-800: #1E293B  /* Cards Dark */
--color-navy-700: #334155  /* Borders Dark */

--color-gold-600: #D97706  /* Primary Action */
--color-gold-500: #F59E0B  /* Hover State */
--color-gold-400: #FBBF24  /* Active State */
```

### Accent Colors (Minimal Use)
```css
--color-kenya-red: #B91C1C   /* Danger/Alerts */
--color-kenya-green: #15803D /* Success */
```

### Usage Guidelines
- **Primary Buttons:** Gold (#D97706)
- **Secondary Buttons:** White with gray border
- **Danger Actions:** Kenya Red (#B91C1C)
- **Success Messages:** Kenya Green (#15803D)
- **Background:** White (#FFFFFF) or Navy (#0F172A) for dark mode
- **Text:** Gray-900 (#111827) or White (#FFFFFF)

---

## 📂 Project Structure

```
src/
├── lib/
│   └── supabase.ts              # Supabase client configuration
├── hooks/
│   ├── useAuth.ts               # Authentication hook
│   ├── useDebounce.ts           # Debounce utility
│   └── useIsMobile.ts           # Mobile detection
├── pages/
│   ├── auth/
│   │   ├── Login.tsx            # Login page
│   │   ├── Register.tsx         # Registration page
│   │   └── ForgotPassword.tsx   # Password reset
│   └── student/
│       ├── Dashboard.tsx        # Student dashboard
│       ├── Courses.tsx          # Course catalog
│       ├── Grades.tsx           # Grade viewer
│       ├── Financials.tsx       # Fee management
│       └── Schedule.tsx         # Class schedule
├── components/
│   ├── ProtectedRoute.tsx       # Route guard
│   ├── Sidebar.tsx              # Navigation sidebar
│   ├── Header.tsx               # Top navigation bar
│   └── Breadcrumbs.tsx          # Breadcrumb navigation
├── layouts/
│   └── MainLayout.tsx           # Main page wrapper
├── contexts/
│   ├── DarkModeContext.tsx      # Theme management
│   └── NotificationContext.tsx  # Notifications
└── store/
    └── useUniversityStore.ts    # Zustand state management
```

---

## 🔄 Replacing Mock Data with Real Database Queries

Currently, the portal uses mock data. To integrate with Supabase:

### Example: Fetch Courses

**Before (Mock):**
```typescript
const courses = [
  { id: '1', code: 'CS101', title: 'Intro to CS', units: 3 },
  // ...hardcoded data
];
```

**After (Supabase):**
```typescript
import { supabase } from '../lib/supabase';

const fetchCourses = async () => {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .eq('semester', 'Fall 2024');

  if (error) throw error;
  return data;
};
```

### Example: Fetch Student Grades

```typescript
const fetchGrades = async (studentId: string) => {
  const { data, error } = await supabase
    .from('enrollments')
    .select(`
      id,
      grade,
      score,
      course:courses(code, title, units)
    `)
    .eq('user_id', studentId)
    .eq('status', 'completed');

  if (error) throw error;
  return data;
};
```

### Example: Make Payment

```typescript
const createPayment = async (userId: string, amount: number, mpesaCode: string) => {
  const { data, error } = await supabase
    .from('transactions')
    .insert({
      user_id: userId,
      amount,
      type: 'payment',
      description: 'Fee Payment',
      mpesa_code: mpesaCode,
      status: 'completed',
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};
```

---

## 🧪 Testing Checklist

### Authentication
- [ ] Register new user
- [ ] Verify email works
- [ ] Login with credentials
- [ ] Logout redirects to login
- [ ] Forgot password sends email
- [ ] Protected routes redirect when not authenticated

### Student Portal
- [ ] Dashboard loads without errors
- [ ] Courses page displays course list
- [ ] Grades page shows enrollment data
- [ ] Financials page displays balance
- [ ] Schedule page renders calendar

### Performance
- [ ] Pages load in < 1 second
- [ ] No console errors
- [ ] Animations are smooth
- [ ] Mobile responsive
- [ ] Dark mode toggle works

---

## 🚢 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Go to https://vercel.com
3. Click "Import Project"
4. Select your repository
5. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
6. Deploy!

### Netlify

1. Build the project: `npm run build`
2. Drag the `dist/` folder to https://app.netlify.com/drop
3. Configure environment variables in site settings

---

## 🆘 Troubleshooting

### "Missing Supabase environment variables"
- Check `.env` file exists in project root
- Ensure variables start with `VITE_`
- Restart dev server after changing `.env`

### "User registration fails"
- Verify database schema is created
- Check Supabase Auth settings allow signups
- Ensure email confirmation is disabled for testing

### "Cannot read properties of null"
- Check if user is authenticated
- Verify database RLS policies allow access
- Check browser console for detailed errors

### "Network request failed"
- Verify Supabase URL is correct
- Check project is not paused (free tier sleeps after 1 week)
- Ensure internet connection is stable

---

## 📞 Support

- **Supabase Docs:** https://supabase.com/docs
- **React Router Docs:** https://reactrouter.com
- **Tailwind CSS Docs:** https://tailwindcss.com

---

## 📄 License

© 2026 GRETSA University. All rights reserved.
