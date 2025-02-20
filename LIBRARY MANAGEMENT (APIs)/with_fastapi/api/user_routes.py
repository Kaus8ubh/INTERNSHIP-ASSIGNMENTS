# api/user_routes.py
from fastapi import APIRouter, HTTPException
from models.user import UserCreate, User
from services.user_services import UserService
from typing import List

router = APIRouter()
user_service = UserService()

@router.get("/", response_model=List[User])
def get_all_users():
    """Get all users from the system"""
    return user_service.get_all_users()

# @router.get("/{user_id}", response_model=User)
# def get_user(user_id: int):
#     """Get a specific user by ID"""
#     return user_service.get_user_by_id(user_id)

@router.post("/", response_model=User)
def create_user(user: UserCreate):
    """Create a new user"""
    return user_service.create_user(user)

@router.delete("/{userid}")
def delete_user(userid: int):
    """Delete a user by ID"""
    return user_service.delete_user(userid)
