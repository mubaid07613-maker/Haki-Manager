from datetime import date, timedelta
from app.database import SessionLocal, engine, Base
from app import models

# Ensure tables exist
Base.metadata.create_all(bind=engine)

def seed():
    db = SessionLocal()
    try:
        # Check if already seeded
        if db.query(models.Task).count() > 0:
            print("Database already contains tasks. Skipping seed.")
            return

        today = date.today()
        sample_tasks = [
            models.Task(
                title="Master Advanced Conqueror's Haki Infusion (Haoshoku)",
                description="Coat Gryphon in violent black-red lightning to shatter enemy barriers from a distance.",
                status="in_process",
                due_date=today
            ),
            models.Task(
                title="Secure Elbaf Poneglyph Rubbings",
                description="Consult with Dorry and Brogy regarding the final road coordinates to Laugh Tale.",
                status="in_process",
                due_date=today + timedelta(days=2)
            ),
            models.Task(
                title="Inspect Red Force Flagship Repairs",
                description="Coordinate with Benn Beckman and the shipwrights for new dragon keel reinforcements.",
                status="pending",
                due_date=today + timedelta(days=5)
            ),
            models.Task(
                title="Deliver Straw Hat message to Marco the Phoenix",
                description="Ensure the Whitebeard remnants are safe in Sphinx Island territory.",
                status="pending",
                due_date=today - timedelta(days=2)  # Overdue for test
            ),
            models.Task(
                title="Stock up on West Blue Vintage Sake",
                description="Prepare banquet rations before departing for the final conflict.",
                status="pending",
                due_date=today + timedelta(days=10)
            )
        ]

        db.add_all(sample_tasks)
        db.commit()
        print(f"Successfully seeded {len(sample_tasks)} initial tasks!")
    finally:
        db.close()

if __name__ == "__main__":
    seed()
