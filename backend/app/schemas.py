from pydantic import BaseModel, Field
from typing import Optional, Literal
from datetime import date, datetime

TaskStatus = Literal["pending", "in_process"]

class TaskBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=255, description="Title of the task")
    description: Optional[str] = Field(None, description="Optional task details")
    status: TaskStatus = Field("pending", description="Current status: pending or in_process")
    due_date: Optional[date] = Field(None, description="Due date (YYYY-MM-DD)")

class TaskCreate(TaskBase):
    pass

class TaskUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=255)
    description: Optional[str] = None
    status: Optional[TaskStatus] = None
    due_date: Optional[date] = None

class TaskStatusUpdate(BaseModel):
    status: TaskStatus

class TaskResponse(TaskBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class StatsResponse(BaseModel):
    total: int
    pending: int
    in_process: int
    overdue: int
    today: int
