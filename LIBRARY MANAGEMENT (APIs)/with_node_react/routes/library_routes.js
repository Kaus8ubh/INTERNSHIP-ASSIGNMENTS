// this will connect http requests to the services

const express = require('express');
const router = express.Router();
const LibraryServices = require('../services/library_services');

// Input validation middleware
const validateAllocationInput = (req, res, next) => {
    const { userId, bookId, issueDate, returnDate } = req.body;
    if (!userId || !bookId || !issueDate || !returnDate) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    next();
};

const validatedeallocateInput = (req, res, next) => {
    const { userId, bookId } = req.body;
    if (!userId || !bookId) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    next();
};

const helper = async(req, res) => {
    try{
        const allocatedBooks = await LibraryServices.getAllocatedBooks(); 
        res.json(allocatedBooks);  
    } catch(error) {
        res.status(500).json({ error: "Failed to fetch books" });
    }
}

// Routes
router.get('/allocated-books', helper);
router.post('/allocate-book', validateAllocationInput, LibraryServices.allocateBook);
router.post('/deallocate-book',validatedeallocateInput, LibraryServices.deallocateBook);

module.exports = router;