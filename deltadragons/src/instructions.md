# Setup

1. Create a free project at supabase.com.
2. Run `setup.sql` in the SQL Editor.
3. Authentication > Users > Add user (one per teammate, with email + password).
   Then copy each user's ID into the `team_members` table (Table Editor > Insert row).
4. In your Vite project:
   npm install @supabase/supabase-js react-router-dom
   Copy `src/` files in, and copy `.env.example` to `.env` with your project URL and anon key
   (Project Settings > API).
5. npm run dev, then open /admin.

Turn off public sign-ups (Authentication > Providers > Email > disable "Allow new users to sign up")
so only people you add can log in.
