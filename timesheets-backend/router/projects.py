from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import SessionLocal
from models import Project
from schemas import ProjectCreate


router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/projects")
def create_project(project: ProjectCreate, db: Session = Depends(get_db)):
    new_project = Project(
        customer_id=project.customer_id,
        name=project.name,
        project_type=project.project_type,
        budget=project.budget,
        hourly_rate=project.hourly_rate,
    )
    db.add(new_project)
    db.commit()
    db.refresh(new_project)
    return new_project


@router.get("/projects/{customer_id}")
def list_projects(customer_id: int, db: Session = Depends(get_db)):
    return db.query(Project).filter(Project.customer_id == customer_id).all()
