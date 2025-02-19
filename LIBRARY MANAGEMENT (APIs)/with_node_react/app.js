const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// JSON file paths
const BOOKS_FILE = path.join(__dirname, "books.json");
const USERS_FILE = path.join(__dirname, "users.json");

// Middleware to parse JSON bodies and serve static files
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// CORS middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

//functions to load and save data
function loadData(filePath) {
    try {
        return JSON.parse(fs.readFileSync(filePath, "utf8"));
    } catch (err) {
        console.error(err);
        return [];
    }
}

function saveData(filePath, data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
}

// Get all books
app.get("/books", (req, res) => {
    const books = loadData(BOOKS_FILE);
    res.json(books);
});

// Add a new book
app.post("/books", (req, res) => {
    const { title, author, quantity } = req.body;
    
    if (!title || !author || quantity === undefined) {
        return res.status(400).json({ error: "Missing requi red fields" });
    }

    const books = loadData(BOOKS_FILE);
    const newBook = {
        id: books.length + 1,
        title,
        author,
        quantity: parseInt(quantity),
        alloted_to: []
    };

    books.push(newBook);
    saveData(BOOKS_FILE, books);
    res.json(newBook);
});

// Delete a book
app.delete("/books/:id", (req, res) => {
    const id = parseInt(req.params.id);
    
    const books = loadData(BOOKS_FILE);
    
    const bookIndex = books.findIndex(b => b.id === id);
    if (bookIndex === -1) { //-1 means book is not present
        return res.status(404).json({ error: "Book not found" });
    }
    const deletedBook = books.splice(bookIndex, 1)[0]; //return one book
    saveData(BOOKS_FILE, books);
    res.json({ message: `Book '${deletedBook.title}' deleted successfully` });
});

// Get all users
app.get("/users", (req, res) => {
    const users = loadData(USERS_FILE);
    res.json(users);
});

// Register new user
app.post("/register", (req, res) => {
    const { name } = req.body;
    
    if (!name) {
        return res.status(400).json({ error: "Name is required" });
    }

    const users = loadData(USERS_FILE);
    const newUser = {
        id: users.length + 1,
        name,
        possessions: []
    };

    users.push(newUser);
    saveData(USERS_FILE, users);
    res.json(newUser);
});

// Delete user
app.delete("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const users = loadData(USERS_FILE);
    const userIndex = users.findIndex(u => u.id === id);

    if (userIndex === -1) {
        return res.status(404).json({ error: "User not found" });
    }

    const deletedUser = users.splice(userIndex, 1)[0];
    saveData(USERS_FILE, users);
    res.json({ message: `User '${deletedUser.name}' deleted successfully` });
});

// Allocate book
app.post("/allocate/:bookId/:userId", (req, res) => {
    const bookId = parseInt(req.params.bookId);
    const userId = parseInt(req.params.userId);
    const { from_date, to_date } = req.body;

    if (!from_date || !to_date) {
        return res.status(400).json({ error: "Dates are required" });
    }

    const books = loadData(BOOKS_FILE);
    const users = loadData(USERS_FILE);
    
    const book = books.find(b => b.id === bookId);
    const user = users.find(u => u.id === userId);

    if (!book || !user) {
        return res.status(404).json({ error: "Book or User not found" });
    }

    if (book.alloted_to.includes(userId)) {
        return res.status(400).json({ error: "Book is already allocated to this user" });
    }

    if (book.quantity <= 0) {
        return res.status(400).json({ error: "Book is out of stock" });
    }

    // Update book allocation
    book.quantity--;
    book.alloted_to.push(userId);

    // Update user possessions
    if (!user.possessions) user.possessions = [];
    user.possessions.push({
        book_id: bookId,
        from_date,
        to_date
    });

    saveData(BOOKS_FILE, books);
    saveData(USERS_FILE, users);
    res.json({ message: `Book '${book.title}' allocated to ${user.name}` });
});

// Deallocate book
app.post("/deallocate/:bookId/:userId", (req, res) => {
    const bookId = parseInt(req.params.bookId);
    const userId = parseInt(req.params.userId);

    const books = loadData(BOOKS_FILE);
    const users = loadData(USERS_FILE);
    
    const book = books.find(b => b.id === bookId);
    const user = users.find(u => u.id === userId);

    if (!book || !user) {
        return res.status(404).json({ error: "Book or User not found" });
    }

    if (!book.alloted_to.includes(userId)) {
        return res.status(400).json({ error: "Book is not allocated to this user" });
    }

    // Update book allocation
    book.quantity++;
    book.alloted_to = book.alloted_to.filter(id => id !== userId);

    // Update user possessions
    if (user.possessions) {
        user.possessions = user.possessions.filter(p => p.book_id !== bookId);
    }

    saveData(BOOKS_FILE, books);
    saveData(USERS_FILE, users);
    res.json({ message: `Book '${book.title}' deallocated from ${user.name}` });
});

// Get allocated books
app.get("/allocated-books", (req, res) => {
    try {
        const books = loadData(BOOKS_FILE);
        const users = loadData(USERS_FILE);
        
        const allocatedBooks = books
            .filter(book => book.alloted_to && book.alloted_to.length > 0)
            .map(book => {
                const allocatedUsers = book.alloted_to
                    .map(userId => {
                        const user = users.find(u => u.id === userId);
                        if (!user) return null;

                        const possession = (user.possessions || [])
                            .find(p => p.book_id === book.id);

                        return {
                            user_name: user.name,
                            from_date: possession ? possession.from_date : null,
                            to_date: possession ? possession.to_date : null
                        };
                    })
                    .filter(Boolean);

                return {
                    book_title: book.title,
                    book_author: book.author,
                    allocated_to: allocatedUsers
                };
            });

        res.json(allocatedBooks);
    } catch (error) {
        res.status(500).json({ error: "Error loading allocated books" });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});