
// http module
const http = require('http');

//server
const server = http.createServer((req, res) => {
    //content type to HTML
    res.write('hello world')

    //HTML response
    res.end();
});

// port 3000
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
