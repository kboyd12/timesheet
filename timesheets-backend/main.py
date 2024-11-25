from fastapi import FastAPI
from database import Base, engine
from router import auth, dashboard, customers, milestones, projects
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Initialize database
Base.metadata.create_all(bind=engine)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Register routers
app.include_router(auth.router, prefix="/api", tags=["auth"])
app.include_router(dashboard.router, prefix="/api", tags=["dashboard"])
app.include_router(customers.router, prefix="/api", tags=["customers"])
app.include_router(milestones.router, prefix="/api", tags=["milestones"])
app.include_router(projects.router, prefix="/api", tags=["projects"])
