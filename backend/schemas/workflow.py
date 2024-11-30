from pydantic import BaseModel, Field
from typing import List, Optional, Dict
from datetime import datetime

class NodeBase(BaseModel):
    type: str = Field(..., description="Type of the node (task, decision, etc.)")
    position_x: int = Field(..., description="X coordinate of the node")
    position_y: int = Field(..., description="Y coordinate of the node")
    data: Dict = Field(default_factory=dict, description="Additional node data")

class EdgeBase(BaseModel):
    source_id: int = Field(..., description="ID of the source node")
    target_id: int = Field(..., description="ID of the target node")
    type: str = Field(..., description="Type of the edge (success, failure, etc.)")
    data: Dict = Field(default_factory=dict, description="Additional edge data")

class WorkflowBase(BaseModel):
    title: str = Field(..., 
        description="The title of the workflow",
        min_length=1,
        max_length=100
    )
    description: Optional[str] = Field(None, description="Optional description of the workflow")
    is_public: bool = Field(False, description="Whether the workflow is public")

class WorkflowCreate(WorkflowBase):
    nodes: List[NodeBase] = Field(default_factory=list, description="List of workflow nodes")
    edges: List[EdgeBase] = Field(default_factory=list, description="List of workflow edges")

class WorkflowUpdate(WorkflowCreate):
    pass

class WorkflowResponse(WorkflowBase):
    id: int = Field(..., description="Unique identifier for the workflow")
    nodes: List[NodeBase] = Field(..., description="List of workflow nodes")
    edges: List[EdgeBase] = Field(..., description="List of workflow edges")
    created_at: datetime = Field(..., description="Timestamp when the workflow was created")
    updated_at: Optional[datetime] = Field(None, description="Timestamp when the workflow was last updated")
    user_id: int = Field(..., description="ID of the workflow owner")

    class Config:
        from_attributes = True
        json_schema_extra = {
            "example": {
                "id": 1,
                "title": "Product Launch Workflow",
                "description": "Workflow for managing product launches",
                "is_public": False,
                "nodes": [
                    {
                        "type": "task",
                        "position_x": 100,
                        "position_y": 100,
                        "data": {"label": "Market Research"}
                    }
                ],
                "edges": [
                    {
                        "source_id": 1,
                        "target_id": 2,
                        "type": "success",
                        "data": {}
                    }
                ],
                "created_at": "2023-11-22T10:00:00",
                "updated_at": "2023-11-22T10:00:00",
                "user_id": 1
            }
        }
