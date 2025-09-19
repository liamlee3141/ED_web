import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://hmzuuuivrrxnitslrubn.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhtenV1dWl2cnJ4bml0c2xydWJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY2NzA3ODIsImV4cCI6MjA0MjI0Njc4Mn0.S2FZOLqiCE8-r4nBDhLdEJTj4kGpuOwNaMaArDKE2rY";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);