from fastapi import APIRouter, HTTPException
from models.book import BookCreate, Book
from services.book_services import BookService
from typing import List

router = APIRouter(prefix="/books", tags=["books"])
book_service = BookService()

@router.get("/", response_model=List[Book])
def get_all_books():
    """Get all books from the library"""
    return book_service.get_all_books()

@router.post("/", response_model=Book)
def add_book(book: BookCreate):
    """Add a new book to the library"""
    return book_service.add_book(book)

@router.delete("/{book_id}")
def delete_book(book_id: int):
    """Delete a book from the library"""
    return book_service.delete_book(book_id)