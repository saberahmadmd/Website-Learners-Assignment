# 💊 Medication Management App

This is a full-stack medication tracker built with:
- ✅ **Frontend:** React (with context & local state, no React Query)
- ✅ **Backend:** Express.js with SQLite
- ✅ **Features:** Signup, login, add medications, mark as taken, delete, see daily status

---

## 📁 Project Structure

project-root/
├── frontend/ # React app
├── backend/ # Express API with SQLite
├── README.md # Project overview



## ⚙️ Requirements

- Node.js (v16+ recommended)
- npm or yarn

---

## 🚀 How to Run

**1. Install dependencies**

# For backend
cd backend
npm install
# For frontend
cd ../frontend
npm install

2. Configure environment variables
Backend: uses .env for PORT (optional)
Frontend: uses .env for REACT_APP_API_URL

3. Start development servers
# Backend
cd backend
npm start
# Frontend (in a separate terminal)
cd frontend
npm start

🔑 Environment Variables
File	Key	Example
backend/.env	PORT	5000
frontend/.env	REACT_APP_API_URL	http://localhost:5000/api