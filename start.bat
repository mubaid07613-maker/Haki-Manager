@echo off
echo ========================================================
echo    HAKI TASKMASTER // RED HAIR SHANKS EDITION
echo    FastAPI Backend + React.js Vite Frontend
echo ========================================================
echo.

echo [1/2] Starting FastAPI Backend on http://localhost:8000 ...
start "Haki Backend (FastAPI)" cmd /k "cd /d "%~dp0backend" && .venv\Scripts\activate && uvicorn app.main:app --reload --host 127.0.0.1 --port 8000"

echo [2/2] Starting React Vite Frontend on http://localhost:5173 ...
start "Haki Frontend (React)" cmd /k "cd /d "%~dp0frontend" && npm run dev"

echo.
echo Both servers are launching!
echo App UI:  http://localhost:5173
echo API Docs: http://localhost:8000/docs
echo ========================================================
pause
