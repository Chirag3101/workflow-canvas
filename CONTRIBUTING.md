# Contributing to Workflow Canvas

Welcome to the Workflow Canvas project! We're excited that you're interested in contributing. This document will guide you through the process of contributing to our project.

## Table of Contents
- [Project Structure](#project-structure)
- [Development Setup](#development-setup)
- [Contribution Guidelines](#contribution-guidelines)
- [Code Style](#code-style)
- [Pull Request Process](#pull-request-process)
- [Development Workflow](#development-workflow)

## Project Structure
```
workflow-canvas/
├── backend/                 # FastAPI backend
│   ├── main.py             # Main application entry
│   ├── models/             # Database models
│   ├── routes/             # API endpoints
│   └── utils/              # Helper functions
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/       # API services
│   │   └── styles/         # CSS/Tailwind styles
│   └── public/             # Static assets
├── docs/                   # Documentation
│   ├── architecture/       # System architecture
│   ├── api/                # API documentation
│   └── guides/             # User & developer guides
└── tests/                  # Test suites
```

## Development Setup

### Prerequisites
- Python 3.8+
- Node.js 14+
- npm or yarn
- Git

### Setting Up Local Development

1. **Clone the Repository**
```bash
git clone https://github.com/yourusername/workflow-canvas.git
cd workflow-canvas
```

2. **Backend Setup**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

3. **Frontend Setup**
```bash
cd frontend
npm install
npm start
```

## Contribution Guidelines

### 1. Branch Naming Convention
- Feature: `feature/description`
- Bug Fix: `fix/description`
- Documentation: `docs/description`
- Refactor: `refactor/description`

### 2. Commit Message Format
```
type(scope): description

[optional body]

[optional footer]
```
Types: feat, fix, docs, style, refactor, test, chore

Example:
```
feat(visualization): add workflow diagram export feature

- Added PDF export functionality
- Implemented SVG conversion
- Added export button to UI

Closes #123
```

### 3. Code Review Process
1. Create a new branch
2. Make your changes
3. Write/update tests
4. Update documentation
5. Submit pull request
6. Address review comments
7. Merge after approval

## Code Style

### Python (Backend)
- Follow PEP 8 guidelines
- Use type hints
- Document functions using docstrings
- Maximum line length: 88 characters
- Use Black for formatting

### JavaScript/React (Frontend)
- Use ES6+ features
- Follow Airbnb Style Guide
- Use PropTypes for component props
- Use functional components with hooks
- Use ESLint and Prettier

## Pull Request Process

1. **Before Submitting**
   - Update documentation
   - Add/update tests
   - Run linting and tests
   - Update CHANGELOG.md

2. **PR Template**
```markdown
## Description
[Describe your changes]

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] Manual testing performed

## Screenshots (if applicable)

## Checklist
- [ ] Code follows style guidelines
- [ ] Documentation updated
- [ ] Tests added/updated
- [ ] CHANGELOG.md updated
```

## Development Workflow

### 1. Setting Up for Development
```bash
# Fork and clone the repository
git clone https://github.com/yourusername/workflow-canvas.git

# Create a new branch
git checkout -b feature/your-feature-name

# Make your changes
# ... code ...

# Run tests
cd backend && python -m pytest
cd frontend && npm test

# Submit PR
```

### 2. Running Tests
```bash
# Backend tests
cd backend
pytest

# Frontend tests
cd frontend
npm test
```

### 3. Building Documentation
```bash
# Install documentation dependencies
pip install mkdocs mkdocs-material

# Serve documentation locally
mkdocs serve

# Build documentation
mkdocs build
```

## Getting Help

- Join our [Discord community](#)
- Check out the [FAQ](docs/FAQ.md)
- Create an issue
- Contact maintainers

## License
By contributing, you agree that your contributions will be licensed under the project's MIT License.
