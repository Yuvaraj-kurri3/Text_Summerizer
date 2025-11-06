📝 Text Summarizer — Full Stack Web Application

A production-ready text summarization platform built using React, Node.js, Express, MongoDB, Redis, and HuggingFace AI.
It includes user authentication, history management, caching, queue processing, metrics logging, request tracing, correlation-ID tracking, and Real User Monitoring (RUM).

📌 Features
✅ Frontend (React + Vite)

    Modern UI built using React

    Login, Register, Logout

    Summarize long text using AI

    History page to view/delete summaries

    API wrapper (api.js) with:

    Automatic JWT token handling

    Automatic Correlation-ID

    Cookie support

    Centralized error handling
    
    CSS- Tailwind CSS
✅ Backend (Node.js + Express)

    JWT Authentication

    Protected Routes

    AI Summarization using HuggingFace BART model

    MongoDB storage

    Redis caching for fast retrieval

    Request/Response Tracing

    Metrics logging (latency, throughput, memory, CPU)

    Real User Monitoring (RUM) endpoint

    Correlation-ID support

    Express 5 routing

✅ Database

    MongoDB Atlas cloud database

    Mongoose ORM

✅ Caching / Queue

    Redis cache (Key–Value)

    Cache invalidation logic

Optional BullMQ queue for async jobs
✅ DevOps / Deployment

    Frontend deployed on Vercel

    Backend deployed on Render

    Environment variables supported

TEXT-SUMMARIZER/
 ├── frontend/
 │   ├── src/
 │   │   ├── components/
 │   │   ├── pages/
 │   │   ├── utils/
 │   │   │   └── api.js
 |   |   |──reportWebVital
 |   |   |──nginx.conf
 |   |   |──vercel.json
 │   │   ├── rum.js
 │   │   └── App.jsx
 │   └── index.html
 ├── backend/
 │   ├── server.js
 │   ├── Controllers/
 │   ├── Models/
 │   ├── Routes/
 |   |__ worker/
 |   |__ queue/
 │   ├── Middleware/
 │   ├── config/db.js
 │   ├── redisClient.js
 │   └── package.json
 └── README.md

 🚀 Tech Stack
----Frontend

    React (Vite)

    Axios

    JavaScript

    RUM Tracking

    Correlation-ID injection

----Backend

    Node.js

    Express 5

    JWT Auth

    HuggingFace API

    MongoDB (Mongoose)

    Redis

    Metrics + Tracing

    CORS

    BullMQ (optional)

🔐 Authentication Flow

    User logs in → backend returns JWT

    JWT stored in localStorage

    API wrapper (api.js) attaches JWT automatically

    Backend middleware verifies token

    Protected routes allow access

🧠 Summarization Flow

    User submits article in React

    Frontend sends request through api.post("/summarize/summarizetext")

    Backend calls HuggingFace BART model

    Summary is generated

    Cached in Redis

    Stored in MongoDB

    Returned to user

📊 Metrics & Observability
✅ Request/Response Tracing

    Logs each API request with:

    Method

    Route

    Start time

    End time

    Duration

    Correlation-ID

✅ System Metrics

    CPU load

    Memory usage

    Error rate

    Request throughput

    Latency monitoring

✅ Real User Monitoring (RUM)

    Frontend captures:

    Page visits

    Click events

Navigation
And sends them to backend /api/rum route.

⚙️ Environment Variables (.env)
    ✅ Backend (.env)
    MONGO_URL=your_mongo_db_url
    REDIS_URL=your_redis_url
    JWT_SECRET=your_secret_key
    HuggingFaceApiKey=your_api_key
    FRONTEND_URL=https://your-frontend.vercel.app

    ✅ Frontend (.env)
    VITE_API_BASE_URL=https://your-backend.onrender.com/api

▶️ How to Run Locally
    ✅ 1. Clone the repository
    git clone <repo-url>
    cd text-summarizer

    ✅ 2. Install frontend dependencies
    cd frontend
    npm install
    npm run dev

    ✅ 3. Install backend dependencies
    cd backend
    npm install
    npm start

    🚀 Deployment
    ✅ Frontend (Vercel)

Build Command: npm run build

    Output: dist/

✅ Backend (Render)

    Start Command: node server.js

    Environment variables configured in Render dashboard

    CORS allowed for Vercel domain

✅ API Endpoints
  --User Routes
    POST /api/user/register
    POST /api/user/login
    GET  /api/user/logout

  --Summarize Routes
    POST /api/summarize/summarizetext
    GET  /api/summarize/getsummarizationhistory
    GET  /api/summarize/getsummarizationhistoryById/:id
    DELETE /api/summarize/delete/:id
    DELETE /api/summarize/clearsummary

Middleware
    GET /api/middleware/loginornot

RUM Events
    POST /api/rum


✅ Conclusion

    This project demonstrates complete end-to-end full-stack development including:
    ✅ Authentication
    ✅ AI summarization
    ✅ Database modeling
    ✅ Redis caching
    ✅ Metrics + Tracing
    ✅ RUM and Correlation-ID
    ✅ Deployment
    ✅ Error management
    ✅ Secure API architecture

Suitable for:
    ✅ Internship submission
    ✅ Portfolio
    ✅ Production-level learning
