# linklocker

App to share secure links
This app uses React/Next.js on the frontend and Express on the back. The DB is Mongo.
This app is configured using Clerk for auth. You will need to sign up for an account at https://clerk.com/ to get the API keys needed.

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

For the backend you need:

MONGODB_URI=your_mongodb_connection_string

For the frontend you need:
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_next_clerk_key
CLERK_SECRET_KEY=your_clerk_secred_key

---

## Running the App

### 1. Start the server

You can either install nodemon or go with node index.js

```bash
cd backend
node index.js
```

### 2. Start the client

```bash
cd frontend
npm run dev
```

Your front end will print the URL where it can be viewed (this will vary based on how many local servers you might be running).
The backend is set to run on port 3001, but this can be changed by editing the index.js file
