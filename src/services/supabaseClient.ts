import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jffebjndovvquuqeypjk.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmZmViam5kb3Z2cXV1cWV5cGprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5NzI1MzEsImV4cCI6MjA2NzU0ODUzMX0.AlPji8Q9X0YSyKix_ti88xeqhXmvkVJL8wVRL0vXYhk"  // ✅ Vite-specific env access

export const supabase = createClient(supabaseUrl, supabaseKey)
