import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hxkkfkbsdanrpdodhtiv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4a2tma2JzZGFucnBkb2RodGl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5ODU5MDksImV4cCI6MjA2OTU2MTkwOX0.0SB1UBHOiKQ28lgToj6tkM5dmyidao6_3fV8RNv4Hik';

export const supabase = createClient(supabaseUrl, supabaseAnonKey)