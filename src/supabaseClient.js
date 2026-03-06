import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nxyahaqqeczgpqwoxlpn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im54eWFoYXFxZWN6Z3Bxd294bHBuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI1NTI0MjAsImV4cCI6MjA4ODEyODQyMH0.rdZt76t_9XmFG8QvEgIHOyRL85zETzPCkx-LeosNzm8';

export const supabase = createClient(supabaseUrl, supabaseKey);
