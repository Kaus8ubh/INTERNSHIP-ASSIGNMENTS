const http = require('http');
const fs = require('fs');

// Creating and appending logs to
// log file (log.txt)
const logMessage = 'This is a log file.\n';
fs.appendFileSync('log.txt', logMessage);

// Blocking(synchronous) function to read log.txt 
// (blocking)Halts the program until the operation completes.
// fs.readFileSync.
function readLogSync() {
    const data = fs.readFileSync('log.txt', 'utf8');
    console.log('Blocking read:', data);
}

// Non-blocking(Asynchronous) function to read log.txt 
// Returns immediately(uses callback/Promise to handle result)
// fs.readFile.
function readLogAsync() {
    fs.readFile('log.txt', 'utf8', (err, data) => {
        if (err) throw err;
        console.log('Non-blocking read:', data);
    });
}

// event loop handling
console.log('Start of script');

setTimeout(() => {
    console.log('setTimeout');
}, 0);

setImmediate(() => {
    console.log('setImmediate');
});

process.nextTick(() => {
    console.log('process.nextTick');
});

// HTTP server
const server = http.createServer((req, res) => {
    res.write('Welcome to Node.js!');
    res.end();
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
    readLogSync();
    readLogAsync();
});

console.log('End of script');

//output
// Start of script
// End of script
// process.nextTick
// Server running at http://localhost:3000/
// Blocking read: This is a log file.
// This is a log file.
// This is a log file.
// This is a log file.
// This is a log file.
// This is a log file.
// This is a log file.

// setTimeout
// setImmediate
// Non-blocking read: This is a log file.
// This is a log file.
// This is a log file.
// This is a log file.
// This is a log file.
// This is a log file.
// This is a log file.