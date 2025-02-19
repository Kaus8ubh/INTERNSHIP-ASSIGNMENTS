# api/library_routes.py
from fastapi import APIRouter, HTTPException
from models.library import AllocationCreate, LibraryAllocation
from services.library_services import LibraryService
from typing import List, Optional

router = APIRouter(prefix="/library", tags=["library"])
library_service = LibraryService()

@router.post("/allocate")
def allocate_book(allocation: AllocationCreate):
    """Allocate a book to a user"""
    return library_service.allocate_book(allocation)

@router.post("/deallocate/{bookid}/{userid}")
def deallocate_book(bookid: int, userid: int):
    """Deallocate a book from a user"""
    return library_service.deallocate_book(bookid, userid)

@router.get("/allocations")  #not mentioning model here as we are returning a modified list of dictionaries
async def get_allocations():
    """Get all library allocations"""
    try:
        return library_service.get_allocations()  
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error retrieving allocations: {str(e)}"
        )