// supabase-config.js
const SUPABASE_URL = 'https://dixdxmiwrnwlolqfgbfd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRpeGR4bWl3cm53bG9scWZnYmZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcwNDQyNzQsImV4cCI6MjA4MjYyMDI3NH0.r6FfX9-eKU_bh75-lZCe6iENCaQPU0hC7BoA1KmfUbM';

// Initialize Supabase client
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
