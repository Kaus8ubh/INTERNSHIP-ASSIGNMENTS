const express = require("express");
const router = express.Router();
const bookServices = require("../services/book_services");

// Input validation middleware
const validateBookInput = (req, res, next) => {
    const { title, author, quantity } = req.body;
    if (!title || !author || quantity === undefined) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    if (typeof quantity !== 'number' || quantity < 0) {
        return res.status(400).json({ error: "Quantity must be a positive number" });
    }
    next();
};

// Routes
router.get('/books', bookServices.getBooks);
router.get('/books/:id', bookServices.getBookById);
router.post('/books', validateBookInput, bookServices.addBook);
router.delete('/books/:id', bookServices.deleteBook);

module.exports = router;