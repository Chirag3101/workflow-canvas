from fastapi import FastAPI, HTTPException, Path, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from sqlalchemy.orm import Session

from database import get_db, WorkflowModel

# Enhanced API documentation
app = FastAPI(
    title="Workflow Canvas API",
    description="""
    API for Workflow Canvas - A simple, intuitive workflow management tool.
    
    Features:
    * Create and manage workflows
    * Store workflow content and metadata
    * Visualize workflow data
    """,
    version="1.0.0",
    contact={
        "name": "Workflow Canvas Team",
        "url": "https://github.com/yourusername/workflow-canvas",
    },
    license_info={
        "name": "MIT",
    }
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],  # Allow both localhost and IP
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class WorkflowBase(BaseModel):
    """Base Workflow model with common attributes"""
    title: str = Field(..., 
        description="The title of the workflow",
        min_length=1,
        max_length=100,
        example="Product Launch Workflow"
    )
    content: str = Field(...,
        description="The content/description of the workflow",
        min_length=1,
        example="1. Market Research\n2. Product Development\n3. Launch Strategy"
    )

class WorkflowCreate(WorkflowBase):
    """Workflow creation model"""
    pass

class Workflow(WorkflowBase):
    """Complete Workflow model with system-generated fields"""
    id: int = Field(..., description="Unique identifier for the workflow")
    created_at: str = Field(..., description="Timestamp when the workflow was created")
    updated_at: str = Field(..., description="Timestamp when the workflow was last updated")

    class Config:
        json_schema_extra = {
            "example": {
                "id": 1,
                "title": "Product Launch Workflow",
                "content": "1. Market Research\n2. Product Development\n3. Launch Strategy",
                "created_at": "2023-11-22T10:00:00",
                "updated_at": "2023-11-22T10:00:00"
            }
        }

@app.get("/", 
    response_model=dict,
    summary="Root endpoint",
    description="Returns a welcome message to confirm the API is running"
)
async def read_root():
    """
    Root endpoint that returns a welcome message.
    
    Returns:
        dict: A welcome message
    """
    return {"message": "Welcome to Workflow Canvas API"}

@app.post("/workflows/", 
    response_model=Workflow,
    summary="Create new workflow",
    description="Creates a new workflow with the provided title and content"
)
async def create_workflow(workflow: WorkflowCreate, db: Session = Depends(get_db)):
    """
    Create a new workflow.
    
    Args:
        workflow (WorkflowCreate): The workflow data to create
        
    Returns:
        Workflow: The created workflow with system-generated fields
    """
    db_workflow = WorkflowModel(**workflow.dict())
    db.add(db_workflow)
    db.commit()
    db.refresh(db_workflow)
    return db_workflow.to_dict()

@app.get("/workflows/", 
    response_model=List[Workflow],
    summary="Get all workflows",
    description="Retrieves a list of all workflows"
)
async def get_workflows(db: Session = Depends(get_db)):
    """
    Get all workflows.
    
    Returns:
        List[Workflow]: List of all workflows
    """
    workflows = db.query(WorkflowModel).all()
    return [workflow.to_dict() for workflow in workflows]

@app.get("/workflows/{workflow_id}", 
    response_model=Workflow,
    summary="Get workflow by ID",
    description="Retrieves a specific workflow by its ID"
)
async def get_workflow(
    workflow_id: int = Path(
        ..., 
        description="The ID of the workflow to retrieve",
        gt=0,
        example=1
    ),
    db: Session = Depends(get_db)
):
    """
    Get a specific workflow by ID.
    
    Args:
        workflow_id (int): The ID of the workflow to retrieve
        
    Returns:
        Workflow: The requested workflow
        
    Raises:
        HTTPException: If the workflow is not found
    """
    workflow = db.query(WorkflowModel).filter(WorkflowModel.id == workflow_id).first()
    if workflow is None:
        raise HTTPException(
            status_code=404, 
            detail=f"Workflow with ID {workflow_id} not found"
        )
    return workflow.to_dict()

@app.put("/workflows/{workflow_id}", 
    response_model=Workflow,
    summary="Update workflow",
    description="Updates an existing workflow with new data"
)
async def update_workflow(
    workflow: WorkflowCreate,
    workflow_id: int = Path(
        ..., 
        description="The ID of the workflow to update",
        gt=0,
        example=1
    ),
    db: Session = Depends(get_db)
):
    """
    Update an existing workflow.
    
    Args:
        workflow (WorkflowCreate): The new workflow data
        workflow_id (int): The ID of the workflow to update
        
    Returns:
        Workflow: The updated workflow
        
    Raises:
        HTTPException: If the workflow is not found
    """
    db_workflow = db.query(WorkflowModel).filter(WorkflowModel.id == workflow_id).first()
    if db_workflow is None:
        raise HTTPException(
            status_code=404, 
            detail=f"Workflow with ID {workflow_id} not found"
        )
    
    for key, value in workflow.dict().items():
        setattr(db_workflow, key, value)
    
    db.commit()
    db.refresh(db_workflow)
    return db_workflow.to_dict()
