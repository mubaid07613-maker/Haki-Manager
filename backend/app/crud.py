from sqlalchemy.orm import Session
from sqlalchemy import or_, and_
from datetime import date
from typing import Optional, List
from . import models, schemas

def get_task(db: Session, task_id: int) -> Optional[models.Task]:
    return db.query(models.Task).filter(models.Task.id == task_id).first()

def get_tasks(
    db: Session,
    status: Optional[str] = None,
    date_filter: Optional[str] = None,
    search: Optional[str] = None,
    skip: int = 0,
    limit: int = 200
) -> List[models.Task]:
    query = db.query(models.Task)
    today = date.today()

    if status and status in ["pending", "in_process"]:
        query = query.filter(models.Task.status == status)

    if date_filter == "today":
        query = query.filter(models.Task.due_date == today)
    elif date_filter == "upcoming":
        query = query.filter(models.Task.due_date > today)
    elif date_filter == "overdue":
        # Overdue means due_date < today AND status != completed (here pending or in_process)
        query = query.filter(models.Task.due_date < today)

    if search:
        search_pattern = f"%{search}%"
        query = query.filter(
            or_(
                models.Task.title.ilike(search_pattern),
                models.Task.description.ilike(search_pattern)
            )
        )

    # Order: tasks with due dates first (ascending), then by ID descending
    query = query.order_by(
        models.Task.due_date.asc().nullslast(),
        models.Task.id.desc()
    )

    return query.offset(skip).limit(limit).all()

def create_task(db: Session, task: schemas.TaskCreate) -> models.Task:
    db_task = models.Task(
        title=task.title.strip(),
        description=task.description.strip() if task.description else None,
        status=task.status,
        due_date=task.due_date
    )
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

def update_task(db: Session, task_id: int, task_update: schemas.TaskUpdate) -> Optional[models.Task]:
    db_task = get_task(db, task_id)
    if not db_task:
        return None

    update_data = task_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        if field == "title" and value is not None:
            value = value.strip()
        elif field == "description" and value is not None:
            value = value.strip()
        setattr(db_task, field, value)

    db.commit()
    db.refresh(db_task)
    return db_task

def update_task_status(db: Session, task_id: int, new_status: str) -> Optional[models.Task]:
    db_task = get_task(db, task_id)
    if not db_task:
        return None
    db_task.status = new_status
    db.commit()
    db.refresh(db_task)
    return db_task

def delete_task(db: Session, task_id: int) -> bool:
    db_task = get_task(db, task_id)
    if not db_task:
        return False
    db.delete(db_task)
    db.commit()
    return True

def get_stats(db: Session) -> schemas.StatsResponse:
    today = date.today()
    total = db.query(models.Task).count()
    pending = db.query(models.Task).filter(models.Task.status == "pending").count()
    in_process = db.query(models.Task).filter(models.Task.status == "in_process").count()
    overdue = db.query(models.Task).filter(
        and_(
            models.Task.due_date.isnot(None),
            models.Task.due_date < today
        )
    ).count()
    today_count = db.query(models.Task).filter(models.Task.due_date == today).count()

    return schemas.StatsResponse(
        total=total,
        pending=pending,
        in_process=in_process,
        overdue=overdue,
        today=today_count
    )
