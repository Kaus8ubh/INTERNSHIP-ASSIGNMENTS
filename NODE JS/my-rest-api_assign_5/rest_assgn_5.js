const express = require('express'); // Importing express
const app = express(); // express app

// mock data
const users = [
    { id: 1, name: 'KAUSTUBH' },
    { id: 2, name: 'PINAKIN' },
];

// Custom middleware to log requests
const logRequest = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next(); // Passing control to the next middleware
};
app.use(logRequest); // Applying middleware globally

// Middleware to parse JSON
app.use(express.json()); 

// GET /
app.get('/', (req, res) => {
    res.send('Welcome to Node.js!');
}); 

// POST /data
app.post('/data', (req, res) => {
    console.log(req.body); // Log of received data
    res.send('Data received.');
});

// GET /users
app.get('/users', (req, res) => {
    res.json(users);//showing mock users
});

// 404 Middleware (for invalid routes)
app.use((req, res) => {
    res.status(404).send('Route is not valid');
});

// Error-handling Middleware
app.use((err, req, res, next) => {
    console.log(err.stack); // Log the error stack trace
    res.send('Something went wrong!');
});

// strating the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
//in this middlewares we havn't used next() method, 
//because we alredy sendin response to the client
//so we don't need to pass control to the next middleware