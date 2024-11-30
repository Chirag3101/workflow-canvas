from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import logging

from database import get_db, Base, engine
from routers import docs, auth, workflows

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create database tables
Base.metadata.create_all(bind=engine)

# Enhanced API documentation
app = FastAPI(
    title="Workflow Canvas API",
    description="API for the Workflow Canvas project management tool",
    version="0.0.1",
    contact={
        "name": "Workflow Canvas Team",
        "url": "https://github.com/yourusername/workflow-canvas",
    },
    license_info={
        "name": "MIT",
    },
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
logger.info("Registering documentation router")
app.include_router(
    docs.router,
    prefix="/api/docs",
    tags=["documentation"]
)
app.include_router(auth.router)
app.include_router(workflows.router)

@app.get("/test")
async def test_endpoint():
    """Test endpoint to verify API is working"""
    return {"status": "ok", "message": "API is working"}
