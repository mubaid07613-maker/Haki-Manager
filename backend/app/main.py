from fastapi import FastAPI, Depends, HTTPException, Query, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional

from .database import engine, Base, get_db
from . import models, schemas, crud

# Automatically initialize SQLite tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Haki Taskmaster API",
    description="Conqueror's Haki-themed Task Management System",
    version="1.0.0"
)

# Configure CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
def health_check():
    return {"status": "active", "theme": "Red Hair Shanks - Conqueror's Haki"}

@app.get("/api/tasks/stats", response_model=schemas.StatsResponse)
def read_task_stats(db: Session = Depends(get_db)):
    return crud.get_stats(db)

@app.get("/api/tasks", response_model=List[schemas.TaskResponse])
def read_tasks(
    status: Optional[str] = Query(None, description="Filter by status: pending, in_process"),
    date_filter: Optional[str] = Query(None, description="Filter by date: today, upcoming, overdue, all"),
    search: Optional[str] = Query(None, description="Search term in title or description"),
    skip: int = Query(0, ge=0),
    limit: int = Query(200, ge=1, le=500),
    db: Session = Depends(get_db)
):
    return crud.get_tasks(
        db=db,
        status=status,
        date_filter=date_filter,
        search=search,
        skip=skip,
        limit=limit
    )

@app.post("/api/tasks", response_model=schemas.TaskResponse, status_code=status.HTTP_201_CREATED)
def create_task(task: schemas.TaskCreate, db: Session = Depends(get_db)):
    return crud.create_task(db=db, task=task)

@app.get("/api/tasks/{task_id}", response_model=schemas.TaskResponse)
def read_task(task_id: int, db: Session = Depends(get_db)):
    db_task = crud.get_task(db, task_id=task_id)
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    return db_task

@app.put("/api/tasks/{task_id}", response_model=schemas.TaskResponse)
def update_task(task_id: int, task_update: schemas.TaskUpdate, db: Session = Depends(get_db)):
    updated = crud.update_task(db, task_id=task_id, task_update=task_update)
    if not updated:
        raise HTTPException(status_code=404, detail="Task not found")
    return updated

@app.patch("/api/tasks/{task_id}/status", response_model=schemas.TaskResponse)
def update_status(task_id: int, status_update: schemas.TaskStatusUpdate, db: Session = Depends(get_db)):
    updated = crud.update_task_status(db, task_id=task_id, new_status=status_update.status)
    if not updated:
        raise HTTPException(status_code=404, detail="Task not found")
    return updated

@app.patch("/api/tasks/{task_id}/toggle", response_model=schemas.TaskResponse)
def toggle_status(task_id: int, db: Session = Depends(get_db)):
    db_task = crud.get_task(db, task_id=task_id)
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    new_status = "in_process" if db_task.status == "pending" else "pending"
    updated = crud.update_task_status(db, task_id=task_id, new_status=new_status)
    return updated

@app.delete("/api/tasks/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(task_id: int, db: Session = Depends(get_db)):
    success = crud.delete_task(db, task_id=task_id)
    if not success:
        raise HTTPException(status_code=404, detail="Task not found")
    return None
