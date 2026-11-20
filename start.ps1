# Haki Taskmaster Launch Script
Write-Host "========================================================" -ForegroundColor Red
Write-Host "   HAKI TASKMASTER // RED HAIR SHANKS EDITION" -ForegroundColor DarkRed
Write-Host "   FastAPI Backend + React.js Vite Frontend" -ForegroundColor Red
Write-Host "========================================================" -ForegroundColor DarkGray

$root = $PSScriptRoot

Write-Host "`n[1/2] Launching FastAPI Backend on http://localhost:8000 ..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$root\backend'; & '.\.venv\Scripts\Activate.ps1'; uvicorn app.main:app --reload --host 127.0.0.1 --port 8000"

Write-Host "[2/2] Launching React Vite Frontend on http://localhost:5173 ..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$root\frontend'; npm run dev"

Write-Host "`nBoth processes dispatched!" -ForegroundColor Green
Write-Host "Frontend:  http://localhost:5173" -ForegroundColor Cyan
Write-Host "API Specs: http://localhost:8000/docs" -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor DarkGray
