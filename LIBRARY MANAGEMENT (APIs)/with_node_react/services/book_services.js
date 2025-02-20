const bookDao = require('../dao/book_dao');

class BookServices {
    async getBooks(req, res) {
        try {
            const books = await bookDao.getBooks();
            res.json(books);
        } catch (error) {
            res.status(500).json({ error: "Failed to fetch books" });
        }
    }

    async getBookById(req, res) {
        try {
            const bookId = parseInt(req.params.id);
            if (isNaN(bookId)) {
                return res.status(400).json({ error: "Invalid book ID" });
            }

            const book = await bookDao.getBookById(bookId);
            if (book) {
                res.json(book);
            } else {
                res.status(404).json({ error: "Book not found" });
            }
        } catch (error) {
            res.status(500).json({ error: "Failed to fetch book" });
        }
    }

    async addBook(req, res) {
        try {
            const { title, author, quantity } = req.body;
            const newBook = await bookDao.addBook({ title, author, quantity });
            res.status(201).json({ 
                message: "Book added successfully",
                book: newBook 
            });
        } catch (error) {
            res.status(500).json({ error: "Failed to add book" });
        }
    }

    async deleteBook(req, res) {
        try {
            const bookId = parseInt(req.params.id);
            if (isNaN(bookId)) {
                return res.status(400).json({ error: "Invalid book ID" });
            }

            const book = await bookDao.getBookById(bookId);
            if (!book) {
                return res.status(404).json({ error: "Book not found" });
            }

            await bookDao.deleteBook(bookId);
            res.json({ message: "Book deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: "Failed to delete book" });
        }
    }
}

module.exports = new BookServices();