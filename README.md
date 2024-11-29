# Workflow Canvas

A simple, intuitive workflow management tool that feels as natural as using a whiteboard. Perfect for solo entrepreneurs and small teams who want to document and visualize their workflows without the complexity of traditional tools.

## Features (v0.0.1)

### Core Features
- Clean, whiteboard-like interface
- Workflow creation and management
- Real-time updates
- Database persistence
- Modern, responsive UI

### Technical Features
- Full-stack application with REST API
- SQLite database integration
- CRUD operations for workflows
- Error handling and loading states
- API documentation with Swagger

## Technical Stack

### Backend
- Python 3.x
- FastAPI framework
- SQLAlchemy ORM
- SQLite database
- Uvicorn ASGI server

### Frontend
- React.js
- Tailwind CSS for styling
- Axios for API calls
- Heroicons for icons

## Getting Started

### Prerequisites
- Python 3.x
- Node.js and npm
- Git

### Backend Setup
1. Navigate to backend directory:
```bash
cd backend
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

3. Start the backend server:
```bash
uvicorn main:app --reload
```

The backend will be available at http://127.0.0.1:8000

### Frontend Setup
1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

The frontend will be available at http://localhost:3000

## Development Resources

### API Documentation
- Swagger UI: http://127.0.0.1:8000/docs
- API Base URL: http://127.0.0.1:8000

### Database Management
- Use `db_utils.py` for database operations
- SQLite database file: `backend/workflows.db`
- See `docs/sql_commands.md` for SQL reference

### Documentation
- Project setup: `docs/project_setup.md`
- Git workflow: `docs/git_commands.md`
- SQL commands: `docs/sql_commands.md`
- Changelog: `CHANGELOG.md`

## Project Structure
```
workflow-canvas/
├── backend/
│   ├── main.py           # FastAPI application
│   ├── database.py       # Database configuration
│   ├── db_utils.py       # Database utilities
│   ├── requirements.txt  # Python dependencies
│   └── workflows.db      # SQLite database
├── frontend/
│   ├── src/             # React source code
│   ├── public/          # Static assets
│   └── package.json     # Node dependencies
└── docs/               # Documentation
```

## Contributing
1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License
This project is licensed under the MIT License.

## Roadmap
See `CHANGELOG.md` for planned features and improvements.
