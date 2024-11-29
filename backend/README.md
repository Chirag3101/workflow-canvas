# Workflow Canvas Backend

Simple FastAPI backend for the Workflow Canvas application.

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the server:
```bash
uvicorn main:app --reload
```

The API will be available at http://localhost:8000

## API Endpoints

- `GET /`: Welcome message
- `POST /workflows/`: Create a new workflow
- `GET /workflows/`: List all workflows
- `GET /workflows/{id}`: Get a specific workflow
- `PUT /workflows/{id}`: Update a workflow

## Development

The backend currently uses in-memory storage for simplicity. Future updates will include:
- Database integration
- Authentication
- AI-powered workflow analysis
- Visual representation generation
