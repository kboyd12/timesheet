from sqlalchemy import Column, Integer, String
from database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    name = Column(String, nullable=False)


from sqlalchemy import (
    Column,
    Integer,
    String,
    ForeignKey,
    Enum,
    DECIMAL,
    Text,
    DateTime,
    Date,
)
from sqlalchemy.orm import relationship
from database import Base
import enum
import datetime


class ProjectType(enum.Enum):
    TIME_AND_MATERIALS = "time_and_materials"
    FIXED_PRICE = "fixed_price"


class Customer(Base):
    __tablename__ = "customers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    company_id = Column(Integer, nullable=False)  # Segregation by company
    created_at = Column(DateTime, default=datetime.datetime.now(datetime.timezone.utc))

    projects = relationship("Project", back_populates="customer")


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    customer_id = Column(Integer, ForeignKey("customers.id"), nullable=False)
    name = Column(String, nullable=False)
    project_type = Column(Enum(ProjectType), nullable=False)
    budget = Column(DECIMAL(10, 2), nullable=True)  # Only for fixed-price
    hourly_rate = Column(DECIMAL(10, 2), nullable=True)  # Only for time-and-materials
    created_at = Column(DateTime, default=datetime.datetime.now(datetime.timezone.utc))

    customer = relationship("Customer", back_populates="projects")
    milestones = relationship("Milestone", back_populates="project")


class Milestone(Base):
    __tablename__ = "milestones"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    name = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    amount = Column(DECIMAL(10, 2), nullable=False)
    due_date = Column(Date, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.now(datetime.timezone.utc))

    project = relationship("Project", back_populates="milestones")
