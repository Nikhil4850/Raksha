# Database Setup for SafeHer

## ✅ **Connected Supabase Project**
- **Project URL:** `https://nxyahaqqeczgpqwoxlpn.supabase.co`
- **Status:** Connected and ready for setup

## 🚀 **Quick Setup Steps**

### 1. Run Database Schema
1. Go to your [Supabase Dashboard](https://nxyahaqqeczgpqwoxlpn.supabase.co)
2. Navigate to **SQL Editor**
3. Copy and paste the contents of `setup-database.sql`
4. Click **Run** to execute the schema

### 2. Verify Setup
After running the SQL, you should see:
- ✅ `user_profiles` table created
- ✅ Row Level Security enabled
- ✅ Policies created for user data protection
- ✅ Auto-timestamp triggers configured

## 📋 **Database Schema**

### user_profiles Table Structure:
```sql
- id (UUID) - Links to auth.users
- name (TEXT) - User's full name
- age (INTEGER) - User age (13-120)
- email (TEXT) - User email address
- phone (TEXT) - Optional phone number
- emergency_contacts (JSONB) - Emergency contact list
- location_sharing_enabled (BOOLEAN) - Location sharing preference
- created_at (TIMESTAMP) - Account creation time
- updated_at (TIMESTAMP) - Last profile update
```

## 🔐 **Security Features**
- **Row Level Security (RLS)** enabled
- Users can only access their own data
- Automatic timestamp tracking
- Age validation (13-120 years)
- Secure profile creation

## 🧪 **Testing the Connection**

### Test Sign Up:
1. Open the app at `http://localhost:3000`
2. Navigate to **Login** → **Sign Up**
3. Fill in:
   - Full Name: "Test User"
   - Age: "25"
   - Email: "test@example.com"
   - Password: "password123"
4. Submit the form

### Verify in Database:
1. Go to Supabase Dashboard
2. Navigate to **Table Editor**
3. Click on `user_profiles` table
4. You should see the new user record

## 🎯 **Next Steps**
Once database is set up:
- ✅ Users can register with name and age
- ✅ Profiles are automatically saved
- ✅ Welcome message shows user's name
- ✅ All data is secured with RLS

## 📞 **Need Help?**
If you encounter any issues:
1. Check the SQL execution results in Supabase
2. Verify the `user_profiles` table exists
3. Ensure RLS policies are created
4. Test the sign-up flow in the app
