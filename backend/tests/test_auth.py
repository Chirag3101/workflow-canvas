import pytest
from fastapi.testclient import TestClient
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from jose import JWTError
from database import Base, get_db
from main import app
from utils.auth import verify_token, create_access_token
from models.auth import User

# Use SQLite in-memory database for testing
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

@pytest.fixture
def client():
    Base.metadata.create_all(bind=engine)
    with TestClient(app) as c:
        yield c
    Base.metadata.drop_all(bind=engine)

def test_register_user(client):
    response = client.post(
        "/auth/register",
        json={
            "username": "testuser",
            "email": "test@example.com",
            "password": "testpassword123"
        }
    )
    assert response.status_code == 200
    data = response.json()
    assert data["username"] == "testuser"
    assert data["email"] == "test@example.com"
    assert "password" not in data

def test_register_duplicate_username(client):
    # Register first user
    client.post(
        "/auth/register",
        json={
            "username": "testuser",
            "email": "test1@example.com",
            "password": "testpassword123"
        }
    )
    
    # Try to register with same username
    response = client.post(
        "/auth/register",
        json={
            "username": "testuser",
            "email": "test2@example.com",
            "password": "testpassword123"
        }
    )
    assert response.status_code == 400
    assert "Username already registered" in response.json()["detail"]

def test_login_success(client):
    # Register user
    client.post(
        "/auth/register",
        json={
            "username": "testuser",
            "email": "test@example.com",
            "password": "testpassword123"
        }
    )
    
    # Login
    response = client.post(
        "/auth/login",
        data={
            "username": "testuser",
            "password": "testpassword123"
        }
    )
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"

def test_login_wrong_password(client):
    # Register user
    client.post(
        "/auth/register",
        json={
            "username": "testuser",
            "email": "test@example.com",
            "password": "testpassword123"
        }
    )
    
    # Try to login with wrong password
    response = client.post(
        "/auth/login",
        data={
            "username": "testuser",
            "password": "wrongpassword"
        }
    )
    assert response.status_code == 401
    assert "Incorrect username or password" in response.json()["detail"]

def test_get_current_user(client):
    # Register user
    client.post(
        "/auth/register",
        json={
            "username": "testuser",
            "email": "test@example.com",
            "password": "testpassword123"
        }
    )
    
    # Login to get token
    response = client.post(
        "/auth/login",
        data={
            "username": "testuser",
            "password": "testpassword123"
        }
    )
    token = response.json()["access_token"]
    
    # Get current user info
    response = client.get(
        "/auth/me",
        headers={"Authorization": f"Bearer {token}"}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["username"] == "testuser"
    assert data["email"] == "test@example.com"

def test_get_current_user_invalid_token(client):
    response = client.get(
        "/auth/me",
        headers={"Authorization": "Bearer invalid_token"}
    )
    assert response.status_code == 401
    assert "Could not validate credentials" in response.json()["detail"]

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

async def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
) -> User:
    """Get the current user from the token."""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    try:
        token_data = verify_token(token)
        user = db.query(User).filter(User.username == token_data.username).first()
        if user is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
        
    return user
