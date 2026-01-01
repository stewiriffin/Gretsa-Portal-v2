import { createClient } from '@supabase/supabase-js';

// Supabase client configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please check your .env file.'
  );
}

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

// Database types (will be generated from Supabase schema)
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          role: 'student' | 'staff' | 'admin';
          full_name: string;
          student_id?: string;
          department?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['users']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['users']['Insert']>;
      };
      courses: {
        Row: {
          id: string;
          code: string;
          title: string;
          units: number;
          department: string;
          semester: string;
          instructor_id?: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['courses']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['courses']['Insert']>;
      };
      enrollments: {
        Row: {
          id: string;
          user_id: string;
          course_id: string;
          grade?: string;
          score?: number;
          status: 'enrolled' | 'completed' | 'dropped';
          enrolled_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['enrollments']['Row'], 'id' | 'enrolled_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['enrollments']['Insert']>;
      };
      financials: {
        Row: {
          id: string;
          user_id: string;
          balance: number;
          total_fees: number;
          paid_amount: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['financials']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['financials']['Insert']>;
      };
      transactions: {
        Row: {
          id: string;
          user_id: string;
          amount: number;
          type: 'payment' | 'fee' | 'fine' | 'refund';
          description: string;
          mpesa_code?: string;
          status: 'pending' | 'completed' | 'failed';
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['transactions']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['transactions']['Insert']>;
      };
    };
  };
}
