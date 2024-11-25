from sqlalchemy.orm import Session
from models import User
from auth import get_password_hash


def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()


def create_user(db: Session, email: str, password: str, name: str):
    hashed_password = get_password_hash(password)
    user = User(email=email, password_hash=hashed_password, name=name)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user
