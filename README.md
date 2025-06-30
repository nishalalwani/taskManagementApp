# Task Management App

A full-stack Task Management application with user authentication, task boards, and a clean UI built with React and Node.js.

---

## Table of Contents

- [Project Overview](#project-overview)  
- [Tech Stack](#tech-stack)  
- [Features](#features)  
- [Architecture & Approach](#architecture--approach)  
- [Prerequisites](#prerequisites)  
- [Setup & Running Locally](#setup--running-locally)  
  - [Backend Setup](#backend-setup)  
  - [Frontend Setup](#frontend-setup)  
- [Environment Variables](#environment-variables)  
- [Usage](#usage)  
- [Folder Structure](#folder-structure)  
- [Deployment](#deployment)  
- [License](#license)  

---

## Project Overview

This project consists of two parts:

- **Backend API**: Handles user authentication (signup/login) using JWT, password hashing, and MongoDB for data persistence.
- **Frontend Client**: React app with Redux Toolkit for task state management, React Router for navigation, and TailwindCSS for styling.

---

## Tech Stack

- **Backend**: Node.js, Express, MongoDB, Mongoose, bcryptjs, JSON Web Token (JWT), dotenv  
- **Frontend**: React, Redux Toolkit, React Router v6, Axios, TailwindCSS, react-hot-toast, lucide-react icons  

---

## Features

- User signup and login with JWT authentication  
- Password hashing with bcrypt  
- Protected frontend routes requiring authentication  
- Add, edit, and move tasks between columns  
- Task priority and due date management  
- Responsive sidebar navigation  
- Toast notifications for feedback  
- Use of test user credentials for quick login  

---

## Architecture & Approach

- Backend API uses controllers and middleware to separate concerns.  
- JWT token is issued at login and stored in localStorage on the client.  
- Axios interceptors attach JWT token automatically for authenticated requests.  
- React Router `PrivateRoute` guards protected pages.  
- Redux Toolkit manages task board state and persists it locally.  
- TailwindCSS enables rapid and responsive UI design.  

---

## Prerequisites

- Node.js v14 or higher  
- MongoDB (local installation or cloud hosted like MongoDB Atlas)  

---

## Setup & Running Locally

### Backend Setup

1. Clone the repository and navigate to the backend folder:

   ```bash
   git clone <repo-url>
   cd backend

2. Install backend dependencies:
npm install

3. Create a .env file in the backend root with the following variables:
PORT=5000
MONGO_URI=mongodb://localhost:27017/auth-demo
JWT_SECRET=your_jwt_secret_here

4. Start MongoDB locally if running on localhost (e.g. mongod command or MongoDB service).

5. Run the backend server:
npm start


### Frontend Setup

1.Open a new terminal, navigate to the frontend folder:
cd frontend


2.Install frontend dependencies:
npm install


3.Start the React development server:
npm run dev
