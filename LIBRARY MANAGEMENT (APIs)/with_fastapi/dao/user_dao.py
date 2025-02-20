import json
from models.user import User, UserCreate
from typing import List


class UserDAO:
    def __init__(self, file_path: str = "./data/users.json"):
        self.file_path = file_path

    def load_data(self):
        with open(self.file_path, 'r') as f:
            return json.load(f)

    def save_data(self, data):
        with open(self.file_path, 'w') as f:
            json.dump(data, f, indent=4)

    def get_all(self) -> List[User]:
        return [User(**user) for user in self.load_data()]

    def get_by_id(self, user_id: int) -> User: #(->user) we are defining the return type
        users = self.load_data()
        user = next((u for u in users if u['id'] == user_id), None)
        return User(**user) if user else None
    
    # get user name only for allocation
    def get_user_name(self, user_id: int) -> str:
        users = self.load_data()
        user = next((u for u in users if u['id'] == user_id), None)
        return user['name'] if user else None

    def create(self, user: UserCreate) -> User:
        users = self.load_data()
        new_user = User(
            id=len(users) + 1,
            **user.dict()
        )
        users.append(new_user.dict())
        self.save_data(users)
        return new_user

    def delete(self, userid: int) -> bool:
        users = self.load_data()
        users = [u for u in users if u['id'] != userid]
        self.save_data(users)
        return True