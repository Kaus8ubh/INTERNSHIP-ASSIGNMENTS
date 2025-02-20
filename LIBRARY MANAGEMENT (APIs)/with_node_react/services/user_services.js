const userDao = require('../dao/user_dao');

class UserServices {
    async getUsers(req, res) {
        try {
            const users = await userDao.getUsers();
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: "Failed to fetch users" });
        }
    }

    async getUserById(req, res) {
        try {
            const userId = parseInt(req.params.id);
            if (isNaN(userId)) {
                return res.status(400).json({ error: "Invalid user ID" });
            }

            const user = await userDao.getUserById(userId);
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ error: "User not found" });
            }
        } catch (error) {
            res.status(500).json({ error: "Failed to fetch user" });
        }
    }

    async addUser(req, res) {
        try {
            const { name } = req.body;
            const newUser = await userDao.addUser({ name });
            res.status(201).json({ 
                message: "User added successfully",
                user: newUser 
            });
        } catch (error) {
            res.status(500).json({ error: "Failed to add user" });
        }
    }

    async deleteUser(req, res) {
        try {
            const userId = parseInt(req.params.id);
            if (isNaN(userId)) {
                return res.status(400).json({ error: "Invalid user ID" });
            }

            const user = await userDao.getUserById(userId);
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            await userDao.deleteUser(userId);
            res.json({ message: "User deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: "Failed to delete user" });
        }
    }
}

module.exports = new UserServices();