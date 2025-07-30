# Vercel Deployment Guide

This is a Next.js 14 application with the following structure:

## Project Structure
```
grandproject/
├── src/
│   ├── app/           # Next.js App Router
│   ├── components/    # React components
│   ├── lib/          # Utility libraries
│   └── types/        # TypeScript types
├── public/           # Static assets
├── package.json      # Dependencies and scripts
├── next.config.js    # Next.js configuration
├── tsconfig.json     # TypeScript configuration
├── vercel.json       # Vercel deployment configuration
└── .env.local        # Environment variables (not in repo)
```

## Key Files for Vercel Recognition
- ✅ `package.json` with Next.js dependencies
- ✅ `next.config.js` with proper configuration
- ✅ `src/app/layout.tsx` (root layout)
- ✅ `src/app/page.tsx` (root page)
- ✅ `vercel.json` with Next.js framework specification
- ✅ `tsconfig.json` with Next.js paths

## Build Commands
- **Install**: `npm install`
- **Build**: `npm run build`
- **Dev**: `npm run dev`
- **Start**: `npm run start`

## Environment Variables Required
Set these in Vercel dashboard:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `N8N_WEBHOOK_URL`

## Framework
This is a **Next.js 14** application using the **App Router**. 