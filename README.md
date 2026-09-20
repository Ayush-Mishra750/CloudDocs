# ☁️ CloudDocs — Cloud Storage Platform

A full-stack, enterprise-grade cloud storage application that allows users to upload, manage, and share their files securely. It includes a subscription-based storage system powered by Razorpay, enabling users to upgrade their storage plans smoothly.

The client is built with **React**, **Vite**, and **TailwindCSS**, while the server uses **Node.js**, **Express**, **MongoDB**, and **Redis**. The application stores files using **AWS S3** and also supports **Google Drive Import** for seamless file transfers.

---

## 📑 Table of Contents
- [Features](#-features)
  - [Authentication and Security](#authentication-and-security)
  - [File Management](#file-management)
  - [Cloud Storage and Import](#cloud-storage-and-import)
  - [Sharing and Permissions](#sharing-and-permissions)
  - [Settings and Customization](#settings-and-customization)
  - [Admin Dashboard](#admin-dashboard)
- [Project Structure](#-project-structure)

  - [Frontend (React + Vite + Tailwind)](#frontend---react--vite--tailwind)
  - [Backend (Node + Express + MongoDB + Redis)](#backend---node--express--mongodb--redis)
- [Screenshot Overview](#-screenshot-overview)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
  - [Clone Repository](#1-clone-repository)
  - [Environment Setup](#2-environment-setup)
  - [Frontend Setup (Client)](#3-frontend-setup-client)
  - [Backend Setup (Server)](#4-backend-setup-server)
  - [Running via Docker Compose (Recommended)](#5-running-via-docker-compose-recommended)
- [Additional Setup Requirements](#-additional-setup-requirements)

---

## ✨ Features

### Authentication and Security
- **User Registration & Login**: Email and password authentication with validation.
- **OAuth 2.0 Integration**: One-click social authentication via Google & GitHub OAuth.
- **OTP Verification**: Secure 6-digit OTP verification powered by Resend API for account setup and identity verification.
- **Password Security**: Hashed passwords using `bcrypt` for secure storage.
- **Cookie Security**: Secure, signed HTTP-only JWT cookies to defend against XSS attacks.
- **API Guarding & Sanitization**: CORS configuration, Helmet security headers, rate limiting, and input sanitization.

### File Management
- **Universal File Upload**: Upload PDF, images, videos, documents, and zip archives with real-time upload progress tracking.
- **Grid & List Views**: Dynamic layout toggle for comfortable navigation.
- **File Metadata & Details**: View precise file sizes, MIME types, creation dates, and last modified timestamps.
- **Search & Filtering**: Instant client-side and server-side search by file name, category, or extension.
- **File Operations**: Rename files, soft-delete to Trash Bin, restore, and permanently purge items.
- **Quota Tracking**: Real-time visual progress bar tracking storage usage vs allocated plan quota.

### Cloud Storage and Import
- **AWS S3 Integration**: High-scalability file storage using AWS S3 with presigned upload/download URLs.
- **CloudFront CDN**: Fast worldwide file delivery and optimized CDN streaming.
- **Google Drive Import**: Directly import files from Google Drive to your cloud storage vault.
- **Batch Import**: Select and import multiple files simultaneously with background progress tracking.
- **Automatic Metadata Preservation**: Preserves original filenames, file types, and file structure during import.

### Sharing and Permissions
- **Flexible File Sharing**: Share files securely via user email (Registered Users) or shareable direct link (Guest Users).
- **Role-Based Permissions**: Granular view-only or editing access rights for shared files.
- **Share Management Dashboard**: Centralized view for "Shared by Me" and "Shared with Me" assets.
- **Activity & Access Logs**: Real-time permission tracking and access monitoring.

### Settings and Customization
- **Profile Management**: Update user profile information (Name, Email, Profile Avatar).
- **Storage Statistics**: Detailed visual breakdown of used vs remaining cloud storage capacity.
- **Security Settings**: Change account password and manage active sessions.
- **Account Actions**: Options to logout, temporarily disable, or permanently delete accounts.

### Admin Dashboard
- **System Overview**: High-level telemetry tracking total, active, online, and soft-deleted user accounts.
- **User Control Panel**: Filter, edit user roles, revoke sessions, adjust storage quotas, and manage users.
- **Soft & Hard Deletion**: Two-tiered deletion workflow with soft-delete recovery and permanent purge options.
- **Role Management**: Hierarchical role badges (User, Manager, Admin, SuperAdmin).
- **Directory Inspection**: View and navigate directories across any registered user's storage.

### Subscriptions and Billing
- **Subscription Plans**: Tiered monthly and annual storage subscription plans.
- **Razorpay Payment Gateway**: Seamless checkout experience using Razorpay SDK.
- **Instant Plan Upgrades**: Automated usage limit updates upon payment verification.
- **Webhook Verification**: Webhook listeners for automated payment status sync and subscription lifecycle management.
- **Billing History**: Access past transaction invoices and renewal dates inside the dashboard.

---


## 📁 Project Structure

```
CloudDocs-AI/
├── docker-compose.yml           # Multi-container orchestration (Backend, Frontend, Mongo, Redis)
├── README.md                    # Project documentation
├── .env.example                 # Root environment variables template
│
├── frontend/                    # Frontend (React + Vite + Tailwind CSS)
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── Dockerfile
│   └── src/
│       ├── App.jsx              # Root application component
│       ├── main.jsx             # Entry point
│       ├── api/                 # Axios client and API handler modules
│       │   ├── adminApi.js
│       │   ├── authApi.js
│       │   ├── axios.js
│       │   ├── fileApi.js
│       │   ├── shareApi.js
│       │   └── userApi.js
│       ├── context/             # Global React Context providers
│       │   └── AuthContext.jsx  # Authentication state & session manager
│       ├── pages/               # Page views (Dashboard, Admin, Settings, Share, Subscriptions)
│       ├── routes/              # Route protection layout components
│       │   ├── GuestRoute.jsx
│       │   ├── ProtectedRoute.jsx
│       │   ├── AdminRoute.jsx
│       │   └── AppRoutes.jsx
│       ├── components/          # Reusable UI components (Modals, Forms, Shimmer)
│       └── index.css            # Global CSS, Tailwind directives, Glassmorphism styles
│
└── backend/                     # Server (Node.js + Express + MongoDB + Redis)
    ├── package.json
    ├── Dockerfile
    └── src/
        ├── app.js               # Express application initialization & middleware
        ├── server.js            # Server entrypoint listener
        ├── config/              # Infrastructure configurations (MongoDB, Redis, S3)
        ├── controllers/         # Request handlers (Auth, File, Dir, Admin, Subscription)
        ├── middlewares/         # Auth verification, role authorization, error handling
        ├── models/              # Mongoose schemas (User, Directory, File, OTP, Plan)
        ├── routes/              # Express API router definitions
        ├── services/            # Core business logic handlers
        ├── utils/               # Helper utilities (Tokens, Winston Logger, S3 client)
        └── validators/          # Request payload validators
```

---

## 🖼️ Screenshot Overview

- **Login & Register**: Standard Email/Password login, Google OAuth, and Resend OTP verification.
  <img width="1884" height="908" alt="Screenshot 2026-07-31 101443" src="https://github.com/user-attachments/assets/8fb2df1c-8faa-404a-81f7-648f5e2a1774" />
 <img width="1886" height="815" alt="Screenshot 2026-07-31 100557" src="https://github.com/user-attachments/assets/11599030-a93a-49ca-9aea-3b646794ba2c" />
<img width="1814" height="867" alt="Screenshot 2026-07-31 101014" src="https://github.com/user-attachments/assets/9329c23c-b45d-44b7-8fe8-1ed606812af2" />

- **HomePage / Dashboard**: File grid & list view, storage quota bar, upload modal, search & filter bar.
  <img width="1894" height="870" alt="Screenshot 2026-07-31 101142" src="https://github.com/user-attachments/assets/b8b72f68-ba00-4c58-a9b0-ad82c60715ab" />
<img width="1845" height="865" alt="Screenshot 2026-07-31 101842" src="https://github.com/user-attachments/assets/7f9c1053-5639-4d9e-a0ec-c9982ff446fc" />
<img width="1837" height="853" alt="Screenshot 2026-07-31 101948" src="https://github.com/user-attachments/assets/5e92d131-400c-4ebb-ba25-8b13c6ce0498" />
<img width="1838" height="817" alt="Screenshot 2026-07-31 102023" src="https://github.com/user-attachments/assets/e123f9ae-3452-42fa-b266-24ee5ca7582b" />

- **Settings**: Profile update, storage usage breakdown, password update, and session controls.
  <img width="1790" height="818" alt="Screenshot 2026-07-31 102254" src="https://github.com/user-attachments/assets/57691d5f-0ca6-4194-9628-bd2f4a45e8a9" />
<img width="1838" height="851" alt="Screenshot 2026-07-31 102320" src="https://github.com/user-attachments/assets/d1f8181b-9b31-4167-821c-cc4523ddafaa" />
<img width="1863" height="874" alt="Screenshot 2026-07-31 102351" src="https://github.com/user-attachments/assets/5281bf1f-ef50-4b77-aacc-f03666e3f09b" />
<img width="1823" height="843" alt="Screenshot 2026-07-31 102412" src="https://github.com/user-attachments/assets/4e79c802-2b75-41f0-9f84-007caf5e4ba4" />

- **Share**: Public link generator, email-based sharing modal, permission toggle, and shared files dashboard.
  <img width="1798" height="869" alt="Screenshot 2026-07-31 102645" src="https://github.com/user-attachments/assets/ebbeb2d7-aed7-4f5a-ac7f-21ecc0dfaa8b" />
<img width="1665" height="699" alt="Screenshot 2026-07-31 102920" src="https://github.com/user-attachments/assets/1ada1f32-5fbc-4228-94f0-662147d29499" />


- **Admin Dashboard**: System telemetry, user management table, user inspection modal, soft/hard deletion.
  <img width="1780" height="903" alt="Screenshot 2026-07-31 103118" src="https://github.com/user-attachments/assets/e12b4713-a431-40d3-a954-6a98020a098f" />
  <img width="1770" height="894" alt="Screenshot 2026-07-31 103210" src="https://github.com/user-attachments/assets/a0b11f70-f9b0-4da2-b212-d546c3cf26ca" />
<img width="1399" height="654" alt="Screenshot 2026-07-31 103312" src="https://github.com/user-attachments/assets/f9d53a3b-01ac-4074-8ff3-550b5ed0cfa7" />
<img width="1798" height="853" alt="Screenshot 2026-07-31 103412" src="https://github.com/user-attachments/assets/f04e6d81-47f0-4a87-aa5d-fa1932c4efc8" />

- **Import from Drive**: Google Drive file selection picker and automated import status tracking.
  <img width="1830" height="870" alt="Screenshot 2026-07-31 103513" src="https://github.com/user-attachments/assets/b1add58b-8d3b-47bc-8c22-d51fe2128112" />
<img width="1595" height="591" alt="Screenshot 2026-07-31 103554" src="https://github.com/user-attachments/assets/186b46af-fccb-4cdf-a03d-0e3e11f97fed" />
<img width="1835" height="832" alt="Screenshot 2026-07-31 104245" src="https://github.com/user-attachments/assets/16489e07-546b-439d-b89f-c9cb58be2010" />

- **Subscriptions (Razorpay)**: Plan selector modal, Razorpay payment popup, active plan status, invoice links.
  <img width="1875" height="868" alt="Screenshot 2026-07-31 104549" src="https://github.com/user-attachments/assets/5caa4b24-9dec-4c59-86bc-1d746186e1ea" />
<img width="1839" height="841" alt="Screenshot 2026-07-31 104615" src="https://github.com/user-attachments/assets/ccfa52d7-b199-4326-87f7-c322b3dc9ced" />
<img width="1515" height="876" alt="Screenshot 2026-07-31 104650" src="https://github.com/user-attachments/assets/22f45a07-b741-404c-9b80-18b8d31e052c" />
<img width="1553" height="793" alt="Screenshot 2026-07-31 104752" src="https://github.com/user-attachments/assets/d985a470-d47c-4d37-959b-bef7a89dbf98" />
<img width="1755" height="834" alt="Screenshot 2026-07-31 104853" src="https://github.com/user-attachments/assets/a8ca437d-f750-4df7-8465-dc8ad01b463f" />


---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, TailwindCSS, React Router v6, Lucide React, React Hot Toast
- **Backend**: Node.js, Express.js (ES Modules)
- **Databases**: MongoDB (Mongoose ODM), Redis (Caching & Sessions)
- **Cloud Storage & CDN**: AWS S3, AWS CloudFront
- **External APIs**: Google Drive API, Google OAuth 2.0,Resend API
- **Authentication**: JWT (Signed HTTP-only Cookies), Bcrypt, Resend OTP
- **Payment Gateway**: Razorpay Subscriptions & Webhooks
- **Containerization**: Docker, Docker Compose

---

## 🚀 Getting Started

### 1. Clone Repository
```bash
git clone https://github.com/Ayush-Mishra750/CloudDocs-AI.git
cd CloudDocs-AI
```

---

### 2. Environment Setup

#### Client `.env` (`frontend/.env`)
```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

#### Server `.env` (`backend/.env`)
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# Database & Redis
MONGO_URI=mongodb://localhost:27017/clouddocs
REDIS_URL=redis://localhost:6379

# Authentication & JWT
JWT_SECRET=your_jwt_secret_key
COOKIE_SECRET=your_cookie_secret

# OAuth Credentials
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Resend API Key (for Email OTP)
RESEND_API_KEY=re_123456789

# AWS S3 Configuration
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=us-east-1
AWS_S3_BUCKET=your_s3_bucket_name

# Razorpay Credentials
RAZORPAY_KEY_ID=rzp_test_xxxxxx
RAZORPAY_KEY_SECRET=xxxxxxx
RAZORPAY_WEBHOOK_SECRET=xxxxxxx
```

---

### 3. Frontend Setup (Client)

Navigate to the frontend folder and start the dev server:
```bash
cd frontend
npm install
npm run dev
```
The client app will be accessible at: **`http://localhost:5173`**

---

### 4. Backend Setup (Server)

Navigate to the backend folder and start the server:
```bash
cd backend
npm install
npm run dev
```
The REST API server will be active at: **`http://localhost:5000/api/v1`**

---

### 5. Running via Docker Compose (Recommended)

To run the full stack (Frontend, Backend, MongoDB, Redis) in containerized mode with a single command:

1. Ensure **Docker Desktop** is open and running.
2. Run from the root directory:
```bash
docker compose up --build
```
3. Access the web app at **[http://localhost:5173](http://localhost:5173)**.

---

## 🔒 Additional Setup Requirements

### AWS S3 Configuration
1. Create an AWS S3 Bucket with CORS enabled for your client origin (`http://localhost:5173`).
2. Attach IAM user policies with `s3:PutObject`, `s3:GetObject`, `s3:DeleteObject`, and `s3:ListBucket` permissions.

### Google Drive API & OAuth Setup
1. In Google Cloud Console, enable **Google Drive API**.
2. Configure **OAuth 2.0 Client Credentials** and add `http://localhost:5173` to Authorized JavaScript Origins and Redirect URIs.

### Razorpay API Keys
1. Sign up on [Razorpay Dashboard](https://dashboard.razorpay.com/) and generate Key ID and Key Secret in Test Mode.
2. Configure webhooks targeting `http://your-domain.com/api/v1/subscription/webhook`.
