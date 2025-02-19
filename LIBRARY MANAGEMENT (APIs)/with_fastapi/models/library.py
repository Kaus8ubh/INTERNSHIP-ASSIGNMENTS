from pydantic import BaseModel
from typing import List
from datetime import date

class LibraryAllocation(BaseModel):
    id: int
    bookid: int
    userid: int
    issue_date: date
    return_date: date

class AllocationCreate(BaseModel):
    bookid: int
    userid: int
    issue_date: date
    return_date: date
