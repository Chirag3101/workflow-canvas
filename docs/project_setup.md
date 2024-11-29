# Project Setup and Development Guide

## Project Structure
```
workflow-canvas/
├── backend/
│   ├── main.py           # FastAPI application
│   ├── database.py       # Database configuration
│   ├── db_utils.py       # Database utility tools
│   ├── requirements.txt  # Python dependencies
│   └── workflows.db      # SQLite database
├── frontend/
│   ├── src/             # React source code
│   ├── public/          # Static assets
│   └── package.json     # Node dependencies
└── docs/               # Documentation
```

## Setup Instructions

### Backend Setup
1. Create virtual environment:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Start the server:
```bash
uvicorn main:app --reload
```

Backend will be available at: http://localhost:8000

### Frontend Setup
1. Install dependencies:
```bash
cd frontend
npm install
```

2. Start development server:
```bash
npm start
```

Frontend will be available at: http://localhost:3000

## Development Workflow

### 1. Backend Development
- FastAPI routes in `main.py`
- Database models in `database.py`
- Use `db_utils.py` for database operations
- API documentation at http://localhost:8000/docs

### 2. Frontend Development
- React components in `src/components`
- Styles with Tailwind CSS
- API calls using axios

### 3. Database Operations
- Use `db_utils.py` for direct database access
- See `sql_commands.md` for SQL reference
- Database file: `workflows.db`

## API Endpoints

### Workflows
```
GET    /workflows      # List all workflows
POST   /workflows      # Create new workflow
GET    /workflows/{id} # Get specific workflow
PUT    /workflows/{id} # Update workflow
DELETE /workflows/{id} # Delete workflow
```

## Common Tasks

### Adding New API Endpoint
1. Add route to `main.py`:
```python
@app.get("/new-endpoint")
def new_endpoint():
    return {"message": "New endpoint"}
```

### Creating New React Component
1. Create component file:
```bash
touch frontend/src/components/NewComponent.js
```

2. Basic component structure:
```javascript
import React from 'react';

const NewComponent = () => {
  return (
    <div>
      New Component
    </div>
  );
};

export default NewComponent;
```

## Troubleshooting

### Backend Issues
1. Database connection:
```bash
# Check database file exists
ls backend/workflows.db

# Run database utility
python db_utils.py
```

2. API errors:
- Check FastAPI logs
- Visit /docs endpoint
- Verify database connection

### Frontend Issues
1. Build errors:
```bash
# Clear node modules
rm -rf node_modules
npm install
```

2. API connection:
- Check backend is running
- Verify API endpoint URLs
- Check browser console

## Deployment

### Local Development
```bash
# Backend
cd backend
uvicorn main:app --reload

# Frontend
cd frontend
npm start
```

### Production
1. Build frontend:
```bash
cd frontend
npm run build
```

2. Start backend:
```bash
cd backend
uvicorn main:app
```

## Resources

- FastAPI Documentation: https://fastapi.tiangolo.com/
- React Documentation: https://reactjs.org/
- Tailwind CSS: https://tailwindcss.com/
- SQLite Documentation: https://www.sqlite.org/docs.html
