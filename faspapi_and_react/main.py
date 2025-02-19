from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import json
from fastapi.middleware.cors import CORSMiddleware
from typing import List

# Define request models so that we dont need to define again and again
class BookCreate(BaseModel):
    title: str
    author: str
    quantity: int

class UserCreate(BaseModel):
    name: str

app = FastAPI()

 #(due to cors error)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BOOKS_FILE = "books.json"
USERS_FILE = "users.json"

# function to load data and save data after change
def load_data(file):
    with open(file, "r") as f:
        return json.load(f)

def save_data(file, data):
    with open(file, "w") as f:
        json.dump(data, f, indent=4)

# fetch books
@app.get("/books")
def get_books():
    return load_data(BOOKS_FILE)

# adding a book
@app.post("/books")
def add_book(book: BookCreate):
    books = load_data(BOOKS_FILE)
    new_book = {
        "id": len(books) + 1,
        "title": book.title,
        "author": book.author,
        "quantity": book.quantity,
        "alloted_to": []  
    }
    books.append(new_book)
    save_data(BOOKS_FILE, books)
    return new_book

# delete book function
@app.delete("/books/{book_id}")
def delete_book(book_id: int):
    books = load_data(BOOKS_FILE)
    book = next((b for b in books if b["id"] == book_id), None)
    # returns the 1st value that matches, else none 
    
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    
    books.remove(book)
    save_data(BOOKS_FILE, books)
    return {"message": f"Book '{book['title']}' deleted"}

# showing users
@app.get("/users")
def get_users():
    return load_data(USERS_FILE)

# adding new user
@app.post("/register")
def register_user(user: UserCreate):
    users = load_data(USERS_FILE)
    new_user = {"id": len(users) + 1, "name": user.name}
    users.append(new_user)
    save_data(USERS_FILE, users)
    return new_user

# deleting a user
@app.delete("/users/{user_id}")
def delete_user(user_id: int):
    users = load_data(USERS_FILE)
    user = next((u for u in users if u["id"] == user_id), None)

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    users.remove(user)
    save_data(USERS_FILE, users)
    return {"message": f"User '{user['name']}' deleted"}

# showing all allocated books 
@app.get("/allocated-books")
def get_allocated_books():
    books = load_data(BOOKS_FILE)
    return [(book + " alloted to "+ book["alloted_to"]) for book in books if len(book["alloted_to"]) > 0]

# allocating a book
@app.post("/allocate/{book_id}/{user_id}")
def allocate_book(book_id: int, user_id: int):
    books = load_data(BOOKS_FILE)
    users = load_data(USERS_FILE)

    book = next((b for b in books if b["id"] == book_id), None)
    user = next((u for u in users if u["id"] == user_id), None)

    if not book or not user:
        raise HTTPException(status_code=404, detail="Book or User not found")

    # Check if already allocated
    if user_id in book.get("alloted_to", []):
        raise HTTPException(status_code=400, detail="Book is already allocated to this user")

    if book["quantity"] > 0:
        book["quantity"] -= 1
        if "alloted_to" not in book:
            book["alloted_to"] = []
        book["alloted_to"].append(user_id)
        save_data(BOOKS_FILE, books)
        return {"message": f"Book '{book['title']}' allocated to {user['name']}"}
    else:
        raise HTTPException(status_code=400, detail="Book is out of stock")

# deallocate a book
@app.post("/deallocate/{book_id}/{user_id}")
def deallocate_book(book_id: int, user_id: int):
    books = load_data(BOOKS_FILE)
    users = load_data(USERS_FILE)

    book = next((b for b in books if b["id"] == book_id), None)
    user = next((u for u in users if u["id"] == user_id), None)

    if not book or not user:
        raise HTTPException(status_code=404, detail="Book or User not found")

    if user_id not in book.get("alloted_to", []):
        raise HTTPException(status_code=400, detail="Book is not allocated to this user")

    book["alloted_to"].remove(user_id)
    book["quantity"] += 1
    save_data(BOOKS_FILE, books)
    return {"message": f"Book '{book['title']}' deallocated from {user['name']}"}



