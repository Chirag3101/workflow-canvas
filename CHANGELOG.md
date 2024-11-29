# Changelog

## [v0.0.1] - Initial Release

### Added
- Basic workflow management system with CRUD operations
- Frontend-Backend integration with full API connectivity
- SQLite database integration for persistent storage

#### Backend Features
- FastAPI server with RESTful endpoints
- SQLAlchemy ORM for database operations
- SQLite database with workflow model
- CORS middleware for frontend communication
- Database utility tools for management
- Swagger/OpenAPI documentation

#### Frontend Features
- React application with modern UI
- Workflow canvas component
- Form-based workflow creation
- Real-time workflow listing
- Error handling and loading states
- Legacy mode toggle

#### Database Schema
- Workflows table with:
  - id (Primary Key)
  - title
  - content
  - created_at
  - updated_at

#### API Endpoints
- GET /workflows - List all workflows
- POST /workflows - Create new workflow
- GET /workflows/{id} - Get specific workflow
- PUT /workflows/{id} - Update workflow
- DELETE /workflows/{id} - Delete workflow

### Technical Stack
- Backend:
  - Python 3.x
  - FastAPI
  - SQLAlchemy
  - SQLite
  - Uvicorn server
- Frontend:
  - React.js
  - Axios for API calls
  - Tailwind CSS
  
### Development Tools
- Database utility script (db_utils.py)
- API testing via Swagger UI
- Development servers:
  - Backend: http://127.0.0.1:8000
  - Frontend: http://localhost:3000

### Documentation
- API documentation available at /docs
- SQL commands reference
- Git workflow guide
- Project setup instructions

### Known Limitations
- Basic CRUD functionality only
- No authentication system
- No workflow visualization yet
- In-memory text editing only
- No export capabilities

### Next Steps (Planned for v0.0.2)
1. Implement workflow visualization
2. Add authentication system
3. Add export functionality
4. Enhance error handling
5. Add unit tests
6. Implement advanced workflow features
