const fs = require("fs").promises;
const e = require("express");
const path = require("path");

const BOOKS_FILE = path.join(__dirname, "../data/books.json");

async function loadData() {
    try {
        const data = await fs.readFile(BOOKS_FILE, "utf8");
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            // If file doesn't exist, create it with empty array
            await fs.writeFile(BOOKS_FILE, '[]');
            return [];
         }
        throw error;
    }
}

async function saveData(data) {
    await fs.writeFile(BOOKS_FILE, JSON.stringify(data, null, 4));
    console.log(data);
}

class BookDao {
    async getBooks() {
        return await loadData();
    }

    async getBookById(bookId) {
        const books = await loadData();
        return books.find(book => book.id === bookId);
    }

    async addBook(book) {
        const books = await loadData();
        const newBook = {
            id: books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1,
            title: book.title,
            author: book.author,
            quantity: parseInt(book.quantity),
            alloted_to: []
        };
        books.push(newBook);
        await saveData(books);
        return newBook;
    }

    async deleteBook(bookId) {
        const books = await loadData();
        const updatedBooks = books.filter(book => book.id !== bookId);
        await saveData(updatedBooks);
    }
}

module.exports = new BookDao();