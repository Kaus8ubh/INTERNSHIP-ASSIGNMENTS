const http = require('http');
const getMessages = require('./helper.js');
const server = http.createServer((req, res) => {
    res.write('Welcome to Node.js!')
    res.end();
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
    console.log(getMessages());
});