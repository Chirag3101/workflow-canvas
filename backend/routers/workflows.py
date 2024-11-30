from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from database import get_db
from models.workflow import Workflow, WorkflowNode, WorkflowEdge
from schemas.workflow import WorkflowCreate, WorkflowUpdate, WorkflowResponse
from routers.auth import get_current_user
from models.auth import User

router = APIRouter(
    prefix="/workflows",
    tags=["workflows"]
)

@router.post("", response_model=WorkflowResponse)
async def create_workflow(
    workflow: WorkflowCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create a new workflow."""
    db_workflow = Workflow(
        title=workflow.title,
        description=workflow.description,
        is_public=workflow.is_public,
        user_id=current_user.id,
        nodes=[node.dict() for node in workflow.nodes],
        edges=[edge.dict() for edge in workflow.edges]
    )
    db.add(db_workflow)
    db.commit()
    db.refresh(db_workflow)
    return db_workflow

@router.get("", response_model=List[WorkflowResponse])
async def get_workflows(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get all workflows for the current user."""
    return db.query(Workflow).filter(Workflow.user_id == current_user.id).all()

@router.get("/{workflow_id}", response_model=WorkflowResponse)
async def get_workflow(
    workflow_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get a specific workflow."""
    workflow = db.query(Workflow).filter(Workflow.id == workflow_id).first()
    if not workflow:
        raise HTTPException(status_code=404, detail="Workflow not found")
    if workflow.user_id != current_user.id and not workflow.is_public:
        raise HTTPException(status_code=403, detail="Not authorized to view this workflow")
    return workflow

@router.put("/{workflow_id}", response_model=WorkflowResponse)
async def update_workflow(
    workflow_id: int,
    workflow_update: WorkflowUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update a workflow."""
    workflow = db.query(Workflow).filter(Workflow.id == workflow_id).first()
    if not workflow:
        raise HTTPException(status_code=404, detail="Workflow not found")
    if workflow.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to update this workflow")
    
    for field, value in workflow_update.dict(exclude_unset=True).items():
        if field == "nodes":
            value = [node.dict() for node in value]
        elif field == "edges":
            value = [edge.dict() for edge in value]
        setattr(workflow, field, value)
    
    db.commit()
    db.refresh(workflow)
    return workflow

@router.delete("/{workflow_id}")
async def delete_workflow(
    workflow_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Delete a workflow."""
    workflow = db.query(Workflow).filter(Workflow.id == workflow_id).first()
    if not workflow:
        raise HTTPException(status_code=404, detail="Workflow not found")
    if workflow.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this workflow")
    
    db.delete(workflow)
    db.commit()
    return {"message": "Workflow deleted successfully"}
