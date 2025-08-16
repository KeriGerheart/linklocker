# linklocker

App to share secure links
This app uses React/Next.js on the frontend and Express on the back. The DB is Mongo.
This app is configured using Clerk for auth. You will need to sign up for an account at https://clerk.com/ to get the API keys needed.

The app is currently running live at: https://linklocker-alpha.vercel.app/

## Installation

### 1. Clone the repository

Either download the zip file or git clone from: https://github.com/KeriGerheart/linklocker.git

### 2. Install dependencies

**Backend:**

```bash
cd backend
npm install
```

**Frontend:**

```bash
cd frontend
npm install
```

---

## Environment Variables

The backend and frontend folders each have an .env file.

anything in quotes that starts with replace_with_your ..., you should replace with the appropriate values, the others (clerk redirects) should be pasted into your file as they are.

For the backend you need:

MONGODB_URI="replace_with_your_mongodb_connection_string"
FRONTEND_ORIGIN="replace_with_your_frontend_URL"

For the frontend you need:

NEXT*PUBLIC_CLERK_PUBLISHABLE_KEY="replace_with_your_next_clerk_key"
CLERK_SECRET_KEY="replace_with_your_clerk_secret_key"
CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/dashboard
NEXT_PUBLIC_API_BASE="replace_with_your_backend_url"
NEXT_PUBLIC_SITE_URL=your*"replace_your_with_front_end_url"
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/dashboard

---

## Running the App

### 1. Start the server

```bash
cd backend
npm run start
```

### 2. Start the client

```bash
cd frontend
npm run dev
```

When running locally, your front end will print the URL where it can be viewed (this will vary based on how many local servers you might be running).
The backend is set to run on port 3001, but this can be changed by editing the index.js file, then your env values can be adjusted as needed.
