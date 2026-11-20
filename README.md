# ⚔️ HAKI // TASKMASTER — Shanks Edition

> *"There is no need to panic. The era is moving forward."*

A razor-sharp, high-contrast task manager inspired by **Red-Haired Shanks' Conqueror's Haki (*Haoshoku Haki*)** from *One Piece*. Built with a modern full-stack architecture combining a **FastAPI (Python)** backend, SQLite storage, and a **React.js (Vite + Tailwind CSS)** frontend.

---

## ⚡ Highlights & Features

### 1. Dual-State Haki Checkbox System
Instead of a generic checkbox, tasks toggle dynamically between two dedicated operational states:
- ⏳ **PENDING (Latent Aura):** Dormant charcoal steel styling with subtle border lighting.
- ⚡ **IN PROCESS (Conqueror's Surge):** Intense crimson red aura, glowing blade icon, active pulse effect, and prominent status badge.

### 2. Dated Management & Timeline System
- **Deadlines & Dates:** Assign due dates to any objective or note.
- **Dynamic Status Badging:**
  - 🚨 **Overdue Alert:** Flashing crimson badge with the exact number of days elapsed.
  - ⚡ **Due Today:** Radiant red badge.
  - 🗓️ **Upcoming / Tomorrow:** Organized chronological schedule.
- **Categorization Filters:** Filter by *All Dates*, *Today*, *Upcoming*, and *Overdue*.

### 3. Red & Black Haki Visual Design
- **Color Scheme:** Void obsidian (`#060608`), charcoal gunmetal, and radiant blood-red / crimson accents (`#dc2626`, `#ef4444`).
- **Aesthetic Touches:** Sharp beveled corners (`clip-path`), sword-slash hover effects, dynamic glowing counters, and typography paired with *Cinzel* & *Outfit*.
- **Live Battle Stats:** Header tracking Total Objectives, Active (In Process), Pending, and Overdue deadlines.

---

## 🏛️ Project Architecture

```
task-manager/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py          # FastAPI application & CORS
│   │   ├── database.py      # SQLite connection & sessionmaker
│   │   ├── models.py        # SQLAlchemy Task entity
│   │   ├── schemas.py       # Pydantic schemas (TaskCreate, TaskResponse, StatsResponse)
│   │   └── crud.py          # Query execution (CRUD, filtering, stats)
│   ├── requirements.txt     # fastapi, uvicorn, sqlalchemy, pydantic
│   ├── seed.py              # Initial sample data seeder
│   ├── test_api.py          # Backend validation test suite
│   └── tasks.db             # Local SQLite database
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx          # Shanks insignia & live stats
│   │   │   ├── TaskForm.jsx        # Sharp task input bar
│   │   │   ├── TaskCard.jsx        # Task item with Haki accents & date badges
│   │   │   ├── StatusCheckbox.jsx  # Dual-state Pending <-> In Process toggle
│   │   │   ├── DateFilters.jsx     # Date & status filtering controls
│   │   │   └── EditTaskModal.jsx   # Objective update modal
│   │   ├── services/
│   │   │   └── api.js              # Fetch client connected to FastAPI
│   │   ├── App.jsx                 # Master application view
│   │   ├── index.css               # Tailwind directives & Haki glow utilities
│   │   └── main.jsx
│   ├── tailwind.config.js          # Custom anime-inspired palette
│   ├── vite.config.js              # Dev proxy configuration
│   └── package.json
├── start.bat                        # One-click Windows launch script
├── start.ps1                        # PowerShell launch script
└── README.md
```

---

## 🚀 Quick Start Guide

### Option A: One-Click Launch (Windows)
Double-click `start.bat` or run:
```powershell
.\start.ps1
```
This opens the FastAPI backend at `http://localhost:8000` and the React frontend at `http://localhost:5173`.

---

### Option B: Manual Execution

#### 1. Backend (FastAPI)
```powershell
cd backend
.\.venv\Scripts\activate
uvicorn app.main:app --reload --port 8000
```
- Interactive Swagger API Documentation: `http://localhost:8000/docs`

#### 2. Frontend (React)
In another terminal:
```powershell
cd frontend
npm run dev
```
- Open the application in your browser: `http://localhost:5173`

---

## 📡 REST API Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/tasks` | Get tasks (supports `?status=`, `?date_filter=`, `?search=`) |
| `POST` | `/api/tasks` | Create a new task |
| `GET` | `/api/tasks/{id}` | Retrieve specific task |
| `PUT` | `/api/tasks/{id}` | Modify task title, description, or due date |
| `PATCH` | `/api/tasks/{id}/toggle` | Toggle state between `pending` and `in_process` |
| `PATCH` | `/api/tasks/{id}/status` | Update state directly |
| `DELETE` | `/api/tasks/{id}` | Delete task |
| `GET` | `/api/tasks/stats` | Counters for Total, In Process, Pending, and Overdue |
| `GET` | `/api/health` | Health & theme status check |
