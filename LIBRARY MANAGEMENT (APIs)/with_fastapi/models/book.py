from pydantic import BaseModel
from typing import List

class BookCreate(BaseModel):
    title: str
    author: str
    quantity: int

class Book(BookCreate):
    id: int