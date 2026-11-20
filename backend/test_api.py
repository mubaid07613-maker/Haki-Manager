from app.database import SessionLocal
from app import crud, schemas
from datetime import date

def test_crud_suite():
    db = SessionLocal()
    try:
        # 1. Stats
        stats = crud.get_stats(db)
        print(f"Stats: Total={stats.total}, InProcess={stats.in_process}, Pending={stats.pending}, Overdue={stats.overdue}")
        assert stats.total > 0

        # 2. Create
        new_task_in = schemas.TaskCreate(
            title="Confront Admiral Ryokugyu with WiFi Haki",
            description="Send Conqueror's pressure across miles.",
            status="pending",
            due_date=date(2026, 11, 25)
        )
        task = crud.create_task(db, new_task_in)
        print(f"Created Task #{task.id}: {task.title} [Status: {task.status}]")
        assert task.status == "pending"

        # 3. Toggle Status to in_process
        updated = crud.update_task_status(db, task.id, "in_process")
        print(f"Updated Task #{updated.id} status to: {updated.status}")
        assert updated.status == "in_process"

        # 4. Filter queries
        in_process_tasks = crud.get_tasks(db, status="in_process")
        print(f"Found {len(in_process_tasks)} in_process tasks.")
        assert any(t.id == task.id for t in in_process_tasks)

        # 5. Overdue query
        overdue_tasks = crud.get_tasks(db, date_filter="overdue")
        print(f"Found {len(overdue_tasks)} overdue tasks.")

        # 6. Delete
        deleted = crud.delete_task(db, task.id)
        assert deleted is True
        print(f"Deleted Task #{task.id} successfully.")

        print("--> ALL BACKEND CRUD LOGIC VALIDATED PERFECTLY! <--")
    finally:
        db.close()

if __name__ == "__main__":
    test_crud_suite()
