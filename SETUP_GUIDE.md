# 🚀 COPEMS Email Verification Setup - Quick Start Guide

## ✅ Status: Ready to Test!

The backend server is configured and running. Here's what you need to do:

### 📋 Setup Steps (IN ORDER):

1. **Database Setup** ✅ 
   - Run this SQL in phpMyAdmin to create the `copems` database and table:
   ```sql
   CREATE DATABASE IF NOT EXISTS copems;
   USE copems;
   -- The table is already created by the setup script
   ```

2. **Backend Server** ✅
   ```bash
   cd backend
   npm start
   ```
   Server runs on: http://localhost:4001

3. **Frontend Server**
   ```bash
   cd copems
   npm run dev  
   ```
   Should run on: http://localhost:3000

4. **EmailJS Configuration** ⚠️ REQUIRED
   Update `/copems/src/config/email.js`:
   ```javascript
   export const EMAIL_CONFIG = {
     PUBLIC_KEY: "YOUR_ACTUAL_EMAILJS_PUBLIC_KEY", // Get from EmailJS dashboard
     SERVICE_ID: "service_yhi7znt",
     TEMPLATE_ID: "template_c0p808c"
   };
   ```

### 🎯 How Email Verification Works:

1. **Register** → User fills form → Backend saves with `email_verified: false`
2. **Email Sent** → EmailJS sends confirmation email with verification link
3. **User Clicks Link** → Opens `/confirm-email?token=xxx` page
4. **Backend Verifies** → Updates `email_verified: true`
5. **Login Enabled** → User can now login and access the system

### 🔧 Current Configuration:

- **Backend**: http://localhost:4001 
- **Frontend**: http://localhost:3000
- **CORS**: Configured for both ports
- **Database**: `copems` with `user_account` table
- **API Endpoints**:
  - POST `/api/user/register`
  - POST `/api/user/verify-email` 
  - POST `/api/user/login`

### ⚡ Test the Flow:

1. Go to: http://localhost:3000/register
2. Fill the form with a real email
3. Check your email for confirmation link
4. Click the link to verify
5. Login at: http://localhost:3000/login

### 🔍 Troubleshooting:

- **CORS Error**: Make sure frontend is on port 3000
- **Email not sending**: Update EmailJS config in `/copems/src/config/email.js`
- **Database error**: Run `node setup-database.js` in backend folder
- **Server not starting**: Check if port 4001 is free

The system is ready! Just update your EmailJS configuration and test the registration flow! 🎉