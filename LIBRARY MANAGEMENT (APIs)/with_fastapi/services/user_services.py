from dao.user_dao import UserDAO
from dao.library_dao import LibraryDAO
from models.user import User, UserCreate
from fastapi import HTTPException
from typing import List

class UserService:
    def __init__(self):
        self.user_dao = UserDAO()

    def get_all_users(self) -> List[User]:
        return self.user_dao.get_all()

    def get_user_by_id(self, user_id: int) -> User:
        user = self.user_dao.get_by_id(user_id)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        return user

    def create_user(self, user: UserCreate) -> User:
        return self.user_dao.create(user)

    def delete_user(self, userid: int) -> dict:
        if not self.user_dao.get_by_id(userid):
            raise HTTPException(status_code=404, detail="User not found")
        self.user_dao.delete(userid)
        # want to delete the allocated books instance for this user
        library_dao = LibraryDAO()
        library_dao.remove_by_user_id(userid) 
        return {"message": f"User with id {userid} deleted successfully"}