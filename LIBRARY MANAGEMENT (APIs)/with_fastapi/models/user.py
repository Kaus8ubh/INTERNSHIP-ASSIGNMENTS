from pydantic import BaseModel
from typing import List

class UserCreate(BaseModel):
    name: str

class User(UserCreate):
    id: int