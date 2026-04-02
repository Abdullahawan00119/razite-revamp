# Deployment Guide - Vercel

This guide explains how to deploy the Razite application to Vercel.

## Prerequisites

- Vercel account (free at https://vercel.com)
- GitHub repository with this code
- Production backend API URL

## Environment Variables

Set the following environment variables in your Vercel project settings:

### Required Variables

- **VITE_API_URL** - Your production backend API URL (e.g., https://api.yourdomain.com/api)

### Setting Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the environment variables listed above
4. Make sure they're set for the **Production** environment

## Deployment Steps

### Option 1: Automatic Deployment (Recommended)

1. Push your code to GitHub
2. Go to https://vercel.com/import
3. Select your repository
4. Vercel will auto-detect Vite configuration
5. Add environment variables in the settings
6. Click "Deploy"

### Option 2: Manual Deployment via CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Deploy from project root
vercel --prod

# Follow the prompts to set environment variables
```

## Post-Deployment Checklist

- [ ] Verify the application loads without errors
- [ ] Test admin login functionality
- [ ] Test API calls to backend (check Network tab)
- [ ] Verify environment variables are properly set
- [ ] Test all pages load correctly
- [ ] Check Console for any warnings/errors
- [ ] Test on mobile devices
- [ ] Verify CORS is properly configured on backend

## Troubleshooting

### Build Fails
- Check that all dependencies are in `package.json`
- Verify Node/Bun version compatibility
- Check build logs in Vercel dashboard

### API Calls Fail in Production
- Verify `VITE_API_URL` is set correctly in Vercel environment variables
- Check that backend URL is accessible from the internet
- Verify CORS headers are properly configured on backend
- Check browser Console for CORS errors

### Environment Variables Not Loaded
- Ensure variables are prefixed with `VITE_` (Vite requirement)
- Redeploy after adding environment variables
- Check that variables are set for the correct environment (Production)

### Static Asset 404 Errors
- Verify `vite.config.ts` build configuration
- Check that `dist` folder is created during build
- Ensure all imports use correct paths

## Build Configuration

The application is configured in `vite.config.ts` with:
- React + SWC for fast builds
- Source map generation
- Path aliasing (@/ → src/)
- Optimized bundle splitting

## Performance Optimization

- Assets are minified and optimized
- Code splitting enabled automatically
- CSS is tree-shaken
- Unused dependencies excluded

## Monitoring & Analytics

Consider adding:
- Error tracking (Sentry)
- Performance monitoring (Vercel Web Analytics)
- Google Analytics (optional variable: VITE_GA_ID)

## Rollback

If you need to rollback to a previous deployment:
1. Go to your Vercel project dashboard
2. Navigate to **Deployments**
3. Click the three dots on the previous deployment you want
4. Select **Promote to Production**

## Support

For Vercel-specific issues, visit: https://vercel.com/docs
For framework-specific issues, visit: https://vitejs.dev
