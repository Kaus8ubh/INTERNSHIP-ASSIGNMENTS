import json
from models.library import LibraryAllocation, AllocationCreate
from typing import List, Optional
from datetime import date
from json import JSONEncoder

class LibraryDAO:
    def __init__(self, file_path: str = "./data/library.json"):
        self.file_path = file_path

    # json encoder for date
    def _date_serializer(self, obj):
        if isinstance(obj, date):
            return obj.__str__()
        raise TypeError(f"Type {type(obj)} not serializable")

    def _load_data(self):
        try:
            with open(self.file_path, 'r') as f:
                return json.load(f)
        except FileNotFoundError:
            return []

    def _save_data(self, data:list):
        with open(self.file_path, 'w') as f:
            json.dump(data, f, indent=4, default=self._date_serializer)

    def create_allocation(self, allocation: AllocationCreate) -> LibraryAllocation:
        allocations = self._load_data()
        new_allocation = LibraryAllocation(
            id=len(allocations) + 1,
            bookid=allocation.bookid,
            userid=allocation.userid,  
            issue_date=allocation.issue_date,
            return_date=allocation.return_date
        )
        # converting to dictionary
        allocation_dict={
            "id": new_allocation.id,
            "bookid": new_allocation.bookid,
            "userid": new_allocation.userid,
            "issue_date": new_allocation.issue_date,
            "return_date": new_allocation.return_date
        }

        allocations.append(allocation_dict)
        self._save_data(allocations)
        return new_allocation

    def remove_allocation(self, bookid: int, userid: int) -> bool:
        allocations = self._load_data()
        allocations = [
            a for a in allocations 
            if not (a['bookid'] == bookid and a['userid'] == userid)
        ]
        self._save_data(allocations)
        return True
    
    # this is used when we delete a user 
    def remove_by_user_id(self, userid: int) -> bool:
        allocations = self._load_data()
        allocations = [
            a for a in allocations 
            if not (a['userid'] == userid)
        ]
        self._save_data(allocations)
        return True

    # this will be used when we delete a book
    def remove_by_book_id(self,bookid:int) -> bool:
        allocations = self._load_data()
        allocations= [
            a for a in allocations
            if not (a["bookid"]==bookid)
        ]
        self._save_data(allocations)
        return True

    def get_allocations(self) -> List[dict]:  
        allocations = self._load_data()
        # return allocations
        result = []
        for obj in allocations:
            result.append({
                "id": obj["id"],
                "bookid": obj["bookid"],
                "userid": obj["userid"],
                "issue_date": obj["issue_date"],
                "return_date": obj["return_date"]
            })
        # print(result)
        return result  
 
