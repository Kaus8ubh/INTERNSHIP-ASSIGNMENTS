# dao/book_dao.py
import json
from models.book import Book, BookCreate
from typing import List


class BookDAO:
    def __init__(self, file_path: str = "./data/books.json"):
        self.file_path = file_path

    def _load_data(self):
        with open(self.file_path, 'r') as f:
            return json.load(f)

    def _save_data(self, data):
        with open(self.file_path, 'w') as f:
            json.dump(data, f, indent=4)

    def get_all(self) -> List[Book]:
        return [Book(**book) for book in self._load_data()]

    def get_by_id(self, book_id: int) -> Book:
        books = self._load_data()
        book = next((b for b in books if b['id'] == book_id), None)
        return Book(**book) if book else None
    
    # grt book name only for allocation
    def get_book_name(self, book_id: int) -> str:
        books = self._load_data()
        book = next((b for b in books if b['id'] == book_id), None)
        return book['title'] if book else None
        
    def create(self, book: BookCreate) -> Book:
        books = self._load_data()
        new_book = Book(
            id=len(books) + 1,
            **book.dict()
        )
        books.append(new_book.dict())
        self._save_data(books)
        return new_book

    def delete(self, book_id: int) -> bool:
        books = self._load_data()
        books = [b for b in books if b['id'] != book_id]
        self._save_data(books)
        return {'message': 'Book deleted successfully'}

    def update_quantity(self, book_id: int, quantity_change: int) -> bool:
        books = self._load_data()
        book = next((b for b in books if b['id'] == book_id), None)
        if book:
            book['quantity'] += quantity_change
            self._save_data(books)
            return True
        return False