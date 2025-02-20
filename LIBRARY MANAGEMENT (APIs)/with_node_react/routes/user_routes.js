// this will connect http requests to the services

const express = require("express");
const router = express.Router();
const userServices = require("../services/user_services");

// Input validation middleware
const validateUserInput = (req, res, next) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    next();
};

// Routes
router.get('/users', userServices.getUsers);
router.get('/users/:id', userServices.getUserById);
router.post('/users', validateUserInput, userServices.addUser);
router.delete('/users/:id', userServices.deleteUser);

module.exports = router;