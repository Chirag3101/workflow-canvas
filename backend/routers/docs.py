from fastapi import APIRouter, HTTPException
from pathlib import Path
from typing import List, Dict, Any
import os

router = APIRouter()

# Base directory for documentation
DOCS_BASE_DIR = Path(__file__).parent.parent.parent / 'docs'

@router.get("/tree")
async def get_doc_tree() -> List[Dict[str, Any]]:
    """Get the documentation file structure."""
    try:
        def process_directory(directory: Path) -> List[Dict[str, Any]]:
            items = []
            for item in sorted(directory.iterdir()):
                if item.name.startswith('.'):
                    continue
                
                relative_path = str(item.relative_to(DOCS_BASE_DIR))
                
                if item.is_file() and item.suffix == '.md':
                    items.append({
                        'type': 'file',
                        'name': item.name,
                        'path': relative_path
                    })
                elif item.is_dir():
                    children = process_directory(item)
                    if children:  # Only include directories with markdown files
                        items.append({
                            'type': 'directory',
                            'name': item.name,
                            'path': relative_path,
                            'children': children
                        })
            return items

        if not DOCS_BASE_DIR.exists():
            return []
            
        tree = process_directory(DOCS_BASE_DIR)
        print(f"Generated doc tree: {tree}")  # Debug print
        return tree
        
    except Exception as e:
        print(f"Error in get_doc_tree: {str(e)}")  # Debug print
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/content")
async def get_doc_content(path: str) -> Dict[str, str]:
    """Get the content of a specific documentation file."""
    try:
        file_path = DOCS_BASE_DIR / path
        print(f"Attempting to read: {file_path}")  # Debug print
        
        if not file_path.is_file() or not str(file_path).endswith('.md'):
            raise HTTPException(status_code=404, detail="Document not found")
            
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        return {"content": content}
    except Exception as e:
        print(f"Error in get_doc_content: {str(e)}")  # Debug print
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/save")
async def save_doc_content(*, path: str, content: str) -> Dict[str, str]:
    """Save content to a documentation file."""
    try:
        file_path = DOCS_BASE_DIR / path
        print(f"Attempting to save to: {file_path}")  # Debug print
        
        if not str(file_path).endswith('.md'):
            raise HTTPException(status_code=400, detail="Invalid file type")
            
        # Ensure the directory exists
        file_path.parent.mkdir(parents=True, exist_ok=True)
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        return {"status": "success"}
    except Exception as e:
        print(f"Error in save_doc_content: {str(e)}")  # Debug print
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/search")
async def search_docs(query: str) -> List[Dict[str, str]]:
    """Search through documentation content."""
    try:
        results = []
        if not DOCS_BASE_DIR.exists():
            return results
            
        for root, _, files in os.walk(DOCS_BASE_DIR):
            for file in files:
                if file.endswith('.md'):
                    file_path = Path(root) / file
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                        if query.lower() in content.lower():
                            relative_path = file_path.relative_to(DOCS_BASE_DIR)
                            results.append({
                                'path': str(relative_path),
                                'name': file,
                                'preview': content[:200] + '...' if len(content) > 200 else content
                            })
        return results
    except Exception as e:
        print(f"Error in search_docs: {str(e)}")  # Debug print
        raise HTTPException(status_code=500, detail=str(e))
