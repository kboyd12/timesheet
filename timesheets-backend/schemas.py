from pydantic import BaseModel, EmailStr


class UserCreate(BaseModel):
    email: EmailStr
    password: str
    name: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: int
    email: EmailStr
    name: str

    class Config:
        orm_mode = True


class Token(BaseModel):
    access_token: str
    token_type: str


from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime, date
from enum import Enum


class ProjectType(str, Enum):
    TIME_AND_MATERIALS = "time_and_materials"
    FIXED_PRICE = "fixed_price"


# Customer Schemas
class CustomerBase(BaseModel):
    name: str
    description: Optional[str] = None
    company_id: int


class CustomerCreate(CustomerBase):
    pass


class CustomerResponse(CustomerBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True


# Project Schemas
class ProjectBase(BaseModel):
    customer_id: int
    name: str
    project_type: ProjectType
    budget: Optional[float] = None  # Applicable for fixed-price projects
    hourly_rate: Optional[float] = None  # Applicable for time-and-materials projects


class ProjectCreate(ProjectBase):
    pass


class ProjectResponse(ProjectBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True


# Milestone Schemas
class MilestoneBase(BaseModel):
    project_id: int
    name: str
    description: Optional[str] = None
    amount: float
    due_date: Optional[date] = None


class MilestoneCreate(MilestoneBase):
    pass


class MilestoneResponse(MilestoneBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True
