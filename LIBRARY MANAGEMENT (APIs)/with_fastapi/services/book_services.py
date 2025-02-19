from dao.book_dao import BookDAO
from models.book import Book, BookCreate
from fastapi import HTTPException
from typing import List
from dao.library_dao import LibraryDAO

class BookService:
    def __init__(self):
        self.book_dao = BookDAO()

    def get_all_books(self):
        return self.book_dao.get_all()

    def add_book(self, book: BookCreate):
        return self.book_dao.create(book)

    def delete_book(self, book_id: int):
        if not self.book_dao.get_by_id(book_id):
            raise HTTPException(status_code=404, detail="Book not found")
        self.book_dao.delete(book_id)
        # will delete the allocations for this book
        library_dao = LibraryDAO()
        library_dao.remove_by_book_id(book_id)

    def update_quantity(self, book_id: int, quantity_change: int):
        return self.book_dao.update_quantity(book_id, quantity_change)