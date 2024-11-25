from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import SessionLocal
from models import Milestone
from schemas import MilestoneCreate

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/milestones")
def create_milestone(milestone: MilestoneCreate, db: Session = Depends(get_db)):
    new_milestone = Milestone(
        project_id=milestone.project_id,
        name=milestone.name,
        description=milestone.description,
        amount=milestone.amount,
        due_date=milestone.due_date,
    )
    db.add(new_milestone)
    db.commit()
    db.refresh(new_milestone)
    return new_milestone


@router.get("/milestones/{project_id}")
def list_milestones(project_id: int, db: Session = Depends(get_db)):
    return db.query(Milestone).filter(Milestone.project_id == project_id).all()
