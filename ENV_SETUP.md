# Environment Setup Guide

## Problem Solved ✓

The `.env` file has been removed from git tracking. It will no longer cause issues during Vercel deployment.

## How Environment Variables Work Now

### Development (Local Machine)

1. **Create a `.env` file locally** (this file is in .gitignore):
```
VITE_API_URL=http://localhost:5000/api
```

2. **Start development server**:
```bash
bun run dev
```

The app will use the `http://localhost:5000/api` URL for API calls.

### Production (Vercel)

1. **Go to your Vercel Dashboard**

2. **Navigate to: Project Settings → Environment Variables**

3. **Add this variable for Production environment:**
   - Key: `VITE_API_URL`
   - Value: `https://your-production-api-domain.com/api` (replace with your actual backend URL)

4. **Redeploy** (or push to main branch to auto-deploy)

Vercel will automatically inject the environment variable during build and runtime.

## Security Features ✓

- ✓ `.env` file is in `.gitignore` - won't be committed
- ✓ `.env.example` shows what variables are needed
- ✓ Production requires explicit environment variable setup in Vercel
- ✓ Better error messaging if VITE_API_URL is missing in production

## Quick Reference

| Environment | How to Set VITE_API_URL | Where It's Stored |
|-------------|----------------------|------------------|
| **Development** | Create `.env` file | Local machine (git ignored) |
| **Production** | Vercel Dashboard | Vercel environment variables |

## Troubleshooting

### "Cannot connect to API" in production?
1. Check Vercel project settings → Environment Variables
2. Verify `VITE_API_URL` is set correctly
3. Open browser console (F12) to see error details
4. Check that your backend is accessible from the internet

### "API_URL is not set" error?
This means the environment variable wasn't injected. Check:
1. Variable is set in Vercel dashboard for Production environment
2. Variable name is exactly `VITE_API_URL` (case-sensitive)
3. Click redeploy button in Vercel dashboard

## Next Steps

1. Don't commit `.env` to git (it's excluded in .gitignore)
2. Add your local `.env` file:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```
3. In Vercel dashboard, set production environment variable
4. Test locally, then push to GitHub to auto-deploy
