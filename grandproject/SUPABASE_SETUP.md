# Supabase Setup Guide

## Why Magic Link Authentication is Failing

The magic link authentication is failing because Supabase is not configured. You need to set up a Supabase project and add the environment variables.

## Quick Setup Steps

### 1. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Choose your organization
5. Enter project details:
   - **Name**: `recipe-generator` (or any name you prefer)
   - **Database Password**: Choose a strong password
   - **Region**: Choose closest to your users
6. Click "Create new project"

### 2. Get Your Project Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (looks like: `https://your-project-id.supabase.co`)
   - **anon public** key (starts with `eyJ...`)

### 3. Configure Environment Variables

Create a `.env.local` file in your project root with:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

Replace the values with your actual Supabase credentials.

### 4. Enable Email Auth

1. In Supabase dashboard, go to **Authentication** → **Providers**
2. Make sure **Email** is enabled
3. Configure email settings if needed

### 5. Set Up Email Templates (Optional)

1. Go to **Authentication** → **Email Templates**
2. Customize the magic link email template
3. Set the redirect URL to: `https://your-domain.com/auth/callback`

## Alternative: Disable Authentication Temporarily

If you want to test the recipe generation without authentication, you can:

1. Update the dashboard page to not require authentication
2. Comment out the auth checks in the Header component

## Testing

After setup:
1. Restart your development server: `npm run dev`
2. Go to `/auth` page
3. Enter your email
4. Check your email for the magic link
5. Click the link to sign in

## Troubleshooting

- **"Authentication is not configured"**: Check your environment variables
- **"Invalid API key"**: Verify your Supabase credentials
- **No email received**: Check spam folder and Supabase email settings
- **Redirect error**: Make sure the callback URL is correct in Supabase settings 