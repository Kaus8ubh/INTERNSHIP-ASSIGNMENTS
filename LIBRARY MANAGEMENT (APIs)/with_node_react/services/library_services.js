const bookDao = require('../dao/book_dao');
const userDao = require('../dao/user_dao');

class LibraryServices {
    async getAllocatedBooks(req, res) {
        const books = await bookDao.getBooks();
        const users = await userDao.getUsers();
        let allocatedBooks = [];
        users.forEach(user => {
            user.possessions.forEach(possession => {
                const book = books.find(book => book.id === possession.book_id);
                if (book) {
                    allocatedBooks.push({
                        user: user.name,
                        book: book.title,
                        from_date: possession.from_date,
                        to_date: possession.to_date
                    });
                }
            });
        });
        return allocatedBooks;
    }
    

    async allocateBook(userId, bookId, issueDate=Date, returnDate=Date) {    
        const user = await userDao.getUserById(userId);
        const book = await bookDao.getBookById(bookId);
        if (!user || !book) {
            throw new Error('User or Book not found');
        }
        if (issueDate > returnDate) {
            throw new Error('Issue date should be less than return date');
        }
        if (user.possessions.includes(bookId)) {
            throw new Error('Book already allocated to user');
        }
        user.possessions.push(bookId, issueDate, returnDate);
        await userDao.saveData(user);
        return user;
    }

    async deallocateBook(userId, bookId) {
        const user = await userDao.getUserById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        if (!user.possessions.includes(bookId)) {
            throw new Error('Book not allocated to user');
        }
        user.possessions = user.possessions.filter(id => id !== bookId);
        await userDao.saveData(user);
        return user;
    }
}

module.exports = new LibraryServices();