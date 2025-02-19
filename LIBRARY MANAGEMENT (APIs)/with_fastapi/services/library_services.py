from dao.library_dao import LibraryDAO
from dao.book_dao import BookDAO
from dao.user_dao import UserDAO
from models.library import AllocationCreate, LibraryAllocation
from fastapi import HTTPException
from typing import List

class LibraryService:
    def __init__(self):
        self.library_dao = LibraryDAO()
        self.book_dao = BookDAO()
        self.user_dao = UserDAO()

    def get_allocations(self) -> List[LibraryAllocation]:
        raw_allocations = self.library_dao.get_allocations()
        simple_allocations = []
        for a in raw_allocations:
            simple_allocation = {
                "book": self.book_dao.get_book_name(a["bookid"]),
                "user": self.user_dao.get_user_name(a["userid"]),
                "issue_date": a["issue_date"],
                "return_date": a["return_date"]
            }
            simple_allocations.append(simple_allocation)
        return simple_allocations
        
        
        # return [LibraryAllocation(**a) for a in raw_allocations]


    def allocate_book(self, allocation: AllocationCreate):
        book = self.book_dao.get_by_id(allocation.bookid)
        user = self.user_dao.get_by_id(allocation.userid)

        if not book or not user:
            raise HTTPException(status_code=404, detail="Book or User not found")

        if book.quantity <= 0:
            raise HTTPException(status_code=400, detail="Book is out of stock")

        # Create allocation
        self.library_dao.create_allocation(allocation)
        # Update book quantity
        self.book_dao.update_quantity(book.id, -1)

        return {"message": "Book allocated successfully"}

    def deallocate_book(self, bookid: int, userid: int):
        # Remove allocation
        if self.library_dao.remove_allocation(bookid, userid):
            # Update book quantity
            self.book_dao.update_quantity(bookid, 1)
            return {"message": "Book deallocated successfully"}
        return {"message": "Allocation not found"}