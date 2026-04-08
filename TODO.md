# TODO: Fix Vercel JSON Parse Error on Login

## Steps:
- [x] Step 1: Create safe JSON response handler in src/lib/api.ts
- [x] Step 2: Refactor AuthContext.tsx login() to use safe parsing
- [x] Step 3: Refactor AuthContext.tsx verifyStoredToken() 
- [x] Step 4: Refactor AuthContext.tsx verifyToken()
- [ ] Step 5: Test locally: Run `npm run dev` and test admin login
- [ ] Step 6: Deploy to Vercel: `vercel --prod` and test login
- [ ] Step 7: Ensure VITE_API_URL is set in Vercel dashboard (your backend URL)

