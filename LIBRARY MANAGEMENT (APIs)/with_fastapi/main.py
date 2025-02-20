from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api import book_routes, user_routes, library_routes

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(book_routes.router, prefix="/books")
app.include_router(user_routes.router, prefix="/users")
app.include_router(library_routes.router, prefix="/library")
