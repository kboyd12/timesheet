from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
from models import Customer
from schemas import CustomerCreate

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/customers")
def create_customer(customer: CustomerCreate, db: Session = Depends(get_db)):
    new_customer = Customer(
        name=customer.name,
        description=customer.description,
        company_id=customer.company_id,
    )
    db.add(new_customer)
    db.commit()
    db.refresh(new_customer)
    return new_customer


@router.get("/customers")
def list_customers(db: Session = Depends(get_db)):
    return db.query(Customer).all()
