# GRETSA University Portal - Supabase Database Schema

This document contains SQL commands to set up the database schema for the GRETSA University Portal.

## Prerequisites

1. Create a Supabase project at https://app.supabase.com
2. Get your project URL and anon key from Project Settings > API
3. Update the `.env` file with your credentials
4. Run the SQL commands below in the Supabase SQL Editor

---

## 1. Enable Row Level Security (RLS)

Run this first to enable RLS on all tables:

```sql
-- Enable RLS on all tables by default
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO anon, authenticated;
```

---

## 2. Create Users Table

```sql
-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('student', 'staff', 'admin')),
  full_name TEXT NOT NULL,
  student_id TEXT UNIQUE,
  department TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policies for users table
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
  ON public.users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.users FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Admin can view all users"
  ON public.users FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
```

---

## 3. Create Courses Table

```sql
-- Courses table
CREATE TABLE IF NOT EXISTS public.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  units INTEGER NOT NULL DEFAULT 3,
  department TEXT NOT NULL,
  semester TEXT NOT NULL,
  instructor_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policies for courses
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view courses"
  ON public.courses FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Staff can create courses"
  ON public.courses FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND role IN ('staff', 'admin')
    )
  );

CREATE POLICY "Staff can update courses"
  ON public.courses FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND role IN ('staff', 'admin')
    )
  );
```

---

## 4. Create Enrollments Table

```sql
-- Enrollments table (links students to courses)
CREATE TABLE IF NOT EXISTS public.enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  grade TEXT,
  score NUMERIC(5, 2),
  status TEXT NOT NULL DEFAULT 'enrolled' CHECK (status IN ('enrolled', 'completed', 'dropped')),
  enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, course_id)
);

-- RLS Policies for enrollments
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view their own enrollments"
  ON public.enrollments FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Staff can view all enrollments"
  ON public.enrollments FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND role IN ('staff', 'admin')
    )
  );

CREATE POLICY "Staff can create enrollments"
  ON public.enrollments FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND role IN ('staff', 'admin')
    )
  );

CREATE POLICY "Staff can update enrollments"
  ON public.enrollments FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND role IN ('staff', 'admin')
    )
  );
```

---

## 5. Create Financials Table

```sql
-- Financials table (student fee balances)
CREATE TABLE IF NOT EXISTS public.financials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  balance NUMERIC(10, 2) NOT NULL DEFAULT 0,
  total_fees NUMERIC(10, 2) NOT NULL DEFAULT 0,
  paid_amount NUMERIC(10, 2) NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policies for financials
ALTER TABLE public.financials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view their own financials"
  ON public.financials FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admin can view all financials"
  ON public.financials FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admin can update financials"
  ON public.financials FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
```

---

## 6. Create Transactions Table

```sql
-- Transactions table (payment history)
CREATE TABLE IF NOT EXISTS public.transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  amount NUMERIC(10, 2) NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('payment', 'fee', 'fine', 'refund')),
  description TEXT NOT NULL,
  mpesa_code TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policies for transactions
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view their own transactions"
  ON public.transactions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admin can view all transactions"
  ON public.transactions FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Students can create payment transactions"
  ON public.transactions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id AND type = 'payment');

CREATE POLICY "Admin can create any transactions"
  ON public.transactions FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
```

---

## 7. Create Updated_At Trigger Function

```sql
-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to tables with updated_at
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_enrollments_updated_at
  BEFORE UPDATE ON public.enrollments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_financials_updated_at
  BEFORE UPDATE ON public.financials
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

---

## 8. Create Automatic User Profile Function

```sql
-- Function to automatically create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, role, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'role', 'student'),
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'New User')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call the function on new auth user
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
```

---

## 9. Seed Data (Optional - for testing)

```sql
-- Insert sample courses
INSERT INTO public.courses (code, title, units, department, semester) VALUES
('CS101', 'Introduction to Computer Science', 3, 'Computer Science', 'Fall 2024'),
('MATH201', 'Calculus II', 4, 'Mathematics', 'Fall 2024'),
('ENG101', 'English Composition', 3, 'English', 'Fall 2024'),
('BIO101', 'General Biology', 4, 'Biology', 'Fall 2024')
ON CONFLICT (code) DO NOTHING;
```

---

## Setup Complete!

After running all the SQL commands above, your database schema is ready. Make sure to:

1. ✅ Update your `.env` file with Supabase credentials
2. ✅ Test authentication by creating a user
3. ✅ Verify RLS policies are working correctly
4. ✅ Create sample data for testing

## Next Steps

- Configure email templates in Supabase Auth settings
- Set up storage buckets for file uploads (student documents, profile pictures)
- Configure webhooks for M-Pesa payment integration
- Set up realtime subscriptions for live data updates
